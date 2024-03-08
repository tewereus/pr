// when private route is clicked it redirects to login then goes to hom page after user is logged in not back to the private route

import {Navigate} from "react-router-dom"
export const PrivateRoutes = ({children})=>{
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to="/login" replace={true} />)
}