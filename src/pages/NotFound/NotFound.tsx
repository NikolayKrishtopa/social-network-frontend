import React from 'react';
import s from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <h2 className={s.text}>Извините, такой страницы не существует</h2>
        <Link to='/' className={s.link}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
