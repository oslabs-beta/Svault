export type SessionInfo = {
    username: string;
    //roles: string[];
  };
  
export type SessionInfoCache = SessionInfo & {
  invalidAt: number;
};