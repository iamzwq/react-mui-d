import request from "~/utils/request";

const preferenceApi = {
  fetchPreference: (params: any) => request.post("/v1/personalization", params)
};

export default preferenceApi;
