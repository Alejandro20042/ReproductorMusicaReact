import { useEffect } from "react";
import { usePlaylists } from "../../contexts/PlaylistContext";
import type { ISong } from "../../interfaces/ISong";

import "./AddToPlaylistMenu.css";

type Props = {
    cancion: ISong;
    onClose: () => void;
    position: { x: number; y: number };
    onAddSuccess: (playlistName: string) => void;
};

const AddToPlaylistMenu = ({ cancion, onClose, position, onAddSuccess }: Props) => {
    const { playlists, agregarAPlaylist } = usePlaylists();

    useEffect(() => {
        console.log(playlists);
    }, [playlists]);

    const handleAdd = (playlistId: string) => {
        agregarAPlaylist(playlistId, cancion);
        const playlist = playlists.find(p => p.id === playlistId);
        if (playlist) {
            onAddSuccess(playlist.nombre);
        }
        onClose();
    };

    return (
        <ul className="playlist-menu" style={{ top: position.y, left: position.x }}>
            {playlists.map((playlist) => (
                <li key={playlist.id} onClick={() => handleAdd(playlist.id)}>
                    Agregar a {playlist.nombre}
                </li>
            ))}
        </ul>
    );
};

export default AddToPlaylistMenu;
