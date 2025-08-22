import React, { useContext, useState } from 'react'
import './SigninSignup.css'
import { useNavigate } from "react-router-dom";
import { translations } from "../../utils/lang";
import { signinAPI, signupAPI } from "../../utils/api/signinup";
import { Context } from '../../context/Context';
import { Select } from '../../components/select/Select';
import { AUTH_TOKEN, ROLE, INSTRUCTOR, STUDENT } from '../../utils/helpers';

export const SigninSignup = () => {
  const { lang, setAuth, setRole } = useContext(Context);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: STUDENT,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (isSignup && !formData.name.trim()) {
      newErrors.name = translations[lang].signinup.nameRequired;
      valid = false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations[lang].signinup.emailRequired;
      valid = false;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = translations[lang].signinup.passwordRequired;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const signin = async () => {
    if (!validate()) return;

    let validData = { ...formData, email: formData.email.toLowerCase() }
    try {
      const responseData = await signinAPI(validData);

      if (responseData.token) {
        localStorage.setItem(AUTH_TOKEN, responseData.token);
        setAuth(responseData.token);
        localStorage.setItem(ROLE, responseData.user.role);
        setRole(responseData.user.role)
        if (responseData.user.role === STUDENT) {
          navigate("/auth/courses", { replace: true });
        } else {
          navigate("/auth/instructor", { replace: true });
        }
      } else {
        if (responseData.error === "Invalid credentials") {
          setErrors(prev => ({ ...prev, email: translations[lang].signinup.emailNotFound }))
        } else if (responseData.error === "Incorrect password") {
          setErrors(prev => ({ ...prev, password: translations[lang].signinup.passwordIncorrect }))
        } else {
          setErrors(prev => ({ ...prev, allow: translations[lang].somthingWrong }))
        }
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, allow: translations[lang].somthingWrong }))
    }
  }

  const signup = async () => {
    if (!validate()) return;

    let validData = { ...formData, email: formData.email.toLowerCase() }
    try {
      const responseData = await signupAPI(validData);
      console.log(responseData.error === "User already exists")
      if (responseData.token) {
        localStorage.setItem(AUTH_TOKEN, responseData.token);
        setAuth(true);
        localStorage.setItem(ROLE, responseData.user.role);
        setRole(responseData.user.role)
        if (responseData.user.role === STUDENT) {
          navigate("/auth/courses", { replace: true });
        } else {
          navigate("/auth/instructor", { replace: true });
        }
      } else if (responseData.error === "User already exists") {
        setErrors(prev => ({ ...prev, email: translations[lang].signinup.emailExist }))
      } else {
        setErrors(prev => ({ ...prev, allow: translations[lang].signinup.somthingWrong }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, allow: translations[lang].signinup.somthingWrong }))
    }
  }

  return (
    <div className={`signinsignup ${lang === 'ar' ? 'ar' : ''}`}>
      <div className="signinsignup-container">
        <h1>{isSignup ? translations[lang].signinup.signup : translations[lang].signinup.signin}</h1>
        <div className="signinsignup-fields">
          {isSignup &&
            <>
              <p>{translations[lang].signinup.name}</p>
              <input type="text" placeholder={translations[lang].signinup.name} name='name' value={formData.name} onChange={changeHandler} />
              {errors.name && <p className="error">{errors.name}</p>}

              <Select
                title={translations[lang].signinup.roleTitle}
                options={[
                  { value: STUDENT, label: translations[lang].signinup.role[0] },
                  { value: INSTRUCTOR, label: translations[lang].signinup.role[1] },
                ]}
                value={formData.role === STUDENT ? STUDENT : INSTRUCTOR}
                onChange={(val) =>
                  setFormData({ ...formData, role: val.toLowerCase() })
                }
              />
            </>}

          <p>{translations[lang].signinup.email}</p>
          <input autoComplete='email' type="email" placeholder={translations[lang].signinup.email} name='email' value={formData.email} onChange={changeHandler} />
          {errors.email && <p className="error">{errors.email}</p>}

          <p>{translations[lang].signinup.pass}</p>
          <input type="password" placeholder={translations[lang].signinup.pass} name='password' value={formData.password} onChange={changeHandler} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {errors.allow && <p className="error">{errors.allow}</p>}
        <button onClick={() => { isSignup ? signup() : signin() }}>{translations[lang].signinup.continue_btn}</button>
        {
          isSignup ?
            <p className="signinsignup-signin">{translations[lang].signinup.signupQuestion}<span onClick={() => { setIsSignup(false) }}>{translations[lang].signinup.signinhere}</span></p>
            : <p className="signinsignup-signin">{translations[lang].signinup.signinQuestion}<span onClick={() => { setIsSignup(true) }}>{translations[lang].signinup.signuphere}</span></p>
        }
      </div>
    </div>
  )
}

