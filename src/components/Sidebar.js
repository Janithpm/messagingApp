import React, {useState, useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined'
import {Avatar, IconButton} from '@material-ui/core'
import SidebarThread from './SidebarThread'
import './Sidebar.css'
import { PhoneOutlined, QuestionAnswerOutlined, Settings } from '@material-ui/icons'
import db, {auth} from '../Firebase'
// import {useSelector} from 'react-redux'
// import {selectUser} from '../features/counter/userSlice'
function Sidebar() {

    // const user = useSelector(selectUser)
    const [threads, setThreads] = useState([])

    useEffect(()=>{
        db.collection('threads').onSnapshot((snapshot)=>setThreads(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),

        }))))
    },[])

    const addTread = () =>{
        const threadName = prompt('Enter a thread name')
        if(threadName){
            db.collection('threads').add({
                threadName:threadName,
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className='sidebarHeader'>
                <div className='sidebarSearch'>
                    <SearchIcon className='sidebarSearchIcon'/>
                    <input placeholder='Search' className='sidebarSearchInput'></input>
                </div>
                    <IconButton veriant='outliend' id='siderbarButton' >
                        <BorderColorOutlinedIcon onClick={addTread}/>
                    </IconButton>
            </div>
            <div className='sidebarTreads'>
                {threads.map(({id, data: {threadName}})=>{
                    return(
                    <SidebarThread key={id} id={id} threadName={threadName}/>)
                    })}
               
           
            </div>
            <div className='sidebarFooter'>
                <Avatar className='sidebarFooter__avatar' onClick={()=> auth.signOut()}/>
                <IconButton className='IconButton'>
                    <PhoneOutlined/>
                </IconButton>
                <IconButton className='IconButton'>
                    <QuestionAnswerOutlined/>
                </IconButton>
                <IconButton className='IconButton'>
                    <Settings/>
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar
