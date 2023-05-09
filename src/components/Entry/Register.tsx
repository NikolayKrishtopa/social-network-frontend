import React from 'react';
import s from './Entry.module.scss';

export default function Register() {
  return (
    <section className={s.section}>
      <form className={s.form + ' ' + s.registerForm}>
        <label className={s.label}>
          <input type='text' placeholder='Имя' className={s.input} />
          <p className={s.error}>Error</p>
        </label>
        <label className={s.label}>
          <input type='text' placeholder='Город' className={s.input} />
          <p className={s.error}></p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Учубное заведение'
            className={s.input}
          />
          <p className={s.error}></p>
        </label>
        <label className={s.label}>
          <input type='text' placeholder='Ваш пол' className={s.input} />
          <p className={s.error}></p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Ссылка на аватар'
            className={s.input}
          />
          <p className={s.error}></p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Адрес электронной почты'
            className={s.input}
          />
          <p className={s.error}></p>
        </label>
        <label className={s.label}>
          <input type='password' placeholder='Пароль' className={s.input} />
          <p className={s.error}></p>
        </label>
        <button className={s.button}>Зарегистрироваться</button>
      </form>
    </section>
  );
}
