import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getFriendsPosts } from '../../store/slices/postsSlice';
import { useEffect } from 'react';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import Post from '../../components/Post/Post';
import s from './Posts.module.scss';
import Header from '../../components/Header/Header';

export default function Posts() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getFriendsPosts());
  }, []);

  return (
    <ProtectedRoute protectFrom='unlogged'>
      <>
        <Header />
        <section className={s.section}>
          <h2 className={s.title}>Посты ваших друзей:</h2>
          <div className={s.container}>
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
        </section>
      </>
    </ProtectedRoute>
  );
}
