import React from 'react';
import s from './Entry.module.scss';
import validatePassword from '../../utils/validatePassword';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { UserType } from '../../models/models';
import cn from 'classnames';
import { regUser, editUser } from '../../store/slices/authSlice';
import { RegisterProps } from './Register.props';
import { useNavigate } from 'react-router-dom';

export default function Register(props: RegisterProps) {
  const { mode, current, onCancel } = props;
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UserType>({ mode: 'onChange' });

  const onSubmitRegister: SubmitHandler<UserType> = async (data) => {
    await dispatch(regUser(data));
    console.log(error);
    if (!error) {
      navigate('/login');
      reset();
    }
  };

  const onSubmitEdit: SubmitHandler<UserType> = async (data) => {
    await dispatch(editUser(data));
    console.log(error);
    if (!error) {
      
      onCancel && onCancel();
      reset();
    }
  };

  return (
    <section className={s.section}>
      <form
        className={s.form + ' ' + s.registerForm}
        onSubmit={
          mode === 'register'
            ? handleSubmit(onSubmitRegister)
            : handleSubmit(onSubmitEdit)
        }
      >
        <label className={s.label}>
          <input
            type='text'
            defaultValue={current?.name || ''}
            placeholder='Имя'
            className={s.input}
            {...register('name', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.name?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Город'
            className={s.input}
            defaultValue={current?.city || ''}
            {...register('city', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.city?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Учебное заведение'
            className={s.input}
            defaultValue={current?.college || ''}
            {...register('college', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.college?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Ваш пол'
            className={s.input}
            defaultValue={current?.gender || ''}
            {...register('gender', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.gender?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Ссылка на аватар'
            className={s.input}
            defaultValue={current?.avatar || ''}
            {...register('avatar', {
              required: 'Обязательное поле',
              pattern: /[^a-z0-9_\-.]/,
            })}
          />
          <p className={s.error}>
            {errors.avatar &&
              (errors?.avatar?.message || 'Укажите корректный адрес URL')}
          </p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Адрес электронной почты'
            defaultValue={current?.email || ''}
            className={s.input}
            {...register('email', {
              required: 'Обязательное поле',
              pattern:
                /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/,
            })}
          />
          <p className={s.error}>
            {errors.email &&
              (errors?.email?.message ||
                'Укажите корректный адрес электронной почты')}
          </p>
        </label>
        <label className={s.label}>
          <input
            type='password'
            placeholder='Пароль'
            className={s.input}
            {...register('password', {
              required: 'Обязательное поле',
              validate: validatePassword,
            })}
          />
          <p className={s.error}>
            {errors.password &&
              (errors?.password?.message ||
                'от 8 до 20 символов, минимум две цифры, минимум одна заглавная латинская буква')}
          </p>
        </label>
        <button className={cn(s.button, { [s.inactiveBtn]: !isValid })}>
          {mode === 'register' ? 'Зарегистрироваться' : 'Сохранить изменения'}
        </button>
        {mode === 'edit' && (
          <button className={s.button} onClick={onCancel}>
            {'Отмена'}
          </button>
        )}
      </form>
    </section>
  );
}
