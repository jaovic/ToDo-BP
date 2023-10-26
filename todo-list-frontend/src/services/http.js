import Axios from 'axios'

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'content-type': 'application/json'
    }
})

export default axiosInstance