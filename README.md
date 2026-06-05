This is a starter template for [Learn Next.js](https://nextjs.org/learn).

## BlueFolder Slack Listener

This project includes a Next.js backend port of the Python BlueFolder -> Slack listener.

Routes:
- Current Next 10-compatible route: `/api/cron/bluefolder-slack`
- Requested App Router route for a future Next upgrade: `app/api/cron/bluefolder-slack/route.js`
- Current Slack Events route: `/api/slack/events`
- Requested App Router Slack Events route: `app/api/slack/events/route.js`

Behavior:
- The cron route checks BlueFolder once and exits. It does not run a forever loop.
- Processed work orders are stored in Firestore instead of a local JSON state file.
- The Slack parent message remains:

```text
#WORK_ORDER_NUMBER
<BlueFolder link|Subject>
```

- Fixed mentions are posted as the first thread reply, matching the Python listener.
- The Slack channel, message ts, permalink, work order ID, subject, and processed timestamp are saved in Firestore.
- A Slack message containing exactly `!done` fetches the relevant thread/conversation, asks OpenAI for a professional service report, and posts it back into that Slack thread.

Required environment variables:

```text
BLUEFOLDER_BASE_URL=https://app.bluefolder.com/api/2.0
BLUEFOLDER_API_TOKEN=...
BLUEFOLDER_WORK_ORDERS_PATH=/workOrders/list.aspx
BLUEFOLDER_WORK_ORDER_DETAIL_PATH=/serviceRequests/get.aspx?serviceRequestId={id}
BLUEFOLDER_WORK_ORDER_URL_TEMPLATE=https://advancedimaging.bluefolder.com/service/sr.aspx?srid={id}
BLUEFOLDER_LINK_FIELD_LABEL=Link to Slack Thread

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
CRON_SECRET=long-random-secret
SLACK_SIGNING_SECRET=...
OPENAI_SERVICE_REPORT_MODEL=gpt-5.5
```

Setup:
1. Deploy the app with the existing Firebase Admin environment configured.
2. Set `DRY_RUN=true` and call `/api/cron/bluefolder-slack` once. With `BASELINE_ON_STARTUP=true`, the first run captures existing work orders in Firestore and exits.
3. Call `/api/cron/bluefolder-slack?testSlack=1` to send one test Slack message using `TEST_WORK_ORDER_NUMBER`, `TEST_WORK_ORDER_SUBJECT`, and `TEST_WORK_ORDER_URL`.
4. Set `DRY_RUN=false` after BlueFolder parsing and Slack posting are confirmed.
5. Configure your scheduler to call `/api/cron/bluefolder-slack` with `Authorization: Bearer $CRON_SECRET`.
6. Configure Slack Event Subscriptions to POST to `/api/slack/events`, subscribe to message events, and set `SLACK_SIGNING_SECRET`.

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

### Local Python `!done` Listener

If you do not want to expose local Next.js through ngrok while developing, run the local Python listener instead. It works like the old Python BlueFolder listener: it makes outbound requests to Slack/OpenAI and does not need Slack Events, ngrok, or a public callback URL.

```bash
py scripts/slack_done_report_listener.py --channel C0123456789
```

Then type this in that Slack channel or in a work-order thread:

```text
!done
```

The script reads `.env.local`/`.env` for `SLACK_BOT_TOKEN` and `OPENAI_API_KEY`. If you do not pass `--channel`, set `SLACK_CHANNEL_ID` or `SLACK_CHANNEL_NAME`.
