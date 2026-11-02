import React from 'react'
import { useNavigate,Link } from 'react-router'


const Register = () => {
    const navigate=useNavigate()

    const Submithandler = (e) => {
        e.preventDefault()
    }
    return (


        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={Submithandler}>
                    <div className='input-group'>
                        <label htmlFor="Name">Name</label>
                        <input type="text" id='Name' name='Name' placeholder='enter the Name' />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' name='email' placeholder='enter the email' />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' placeholder='enter the Password' />
                    </div>

                    <button className='button primary-button active' >Register</button>
                </form>

                <p>Alredy have an account <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register