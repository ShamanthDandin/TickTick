import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

const Login = (props) => {

    const [authCreds, setauthCreds] = useState({ email: "", password: "" })
    const history = useHistory()
    const { setusername } = useContext(NoteContext)

    const handleOnChange = (event) => {
        setauthCreds({
            ...authCreds,
            [event.target.type]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authCreds.email,
                password: authCreds.password
            })
        })

        const json = await response.json()
        if (json.authToken) {
            // redirect
            localStorage.setItem('authToken', json.authToken)
            setusername(json.username)
            history.push('/')
        }
        else {
            props.showAlert('Invalid credentials entered', 'danger')
        }
    }

    return (
        <div className="container my-5">
            <h1>Login</h1>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label customLabel">Email</label>
                    <input onChange={handleOnChange} value={authCreds.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label customLabel">Password</label>
                    <input onChange={handleOnChange} value={authCreds.password} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login