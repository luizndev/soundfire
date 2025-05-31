import React, { useEffect, useState } from 'react'
import "./MenuBar.css"
import { musicHistory } from "../Player/Player";
// IMPORT DE ICONES
import Coracao from '../../assets/sf_heath.svg'
import Adicionar from '../../assets/sf_plus.svg'
import { LuDownload } from "react-icons/lu";
import { SiFivem } from "react-icons/si";
import MakePlaylist from '../MakePlaylist/MakePlaylist';

const MenuBar = ({ onPlayMusic }) => {
  const [makePlaylist, setMatePlaylist] = useState(false)
  const playlist = []
  return (
    <aside>
      <button className='btn-action music-save'>
        <img src={Coracao} alt="" /> 
        Musicas Salvas
      </button>
      <button 
          className='btn-action make-playlist' 
          onClick={() => {
            setMatePlaylist(!makePlaylist)
            console.log(makePlaylist)
          }}
        >

        <img src={Adicionar} alt="" /> 
        Criar Playlist
      </button>
      <div className="organization">
      <div className="secundary-info">
        <div className="container-menu ultimas-escutadas">
        {musicHistory.length > 0 ? (
          <div className='content-his'>
          <div className="separator"></div>
            <h1>Últimas Escutadas</h1>
            {musicHistory
              .slice(-5)              
              .reverse()             
              .map((item) => (
                <div key={item.id} className='item-historic'  onClick={() => onPlayMusic && onPlayMusic(item)}>
                  <div
                    className="cover-historic"
                    style={{ backgroundImage: `url(${item.foto})` }}
                  />
                  <div className="info-historic">
                    <h1>{item.nome}</h1>
                    <span>{item.artista}</span>
                  </div>
                </div>
              ))}
          </div>) : ("")}
        </div>
        {playlist.length > 0 ? (
          <div>
            <div className="separator"></div>
            <div className="container-menu minhas-playlist">
                <h1>Minhas Playlists</h1>
                ....
            </div>
          </div>
        ): ""}
      </div>
      <div className="container-menu-footer">
        <span>Mais opções</span>
        <button className='btn-action-footer'>
            <LuDownload />
            Desktop
            <g>EM BREVE</g>
        </button>
        <button className='btn-action-footer '>
            <SiFivem />
            API p/ FiveM
            <g>EM BREVE</g>
        </button>
      </div>
      </div>
      {makePlaylist ? (
        <MakePlaylist close={makePlaylist} onClose={() => setMatePlaylist(false)}  />
      ) : ""}
    </aside>
  )
}

export default MenuBar
