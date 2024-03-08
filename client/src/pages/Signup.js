import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {register, messageClear} from "../features/auth/authSlice"
import {useNavigate} from 'react-router-dom'


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [enteredValue, setEnteredValue] = useState({
        fullname: '',
        username: '',
        password: '',
        mobile: '',
        email: ''
    })
    const formIsValid = false

    const handleInputChange = (e) => {
        setEnteredValue({
            ...enteredValue,
            [e.target.name]: e.target.value
        })
    }

    // if (enteredValue.password === confirmPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        dispatch(register(enteredValue))
    }

    const authState = useSelector((state) => state.auth)
    const {isSuccess} = authState

    useEffect(()=>{
        if(isSuccess){
            navigate('/login')
            dispatch(messageClear())
        }
        else{
            navigate('')
        }
    }, [isSuccess])


  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" value={enteredValue.fullname} onChange={handleInputChange} id="fullname" name="fullname" required />
        <label htmlFor="username">username</label>
        <input type="text" value={enteredValue.username} onChange={handleInputChange} id="username" name="username" required />
        <label htmlFor="email">Email</label>
        <input type="email" value={enteredValue.email} onChange={handleInputChange} id="email" name="email" required />
        <label htmlFor="mobile">Mobile</label>
        <input type="text" value={enteredValue.mobile} onChange={handleInputChange} id="mobile" name="mobile" required />
        <label htmlFor="password">Password</label>
        <input type="password" value={enteredValue.password} onChange={handleInputChange} id="password" name="password" required />
        {/* <label htmlFor="confirmPassword">Full Name</label>
        <input type="password" value={enteredValue.password} onChange={handleInputChange} id="confirmPassword" name="confirmPassword" required /> */}
        <button>Submit</button>
    </form>
  )
}

export default Signup