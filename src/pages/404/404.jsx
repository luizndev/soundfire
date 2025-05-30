import React, { useState } from 'react';
import axios from 'axios';
import "./404.css"

import YoutubePlayer from '../../components/Player/Player';
import Header from '../../components/Header/Header';
import MenuBar from '../../components/MenuBar/MenuBar';

import IconeDisco from "../../assets/disco.svg"

function NotFound() {
  const [musicas, setMusicas] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [nomeMusica, setNomeMusica] = useState(null);
  const [artista, setArtista] = useState(null);
  const [FotoMusica, setFotoMusica] = useState(null);

  const pesquisar = async (query) => {
    const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    setMusicas(res.data);
  };

  const handlePlayMusicFromHistory = (musica) => {
    setVideoId(musica.id);
    setFotoMusica(musica.foto);
    setNomeMusica(musica.nome);
    setArtista(musica.artista);
  };

  const handleTrocarMusic = (musica) => {
    console.log(musica)
    setVideoId(musica.id);
    setFotoMusica(musica.thumbnail);
    setNomeMusica(musica.title);
    setArtista(musica.channel);
  }


 

  return (
    <div className='container'>
      Pagina Não Encontrada
    </div>
  );
}

export default NotFound;
