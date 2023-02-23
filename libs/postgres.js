const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'tavo',
    password: 'admin123',
    database: 'tucanteach'
  });
  await client.connect();
  return client;
}


module.exports = getConnection;
