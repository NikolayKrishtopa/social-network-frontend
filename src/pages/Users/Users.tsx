import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getUsers, getFriends } from '../../store/slices/usersSlice';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import UserCard from '../../components/UserCard/UserCard';
import s from './Users.module.scss';
import Header from '../../components/Header/Header';

export default function Users() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [mode, setMode] = useState<'all' | 'friends'>('all');

  useEffect(() => {
    mode === 'all' ? dispatch(getUsers()) : dispatch(getFriends());
  }, [mode]);
  return (
    <ProtectedRoute protectFrom='unlogged'>
      <>
        <Header />
        <ul className={s.container}>
          {users.map((u) => (
            <UserCard key={u._id} user={u} />
          ))}
        </ul>
      </>
    </ProtectedRoute>
  );
}