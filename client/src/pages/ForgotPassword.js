import React, {useState} from 'react'
// import BreadCrumb from '../components/BreadCrumb'
// import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordToken } from '../features/auth/authSlice'

const ForgotPassword = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const [enteredEmail, setEnteredEmail] = useState(null)

    const handleChange = (e) => {
        setEnteredEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(enteredEmail)
        dispatch(forgotPasswordToken(enteredEmail))
    }

   return (
      <>
         {/* <Meta title={"Forgot Password"} />
         <BreadCrumb title="Forgot Password" /> */}
         <div className="login-wrapper py-5 home-wrapper-2">
            <div className="row">
               <div className="col-12">
                  <div className="auth-card">
                     <h3 className='text-center mb-3'>Reset Your Password</h3>
                     <p className="text-center mt-2 mb-3">We will send you an email to reset your password</p>
                     <form action="" onSubmit={handleSubmit} className='flex flex-column gap-15'>
                        <input
                           type="email"
                           name="email"
                           placeholder="Email"
                           value={enteredEmail}
                           onChange={handleChange}
                        //    onBlur={handleBlur}
                        />

                        <div>
                           <div className="mt-3 flex justify-content-center gap-15 flex-column items-center">
                              <button className='button border-0' type='submit'>Submit</button>
                              <Link to='/login'>Cancel</Link>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default ForgotPassword