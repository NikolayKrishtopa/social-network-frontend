import React from 'react';
import s from './UserCard.module.scss';
import { UserCardsProps } from './UserCard.props';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { addUserToFriends, removeUserFromFriends } from '../../store/slices/usersSlice';
import { Link } from 'react-router-dom';

export default function UserCard(props: UserCardsProps){
  const {name, avatar, _id} = props.user;
  const {currentUser} = useAppSelector(state => state.auth);
  const isFriend = currentUser?.friends.includes(_id);

  const dispatch = useAppDispatch();

  const addFriend = () => {
    dispatch(addUserToFriends(_id));
  };

  const removeFriend = () => {
    dispatch(removeUserFromFriends(_id));
  };

  return(
    <li className={s.card}>
      <Link to={`/${_id}`}>
        <div className={s.imgContainer}>
          <img src={avatar} alt={name} className={s.img} />
        </div>
      </Link>
      <h3 className={s.title}>{name}</h3>
      <button 
        className={isFriend ? s.btnFriend : s.btnDefault}
        onClick={isFriend ? removeFriend : addFriend}
      >
        {isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}
      </button>
    </li>
  );}