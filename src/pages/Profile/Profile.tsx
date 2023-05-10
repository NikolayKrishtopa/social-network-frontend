import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { ProfileProps } from './Profile.props';
import Header from '../../components/Header/Header';
import { getPosts } from '../../store/slices/postsSlice';
import Post from '../../components/Post/Post';
import cn from 'classnames';
import s from './Profile.module.scss';
import addPostBtn from '../../assets/img/Check_fill.svg';

export default function Profile(props: ProfileProps) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = props;
  const [mode, setMode] = useState<'info' | 'posts'>('info');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  //check if page own or another user
  const isOwn = currentUser._id === user._id;

  //check this user is a friend of logged user
  const isFriend = currentUser.friends.includes(user._id);

  return (
    <ProtectedRoute protectFrom='unlogged'>
      <>
        <Header />
        <section className={s.section}>
          <div className={s.container}>
            <div className={s.column + ' ' + s.summary}>
              <div className={s.avatarWrapper}>
                <img src={user.avatar} alt={user.name} className={s.avatar} />
              </div>
              <div className={s.column}>
                <h2 className={s.name}>{user.name}</h2>
                <p className={s.status}>{user.status || 'Укажите статус'}</p>
                {!isOwn && (
                  <button className={s.Addbtn}>
                    {isFriend ? 'Удалить' : 'Добавить'}
                  </button>
                )}
              </div>
            </div>
            <div className={s.column}>
              <div className={s.btns}>
                <button
                  className={cn(s.switchBtn, {
                    [s.btnUnpressed]: mode === 'posts',
                  })}
                  onClick={() => setMode('info')}
                >
                  Профиль
                </button>
                <button
                  className={cn(s.switchBtn, {
                    [s.btnUnpressed]: mode === 'info',
                  })}
                  onClick={() => setMode('posts')}
                >
                  Посты
                </button>
              </div>
              {mode === 'info' ? (
                <div className={s.userInfo}>
                  <div className={s.infoItem}>
                    <p className={s.text}>Город</p>
                    <p className={s.text}>{user.city}</p>
                  </div>
                  <div className={s.infoItem}>
                    <p className={s.text}>Пол</p>
                    <p className={s.text}>{user.gender}</p>
                  </div>
                  <div className={s.infoItem}>
                    <p className={s.text}>Адрес электронной почты</p>
                    <p className={s.text}>{user.email}</p>
                  </div>
                  <div className={s.infoItem}>
                    <p className={s.text}>Учебное заведение</p>
                    <p className={s.text}>{user.college}</p>
                  </div>
                </div>
              ) : (
                <>
                  {isOwn && (
                    <form className={s.addPost}>
                      <textarea
                        placeholder='Добавить пост...'
                        className={s.postText}
                      ></textarea>
                      <button className={s.addPostBtn}>
                        <img src={addPostBtn} alt='add post button' />
                      </button>
                    </form>
                  )}
                  <div className={cn(s.posts, { [s.reducedHeight]: isOwn })}>
                    {posts.map((p) => (
                      <Post key={p._id} post={p} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </>
    </ProtectedRoute>
  );
}
