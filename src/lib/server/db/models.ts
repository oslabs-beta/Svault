import { Pool } from 'pg';
import { PG_URI } from '$env/static/private';

// create a new pool here using the connection string above
const db = new Pool({
  connectionString: PG_URI,
  port: Number(import.meta.env.POSTGRES_PORT || 5432),
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
export default {
  query: (text: string, params?, callback?) => {
    console.log('executed query', text);
    return db.query(text, params, callback);
  },
  connectToDB: async () => await db.connect(),
};