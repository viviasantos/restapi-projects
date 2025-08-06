## Steps to Reproduce

1. **Access Your ServiceNow Instance**  
   - Log in with your admin or developer account.  
   - Make sure you have access to the `incident` table (usually associated with the `itil` role).

2. **Create an Integration User (if necessary)**  
   - Go to **Users** in ServiceNow.  
   - Create a new user, e.g., `api_user`.  
   - Assign the minimum required roles, such as `rest_api_explorer` or `itil`.  
   - Note the username and password for basic authentication in your script.

3. **Use ServiceNow REST API Explorer**  
   - In the navigation menu, go to **REST API Explorer**.  
   - Choose:  
     - **API Name**: `Table API`  
     - **Method**: `GET`  
     - **Table Name**: `incident`  
   - Add filters in the **Query** field (e.g., `state!=6` to return only open incidents).  
   - Click **Send** to test the request.  
   - Copy the generated URL from the **Curl** or **Request URL** field (including parameters).

4. **Set Up the Environment in Visual Studio Code**  
   - Create a new folder for the project: `ServiceNow-REST-API-Incident-Extractor`.  
   - Open this folder in **Visual Studio Code**.  
   - Create and activate a virtual environment:

     ```bash
     python -m venv .venv
     source .venv/bin/activate  # On Windows: .venv\Scripts\activate
     ```

   - Install the required libraries:

     ```bash
     pip install requests pandas openpyxl
     ```

5. **Write the Python Script**  
   - Create a file named `restapi-getincidents.py`.  
   - Implement the following steps:  
     - Use `requests.get()` with basic auth: `auth=(user, pwd)`.  
     - Store the JSON response.  
     - Use `pandas.json_normalize()` to convert the response to a DataFrame.  
     - Select only the needed columns (e.g., `number`, `short_description`, `state`, `sys_updated_on`).  
     - Export the data using:

       ```python
       df.to_excel("incidents.xlsx")
       ```

6. **Run the Script**  
   - Run the script from the VS Code terminal:

     ```bash
     python restapi-getincidents.py
     ```

   - Check that `incidents.xlsx` is generated in the project folder.

7. **(Optional) Handle Pagination**  
   - If your instance returns more than 100 records, use `sysparm_limit` and `sysparm_offset`.  
   - Loop through all pages to retrieve all incident data.
