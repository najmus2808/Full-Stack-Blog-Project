/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL_PROD, BASE_URL_DEV } from "../config";

const instance = axios.create({
  baseURL: BASE_URL_PROD,
});

export default instance;
