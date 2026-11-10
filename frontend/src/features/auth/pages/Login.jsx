import React, { useState } from 'react'
import "../auth.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

const {loading,handleLogin}=useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    // const Submithandler = async(e) => {
    //     e.preventDefault()
    //     handleLogin({email,password})
    //     navigate("/")
    // }


const Submithandler = async (e) => {
    e.preventDefault();

    try {
        const data = await handleLogin({ email, password });

        if (data?.user) {
            navigate("/", { replace: true });
        }

    } catch (error) {
        console.log("Login failed:", error);
    }
};

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={Submithandler}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" id='email' name='email' placeholder='enter the email' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id='password' name='password' placeholder='enter the Password' />
                    </div>
                    <button className='button primary-button active'>Login</button>
                </form>

                <p>Alredy have an account <Link to={"/register"}>Register</Link></p>

            </div>
        </main>
    )
}

export default Login