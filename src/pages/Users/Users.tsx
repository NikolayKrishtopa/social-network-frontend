import React, { useEffect, useState } from 'react';
import Layout from '../../hok/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getUsers, getFriends } from '../../store/slices/usersSlice';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Users (){
  const dispatch = useAppDispatch();
  const {users} = useAppSelector(state => state.users);

  const [mode, setMode] = useState<'all' | 'friends'>('all');
  
  useEffect(() => {
    mode === 'all'
      ? dispatch(getUsers())
      : dispatch(getFriends());
  }, [mode]);
  return(
    <ProtectedRoute protectFrom='unlogged'>
      <Layout withHeader={true}>
        {users.map(u=> <h1 key={u._id}>{u.name}</h1>)}
      </Layout>
    </ProtectedRoute>
  );}