import React from 'react';
import { HeaderPropsType } from './Header.props';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export default function Header(props: HeaderPropsType){
  return(
    <header className={s.header}>
      <div className={s.widthLimiter}>
        <div className={s.navbar}>
          <NavLink to="/" className={s.logo + ' ' + s.clickable}>
            <h1 className={s.title}>Hard rock network</h1>
            <p className={s.subtitle}>вступай в сообщество</p>
          </NavLink>
          <nav className={s.nav}>
            <ul className={s.menu}>
              <li className={s.menuItem}>
                <NavLink
                  to="/users"
                  className={ ({ isActive }) => {
                    return isActive ?  `${s.menuLink} ${s.clickable} ${s.active}`: `${s.menuLink} ${s.clickable}`;
                  }}
                >Пользователи</NavLink>
              </li>
              <li className={s.menuItem}>
                <NavLink
                  to="/posts"
                  className={ ({ isActive }) => {
                    return isActive ?  `${s.menuLink} ${s.clickable} ${s.active}`: `${s.menuLink} ${s.clickable}`;
                  }}
                >Посты</NavLink>
              </li>
              <li className={s.menuItem}>
                <NavLink
                  to="/profile"
                  className={ ({ isActive }) => {
                    return isActive ?  `${s.menuLink} ${s.clickable} ${s.active}`: `${s.menuLink} ${s.clickable}`;
                  }}
                >Профиль</NavLink>
              </li>
              <li className={s.menuItem}>
                <NavLink
                  to="/login"
                  className={ ({ isActive }) => {
                    return isActive ?  `${s.menuLink} ${s.clickable} ${s.active}`: `${s.menuLink} ${s.clickable}`;
                  }}
                >Вход</NavLink>
              </li>
              <li className={s.menuItem}>
                <NavLink
                  to="/register"
                  className={ ({ isActive }) => {
                    return isActive ?  `${s.menuLink} ${s.clickable} ${s.active}`: `${s.menuLink} ${s.clickable}`;
                  }}
                >Регистрация</NavLink>
              </li>
                   
            </ul>
          </nav>
          <button className={s.burgerBtn}>
          </button>
        </div>
      </div>
    </header>
  );}