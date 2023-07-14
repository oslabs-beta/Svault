// We will use a simple in-memory store to store session information. In a big production app you might want to use a cache like Redis.
import { randomBytes } from 'node:crypto';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
//import { sessionStorage }
import {
    deleteDbSession,
    deleteExpiredDbSessions,
    getDbSession,
    //getUserRoles,
    insertDbSession,
  } from '../db/index.ts';
  import type { SessionInfo, SessionInfoCache } from '../db/types.ts';

  
    // type aliases for SessionInfo and SessionInfoCache--> 
    // type SessionInfo = {
    //   username: string;
    //   //roles: string[]; //not being used currently
    // };
    
    // type SessionInfoCache = SessionInfo & {
    //   invalidAt: number;
    // };
  
 
//  table also available in excalidraw
//  sessions SQL table:
//     ses_id: varchar NOT NULL PK,
//     ses_created: timestamp without timezone NOT NULL DEFAULT now(),
//     ses_expires: integer NOT NULL,
//     ses_data: varchar NOT NULL
  

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
  //deleteExpiredDbSessions(now);
  nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
}

//calls clean() function if it has been over 1 hour to delete expired sessions in db
if (Date.now() > nextClean) {
  //call in setTimeout to not block the server
  setTimeout(() => {
    clean();
  }, 5000);
}

//invoked from makeCookieAndSession on login/nativeAuth.ts
export function createSession(username: string, maxAge: number): string {
  let sid: Sid = '';

  do {
    //generates random sid until a unique one is created
    sid = getSid();
  } while (sessionStore.has(sid));

  // POSSIBLE ITERATION-currently we do not have "roles" property
    // const roles = getUserRoles(username)
    // roles property add to sessionStore once getUserRoles created

  const data: SessionInfo = {
    username
  };

  sessionStore.set(sid, {
    ...data,
    invalidAt: maxAge
  });
  console.log('sessionStore:', sessionStore);
  return sid;
}


//gets session from sessionStore, if not in store, adds to it
export function getSession(sid: Sid): SessionInfo | undefined {
  //if session present in sessionStore
  if (sessionStore.has(sid)) {
    return sessionStore.get(sid);
  } else {
    //if session present on browser
    // sessionStorage.getItem()
    //sends to sessionStore from SessionInfoCache
    //const session = getDbSession(sid);
    // if (session) {
    //   sessionStore.set(sid, session);
    //   console.log('Tada, session', session)
    //   return session;
    // }
  }
  //if no session, return undefined
  console.log('session not found', sid);
  return undefined;
}

//deletes session from sessionStore
export function deleteSession(sid: string): void {
  sessionStore.delete(sid);
  //deleteDbSession(sid);
}

// export function setBrowserSession(sid: string, username: string) {
//   onMount(() => {
//     sessionStorage.setItem('test1', 'Developer');
//     localStorage.setItem('test2', 'local');
//     });
// }