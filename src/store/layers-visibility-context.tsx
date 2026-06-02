import { createContext, useContext, useState, type ReactNode } from 'react';
import { LAYERS_KEYS } from '../shared/utils/mapLayers.ts';

type InitialState = {
  [k: string]: boolean;
};

const initialState: InitialState = Object.fromEntries(
  LAYERS_KEYS.map((layerKey) => [layerKey, true])
);

type LayersVisibilityContextType = {
  layersVisibility: InitialState;
  setLayersVisibility: React.Dispatch<React.SetStateAction<InitialState>>;
};

export const LayersVisibilityContext =
  createContext<LayersVisibilityContextType | null>(null);

export function useLayersVisibility() {
  const context = useContext(LayersVisibilityContext);

  if (context === null)
    throw new Error(
      'useLayersVisibility must be used within a LayersVisibilityProvider'
    );

  return context;
}

type LayersVisibilityContextProviderProps = {
  children: ReactNode;
};

export default function LayersVisibilityContextProvider({
  children,
}: LayersVisibilityContextProviderProps) {
  const [layersVisibility, setLayersVisibility] = useState(() => {
    return initialState;
  });

  return (
    <LayersVisibilityContext.Provider
      value={{ layersVisibility, setLayersVisibility }}
    >
      {children}
    </LayersVisibilityContext.Provider>
  );
}
