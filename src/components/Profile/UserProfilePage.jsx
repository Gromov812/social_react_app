import React, { useState, useEffect } from 'react'
import ph from './Profile-head.module.css';


function UserProfilePage({ setActive, profilePic, status, photo, fullName, contacts, aboutMe, isFriend, ownerId, userId, followUser, unfollowUser }) {
  const [upd, setUpd] = useState(false);
  useEffect(() => {
    setUpd(isFriend);
  }, [isFriend])
  console.log(`render`, upd, isFriend);
  return (
    <>
      <div className={ph.profile__pic}>
        <img src={profilePic || "https://cdn.huckletree.com/web-uploads/2018/10/23094022/OS-Blog-Header-32.png"} alt="" srcset="" />
      </div>
      <div className={ph.profile_info}>
        <div className={ph.avatar}>
          <img src={photo || 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-256.png'} alt="ava" height="80" />
          <button 
          className={`${ph.button} ${ph.send_message}`}
          onClick={() => {
            setActive(userId, fullName, photo)
          }}>
          Send Message
          </button>

          <button 
          className={upd ? 
          `${ph.button} ${ph.remove_friend}` 
          : 
          `${ph.button} ${ph.add_friend}`} 
          onClick={() => 
          {
            upd ? unfollowUser(ownerId, userId) : followUser(ownerId, userId);
            setUpd(!upd)
          }}>
          {upd ? 'Remove from friend' : 'Add to friend'}
          </button>

        </div>

        <div className={ph.profile_text}>
          <h2 className={ph.name}>{fullName}</h2>
          <p>Status: {status}</p>
          <div className={ph.profile_content}>
            <p>Age: {aboutMe.age}</p>
            <p>Gender: {aboutMe.gender}</p>
            <p>FB: {contacts.facebook}</p>
            <p>VK: {contacts.vk}</p>
            <p>Twitter: {contacts.twitter}</p>
            <p>GitHub: {contacts.github}</p>
            <p>City: {aboutMe.city}</p>
            <p>Edu: High grade</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfilePage

