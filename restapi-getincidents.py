#Need to install requests package for python
#easy_install requests
import pandas as pd
from requests.auth import HTTPBasicAuth
import requests

# Set the request parameters
url = 'https://dev347129.service-now.com/api/now/table/incident?sysparm_query=caller_id%3D77ad8176731313005754660c4cf6a7de&sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=number%2Cparent%2Cmade_sla%2Ccaused_by%2Cwatch_list%2Cupon_reject%2Csys_updated_on%2Cchild_incidents&sysparm_limit=100'

# Eg. User name="admin", Password="admin" for this code sample.
user = 'USER AUTENTICATOR'
pwd = 'PIN'

# Set proper headers
headers = {"Content-Type":"application/json","Accept":"application/json"}

# Do the HTTP request
response = requests.get(url, auth=(user, pwd), headers=headers )

# Check for HTTP codes other than 200
if response.status_code != 200: 
    print('Status:', response.status_code, 'Headers:', response.headers, 'Error Response:',response.json())
    exit()

# Decode the JSON response into a dictionary and use the data
data = response.json()
incidents = data['result']

# Convert to table
df = pd.DataFrame(incidents)

# Print full table
print(df)

# Show selected columns
print(df[['number', 'parent', 'made_sla', 'sys_updated_on']])

# Save to Excel (optional)
df.to_excel('C:/Users/ssant/Desktop/GitHub/restapi-projects/tabelas/incidents.xlsx', index=False)
