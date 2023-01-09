
import React from 'react';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

import './App.css';
import Wall from './components/Posts/Wall';
import Messages from './components/Messages/Messages';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {

  return <>
    <BrowserRouter>
      <Header />
      <main className="main">
        <Nav data={props.state.messagesPage.contactsData} />
        <div className="content">

          <Routes>
            <Route path="/" element={<Wall data={props.state.wallPage} addPost={props.addPost} updateLikes={props.updateLikes} editPost={props.editPost} />} />
            <Route path="/messages/*" element={<Messages data={props.state.messagesPage} />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  </>
}

export default App;
