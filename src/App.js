import React from 'react';
import {useEffect} from 'react'
// import { Counter } from './features/counter/Counter';
import './App.css';
import MainInterface from './components/MainInterface'
import Login from './components/Login'
import {auth} from './Firebase'
import {useSelector, useDispatch} from 'react-redux'
import {login, logout, selectUser} from './features/counter/userSlice'
function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          email:authUser.email,
          displayName:authUser.displayName,
          photo:authUser.photoURL

        }))
      }
      else{
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className="App">
      {/* <MainInterface/> */}
      {user ? <MainInterface/> : <Login/>}
    </div>
  );
}

export default App;
