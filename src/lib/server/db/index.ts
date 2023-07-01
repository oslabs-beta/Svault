/** need to create import to your database */
import bcrypt from 'bcrypt';
const db = require('./models');

/** db set up
//  * const db = new Database <import name>
  */

// Function to create user. 
export async function createUser(
    username: string,
    password: string
): Promise<void> {
    // 'sql' can be renamed, values can also be modified to meet your database needs and ensure query parity.
    //tutorial inserted the unhashed password into the db, but i adjusted the db insertion to only include the hashpassword for safety reasons.. what do you think?
    const sql = `
    insert into users (username, password)
    values ($username, $hashpassword)
    `;
    //adjust workFactor value to your needs, should we use a type alias here?
    const workFactor = 10;
    const hashPassword = await bcrypt.hash(password, workFactor);
    
    const stmnt = db.query(sql);
   //stmnt.run({ username, hashpassword: hashPassword });
    console.log('Successfully created user!')
}

//function to check user credentials
//the excepted return type is a Promise with return of boolean type
export async function checkUserCredentials(
  username: string,
  password: string
): Promise<boolean> {
    const sql = `
    select password
      from users
     where username = $username
    `;
    const stmnt = db.prepare(sql);
    //can we use object destructing here intead?
    //ex. const { username } = stmnt;
    const row = stmnt.get({ username });
    if (row) {
      return bcrypt.compare(password, row.password);
    } else {
      // spend some time to "waste" some time
      // this makes brute forcing harder
      // could also do a timeout here
      //adjust workFactor value to your needs
      const workFactor = 10;
      await bcrypt.hash(password, workFactor);
      return false;
    }
}









// const username = name;
// bcrypt
// .hash(password, workFactor)
// .then(hash => {
//     console.log('line 13', hash)
//     const query = `UPDATE users 
//     SET hashedpassword = '${hash}' 
//     WHERE username = '${username}';`
//     db.query(query)
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: `Error in userController.create:', ${err}`,
//         message: { err: 'Error occured in userController.create' }
//       })
//     })