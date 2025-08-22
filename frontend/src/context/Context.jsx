import React, { createContext, useState } from 'react';
import { AUTH_TOKEN, LANG, ROLE } from '../utils/helpers';

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [lang, setLang] = useState(localStorage.getItem(LANG) || 'en');
    const [isAuth, setAuth] = useState(localStorage.getItem(AUTH_TOKEN) || false);
    const [role, setRole] = useState(localStorage.getItem(ROLE));

    const handleTokenExpiration = () => {
        localStorage.removeItem(AUTH_TOKEN);
        setAuth(false);
        window.location.href = '/signin';
    };

    const contextValue = {
        lang,
        setLang,
        isAuth,
        setAuth,
        handleTokenExpiration,
        setRole,
        role,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;