import axios from "axios";
import { url } from "../constant/constant";

const axiosFetch = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default axiosFetch;
