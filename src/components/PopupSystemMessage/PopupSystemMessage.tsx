import React from 'react';
import { useEffect } from 'react';
import s from './PopupSystemMessage.module.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearSystMsgAuth } from '../../store/slices/authSlice';
import { clearSystMsgPosts } from '../../store/slices/postsSlice';
import { clearSystMsgUsers } from '../../store/slices/usersSlice';
import { PopupSystMsgProps } from './PopupSystemMessage.props';

export default function PopupSystemMessage(props: PopupSystMsgProps) {
  // ***OPTIONALMessage that could be recieved as props.
  const { externalSystMsg, clearExtSystMsg } = props;
  const dispatch = useAppDispatch();

  // System messages through the entire store
  const { systMsgAuth } = useAppSelector((state) => state.auth);
  const { systMsgPosts } = useAppSelector((state) => state.posts);
  const { systMsgUsers } = useAppSelector((state) => state.users);

  const externalSystMsgToShow = externalSystMsg ? externalSystMsg : '';

  const message =
    systMsgAuth + systMsgPosts + systMsgUsers + externalSystMsgToShow;

  const resetSystMsg = () => {
    dispatch(clearSystMsgPosts());
    dispatch(clearSystMsgAuth());
    dispatch(clearSystMsgUsers());
    clearExtSystMsg && clearExtSystMsg();
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      resetSystMsg();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);
  return (
    <div
      className={cn(s.popup, { [s.active]: message })}
      onClick={resetSystMsg}
    >
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        <p className={s.text}>{message}</p>
        <div className={s.bar}></div>
      </div>
    </div>
  );
}
