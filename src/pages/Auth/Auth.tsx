import React from 'react';
import Layout from '../../hok/Layout/Layout';
import { AuthPropsType } from './Auth.props';
import Login from '../../components/Entry/Login';
import Register from '../../components/Entry/Register';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Auth (props: AuthPropsType){
  const {mode} = props;
  return(
    <Layout withHeader={true}>
      <ProtectedRoute protectFrom='logged'>
        {mode === 'login' ? <Login/> : <Register/>}
      </ProtectedRoute>
    </Layout>
  );}