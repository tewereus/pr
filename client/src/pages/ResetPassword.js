import React, {useState} from 'react'
// import BreadCrumb from '../components/BreadCrumb'
// import Meta from '../components/Meta'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { resetPassword } from '../features/auth/authSlice'


const Resetpassword = () => {
   const location = useLocation()
   const getToken = location.pathname.split('/')[2]
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [enteredPassword, setEnteredPassword] = useState("")

   const handleChange = (e) => {
      setEnteredPassword(e.target.value)
   }

   const handleSubmit = (e) => {
      dispatch(resetPassword({ token: getToken, password: enteredPassword }))
      navigate('/login')
   }


   return (
      <>
         {/* <Meta title={"Reset Password"} />
         <BreadCrumb title="Reset Password" /> */}
         <div class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
               <div className="col-12">
                  <div className="auth-card">
                     <h3 className='text-center mb-3'>Reset Password</h3>
                     <form action="" onSubmit={handleSubmit} className='d-flex flex-column gap-15'>
                        <input
                           type="password"
                           name="password"
                           placeholder="Password"
                           value={enteredPassword}
                           onChange={handleChange}
                           // onBlur={formik.handleBlur('password')}
                        />

                        <div>
                           <div className="mt-3 d-flex justify-center gap-15 items-center">
                              <button className='button border-0'>Reset</button>
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

export default Resetpassword