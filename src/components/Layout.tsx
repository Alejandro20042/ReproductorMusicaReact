import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { LayoutProps } from '../interfaces/types';
import SideMenu from './SideMenu';
import MusicPlayer from './MusicPlayer';
import type { ISong } from '../interfaces/ISong';

const Layout = ({ canciones }: LayoutProps) => {
  const [cancionSeleccionada, setCancionSeleccionada] = useState<ISong | null>(null);
  
  return (
    <div className="appContainer"> 
      <div className="containerPrincipal"> 
        <SideMenu />
        <div className="contenido">
          <Outlet context={{ canciones, cancionSeleccionada, setCancionSeleccionada }} />
        </div>
      </div>
      <MusicPlayer canciones={canciones} cancionInicial={cancionSeleccionada} />
    </div>
  );
};


export default Layout;
