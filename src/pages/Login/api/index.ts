import request from "~/utils/request";

export interface LoginParams {
  username: string;
  password: string;
}

export interface User {
  access_control_lists: string[];
  email: string;
  name: string;
  username: string;
  userId: number;
  personalization: any[];
  roles: Array<{ id: number; role_id: number; name: string }>;
  is_client_filter: boolean;
  clients: any[];
  is_team_member: any[];
  isNew: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

const loginApi = {
  login: (params: LoginParams) => {
    return request.post<LoginResponse>("/v1/session", params);
  }
};

export default loginApi;
