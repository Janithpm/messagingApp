import React from 'react'
import {Button} from '@material-ui/core'
import {auth, provider} from '../Firebase'
import './Login.css'
function Login() {

    const signIn = () =>{
        auth.signInWithPopup(provider).catch((error) => alert(error.message))
    }

    return (
        <div className='login'>
            <div className='loginApp'>
                <h2>MsgApp</h2>
                <Button onClick={signIn}>Sign In</Button>
            </div>            
        </div>
    )
}

export default Login
