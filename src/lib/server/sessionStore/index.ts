//We will use a simple in-memory store to store session information. In a big production app you might want to use a cache like Redis.
// import { randomBytes } from 'node:crypto';
// import {
//     deleteDbSession,
//     deleteExpiredDbSessions,
//     getDbSession,
//     //getUserRoles,
//     insertDbSession,
//   } from '../db/index.ts';
//   import type { SessionInfo, SessionInfoCache } from '../db/types.ts';

  /*
    type aliases for SessionInfo and SessionInfoCache--> 
    type SessionInfo = {
      username: string;
      //roles: string[]; //not being used currently
    };
    
    type SessionInfoCache = SessionInfo & {
      invalidAt: number;
    };
  */

 /* 
 table also available in excalidraw
 sessions SQL table:
    ses_id: varchar NOT NULL PK,
    ses_created: timestamp without timezone NOT NULL DEFAULT now(),
    ses_expires: integer NOT NULL,
    ses_data: varchar NOT NULL
  */

// type Sid = string;

// //in memory session Store
// const sessionStore = new Map<Sid, SessionInfoCache>();
// let nextClean = Date.now() + 1000 * 60 * 60; // 1 hour

// function getSid(): Sid {
//   return randomBytes(32).toString('hex');
// }

// //loops over all sessions and deletes the ones that are expired.
// //We call this function every hour when a session is created
// function clean() {
//   const now = Date.now();
//   for (const [sid, session] of sessionStore) {
//     if (session.invalidAt < now) {
//       sessionStore.delete(sid);
//     }
//   }
//   deleteExpiredDbSessions(now);
//   nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
// }

// //invoked from performLogin on login/+page.server.ts
export function createSession(username: string, maxAge: number): string {
  let sid: Sid = '';

  do {
    //generates random sid until a unique one is created
    sid = getSid();
  } while (sessionStore.has(sid));

//   //can add later, currently we do not have "roles" property
//   // const roles = getUserRoles(username)
//   // roles property add to sessionStore once getUserRoles created

//   const data: SessionInfo = {
//     username
//   };
//   console.log('data is', data) // TODO: want to see what this is returning, just the username?
//   insertDbSession(sid, data, maxAge);
//   sessionStore.set(sid, {
//     ...data,
//     invalidAt: maxAge
//   });
//   return sid;
// }

// //should we move this under the clean() function for easier readability?
// //calls clean() function if it has been over 1 hour to delete expired sessions in db
// if (Date.now() > nextClean) {
//   //call in setTimeout to not block the server
//   setTimeout(() => {
//     clean();
//   }, 5000);
// }

// //gets session from sessionStore, if not in store, adds to it
// export function getSession(sid: Sid): SessionInfo | undefined {
//   if (sessionStore.has(sid)) {
//     return sessionStore.get(sid);
//   } else {
//     //sends to sessionStore from SessionInfoCache
//     const session = getDbSession(sid);
//     if (session) {
//       sessionStore.set(sid, session);
//       return session;
//     }
//   }
//   //if no session, return undefined
//   console.log('session not found', sid);
//   return undefined;

// }

// //deletes session from sessionStore
// export function deleteSession(sid: string): void {
//   sessionStore.delete(sid);
//   deleteDbSession(sid);
}