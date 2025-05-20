📌 Project Steps: Automating Incident POST from ServiceNow to Webhook
This section details all steps to set up an automated POST integration from ServiceNow to a Webhook endpoint, simulating real-time API communication (e.g., to Jira).

✅ Step 1: Generate a Webhook Endpoint for Testing
Go to https://webhook.site

A unique URL will be generated automatically, like:

arduino
Copy
Edit
https://webhook.site/d761c695-037f-4d3d-af89-d6cb36ed47e2
Copy this URL — you’ll use it in ServiceNow's REST Message.

✅ Step 2: Create a REST Message in ServiceNow
Navigate to: System Web Services > Outbound > REST Message

Click New

Fill out the form:

Name: Send Incident to Webhook

Endpoint: Paste your Webhook.site URL

Authentication: Leave empty (not required for webhook.site)

Click Submit

✅ Step 3: Create a POST Method
After saving the REST Message, open it again

Go to the HTTP Methods tab

Click New

Fill in the fields:

Name: Post Incident

HTTP Method: POST

Add a header:

Name: Content-Type

Value: application/json

In the Content box, paste:

json
Copy
Edit
{
  "summary": "Incident ${number}",
  "description": "${short_description}",
  "priority": "${priority}"
}
Click Submit

✅ Step 4: Test the REST Method (Optional)
Go back to the Post Incident method

Click Test

Enter sample values:

number: INC999999

short_description: Test from ServiceNow

priority: 1

Click Test

➡️ Go to Webhook.site to confirm that the POST request was received.

✅ Step 5: Create a Business Rule for Automation
Go to: System Definition > Business Rules

Click New

Fill out the form:

Name: Send P1 Incident to Webhook

Table: Incident

When: After

Insert: ✅ Checked

Update: ❌ Unchecked

Condition: current.priority == 1

Go to the Advanced tab, check Advanced, and paste:

javascript
Copy
Edit
if (current.priority == 1) {
  var r = new sn_ws.RESTMessageV2('Send Incident to Webhook', 'Post Incident');
  r.setStringParameterNoEscape('number', current.number);
  r.setStringParameterNoEscape('short_description', current.short_description);
  r.setStringParameterNoEscape('priority', current.priority);

  var response = r.execute();
  gs.info('Webhook POST sent. Response: ' + response.getStatusCode());
}
Click Submit

✅ Final Result
Every time a Priority 1 Incident is created in ServiceNow, it will automatically send a POST request to your Webhook endpoint with incident details in JSON format — simulating an integration with an external system (e.g., Jira, Slack, etc.).

🧪 Example of Sent Payload
json
Copy
Edit
{
  "summary": "Incident INC0010001",
  "description": "Network outage in HQ",
  "priority": "1"
}
🧠 Notes
Webhook.site is for testing only — use a real API endpoint in production.

You can add authentication to the REST Message if required (e.g., Bearer Token).

Extend the payload to include more fields like assigned_to, state, etc.