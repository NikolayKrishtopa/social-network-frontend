import React from 'react';
import Layout from '../../hok/Layout/Layout';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Profile (){return(
  <Layout withHeader={true}>
    <ProtectedRoute protectFrom='unlogged'>
      <h1>Profile</h1>
    </ProtectedRoute>
  </Layout>
);}