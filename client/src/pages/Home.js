import React, {useState} from 'react'
import TwoFactorAuth from "./TwoFactorAuth"


const Home = () => {
  const [twoFactor ,setTwoFactor] = useState(false)
  const enableTwoFactorAuth = () => {
    setTwoFactor((prev) => !prev)
  }
  return (
    <>
      <div>Home</div>
      <button onClick={enableTwoFactorAuth}>Two factor auth</button>
      {twoFactor && <TwoFactorAuth />}
    </>
  )
}

export default Home