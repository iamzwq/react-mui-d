import request from "~/utils/request";

const homeApi = {
  fetchAllFilters: () => request.get<{ default_filter: any }>("/v1/filters"),
  fetchDashboardGroups: (params: any) => request.post("/v1/dashboard/groups", params),
  fetchDashboardJobs: (params: any) => {
    params.filter.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return request.post("/v1/dashboard/groups/jobs", params);
  },
  fetchDashboardCollapsedJobs: (params: any) => {
    params.filter.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return request.post("/v1/dashboard/groups/collapsed_jobs", params);
  }
};

export default homeApi;
