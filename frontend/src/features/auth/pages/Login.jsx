import React from 'react'

const Login = () => {
  return (
 <main>
    <div className="form-container">
        <h1>Login</h1>
        <form>
            <input type="text" placeholder='email' />
            <input type="password" placeholder='password' />
        </form>
    </div>
 </main>
  )
}

export default Login