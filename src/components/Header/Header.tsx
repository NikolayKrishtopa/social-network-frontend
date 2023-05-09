import React from 'react';
import { useState } from 'react';
import { HeaderPropsType } from './Header.props';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { logout } from '../../store/slices/authSlice';
import burgerIcon from '../../assets/img/burger-icon.svg';
import cn from 'classnames';


export default function Header(props: HeaderPropsType) {
  const { isLogged, currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSideBar: ()=>void = ()=>{
    setSidebarOpen(true);
    window.addEventListener('resize', closeSideBar);
    window.addEventListener('scroll', closeSideBar);
  };

  const closeSideBar: ()=>void = ()=>{
    setSidebarOpen(false);
    window.removeEventListener('resize', closeSideBar);
    window.removeEventListener('scroll', closeSideBar);
  };

  const handleLogout = () => {
    dispatch(logout({ withMsg: true }));
  };

  return (
    <header className={s.header}>
      <div className={s.widthLimiter}>
        <div className={s.navbar}>
          <NavLink to='/' className={s.logo + ' ' + s.clickable}>
            <h1 className={s.title}>Hard rock network</h1>
            <p className={s.subtitle}>вступай в сообщество</p>
          </NavLink>
          <nav className={cn(s.nav, {[s.sidebar]: sidebarOpen})} onClick={closeSideBar}>
            <ul className={s.menu}>
              {isLogged ? (
                <>
                  <li className={s.menuItem}>
                    <NavLink
                      to='/users'
                      className={({ isActive }) => {
                        return isActive
                          ? `${s.menuLink} ${s.clickable} ${s.active}`
                          : `${s.menuLink} ${s.clickable}`;
                      }}
                    >
                      Пользователи
                    </NavLink>
                  </li>
                  <li className={s.menuItem}>
                    <NavLink
                      to='/posts'
                      className={({ isActive }) => {
                        return isActive
                          ? `${s.menuLink} ${s.clickable} ${s.active}`
                          : `${s.menuLink} ${s.clickable}`;
                      }}
                    >
                      Лента
                    </NavLink>
                  </li>
                  <li className={s.menuItem}>
                    <NavLink
                      to='/profile'
                      className={({ isActive }) => {
                        return isActive
                          ? `${s.menuLink} ${s.clickable} ${s.active}`
                          : `${s.menuLink} ${s.clickable}`;
                      }}
                    >
                      {currentUser?.name}
                    </NavLink>
                  </li>
                  <li className={s.menuItem}>
                    <button
                      className={`${s.menuLink} ${s.clickable}`}
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className={s.menuItem}>
                    <NavLink
                      to='/login'
                      className={({ isActive }) => {
                        return isActive
                          ? `${s.menuLink} ${s.clickable} ${s.active}`
                          : `${s.menuLink} ${s.clickable}`;
                      }}
                    >
                      Вход
                    </NavLink>
                  </li>
                  <li className={s.menuItem}>
                    <NavLink
                      to='/register'
                      className={({ isActive }) => {
                        return isActive
                          ? `${s.menuLink} ${s.clickable} ${s.active}`
                          : `${s.menuLink} ${s.clickable}`;
                      }}
                    >
                      Регистрация
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <button className={cn(s.burgerBtn, {[s.burgerBtnOpen]: sidebarOpen})} onClick={sidebarOpen ? closeSideBar : openSideBar}>
            <img src={burgerIcon} alt="extend sidebarbutton" />
          </button>
        </div>
      </div>
    </header>
  );
}
