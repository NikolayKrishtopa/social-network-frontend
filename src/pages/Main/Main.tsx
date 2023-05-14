import React from 'react';
import s from './Main.module.scss';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Main() {
  return (
    <ProtectedRoute protectFrom='logged'>
      <div className={s.section}>
        <div className={s.container}>
          <div className={s.content}>
            <h2 className={s.title}>jazz</h2>
            <p className={s.subtitle}>
              Добро пожаловать в сообщество, в котором вам всегда рады. Здесь
              можно обмениваться мнениями, рекомендациями, последними новостями
              , а так же просто поболтать с другими пользователями
            </p>
            <div className={s.btnWrapper}>
              <Link to='/login' className={s.button}>
                Войти
              </Link>
              <Link to='/register' className={s.button}>
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
