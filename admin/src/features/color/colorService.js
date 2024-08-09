import { base_url, config } from "../../api/axiosConfig";
import axios from "axios";

const addColor = async (data) => {
    const response = await axios.post(`${base_url}/colors/create-color`, data)
    return response.data
}

const getAllColors = async () => {
    const response = await axios.get(`${base_url}/colors/all-colors`)
    return response.data
}

const updateColor = async (id) => {
    const response = await axios.put(`${base_url}/colors/${id}`)
    return response.data
}

const deleteColor = async (id) => {
    const response = await axios.delete(`${base_url}/colors/delete/${id}`)
    return response.data
}

const deleteAllColors = async () => {
    const response = await axios.delete(`${base_url}/colors/delete-all`)
    return response.data
}

const colorService = {
    addColor,
    getAllColors,
    updateColor,
    deleteColor,
    deleteAllColors
}

export default colorService