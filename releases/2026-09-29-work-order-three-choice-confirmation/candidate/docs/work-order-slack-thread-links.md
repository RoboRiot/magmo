# Work Order Add: link saved Slack list items in the work-order thread

This extends only the optional **Save and send to Slack** choice in Work Order
Add's confirmation popup. The popup also offers **Cancel** and **Save only**;
neither choice sends a Slack message. Inventory confirmation still happens first
and is not repeated by Slack retries. A failed save never starts Slack delivery.
The separate Shipping/Receiving item buttons retain their behavior.

After a new opted-in send completes its Shipping/Receiving list row, Magmo posts
one native Slack list-item link in that work order's saved Dispatch thread. It
does not upload pictures to the thread, broadcast a top-level channel message,
or modify BlueFolder. Existing list-photo behavior is unchanged.

The link is a `rich_text` / `list_record` element using the actual saved
`listId` and `rowId`, matching the example in WO 10691. This is Slack's
[documented list-record element](https://docs.slack.dev/reference/block-kit/block-elements/list-record-element/).
The [chat.postMessage](https://docs.slack.dev/reference/methods/chat.postMessage/)
request supplies the exact parent `thread_ts`, disables broadcast and all link
and media unfurls, and contains no image blocks or attachments.

## Safety and retries

- The API accepts only the saved operation ID and item ID, with authenticated
  staff and operation-creator validation. Channel, thread, list row, message,
  and movement direction cannot be supplied by the browser.
- Only newly created Slack delivery receipts are marked `threadLinkRequested`.
  Historical sent/failed receipts are not retroactively posted during checks.
- The list receipt stays `sent` once the row finishes. Thread delivery has a
  separate nested receipt, lease, intent checkpoint, and confirmed message ID.
  Retrying a thread failure never recreates the list row or saves inventory.
- Missing, conflicting, quarantined, or unverified work-order threads fail
  visibly. There is no fallback to a guessed thread or a top-level post.
- The recorded parent message must identify the exact saved work-order number.
  Known Slack rejections can be retried; unknown post outcomes are held for
  review rather than blindly repeated.
- The UI distinguishes `Sent + linked`, `Link failed`, and `Check link` while
  retaining the successful list entry. Delivery errors keep the inventory save
  successful; retrying a failed link uses the original saved operation and row.

No data migration or historical-item rewrite is required. Deployment must use
the current production source as its baseline and preserve intervening changes.
Verification uses local synthetic data plus read-only production checks; no live
inventory movement or Slack message is generated as a test.
