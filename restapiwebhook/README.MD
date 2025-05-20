# 📌 Project Steps: Automating Incident POST from ServiceNow to Webhook

This section details all steps to set up an automated POST integration from **ServiceNow** to a **Webhook endpoint**, simulating real-time API communication (e.g., to Jira).

---

## ✅ Step 1: Generate a Webhook Endpoint for Testing

Go to: [https://webhook.site](https://webhook.site)

It will automatically generate a unique URL, for example:

https://webhook.site/d761c695-037f-4d3d-af89-d6cb36ed47e2

markdown
Copy
Edit

📋 **Copy this URL** — you’ll use it in ServiceNow's REST Message.

---

## ✅ Step 2: Create a REST Message in ServiceNow

📍 Navigate to: `System Web Services > Outbound > REST Message`

1. Click **New**
2. Fill out the form:

   - **Name**: `Send Incident to Webhook`  
   - **Endpoint**: *Paste your Webhook.site URL*  
   - **Authentication**: *Leave empty* (not required for webhook.site)

3. Click **Submit**

---

## ✅ Step 3: Create a POST Method

After saving the REST Message:

1. Open it again  
2. Go to the **HTTP Methods** tab  
3. Click **New** and fill in:

- **Name**: `Post Incident`
- **HTTP Method**: `POST`

🧾 **Add HTTP Header**:

| Name         | Value              |
|--------------|--------------------|
| Content-Type | application/json   |

🧾 **In the Content field, paste:**

```json
{
  "summary": "Incident ${number}",
  "description": "${short_description}",
  "priority": "${priority}"
}
Click Submit

Click Submit

✅ Step 4: Test the REST Method (Optional)
Go back to the Post Incident method

Click Test

Enter test values:

number: INC999999

short_description: Test from ServiceNow

priority: 1

Click Test

➡️ Go to Webhook.site and confirm the POST was received.

✅ Step 5: Create a Business Rule for Automation
📍 Navigate to: System Definition > Business Rules

Click New

Fill in:

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

✅ Final Result
Now, every time a Priority 1 Incident is created in ServiceNow, it will automatically send a POST request to your Webhook URL with the incident details in JSON format — simulating integration with systems like Jira, Slack, or other APIs.

🧪 Example of Payload Sent
json
Copy
Edit
{
  "summary": "Incident INC0010001",
  "description": "Network outage in HQ",
  "priority": "1"
}
🧠 Notes
🧪 Webhook.site is for testing only. In production, use the real API endpoint (e.g., Jira Cloud).

🔐 Add authentication in the REST Message if the target system requires it (e.g., Bearer Token).

🔄 You can extend the payload to include fields like assigned_to, state, etc.

yaml
Copy
Edit

---

✅ **DICA**: No GitHub, isso já ficará com o estilo certo — com **negrito**, **códigos em blocos**, **listas**, **tabelas** e **emojis bem organizados**.
