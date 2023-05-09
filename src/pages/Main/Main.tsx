import React from 'react';
import Layout from '../../hok/Layout/Layout';
import s from './Main.module.scss';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../../hok/protectedRoute/ProtectedRoute';

export default function Main (){return(
  <Layout withHeader={false}>
    <ProtectedRoute protectFrom='logged'>
      <div className={s.section}>
        <div className={s.container}>
          <div className={s.content}>
            <h2 className={s.title}>Hard rock network</h2>
            <p className={s.subtitle}>
                Добро пожаловать в сообщество, в котором вам всегда рады. Здесь можно 
                обмениваться мнениями, рекомендациями, последними новостями о мире музыки, 
                а так же просто поболтать с единомышленниками о чем угодно
            </p>
            <div className={s.btnWrapper}>
              <Link to="/login" className={s.button}>Войти</Link>
              <Link to="/register" className={s.button}>Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  </Layout>
);}