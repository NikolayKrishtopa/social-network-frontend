import React from 'react';
import Layout from '../../hok/Layout/Layout';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Profile (){return(
  <ProtectedRoute protectFrom='unlogged'>
    <Layout withHeader={true}>
      <h1>Profile</h1>
    </Layout>
  </ProtectedRoute>
);}