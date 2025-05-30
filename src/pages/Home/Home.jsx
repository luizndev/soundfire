import React, { useState } from 'react';
import axios from 'axios';
import "./Home.css"

import YoutubePlayer from '../../components/Player/Player';
import Header from '../../components/Header/Header';
import MenuBar from '../../components/MenuBar/MenuBar';

import IconeDisco from "../../assets/disco.svg"

function Home() {
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
      <Header onSearch={pesquisar} />
      <div className="container-view">
      <MenuBar onPlayMusic={handlePlayMusicFromHistory} />
      <div className='music-list'>
       {musicas.map(musica => (
        <div className='item-music' onClick={() => {
              setVideoId(musica.id);
              setFotoMusica(musica.thumbnail);
              setNomeMusica(musica.title);
              setArtista(musica.channel)
            }} key={musica.id} style={{ marginTop: 10 }}>
              <div className="icone-album">
                  <img src={IconeDisco} alt="Disco" className="disco" />
                  <div
                    className="icone"
                    style={{ backgroundImage: `url(${musica.thumbnail})` }}
                  ></div>
                </div>
          <div className='item-musica-information'>
            <span dangerouslySetInnerHTML={{ __html: musica.title }}  />
            <p>{musica.channel}</p>
          </div>
          {/* <button
            onClick={() => {
              setVideoId(musica.id);
              setFotoMusica(musica.thumbnail);
              setNomeMusica(musica.title);
            }}
          >
            Tocar
          </button> */}
        </div>
      ))}
      </div>
      </div>
      <YoutubePlayer videoId={videoId} nomeMusica={nomeMusica} FotoMusica={FotoMusica} artista={artista} allMusicas={musicas} trocarMusica={handleTrocarMusic} />
    </div>
  );
}

export default Home;
