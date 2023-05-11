import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getUsers, getFriends } from '../../store/slices/usersSlice';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import UserCard from '../../components/UserCard/UserCard';
import s from './Users.module.scss';
import Header from '../../components/Header/Header';
import cn from 'classnames';

export default function Users() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [mode, setMode] = useState<'all' | 'friends'>('all');
  let queryTimeOut: NodeJS.Timeout;

  const debounce = (e: any) => {
    clearTimeout(queryTimeOut);
    queryTimeOut = setTimeout(() => {
      dispatch(getUsers(e.target.value));
    }, 500);
  };

  useEffect(() => {
    mode === 'all' ? dispatch(getUsers()) : dispatch(getFriends());
  }, [mode]);
  return (
    <ProtectedRoute protectFrom='unlogged'>
      <>
        <Header />
        <section className={s.section}>
          <div className={s.nav}>
            <div className={s.btns}>
              <button className={cn(s.btn, {[s.active]: mode==='all'})} onClick={()=>setMode('all')}>Все пользователи</button>
              <button className={cn(s.btn, {[s.active]: mode==='friends'})} onClick={()=>setMode('friends')}>Друзья</button>
            </div>
            <input type="text" placeholder='Поиск...' className={s.input} onChange={debounce}/>
          </div>
          <ul className={s.container}>
            {users.map((u) => (
              <UserCard key={u._id} user={u} />
            ))}
          </ul>
        </section>
      </>
    </ProtectedRoute>
  );
}
