import React, { useState, useEffect } from 'react'

const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

const Redirect = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const parametros = new URLSearchParams(window.location.search);
        const nome = decodeURIComponent(parametros.get('name')?.replace(/\+/g, " ") || "").split(" ");
        const email = parametros.get('email');
        const picture = parametros.get('picture');
        const id = parametros.get('id');
        const token = parametros.get('token');

        setCookie("nome", nome.join(" "));
        setCookie("email", email);
        setCookie("picture", picture);
        setCookie("id", id);
        setCookie("token", token);

        if (nome && email && picture) {
            setUser({ nome, email, picture });
        }
    }, [])

    if (!user) return <p>Carregando...</p>;
}

export default Redirect;
