import React, {useState, useEffect, useRef} from 'react'
import './Thread.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import SendRounded from '@material-ui/icons/SendRounded'
import { MicNoneOutlined, TimerOutlined } from '@material-ui/icons'
import firebase from 'firebase'
import db from '../Firebase'
import {useSelector} from 'react-redux'
import {selectThreadId, selectThreadName} from '../features/counter/threadSlice'
import {selectUser} from '../features/counter/userSlice'
import Message from './Message'

const Thread = () => {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const threadId = useSelector(selectThreadId)
    const threadName = useSelector(selectThreadName)
    const user = useSelector(selectUser)

    const dummy = useRef()

    const sendMessage =(e) => {


        e.preventDefault()
        db.collection('threads').doc(threadId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            uid:user.uid,
            photo:user.photo,
            email:user.email,
            displayName:user.displayName,

        })

        setInput('')
        dummy.current.scrollIntoView()
    }

    useEffect(()=>{
        if(threadId){
           db.collection('threads').doc(threadId).collection('messages').orderBy('timestamp', 'desc')
           .onSnapshot((snapshot)=> setMessages(
               snapshot.docs.map((doc)=>({
                   id:doc.id,
                   data:doc.data()
               }))
           ))
        }
    },[threadId])

    return (
            <div className='thread'>
                <div className='threadHeader'>
                    <div className='threadHeaderContent'>
                        <Avatar/>
                        <div className='threadHeaderContentInfo'>
                            <h4>{threadName}</h4>
                            <h5>Last Seen</h5>
                        </div>
                    </div>
                <IconButton>
                    <MoreHoriz className='threadHeaderDetails'>
                    </MoreHoriz>
                </IconButton>
                </div>
                <div className='threadMessage'>
                    {messages.map((message) => {
                        return(
                            <Message key={message.id} id={message.id} data={message.data}/>
                        )
                    })}
                </div>
                <div ref={dummy}></div>
                <div className='threadInput'>
                    <form>
                    <input placeholder='write a message...' type='textarea'value={input} onChange={(e)=>setInput(e.target.value)}></input>
                    <IconButton>
                        <TimerOutlined/>
                    </IconButton>
                    <IconButton onClick={sendMessage}>
                        <SendRounded/>
                    </IconButton>
                    <IconButton>
                        <MicNoneOutlined/>
                    </IconButton>
                    </form>
                </div>
            </div>
    )
}

export default Thread
