## 📌 Project Steps: Automating Incident POST from ServiceNow to Webhook

This section details all steps to set up an automated POST integration from **ServiceNow** to a **Webhook endpoint**, simulating real-time API communication (e.g., to **Jira**, **Slack**, etc.).

---

### ✅ **Step 1: Generate a Webhook Endpoint for Testing**

1. Go to: [https://webhook.site](https://webhook.site)
2. A unique URL will be generated automatically, for example:

https://webhook.site/d761c695-037f-4d3d-af89-d6cb36ed47e2

markdown
Copy
Edit

3. Copy this URL — it will be used in the ServiceNow REST Message.

---

### ✅ **Step 2: Create a REST Message in ServiceNow**

- Navigate to: `System Web Services > Outbound > REST Message`
- Click **New**
- Fill in the following:

- **Name**: `Send Incident to Webhook`
- **Endpoint**: Paste your Webhook.site URL
- **Authentication**: Leave blank

- Click **Submit**

---

### ✅ **Step 3: Create the POST Method**

1. Reopen the REST Message you just created
2. Go to the **HTTP Methods** tab → Click **New**
3. Fill in:

- **Name**: `Post Incident`
- **HTTP Method**: `POST`

4. Add the header:

| Header Name   | Value             |
|---------------|------------------|
| Content-Type  | application/json |

5. In the **Content** field, paste:

json
{
  "summary": "Incident ${number}",
  "description": "${short_description}",
  "priority": "${priority}"
}
Click Submit

✅ Step 4: Test the REST Method (Optional)
Go back to the Post Incident method

Click Test

Fill in the test values:

vbnet
Copy
Edit
number: INC999999
short_description: Test from ServiceNow
priority: 1
Click Test

➡️ Go to Webhook.site and confirm that the POST was received.

✅ Step 5: Create a Business Rule for Automation
Navigate to: System Definition > Business Rules

Click New

Fill in the following:

Name: Send P1 Incident to Webhook

Table: Incident

When: After

Insert: ☑️ Checked

Update: ❌ Unchecked

Condition: current.priority == 1

Go to the Advanced tab:

Check ✅ Advanced

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

🎯 Final Result
Every time a Priority 1 Incident is created in ServiceNow, a POST request will automatically be sent to your Webhook URL, including incident details in JSON format — simulating integration with systems like Jira, Slack, or other APIs.

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
🧪 Webhook.site is for testing only — use a real API endpoint in production (e.g., Jira Cloud).

🔐 Add authentication in the REST Message if required (e.g., Bearer Token).

🔄 Extend the payload to include additional fields like assigned_to, state, etc.

