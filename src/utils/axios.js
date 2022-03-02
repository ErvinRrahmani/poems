import Axios from "axios";

const axios = Axios.create({
    // Base URL
    baseURL: 'https://poetrydb.org/',
});

export default axios;
