import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { FavoritesContextType, Favorito } from "../interfaces/types";

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favoritos, setFavoritos] = useState<Favorito[]>(() => {
        const favoritosGuardados = localStorage.getItem("favoritos");
        const parsedArray = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
        return parsedArray;
    });

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    // Función para alternar un ítem de favoritos
    const toggleFavorito = (item: Favorito) => {
        setFavoritos(prev => {
            const exists = prev.find(f => f.id === item.id);
            if (exists) {
                return prev.filter(f => f.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };
    const isFavorito = (id: string) => {
        return favoritos.some(f => f.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites debe usarse dentro del favoritesProvider");
    }
    return context;
};
