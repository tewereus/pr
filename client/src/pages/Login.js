import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {login} from '../features/auth/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const dispatch = useDispatch()
   const navigate = useNavigate();

    const [enteredValue, setEnteredValue] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setEnteredValue({
            ...enteredValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        dispatch(login(enteredValue))
        
    }
    const authState = useSelector((state) => state.auth);
    const { user, isLoading, isError, isSuccess, message } = authState;
    useEffect(() => {
        if (isSuccess) {
            toast.success(message)
           navigate('/')
        }
        if (isError) {
            toast.error(message)
           navigate('')
        }
        else {
           navigate('')
        }
     }, [isSuccess, isError])
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" value={enteredValue.email} onChange={ handleInputChange} name="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" value={enteredValue.password} onChange={ handleInputChange} name="password" id="password" />
            <button type="submit">submit</button>
        </form>
    </>
  )
}

export default Login