import {base_url} from '../../api/axiosConfig'
import axios from 'axios'

const adminLogin = async (data) => {
    const response = await axios.post(`${base_url}/user/admin/login`, data)
    if(response.data){
        return response.data
    }
}

const authService = {
    adminLogin
}

export default authService