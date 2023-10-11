const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const fs = require('fs')
require("dotenv").config();

const credential = new DefaultAzureCredential();

// Build the URL to reach your key vault
const url = process.env.KEYVAULT_URI;

// Lastly, create our secrets client and connect to the service
const client = new SecretClient(url, credential);

const getAzureSecrets = async () => {
  const [sqldb, sqlhost, sqluser, sqlpassword] = await Promise.all([
    (await client.getSecret("sqldb")).value,
    (await client.getSecret("sqlhost")).value,
    (await client.getSecret("sqluser")).value,
    (await client.getSecret("sqlpassword")).value,
  ]);
  
  const envFile = fs.createWriteStream(".azure.env", {
    flags: "w",
  });

  envFile.write(`\nAZURE_SQL_DB=${sqldb}`); 
  envFile.write(`\nAZURE_SQL_HOST=${sqlhost}`); 
  envFile.write(`\nAZURE_SQL_USER=${sqluser}`); 
  envFile.write(`\nAZURE_SQL_PASSWORD=${sqlpassword}`); 

  envFile.end()
};

getAzureSecrets()
