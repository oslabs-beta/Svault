/** need to create import to your database */
import bcrypt from 'bcrypt';


/** db set up
//  * const db = new Database <import name>
  */
//const db = new Database({});

// Function to create user. 
export async function createUser(
    username: string,
    password: string
): Promise<void> {
    // 'sql' can be renamed, values can also be modified to meet your database needs and ensure query parity.
    const sql = `
    insert into users (username, hashpassword)
    values ($username, $hashpassword)
    `;
    //adjust workFactor value to your needs
    const workFactor = 10;
    const hashedPassword = await bcrypt.hash(password, workFactor);
    
    // const stmnt = db.prepare({});
    // stmnt.run({ username, password: hashedPassword });
    // console.log('Successfully created user!')
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