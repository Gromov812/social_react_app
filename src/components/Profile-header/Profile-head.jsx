import React from 'react';
import ph from './Profile-head.module.css';

const ProfileHead = () => {
    return <> 
    <div className={ph.profile_pic}></div>
    <div className={ph.profile_info}>
      <div className={ph.avatar}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/200px-Circle-icons-profile.svg.png" alt="ava" height="80" /></div>
      <div className={ph.profile_text}>
        <h2 className={ph.name}>Alex Alexov</h2>
        <div className={ph.profile_content}>
          <p>Was born in: 01.01.1970</p>
          <p>City of birth: Minsk</p>
          <p>Edu: High grade</p>
        </div>
      </div>
    </div>
    </>
};

export default ProfileHead;