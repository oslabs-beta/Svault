export type SessionInfo = {
    username: string;
    // // TODO/ITERATION: add 'roles' for authorization
    //roles: string[];
  };
  
export type SessionInfoCache = SessionInfo & {
  invalidAt: number;
};