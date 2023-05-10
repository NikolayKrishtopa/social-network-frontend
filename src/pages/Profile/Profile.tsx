import React from 'react';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ProfileProps } from './Profile.props';
import Header from '../../components/Header/Header';

export default function Profile(props: ProfileProps) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { user } = props;

  //check if page own or another user
  const isOwn = currentUser._id === user._id;

  return (
    <ProtectedRoute protectFrom='unlogged'>
      <>
        <Header />
        <h1>Profile</h1>
      </>
    </ProtectedRoute>
  );
}
