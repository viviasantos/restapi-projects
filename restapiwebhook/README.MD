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

Fill in:

Name: Send Incident to Webhook

Endpoint: Paste the Webhook URL

Authentication: Leave blank

Click Submit

✅ Step 3: Create a POST Method
Open the REST Message you just created

Go to the HTTP Methods tab → Click New

Fill in:

Name: Post Incident

HTTP Method: POST

Add Header:

Name	Value
Content-Type	application/json

In the Content field, paste:

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
Open the Post Incident method

Click Test

Fill in test values:

number: INC999999

short_description: Test from ServiceNow

priority: 1

Click Test ✅
➡️ Go to Webhook.site and confirm the POST was received.

✅ Step 5: Create a Business Rule for Automation
Navigate to: System Definition > Business Rules

Click New

Fill in:

Name: Send P1 Incident to Webhook

Table: Incident

When: After

Insert: ☑️ Checked

Update: ❌ Unchecked

Condition: current.priority == 1

In the Advanced tab:

Check Advanced

Paste the following script:

javascript
Copy
Edit
if (current.priority == 1) {
  var r = new sn_ws.RESTMessageV2('Send Incident to Webhook', 'Post Incident');
  r.setStringParameterNoEscape('number', current.number);
  r.setStringParameterNoEscape('short_description', current.short_description);
  r.setStringParameterNoEscape('priority', current.priority);

  var response = r.execute(); // Send the POST
  gs.info('Webhook POST sent. Response: ' + response.getStatusCode());
}
Click Submit

✅ Final Result
Every time a Priority 1 Incident is created in ServiceNow, a POST request will be automatically sent to the Webhook with incident details — simulating an integration with external systems (e.g., Jira, Slack, etc.).

🧪 Example Payload Sent
json
Copy
Edit
{
  "summary": "Incident INC0010001",
  "description": "Network outage in HQ",
  "priority": "1"
}
🧠 Notes
🧪 Webhook.site is for testing only. In production, use the actual API endpoint (e.g., Jira Cloud).

🔐 You can add authentication in the REST Message if required (e.g., Bearer Token).

🔄 You can extend the payload to include more fields like assigned_to, state, etc.