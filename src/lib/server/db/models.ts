import { Pool } from 'pg';
import (PG_URI) from '$env/static/private';

const PG_URI = 'postgres://olsxjxwa:z-vPhW0jFxZlp-R0NuyQDf2VDiIyZ1PT@stampy.db.elephantsql.com/olsxjxwa';
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
})

// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text: string, params, callback) => {
    console.log('executed query', text)
    return pool.query(text, params, callback)
  }
}