import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from '../../pages/Users/Users';
import Posts from '../../pages/Posts/Posts';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import Main from '../../pages/Main/Main';
import NotFound from '../../pages/NotFound/NotFound';
import '../../index.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../store/slices/authSlice';
import s from './App.module.scss';
import SpinnerLds from '../../components/UI/SpinnerLds/SpinnerLds';
import PopupSystemMessage from '../../components/PopupSystemMessage/PopupSystemMessage';
import '../../index.scss';

import cn from 'classnames';

export default function App() {
  const dispatch = useAppDispatch();
  const isPostsLoading = useAppSelector((state) => state.posts).isLoading;
  const isUsersLoading = useAppSelector((state) => state.users).isLoading;
  const isAuthLoading = useAppSelector((state) => state.auth).isLoading;
  const { currentUser } = useAppSelector((state) => state.auth);

  const isLoading = isPostsLoading || isUsersLoading || isAuthLoading;

  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    if (document.cookie.indexOf('jwt') === -1) return;

    dispatch(checkAuth());
  }, []);
  return (
    <div className={cn(s.base, { [s.noScroll]: scrollLocked })}>
      <div className={s.page}>
        <PopupSystemMessage />
        {isLoading && <SpinnerLds />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/users' element={<Users />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/login' element={<Auth mode='login' />} />
          <Route path='/register' element={<Auth mode='register' />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/:userId' element={<Profile />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
