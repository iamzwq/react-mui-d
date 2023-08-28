import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from "axios";
import { useSessionStore } from "~/stores";
import router from "~/router";
import utils from ".";

declare module "axios" {
  export interface AxiosRequestConfig {
    showSpinner?: boolean;
  }
}

class Request {
  private instance: AxiosInstance;
  private abortControllerMap: Map<string, AbortController>;

  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    // Initializes the Map that holds the cancel request controller
    this.abortControllerMap = new Map();

    // Pre-request interception, handling some specific logic, including showing request indicators and adding
    // the authentication token to the request header.
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // show Spinner indicators
        // if (config.showSpinner !== false) {
        //   this.spinnerNum++;
        //   // useGlobalStore.setState(() => ({ showSpinner: true }))
        // }

        if (config.url !== "/v1/session") {
          const session = useSessionStore.getState().session;
          const token = session.accessToken;
          if (token) {
            config.headers["x-auth"] = token; // add token data to header for each request after login successfully
          }
          const version = session.serverVersion;
          if (version) {
            config.headers["Access-Control-Expose-Headers"] = "version";
            config.headers["version"] = version; // Add the version to the request if we have a version
          }
        }

        // Stores the cancel request controller
        const controller = new AbortController();
        config.signal = controller.signal;
        this.abortControllerMap.set(config.url || "", controller);

        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );

    // Handles the app specific logic for responding to an ajax response, including hiding ajax indicators
    // addressing any non 200 statuses from the response.
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // After the request is successful, the storage cancel request controller is deleted
        this.abortControllerMap.delete(response.config.url || "");

        return response;
      },
      error => {
        // Network Error
        if (!error.response) {
          const message = error.message || "Network Error";
          utils.message.error(message);
          return;
        }

        // you can do something with response error
        let message = error.response.data || error.message || "Unknown error";
        const status = error.response.status;
        switch (status) {
          case 401: {
            message = "Identity invalid, please login again!";
            useSessionStore.getState().resetSession(); // reset session
            const { pathname, search } = window.location;
            // window.location.href = `/login?redirect=${pathname}${search}`;
            router.navigate(`/login?redirect=${pathname}${search}`, { replace: true }); // redirect to login page
            break;
          }
          case 426: {
            // new server version
            // TODO: show a dialog to ask user to refresh the page
            message = "There is a new version, please log in again to update.";
            setTimeout(() => {
              const { pathname, search } = window.location;
              router.navigate(`/login?redirect=${pathname}${search}`, { replace: true }); // redirect to login page
            }, 2000);
            break;
          }
          default:
            break;
        }
        utils.message.error(message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Cancels the specified request
   * @param url The request URL to cancel
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }

  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request(config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config);
  }
}

const request = new Request({
  timeout: 1000 * 60 * 5,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  baseURL: window.env?.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL
});

export default request;
