import { api } from "../services/api";
export const initCsrf = () => api.csrf();
