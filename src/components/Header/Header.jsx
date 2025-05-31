import { FaDiscord } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import ImageSite from "../../assets/logo-oficial.svg";
import ProfileImage from "../../assets/Avatar.png"
import { BiSolidCoinStack } from "react-icons/bi";
import "./Header.css";

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

const Header = ({ onSearch }) => {
  const mensagens = [
    'Trap Brazil...',
    'Funk do Rio de Janeiro...',
    'Lofy Japonese...',
    'Montagem/Ritimada...',
  ];
  const [user, setUser] = useState(null);
  const [placeholder, setPlaceholder] = useState("")
  const [mensagemIndex, setMensagemIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [apagando, setApagando] = useState(false)
  const [query, setQuery] = useState('')
  const [login, setLogin] = useState(true)

  useEffect(() => {
        const nomeStr = getCookie("nome"); // ex: "João da Silva"
        const email = getCookie("email");
        const picture = getCookie("picture");

        if (nomeStr && email && picture) {
            const nome = nomeStr.split(" ");
            setUser({ nome, email, picture });
        }
    }, []);

  useEffect(() => {
    const menAtual = mensagens[mensagemIndex]
    const timeout = setTimeout(() => {
      if(!apagando) {
        if(charIndex < menAtual.length){
          setPlaceholder((prev) => prev + menAtual[charIndex])
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setApagando(true), 1000);
        }


      }else {
        if(charIndex > 0){
          setPlaceholder(menAtual.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1);
        }else{
          setApagando(false)
          setMensagemIndex((prev) => (prev + 1) % mensagens.length)
        }
      }
    }, apagando ? 50 : 100);

    return () => clearTimeout(timeout)
  }, [charIndex, apagando, mensagemIndex]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <header>
        <img src={ImageSite} alt="" className="image-site" />
        <div className="pesquisa-container">
        <button onClick={() => onSearch(query)}><IoMdSearch /></button>
        <input 
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
        />
        </div>
        {login ? (
          <div className="content-profile">
            <div className="credits">
              <BiSolidCoinStack />
              <div className="credits-info">
                <p>Creditos</p>
                <h1>Sem Limites</h1>
              </div>
            </div>
            <div className="profile-information">
                <div className="profile">
                    <img className="profile-img" src={user ? `${user.picture || ""}` : "Carregando..."} alt="" />
                    <h1>{user ? `${user.nome[0]} ${user.nome[1] || ""}` : "Carregando..."}</h1>
                </div>
            </div>
          </div>
        ): (
            <div>
            <button className="fazer-login">
                <FaDiscord className="icone-login" />
                <span>Login com o Discord</span>
            </button>
            </div>
        )}

    </header>
  );
};

export default Header;
