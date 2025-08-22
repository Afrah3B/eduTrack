import React, { useContext } from 'react'
import Logo from '../../assets/logo/eduTrack.jpg';
import WhatsIcon from '../../assets/svg/whats.svg';
import emailIcon from '../../assets/svg/email.svg';
import './Footer.css';
import { Context } from '../../context/Context'
import config from "../../config.json";
import { translations } from "../../utils/lang";

export const Footer = () => {
    const EmailUrl = config.EMAIL;
    const WhatsUrl = config.WHATSUP;
    const { lang } = useContext(Context);

    return (
        <div className={`footer ${lang === 'ar' ? "ar" : ''}`}>
            <div className="footer-base">
                <div className="footer-logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="footer-social-icons">
                    <a href={EmailUrl} target="_blank" rel="noopener noreferrer">
                        <img src={emailIcon} alt="@" className="footer-social-icon" />
                    </a>
                    <a href={WhatsUrl} target="_blank" rel="noopener noreferrer">
                        <img src={WhatsIcon} alt="whatsapp" className="footer-social-icon" />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>{translations[lang].copyRight[0]} &copy; {translations[lang].copyRight[1]}</p>
            </div>
        </div>
    )
}
