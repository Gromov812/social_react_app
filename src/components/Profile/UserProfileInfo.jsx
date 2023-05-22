import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { usersAPI } from '../../DAL/api';
import ph from './Profile-head.module.css';
import uploadPic from '../../assets/img/upload_prof_pic.svg';
import uploadPicReady from '../../assets/img/upload_prof_pic_upload.svg';
import loadingCircle from '../../assets/img/loading.gif';
import { fetchAndDispatchAvatarThunkCreator, fetchAndDispatchProfilePicThunkCreator } from '../../redux/auth-reducer';


const UserProfileInfo = () => {
  let ref = useRef();
  let profPicRef = useRef();
  let statusText = useSelector(state => state.authReducer.userData.status);
  const ownerId = useSelector(state => state.authReducer.id);
  let [photo, setPhoto] = useState(false);
  let [profPic, setProfPic] = useState(false);
  let [loaderProfPic, setLoaderProfPic] = useState(false);
  let [loaderAvatar, setLoaderAvatar] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.userData);
  const cookie = new Cookies();
  const token = cookie.get('cookie localhost');


  function photoHandler(e) {
    e.preventDefault();
    setPhoto(e.target.files[0])
  }

  function profilePicUploadHandler(e) {
    e.preventDefault();
    setProfPic(e.target.files[0])
  }

  function onSubmitUploadProfPic(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', profPic);
    formData.append('id', ownerId);
    dispatch(fetchAndDispatchProfilePicThunkCreator(formData, setLoaderProfPic));
    setProfPic(false);
  }

  function onSubmitSettings(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', photo);
    formData.append('id', ownerId);
    dispatch(fetchAndDispatchAvatarThunkCreator(formData, setLoaderAvatar));
    setPhoto(false);
  }

  function updateUserStatusText(e) {
    return dispatch({ type: 'USER_STATUS_TEXT_HANDLER', statusText: e.target.value })
  }

  function setUserStatusText() {
    usersAPI.updateUsersStatus(token, ownerId, statusText).then(res => console.log(res))
  }

  return <>
    <div className={ph.profile__pic}>
    {loaderProfPic &&
        <div className={ph.loading_pic}>
          <img src={loadingCircle} className={ph.pic_loader} />
        </div>
      }
      <img src={userData.profilePic || "https://cdn.huckletree.com/web-uploads/2018/10/23094022/OS-Blog-Header-32.png"} alt="" srcset="" />
      {profPic ?
        <div onClick={(e) => (onSubmitUploadProfPic(e), setLoaderProfPic(true))} className={`${ph.profile__pic_changer} ${ph.green}`}><img className={ph.profile__pic_changer_pic} src={uploadPic} alt="" /></div>
        :
        <div onClick={() => profPicRef.current.click()} className={ph.profile__pic_changer}><img className={ph.profile__pic_changer_pic} src={uploadPicReady} alt="" /></div>
      }

      <input type="file" className={ph.hidden} accept='image/*, .png, .jpg, .jpeg' onChange={profilePicUploadHandler} ref={profPicRef} />
    </div>
    <div className={ph.profile_info}>

      <div className={ph.avatar}>
        {loaderAvatar &&
          <div className={ph.loading_pic}>
            <img src={loadingCircle} className={ph.pic_loader} />
          </div>
        }

        <img src={userData.photo || "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/200px-Circle-icons-profile.svg.png"} alt={userData.name} height="200" />
        {photo ?
          <div className={`${ph.upload_photo} ${ph.green}`} onClick={(e) => (onSubmitSettings(e), setLoaderAvatar(true))} >Upload on server</div>
          :
          <div className={ph.upload_photo} onClick={() => ref.current.click()} >Choose photo</div>
        }
        <input type="file" className={ph.hidden} accept='image/*, .png, .jpg, .jpeg' onChange={photoHandler} ref={ref} />
      </div>
      <div className={ph.profile_text}>
        <h2 className={ph.name}>{userData.name}</h2>
        <div><input className={ph.status} type="text" onBlur={setUserStatusText} onChange={updateUserStatusText} placeholder='Введите статус..' value={statusText} /></div>
        <div className={ph.profile_content}>
          <p><i>Contact email: {userData.email}</i></p>
          <p>City: {userData.info.city}</p>
          <p>Gender: {userData.info.gender}</p>
          <p>Age: {userData.info.age}</p>
        </div>
      </div>
    </div>
  </>
};

export default UserProfileInfo;