/** need to caddreate import to your database */
import bcrypt from 'bcrypt';
import db from './models.js';
import type { SessionInfo, SessionInfoCache } from './types.ts';

// Function to create user.
export async function createUser(
  username: string,
  password: string
): Promise<void> {
  // 'sql' can be renamed, values can also be modified to meet your database needs and ensure query parity.
  await db.connectToDB().then((res) => {
    if (res) console.log('connected');
  });

  //adjust workFactor value to your needs, should we use a type alias here?
  const workFactor = 10;
  const hashPassword = await bcrypt.hash(password, workFactor);

  const sql = `
    insert into users (username, password)
    values ('${username}', '${hashPassword}')
    `;

  const result = await db.query(sql);
  console.log(result);
}

//function to check user credentials
//the accepted return type is a Promise with return of boolean type
export async function checkUserCredentials(
  username: string,
  password: string
): Promise<any> {
  const queryString = `
    select username, password
      from users
      where username = '${username}'
    `;
  const result = await db.query(queryString);

  //Send username to frontend
  // console.log('result is', result);
  const workFactor = 10;
  if (result) {
    // console.log('result row', result.rows[0]);
    if (result.rows[0]) {
      console.log('username exists, now we compare password');
      return bcrypt
        .compare(password, result.rows[0].password)
        .then((res) => {
          return res; // return true
        })
        .catch((err) => {
          console.log(err.message);
          return err.message;
        });
    } else {
      //this means the username doesn't exist in the db but dont tell the client that
      // spend some time to "waste" some time
      // this makes brute forcing harder
      console.log('username does not exist');
      await bcrypt.hash(password, workFactor);
      return false;
    }
  } else {
    return `result is err ${result}`;
  }
}

//function to delete expired sessions, called from function clean()

//TODO: HAVE NOT TESTED YET
// export function deleteExpiredDbSessions(now: number) {
//   //ses_expires is an INTEGER
//   const sql = `
//   delete from sessions
//    where ses_expires < ${now}
//   `;

//   const result = db.query(sql);
//   console.log(result);
// }

// //invoked from createSession in sessionStore/index.ts
// //with the following arguments: insertDbSession(sid, data: SessionInfo { username: 'string'}, maxAge)
// export function insertDbSession(
//   sid: string,
//   sessionInfo: SessionInfo,
//   expiresAt: number
// ) {
//   const seshInfo = JSON.stringify(sessionInfo);
//   console.log(seshInfo);
//   const sql = `
//     insert into sessions (ses_id, ses_expires, ses_data)
//     values ('${sid}', ${expiresAt}, '${seshInfo}')
//   `;

//   console.log('hitting insertDBSession');
//   const result = db.query(sql);
//   console.log(result);
// }

// export function deleteDbSession(sid: string) {
//   const sql = `
//     delete from sessions
//     where ses_id = ${sid}
//   `;
//   const result = db.query(sql);
//   console.log(result);
// }

// //get DB session and store in sessionInfoCache
// export function getDbSession(sid: string): SessionInfoCache | undefined {
//   const sql = `
//     select ses_data as data
//          , ses_expires as expires
//       from sessions
//      where ses_id = ${sid}
//   `;
//   console.log('hitting getDBsession');
//   //returns a row with ses_data as data, ses_expires as expires
//   const result = db.query(sql);
//   //not sure if we need to make this an async await..
//   if (result) {
//     console.log('getDBsession result is', result);
//     if (result.row[0]) {
//       const data = JSON.parse(row[0].data);
//       data.expires = row[0].expires;
//       return data as SessionInfoCache;
//     } else {
//       return undefined;
//     }
//   }
//   return undefined;
// }
