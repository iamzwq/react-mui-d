import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Session {
  acl?: string[]; // Domain access control list
  email?: string; // the authenticated user's email
  name?: string; // The authenticated user's full name
  username?: string; // The authenticated user's username
  userId?: number; // The authenticated user's user id
  accessToken?: string; // The authentication token which asserts this client has passed authentication
  roles?: { id: number; role_id: number; name: string }[]; // user roles
  isClientFilter?: boolean; // Indicate whether the user is a client filter
  clients?: any[]; // ClientIDs of the clients that the user manages
  isTeamMember?: any[]; // If current user is team member
  serverVersion?: string; // Web service version
  newServerVersion?: boolean; // Indicate whether the UI need to be refreshed due to new server version being deployed
  releaseVersion?: string; // Release version number
  isNew?: boolean; // Whether it is a new user
}

type State = {
  session: Session;
};

type Actions = {
  setSession: (session: Session) => void;
  resetSession: () => void;
};

const useSessionStore = create<State & Actions>()(
  persist(
    set => ({
      session: {},
      setSession: (session: Session) => set(() => ({ session })),
      resetSession: () => set(() => ({ session: {} }))
    }),
    {
      name: "session"
    }
  )
);

export default useSessionStore;
