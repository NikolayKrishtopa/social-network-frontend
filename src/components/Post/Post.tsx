import React from 'react';
import s from './Post.module.scss';
import { PostProps } from './Post.props';
import likeIcon from '../../assets/img/like_icon.svg';
import likeIconChecked from '../../assets/img/like_icon_checked.svg';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { likePost } from '../../store/slices/postsSlice';
import { unlikePost } from '../../store/slices/postsSlice';

export default function Post(props: PostProps) {
  const { image, text, likes, _id: postId } = props.post;

  const dispatch = useAppDispatch();

  const { _id: userId } = useAppSelector((state) => state?.auth?.currentUser);
  const isLiked = likes.includes(userId);
  console.log(likes);

  const like = () => {
    dispatch(likePost(postId));
  };

  const unlike = () => {
    dispatch(unlikePost(postId));
  };

  return (
    <li className={s.post}>
      {image ? (
        <img src={image} alt='post' className={s.img} />
      ) : (
        <div className={s.img}></div>
      )}
      <p className={s.text}>{text}</p>
      <div className={s.likesContainer}>
        <button className={s.likeBtn} onClick={isLiked ? unlike : like}>
          <img
            src={isLiked ? likeIconChecked : likeIcon}
            alt='like'
            className={s.likeIcon}
          />
        </button>
        <span className={s.likesQty}>{likes.length}</span>
      </div>
    </li>
  );
}
