import React from 'react';
import './MainInterface.css';
import Sidebar from './Sidebar'
import Thread from './Thread'
function MainInterface() {
  return (
    <div className="mainInterface">
     <Sidebar/>
     <Thread/>
    </div>
  );
}

export default MainInterface;
