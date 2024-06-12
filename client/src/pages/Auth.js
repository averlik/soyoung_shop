import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/esm/Container';
import { Button, Form, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SIGNUP_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { signup, login } from '../http/userAPI.js';
import { observer } from 'mobx-react-lite';
import { Context } from '../index.js';
import DOMPurify from 'dompurify';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: ''
    },
    // Определение схемы валидации с использованием Yup
    validationSchema: Yup.object({
      // Валидация поля email
      email: Yup.string()
        .email('Неправильный формат email') // Сообщение об ошибке, если формат email неправильный
        .required('Обязательное поле') // Сообщение об ошибке, если поле не заполнено
        .matches(/@(mail\.ru|gmail\.com|yandex\.ru|ya\.ru)$/, 'Неправильный домен почты'), // Сообщение об ошибке, если домен почты не соответствует указанным

      // Валидация поля password в зависимости от состояния isLogin
      password: isLogin
        ? Yup.string()
            .required('Обязательное поле') // Сообщение об ошибке, если поле не заполнено (в режиме входа)
        : Yup.string()
            .required('Обязательное поле') // Сообщение об ошибке, если поле не заполнено (в режиме регистрации)
            .min(8, 'Пароль должен состоять минимум из 8 символов') // Сообщение об ошибке, если длина пароля меньше 8 символов
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, 'Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один символ'), // Сообщение об ошибке, если пароль не соответствует требованиям

      // Валидация поля repeatPassword только в режиме регистрации
      repeatPassword: !isLogin && Yup.string()
        .required('Обязательное поле') // Сообщение об ошибке, если поле не заполнено
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать') // Сообщение об ошибке, если пароли не совпадают
    }),
    onSubmit: async (values) => {
      try {
        let data;
        if (isLogin) {
          data = await login(values.email, values.password);
        } else {
          data = await signup(values.email, values.password);
        }
        user.setUser(user);
        user.setIsAuth(true);
        if (data.role === 'ADMIN') {
          user.setIsAdmin(true);
          console.log('admin true');
        }
        navigate(SHOP_ROUTE);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
  });

  const sanitizeInput = (value) => {
    return DOMPurify.sanitize(value);
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className='m-auto'>{isLogin ? 'ВХОД' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column' onSubmit={formik.handleSubmit}>
          <span className='mt-4'>*Введите ваш e-mail</span>
          <Form.Control
            placeholder='e-mail'
            type="email"
            value={sanitizeInput(formik.values.email)}
            onChange={formik.handleChange('email')}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          )}
          <span className='mt-4'>*Введите ваш пароль</span>
          <Form.Control
            placeholder='Пароль'
            type="password"
            value={sanitizeInput(formik.values.password)}
            onChange={formik.handleChange('password')}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          )}
          {!isLogin && (
            <>
              <span className='mt-4'>*Повторите ваш пароль</span>
              <Form.Control
                placeholder='Повторите пароль'
                type="password"
                value={sanitizeInput(formik.values.repeatPassword)}
                onChange={formik.handleChange('repeatPassword')}
                isInvalid={formik.touched.repeatPassword && formik.errors.repeatPassword}
              />
              {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.repeatPassword}
                </Form.Control.Feedback>
              )}
            </>
          )}
          <Row className='d-flex flex-column'>
            {isLogin ?
              <div className='mt-2'>
                Нет аккаунта? <NavLink to={SIGNUP_ROUTE}> Зарегистрироваться</NavLink>
              </div>
              :
              <div className='mt-2'>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите </NavLink>
              </div>
            }
            <Button variant={"outline-success"} type="submit" className='mt-4 align-self-center'>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;

