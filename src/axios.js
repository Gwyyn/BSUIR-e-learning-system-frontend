import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001'
});

instance.interceptors.request.use((confing)=>{
    confing.headers.Authorization = window.localStorage.getItem('token')
    return confing;
})

export default instance