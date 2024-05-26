import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

const Signup = (props) => {

    const [authCreds, setAuthCreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    const history = useHistory()
    const { setusername } = useContext(NoteContext)

    const handleOnChange = (event) => {
        setAuthCreds({
            ...authCreds,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (authCreds.password !== authCreds.cpassword) {
            props.showAlert('Passwords do not match', 'danger')
        }

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: authCreds.name,
                email: authCreds.email,
                password: authCreds.password
            })
        })
        const json = await response.json()
        if (json.authToken) {
            localStorage.setItem('authToken', json.authToken)
            setusername(json.username)
            history.push('/')
        }
        else {
            props.showAlert('Invalid credentials entered', 'danger')
            setAuthCreds({ name: "", email: "", password: "", cpassword: "" })
        }
    }

    return (
        <div className="container my-5">
            <h1>Signup</h1>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label customLabel">Name</label>
                    <input onChange={handleOnChange} minLength={3} required={true} name="name" value={authCreds.name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleemail" className="form-label customLabel">Email</label>
                    <input onChange={handleOnChange} name="email" value={authCreds.email} type="email" className="form-control" id="exampleemail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label customLabel">Password</label>
                    <input onChange={handleOnChange} name="password" minLength={5} required={true} value={authCreds.password} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label customLabel">Confirm Password</label>
                    <input onChange={handleOnChange} minLength={5} required={true} name="cpassword" value={authCreds.cpassword} type="password" className="form-control" id="exampleInputPassword2" />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
