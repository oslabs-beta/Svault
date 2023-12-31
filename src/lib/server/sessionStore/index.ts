// // We will use a simple in-memory store to store session information. In a big production app you might want to use a cache like Redis.

// // TODO/ITERATION: send session information back to frontend via sessionStorage and localStorage objects

import { randomBytes } from 'node:crypto';
import type { SessionInfo, SessionInfoCache } from '../db/types.ts';

/*
    // type aliases for SessionInfo and SessionInfoCache--> 
    // type SessionInfo = {
    //   username: string;
    //   //roles: string[]; //not being used currently
    // };
    
    // type SessionInfoCache = SessionInfo & {
    //   invalidAt: number;
    // };
*/

type Sid = string;

//in memory session Store
const sessionStore = new Map<Sid, SessionInfoCache>();
let nextClean = Date.now() + 1000 * 60 * 60; // 1 hour

function getSid(): Sid {
  return randomBytes(32).toString('hex');
}

//loops over all sessions and deletes the ones that are expired.
//We call this function every hour when a session is created
function clean() {
  const now = Date.now();
  for (const [sid, session] of sessionStore) {
    if (session.invalidAt < now) {
      sessionStore.delete(sid);
    }
  }
  // // TODO: delete session from browser storage
  nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
}

//calls clean() function if it has been over 1 hour to delete expired sessions
if (Date.now() > nextClean) {
  //call in setTimeout to not block the server
  setTimeout(() => {
    clean();
  }, 5000);
}

//invoked from makeCookieAndSession on login/nativeAuth.ts
export function createSession(username: string, maxAge: number): string {
  //TODO: add functionality to allow Oauth to create a session with the cookie sid that has already been generated by the Oauth provider

  let sid: Sid = '';

  do {
    //generates random sid until a unique one is created
    sid = getSid();
  } while (sessionStore.has(sid));

  // //POSSIBLE ITERATION-currently we do not have "roles" property
  //  // const roles = getUserRoles(username)
  //  // roles property add to sessionStore once getUserRoles created

  const data: SessionInfo = {
    username
  };

  sessionStore.set(sid, {
    ...data,
    invalidAt: maxAge
  });
  return sid;
}


//gets session from sessionStore, if not in store, adds to it
export function getSession(sid: Sid): SessionInfo | undefined {
  //if session present in sessionStore
  if (sessionStore.has(sid)) {
    return sessionStore.get(sid);
  } else {
    /* 
      // TODO/ITERATION: get session from browser on frontend and store in session store
      // const session = sessionStorage.getItem(username)
      // if (session) {
      //   sessionStore.set(sid, session);
      //   return session;
      // }
    */
  }
  //if no session, return undefined
  return undefined;
}

//deletes session from sessionStore
export function deleteSession(sid: string): void {
  sessionStore.delete(sid);
  /*
    // // TODO/ITERATION: remove session from browser storage
    // // sessionStorage.removeItem(username);
    // // localStorage.removeItem(username);
  */
}

/*
  // TODO/ITERATION: send back to frontend to store in browser
  // export function setBrowserSession(sid: string, username: string) {
  //   sessionStorage.setItem(username, sid);
  //   localStorage.setItem(username, sid);
  // }
*/