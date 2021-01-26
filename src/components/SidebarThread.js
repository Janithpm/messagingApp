import { Avatar } from '@material-ui/core'
import React from 'react'
import {useState, useEffect} from 'react'

import './SidebarThread.css'
import {useDispatch} from 'react-redux'
import db from '../Firebase'
import {setThread} from '../features/counter/threadSlice'


const SidebarThread = ({id, threadName}) => {

    const dispatch = useDispatch()
    const [threadInfo, setThreadInfo] = useState([])
    useEffect(()=>{
        db.collection('threads')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
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
            <Avatar src={threadInfo[0]?.photo}/>
            <div className='sidebarThread__details'>
                <h3>{threadName}</h3>
                <p>{threadInfo[0]?.email}</p>
                <small className='sidebarThread__timestamp'>{new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}</small>
            </div>
        </div>
    )
}

export default SidebarThread
