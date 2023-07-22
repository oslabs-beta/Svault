/** need to create import to your database */
// // TODO: clean up TS syntax
import bcrypt from 'bcrypt';
import db from './models.js';
import { TABLE_NAME } from '$env/static/private';

// Function to create user
export async function createUser(
  username: string,
  password: string
): Promise<void> {

  await db.connectToDB().then((res) => {
    if (res) console.log('connected');
  });

  //adjust workFactor value to your needs, 10 is the standard
  const workFactor = 10;
  const hashPassword = await bcrypt.hash(password, workFactor);

  const sql = `
    insert into ${TABLE_NAME} (username, password)
    values ($1, $2)
    `;
  const values = [username, hashPassword];

  const result = await db.query(sql, values);
}

//function to check user credentials
//the accepted return type is a Promise with return of boolean type
export async function checkUserCredentials(
  username: string,
  password: string
): Promise<any> {

  const queryString = {
    name: 'checkCredentials',
    text: 'SELECT username, password FROM users WHERE username = $1',
    values: [username]
  }
  //const values = [username];
  console.log(queryString);
  const result = await db.query(queryString.text, queryString.values);
  

  // Sends username to frontend
  const workFactor = 10;
  if (result) {
    console.log(result)
    if (result.rows[0]) {
      return bcrypt
        .compare(password, result.rows[0].password)
        .then((res) => {
          return res; // return true
        })
        .catch((err) => {
          return err.message;
        });
    } else {
      //this means the username doesn't exist in the db but dont tell the client that
      // spend some time to "waste" some time, this makes brute forcing harder
      await bcrypt.hash(password, workFactor);
      return false;
    }
  } else {
    return `result is err ${result}`;
  }
}
