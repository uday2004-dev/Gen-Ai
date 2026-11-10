import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
    const navigate=useNavigate()
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const {loading,handleRegister}=useAuth()

    const Submithandler = async(e) => {
        e.preventDefault()
        await handleRegister({userName,email,password})
        navigate("/")

    }

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
    return (


        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={Submithandler}>
                    <div className='input-group'>
                        <label htmlFor="Name">Name</label>
                        <input
                         type="text" 
                         id='Name' 
                         value={userName}
                         name='Name' 
                         placeholder='enter the Name'
                         onChange={(e)=>setUserName(e.target.value)}
                         />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input 
                        type="text" 
                        id='email' 
                        value={email}
                        name='email' 
                        placeholder='enter the email'
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id='password' 
                        value={password}
                        name='password'
                         placeholder='enter the Password'
                         onChange={(e)=>{setPassword(e.target.value)}}
                          />
                    </div>

                    <button className='button primary-button active' >Register</button>
                </form>

                <p>Alredy have an account <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register