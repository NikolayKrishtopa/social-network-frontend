import React from 'react';
import Header from '../../components/Header/Header';
import s from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../store/slices/authSlice';

import SpinnerLds from '../../components/UI/SpinnerLds/SpinnerLds';
import PopupSystemMessage from '../../components/PopupSystemMessage/PopupSystemMessage';

import { type LayoutProps } from './Layout.props';
import cn from 'classnames';



export default function Layout (props: LayoutProps) {
  const dispatch = useAppDispatch();
  const isPostsLoading = useAppSelector((state) => state.posts).isLoading;
  const isUsersLoading = useAppSelector((state) => state.users).isLoading;
  const isAuthLoading = useAppSelector((state) => state.auth).isLoading;

  const isLoading =
    isPostsLoading || isUsersLoading || isAuthLoading;

  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);


  const { children, withHeader } = props;

  return (    
    <div className={cn(s.base, { [s.noScroll]: scrollLocked })}>
      <div className={s.page}>
        {withHeader && <Header onSideBarOpen={setScrollLocked} />}
        <PopupSystemMessage />
        {isLoading && <SpinnerLds />}
        <>
          {children}
        </>
      </div>
    </div>

  );
}
