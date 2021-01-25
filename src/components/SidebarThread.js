import { Avatar } from '@material-ui/core'
import React from 'react'
import {useState, useEffect} from 'react'

import './SidebarThread.css'
import {useDispatch} from 'react-redux'
import db from '../Firebase'
import firebase from 'firebase'
import {setThread} from '../features/counter/threadSlice'


const SidebarThread = ({id, threadName}) => {

    const dispatch = useDispatch()
    const [threadInfo, setThreadInfo] = useState()
    useEffect(()=>{
        db.collection('threads')
        .doc(id)
        .collection('messages')
        // .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot)=>
            setThreadInfo(snapshot.docs.map((doc)=>doc.data()))
        )
    },[id])
    return (
        <div className='sidebarThread' onClick={() =>
            dispatch(
                setThread({
                    threadId:id,
                    threadName:threadName
                })
            )
        }>
            <Avatar/>
            <div className='sidebarThread__details'>
                <h3>{threadName}</h3>
                <p>{id}</p>
                <small className='sidebarThread__timestamp'>timestamp</small>
            </div>
        </div>
    )
}

export default SidebarThread
