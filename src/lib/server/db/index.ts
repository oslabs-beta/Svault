/** need to create import to your database */
import bcrypt from 'bcrypt';
import db from './models.js'


// Function to create user. 
export async function createUser(
    username: string,
    password: string
): Promise<void> {
    // 'sql' can be renamed, values can also be modified to meet your database needs and ensure query parity.
    await db.connectToDB()
    .then((res) => console.log('connected'));
    
    const sql = `
    insert into users (username, password)
    values ($username, $hashpassword)
    `;
    //adjust workFactor value to your needs, should we use a type alias here?
    const workFactor = 10;
    const hashPassword = await bcrypt.hash(password, workFactor);
    
    
    //db.query(sql)
    //stmnt.run({ username, hashpassword: hashPassword });
    // console.log('Successfully created user!')

}

//function to check user credentials
//the excepted return type is a Promise with return of boolean type
export async function checkUserCredentials(
  username: string,
  password: string
): Promise<any> {
    const queryString = `
    select password
      from users
     where username = $username
    `;
    db.query(queryString)
    .then((data) => { 
      //Send username to frontend
      console.log('Data.rows from db.query on log in', data);
      if (data.rows[0]) {
        return bcrypt.compare(password, data.rows[0].password);
      } else {
        //this means the username doesn't exist in the db but dont tell the client that
        // spend some time to "waste" some time
        // this makes brute forcing harder
        // could also do a timeout here
        //adjust workFactor value to your needs
        const workFactor = 10;
        bcrypt.hash(password, workFactor);
        return false;
      }
    });
}
