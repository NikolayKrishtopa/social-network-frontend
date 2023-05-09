import React from 'react';
import Layout from '../../hok/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getPosts } from '../../store/slices/postsSlice';
import { useEffect } from 'react';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Posts (){
  const dispatch = useAppDispatch();
  const {posts} = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return(
    <ProtectedRoute protectFrom='unlogged'>
      <Layout withHeader={true}>
        {posts.map(p  => <h1 key={p._id}>{p.text}</h1>)}
      </Layout>
    </ProtectedRoute>
  );}