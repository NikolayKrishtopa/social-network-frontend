import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from '../../pages/Users/Users';
import Posts from '../../pages/Posts/Posts';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import Main from '../../pages/Main/Main';
import NotFound from '../../pages/NotFound/NotFound';
import '../../index.scss';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/users' element={<Users />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/login' element={<Auth mode='login' />} />
      <Route path='/register' element={<Auth mode='register' />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}
