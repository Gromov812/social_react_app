import React from 'react'
import './Preloader.css'



 function Preloader() {
    

    return (
    <>
       <PreloaderBlock key={1} />
       <PreloaderBlock key={2}/>
       <PreloaderBlock key={3}/>
       </>
    )
}

function PreloaderBlock () {
    return (
        <div className="user_profile">
        <div className="right_side">
            <div className="user_avatar">
            <div className="circle" />
            </div>
            <div className="user_name">
            <div className="short_line" />
            </div>
        </div>
        <div className="left_side">
        <div className="long_line" />
        <div className="long_line" />
        <div className="long_line" />
        </div>
    </div>
    )
}

export default Preloader;

