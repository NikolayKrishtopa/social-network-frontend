import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Users from '../../pages/Users/Users';
import Posts from '../../pages/Posts/Posts';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import Main from '../../pages/Main/Main';

export default function App () {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>

  );
}