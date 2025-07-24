import { usePlaylists } from "../../contexts/PlaylistContext";
import type { Song } from "../../interfaces/types";
import "./AddToPlaylistMenu.css";

type Props = {
    cancion: Song;
    onClose: () => void;
    position: { x: number; y: number };
    onAddSuccess: (playlistName: string) => void;
};

const AddToPlaylistMenu = ({ cancion, onClose, position, onAddSuccess }: Props) => {
    const { playlists, agregarAPlaylist } = usePlaylists();

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
