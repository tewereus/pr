import {base_url} from '../../api/axiosConfig'
import {config} from '../../api/axiosConfig'
import axios from 'axios'

const adminLogin = async (data) => {
    const response = await axios.post(`${base_url}/user/admin-login/517331692`, data)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data

}

const allUsers = async (data) => {
    const response = await axios.post(`${base_url}/user/all-users`, config)
    return response.data
}

const authService = {
    adminLogin,
    allUsers
}

export default authService