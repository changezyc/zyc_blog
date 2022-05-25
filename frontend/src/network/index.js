import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:7001/';
export default function setAxios() {
  const token = localStorage.getItem('getToken')
  //请求拦截
  axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${token}`
      if (token) {
        // 将token设置在headers ['Authorization'] 上面
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    }
  )
}