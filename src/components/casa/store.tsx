import { createContext, useContext, useState, type ReactNode } from "react";
const FavoritesContext = createContext<{ favorites: number[]; toggle: (id: number) => void }>({
  favorites: [],
  toggle: () => {},
});
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const toggle = (id: number) =>
    setFavorites((old) => (old.includes(id) ? old.filter((n) => n !== id) : [...old, id]));
  return (
    <FavoritesContext.Provider value={{ favorites, toggle }}>{children}</FavoritesContext.Provider>
  );
}
export const useFavorites = () => useContext(FavoritesContext);
