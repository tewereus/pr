import React, {useState} from 'react'

const Signup = () => {
    const [enteredValue, setEnteredValue] = useState({
        fullname: '',
        username: '',
        password: '',
        mobile: '',
        email: ''
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
        
    }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" value={enteredValue.fullname} onChange={handleInputChange} id="fullname" name="fullname" required />
        <label htmlFor="username">username</label>
        <input type="text" value={enteredValue.username} onChange={handleInputChange} id="username" name="username" required />
        <label htmlFor="email">Full Name</label>
        <input type="email" value={enteredValue.email} onChange={handleInputChange} id="email" name="email" required />
        <label htmlFor="mobile">Full Name</label>
        <input type="text" value={enteredValue.mobile} onChange={handleInputChange} id="mobile" name="mobile" required />
        <label htmlFor="password">Full Name</label>
        <input type="password" value={enteredValue.password} onChange={handleInputChange} id="password" name="password" required />
        <label htmlFor="confirmPassword">Full Name</label>
        <input type="password" value={enteredValue.password} onChange={handleInputChange} id="confirmPassword" name="confirmPassword" required />
    </form>
  )
}

export default Signup