import React from 'react';
import Layout from '../../hok/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getPosts } from '../../store/slices/postsSlice';
import { useEffect } from 'react';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import Post from '../../components/Post/Post';
import s from './Posts.module.scss';

export default function Posts() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <ProtectedRoute protectFrom='unlogged'>
      <Layout withHeader={true}>
        <div className={s.container}>
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
