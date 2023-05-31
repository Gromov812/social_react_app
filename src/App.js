
import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import WallContainer from './components/Posts/WallContainer';
import Messages from './components/Messages/Messages';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import store from './redux/redux';
import { Provider, useSelector } from 'react-redux'
import Users from './components/Users/UsersContainer';
import UserProfilePageContainer from './components/Profile/UserProfilePageContainer';
import RegisterContainer from './components/Header/RegisterContainer';
import UserFriendsListContainer from './components/Friends/UserFriendsListContainer';
import ProfileSettingsContainer from './components/ProfileSettings/ProfileSettingsContainer';


function App() {




const [isOpenMenu, setIsOpenMenu] = useState(false);

return <>
<Provider store={store}>
    <BrowserRouter>
      <Header setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
      <main className="main">
        <Nav isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        <div className="content">
          <Routes>
            <Route path="/" element={<WallContainer/>} />
            <Route path="/messages/*" element={<Messages store={store} />} />
            <Route path="/users_list/*" element={<Users />} />
            <Route path="/friends/" element={<UserFriendsListContainer />} />
            <Route path="/user/:userId" element={<UserProfilePageContainer />} />
            <Route path="/register" element={<RegisterContainer />} />
            <Route path="/settings" element={<ProfileSettingsContainer />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
    </Provider>
  </>
}

export default App;
