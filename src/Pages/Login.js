import "./login.css";
import logo from "../img/logo-sm.png";
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Ajax } from "../utils/axios";
import { TextField } from "../components/TextField";
import { ToastContainer } from 'react-toastify';
import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
  const [currentForm, setCurrentForm] = useState("LOGIN");
  const { dispatch } = useAuthContext();

  const showRegistrationForm = (e) => {
    e.preventDefault();
    if (currentForm === "LOGIN") {
      setCurrentForm("REGISTER");
    } else {
      setCurrentForm("LOGIN");
    }
  }

  function registrationFunction(values, actions) {
    Ajax.post('owners', values, function (response) {
      console.log(response)
      window.localStorage.setItem('token', response.token);
      dispatch({ type: 'LOGIN', payload: response.token })
    });
  }

  function loginFunction(values, actions) {
    Ajax.post('owners/login', values, function (response) {
      console.log(response)
      window.localStorage.setItem('token', response.token);
      dispatch({ type: 'LOGIN', payload: response.token })
    });
  }

  const validationForm = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
      .min(3, 'Email too short')
      .required('Required'),
    password: Yup.string()
      .min(3, 'Password too short')
      .required('Required')
  });

  const validationFormRegister = Yup.object().shape({
    surname: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Required'),
    name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
      .min(3, 'Email too short')
      .required('Required'),
    password: Yup.string()
      .min(3, 'Password too short')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required')
  });

  return (
    <div>
      <ToastContainer />
      {currentForm === "LOGIN" &&
        <div className="login_container lg:flex flex-row">
          <div className="branding_section basis-2/3">
            <div className="branging_image">
              <div className="headline">
                <h2>
                  Make sure you keep your<br className="hidden lg:block" /> dearest moments with
                </h2>
                <h1 className="mt-0 mb-0 pb-0 logo">Online Diary</h1>
              </div>
            </div>
          </div>
          <div className="login_form_container self-center basis-2/5">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationForm}
              onSubmit={(values, actions) => {
                loginFunction(values, actions);
              }}
            >
              <Form className="mx-auto mx-5">
                <img src={logo} height="45" width="406" alt="My Diary" />
                <h2 className="pb-150">Log in</h2>
                <TextField label="Email" name="email" type="email" placeholder="example@example.com" />
                <TextField label="Password" name="password" type="password" placeholder="strongpassword" />
                <div className="flex justify-between">
                  <button><input type="submit" value="Login" className="mt-5 mb-3 active login" /></button>
                  <button><input type="submit" value="Register" className="mt-5 mb-3" onClick={showRegistrationForm} /></button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      }
      {
        currentForm === "REGISTER" &&
        <div className="login_container lg:flex flex-row">
          <div className="branding_section basis-2/3">
            <div className="branging_image">
              <div className="headline">
                <h2>
                  Make sure you keep your<br className="hidden lg:block" /> dearest moments with
                </h2>
                <h1 className="mt-0 mb-0 pb-0 logo">Online Diary</h1>
              </div>
            </div>
          </div>
          <div className="login_form_container self-center basis-2/5">
            <Formik
              initialValues={{ name: '', surname: '', email: '', password: '' }}
              validationSchema={validationFormRegister}
              onSubmit={(values, actions) => {
                registrationFunction(values, actions);
              }}
            >
              <Form className="mx-auto mx-5">
                <img src={logo} height="45" width="406" alt="My Diary" />
                <h2 className="pb-150">Register</h2>
                <TextField label="Name" name="name" type="text" placeholder="Name" />
                <TextField label="Surname" name="surname" type="text" placeholder="Surname" />
                <TextField label="Email" name="email" type="email" placeholder="example@example.com" />
                <TextField label="Password" name="password" type="password" placeholder="strongpassword" />
                <TextField label="Repeat Password" name="confirmPassword" type="password" placeholder="strongpassword" />
                <div className="flex justify-between">
                  <button><input type="submit" value="Register" className="mt-5 mb-3 active login" /></button>
                  <button><input type="submit" value="Login" className="mt-5 mb-3" onClick={showRegistrationForm} /></button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      }
    </div >
  );
}

export default Login;
