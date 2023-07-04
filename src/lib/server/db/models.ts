import { Pool } from 'pg';
import { PG_URI } from "$env/static/private";

// create a new pool here using the connection string above
const db = new Pool({
  connectionString: PG_URI,
  port: Number(import.meta.env.POSTGRES_PORT || 5432),
});


// Schema for the  database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
export default {
  query: (text, params?, callback?) => {
    console.log('executed query', text)
    return db.query(text, params, callback)
  },
  connectToDB: async () => await db.connect()
}



//scratch project connection.. 

// const pool = new Pool({
//   connectionString: pg_URI
// })

// const connectToDatabase = async (req, res, next) => {

//   try {
//     const client = await pool.connect();
//     console.log('Connected!');

//     res.locals.dbClient = client; // persists connection through middleware
//     res.locals.dbRelease = () => client.release(); // ends connection

//     next();

//   } catch (error) {
//     console.log('error connecting, tell me why: ', error)
//     next(error);
//   }
// };

// module.exports = connectToDatabase;