import React, { useContext, useEffect, useRef } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo/eduTrack.jpg';
import User from '../../assets/svg/user.svg';
import SignOut from '../../assets/svg/signout.svg';
import Language from '../../assets/svg/language.svg'
import { Context } from '../../context/Context';
import { translations } from "../../utils/lang";

export const Navbar = () => {
  const { lang, setLang, handleTokenExpiration, isAuth } = useContext(Context);
  const languageRef = useRef(null);

  const language_toggle = () => {
    if (languageRef.current) {
      languageRef.current.classList.toggle('language-display')
    }
  }

  const setNavLang = (lang) => {
    setLang(lang);
    localStorage.setItem('lang', lang);
    language_toggle();
  }

  const signOutHandler = () => {
    handleTokenExpiration();
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        languageRef.current.classList.remove('language-display');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="navbar">
      <Link to='/signin' className='link'>
        <img src={Logo} alt="" className='nav-logo' />
      </Link>

      <div className="navbar-right">
        <img src={Language} alt='language' className='language' onClick={language_toggle} />
        <div ref={languageRef} className="language-list-container">
          <div className="language-list">
            <p className={lang === 'ar' ? "language-list-p-align" : ""} onClick={() => { setNavLang('ar') }}>{translations.arLang}</p>
            <p className={lang === 'ar' ? "language-list-p-align" : ""} onClick={() => { setNavLang('en') }}>{translations.enLang}</p>
          </div>
        </div>

        {isAuth ?
          <img src={SignOut} alt="" className='nav-profile' onClick={signOutHandler} /> :
          <Link to={'/signin'} style={{ textDecoration: "none" }}>
            <img src={User} alt="" className='nav-profile' />
          </Link>}
      </div>


    </div>
  )
}