This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## Production and test deployments

There are two independent Firebase deploy paths:

- `npm run deploy:test` (or `.\testdeploy.ps1`) builds and deploys only the test server and
  [magmo-test.web.app](https://magmo-test.web.app).
- `npm run deploy:production` (or `.\deploy.ps1`) builds and deploys only the production server and
  [magmo.cloud](https://magmo.cloud).

Do not use a bare `firebase deploy`; the two scripts intentionally select one
Hosting site and one server function at a time.
Use `npm run deploy:test:dry-run` or `npm run deploy:production:dry-run` to run
Firebase's validation without publishing. The legacy `npm run firebase:deploy`
command is retained as a production-only alias.

Before the first test deployment:

1. Copy `.env.test.example` to `.env.test.local`.
2. Add the Bot User OAuth Token and Signing Secret from the `magmo-test` Slack
   app.
3. Set a dedicated test Slack channel and any test Slack List IDs.
4. In the `magmo-test` Slack app, set the Event Subscriptions request URL to
   `https://magmo-test.web.app/api/slack/events`.
5. Run `.\testdeploy.ps1`.

The test site has its own Firebase Hosting site, Firebase Web App registration,
Cloud Function, and Slack credentials. It is still inside the
`magmo-ac10c` Firebase project, so it shares production Firestore, Storage, and
Authentication data. The red `TEST BAY · SHARED DATA` badge is intentional.
Create a separate Firebase project later if test data must also be isolated.

## BlueFolder / Dispatch integration

There are two authorized ways to create a Slack work-order root:

- MAGMO Dispatch creates the root for requests generated and approved in MAGMO.
- The standalone Python BlueFolder listener creates the root for work orders
  created directly in BlueFolder, such as work orders entered by Yao.

The legacy `/api/cron/bluefolder-slack` web poller is disabled so it cannot
become a third creator or race either supported path.

Routes:
- Current Next 10-compatible route: `/api/cron/bluefolder-slack`
- Requested App Router route for a future Next upgrade: `app/api/cron/bluefolder-slack/route.js`
- Current Slack Events route: `/api/slack/events`
- Requested App Router Slack Events route: `app/api/slack/events/route.js`

Behavior:
- Clicking Add in MAGMO checks for an existing numeric Dispatch root before posting.
- A new root is posted only to the configured production Dispatch channel.
- The Slack parent message remains:

```text
#WORK_ORDER_NUMBER
<BlueFolder link|Subject>
```

- Fixed mentions are posted as the first thread reply.
- MAGMO stores the channel, root timestamp, canonical permalink, dispatch status,
  dispatch time, and actor in Firestore.
- The receipt exposed by `work_order.command_context` is the server signal that
  MAGMO already created the root.
- Retries reuse the existing numeric root and never create a duplicate.
- BlueFolder-created work orders are posted by the standalone Python listener
  and then ingested into MAGMO so MAGMO can track the same Slack root.
- Neither MAGMO nor the Python server writes dispatch data back to BlueFolder.
- A Slack message containing exactly `!done` fetches the relevant thread/conversation, asks OpenAI for a professional service report, and posts it back into that Slack thread.

Required environment variables:

```text
BLUEFOLDER_BASE_URL=https://app.bluefolder.com/api/2.0
BLUEFOLDER_API_TOKEN=...
BLUEFOLDER_WORK_ORDERS_PATH=/serviceRequests/list.aspx
BLUEFOLDER_WORK_ORDER_DETAIL_PATH=/serviceRequests/get.aspx?serviceRequestId={id}
BLUEFOLDER_LIST_STATUS=open
BLUEFOLDER_WORK_ORDER_URL_TEMPLATE=https://advancedimaging.bluefolder.com/service/sr.aspx?srid={id}

SLACK_BOT_TOKEN=xoxb-...
SLACK_CHANNEL_ID=C...
SLACK_CHANNEL_NAME=dispatch
SLACK_USER_IDS=U...,U...
SLACK_MENTION_TEXT=@Julie Tang @Sean Wang @Wilson Wang @Alex Wu
REQUIRE_CLICKABLE_MENTIONS=true

# Slack Lists used by /api/slack/add-to-list
SLACK_LIST_TASKS_ID=F...
SLACK_LIST_TASKS_TITLE_COL=...
SLACK_LIST_TASKS_DESCRIPTION_COL=...
SLACK_LIST_SHIPPING_ID=F...
SLACK_LIST_SHIPPING_TITLE_COL=...
SLACK_LIST_SHIPPING_DESCRIPTION_COL=...
SLACK_LIST_SHIPPING_PNSN_COL=...
SLACK_LIST_SHIPPING_WO_COL=...
SLACK_LIST_SHIPPING_LOCALSN_COL=...
SLACK_LIST_SHIPPING_TRACKING_COL=...
SLACK_LIST_SHIPPING_PHOTOS_COL=...
SLACK_LIST_SHIPPING_DATE_COL=...
SLACK_LIST_RECEIVING_ID=F...
SLACK_LIST_RECEIVING_TITLE_COL=...
SLACK_LIST_RECEIVING_DESCRIPTION_COL=...
SLACK_LIST_RECEIVING_PNSN_COL=...
SLACK_LIST_RECEIVING_WO_COL=...
SLACK_LIST_RECEIVING_LOCALSN_COL=...
SLACK_LIST_RECEIVING_TRACKING_COL=...
SLACK_LIST_RECEIVING_PHOTOS_COL=...
SLACK_LIST_RECEIVING_DATE_COL=...
SLACK_LIST_TOOLS_ID=F...
SLACK_LIST_TOOLS_TITLE_COL=...
SLACK_LIST_TOOLS_WO_COL=...
SLACK_LIST_TOOLS_PHOTOS_COL=...

OPENAI_API_KEY=...
FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH=...
```

Recommended safety/config variables:

```text
DRY_RUN=true
BASELINE_ON_STARTUP=true
ENABLE_BLUEFOLDER=true
POLL_SECONDS=60
CRON_SECRET=long-random-secret
SLACK_SIGNING_SECRET=...
OPENAI_SERVICE_REPORT_MODEL=gpt-5.5
```

Setup:
1. Deploy the app with Firebase Admin and Slack server credentials configured.
2. Set `OPS_DISPATCH_CHANNEL_ID=C07EPLKV9JT` and keep Testing configured separately as `OPS_TESTING_CHANNEL_ID=C07F6V10PRS`.
3. Run the standalone Python BlueFolder listener for BlueFolder-created work
   orders; do not schedule `/api/cron/bluefolder-slack`, which is retained only
   as a fail-closed compatibility endpoint.
4. Run the Python report listener alongside it for `!daily`, `!complete`,
   `!parts`, and `!done`.
5. Configure Slack Event Subscriptions to POST to `/api/slack/events`, subscribe to message events, and set `SLACK_SIGNING_SECRET`.

Slack scopes commonly needed:
- `chat:write`
- `chat:write.public` or invite the bot to the target channel
- `channels:history` / `groups:history` for conversation reads
- `channels:read` / `groups:read` if resolving by channel name
- `users:read` if resolving plain mention names to user IDs

Firestore collections used:
- `BlueFolderSlackState`
- `BlueFolderSlackWorkOrders`
- `BlueFolderSlackThreadIndex`
- `BlueFolderSlackEvents`

### Local Python Ops report listener

If you do not want to expose local Next.js through ngrok while developing, run the local Python listener instead. It works like the old Python BlueFolder listener: it makes outbound requests to Slack/OpenAI and does not need Slack Events, ngrok, or a public callback URL.

```bash
py scripts/slack_done_report_listener_v2.py --channel C0123456789
```

Use these commands in the corresponding work-order thread:

```text
!daily
!complete
!parts
!done
```

- `!daily` posts a short update for the current Pacific-time day.
- `!complete` posts the service report and moves the Ops record to Service complete while parts return remains pending.
- `!parts` posts and saves a concise parts-movement summary without changing workflow status.
- `!done` posts the final closeout, marks the Ops record done, preserves its summaries, and clears the temporary Firebase chat log.

The report listener and `bluefolder_slack_listener_v2.py` should run together. Keep `OPS_REPORT_COMMANDS_MANAGED_BY_DONE_LISTENER=true` so the BlueFolder listener delegates these workflow/report commands instead of racing the report listener.

The server service manager must keep both Python processes running. The report
listener watches only `OPS_DISPATCH_CHANNEL_ID` and refuses Testing. It requires
`OPS_INGEST_SECRET` for `!complete`, `!parts`, and `!done`; `!daily` does not
require an Ops write.

The script reads `.env.local`/`.env` for Slack, OpenAI, and Firebase credentials. If you do not pass `--channel`, set `SLACK_CHANNEL_ID` or `SLACK_CHANNEL_NAME`. Existing `slack_done_report_state.json` files remain compatible; no state migration is required.
