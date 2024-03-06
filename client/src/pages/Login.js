import React, {useState} from 'react'

const Login = () => {
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
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={enteredValue.email} onChange={() => handleInputChange()} name="email" id="email" />

            <label htmlFor="password">Password</label>
            <input value={enteredValue.password} onChange={() => handleInputChange()} name="password" id="password" />
        </form>
    </>
  )
}

export default Login