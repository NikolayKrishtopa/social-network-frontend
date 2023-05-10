import React from 'react';
import { AuthPropsType } from './Auth.props';
import Login from '../../components/Entry/Login';
import Register from '../../components/Entry/Register';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import Header from '../../components/Header/Header';

export default function Auth(props: AuthPropsType) {
  const { mode } = props;
  return (
    <ProtectedRoute protectFrom='logged'>
      <>
        <Header />
        {mode === 'login' ? <Login /> : <Register />}
      </>
    </ProtectedRoute>
  );
}
