// 封装axios

// import axios from "axios";
// //axios.defaults.baseURL = "/api"

// //请求拦截器 在请求头中加token
// axios.interceptors.request.use(
//     config => {
//         if(localStorage.getItem('token')){
//             config.headers.token = localStorage.getItem('token');
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

// export default request;