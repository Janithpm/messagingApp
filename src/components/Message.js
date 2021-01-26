import React from 'react'
import './Message.css'
import {useSelector } from 'react-redux'
import {selectUser} from '../features/counter/userSlice'
import {Avatar} from '@material-ui/core'


function Message({id, data}) {
    const user = useSelector(selectUser)
    return (
        <div className={`message ${user.email === data.email && `messageSender`}`}>
            <Avatar src={data.photo} className='messagePhoto'/>
            <div className='messageContent'>
                <p>{data.message}</p>
                <small>{new Date(data.timestamp?.toDate()).toLocaleString()}</small>            
            </div>
        </div>
    )
}

export default Message
