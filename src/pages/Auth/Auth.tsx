import React from 'react';
import Layout from '../../hok/Layout/Layout';
import { AuthPropsType } from './Auth.props';
import Login from '../../components/Entry/Login';
import Register from '../../components/Entry/Register';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Auth (props: AuthPropsType){
  const {mode} = props;
  return(
    <ProtectedRoute protectFrom='logged'>
      <Layout withHeader={true}>
        {mode === 'login' ? <Login/> : <Register/>}
      </Layout>
    </ProtectedRoute>
  );}