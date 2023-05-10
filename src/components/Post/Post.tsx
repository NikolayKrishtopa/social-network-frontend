import React from 'react';
import s from './Post.module.scss';
import { PostProps } from './Post.props';
import likeIcon from '../../assets/img/like_icon.svg';
import likeIconChecked from '../../assets/img/like_icon_checked.svg';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { likePost } from '../../store/slices/postsSlice';
import { unlikePost } from '../../store/slices/postsSlice';
import cn from 'classnames';

export default function Post(props: PostProps) {
  const { image, text, likes, _id: postId, ownerName } = props.post;

  const dispatch = useAppDispatch();

  const { _id: userId } = useAppSelector((state) => state?.auth?.currentUser);
  const isLiked = likes.includes(userId);

  const like = () => {
    dispatch(likePost(postId));
  };

  const unlike = () => {
    dispatch(unlikePost(postId));
  };

  return (
    <li className={s.post}>
      <p className={s.ownerName}>{ownerName}</p>
      <div className={cn(s.postContent, { [s.withoutImg]: !image })}>
        {image && <img src={image} alt='post' className={s.img} />}
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
      </div>
    </li>
  );
}
