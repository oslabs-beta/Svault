//We will use a simple in-memory store to store session information. In a big production app you might want to use a cache like Redis.
import { randomBytes } from 'node:crypto';
// import { getUserRoles } from '../db';

// roles: string[] --- add in to SessionInfo once you have getUserRoles created

type SessionInfo = {
  username: string;
  invalidAt: number;
};
type Sid = string;

const sessionStore = new Map<Sid, SessionInfo>();
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
  nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
}

export function createSession(username: string, maxAge: number): string {
  let sid: Sid = '';

  do {
    sid = getSid();
  } while (sessionStore.has(sid));

  // const roles = getUserRoles(username)
  // roles proper add to sessionStore once getUserRoles created
  sessionStore.set(sid, {
    username,
    invalidAt: Date.now() + maxAge,
  });
  return sid;
}

if (Date.now() > nextClean) {
  //call in setTimeout to not block the server
  setTimeout(() => {
    clean();
  }, 5000);
}

export function getSession(sid: Sid): SessionInfo | undefined {
  const session = sessionStore.get(sid);
  if (session) {
    //if a session exists, check if it is valid
    //if invalid, delete it
    if (Date.now() > session.invalidAt) {
      console.log('delete invalid session', sid);
      sessionStore.delete(sid);
      return undefined;
      //if valid, return session
    } else {
      console.log(sid);
      return session;
    }
    //if no session, return undefined
  } else {
    console.log('session not found', sid);
    return undefined;
  }
}
