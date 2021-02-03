import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {API_KEY, API_URL, AUTH_TOKEN_KEY, AUTH_URL} from "./constants";

const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
});

API.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const auth = config.url?.includes(AUTH_URL);
        let token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (!token && !auth) {
            token = (await getToken()).data.token;
            localStorage.setItem(AUTH_TOKEN_KEY, token!);
        }

        if (token && !auth) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => console.error(error)
);


API.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            localStorage.setItem(AUTH_TOKEN_KEY, (await getToken()).data.token);
        }
        return Promise.reject(error.response);
    }
);

async function getToken(): Promise<AxiosResponse> {
    return API.post(AUTH_URL, JSON.stringify(API_KEY), {headers: {'Content-Type': 'application/json'}});
}

export default API;
