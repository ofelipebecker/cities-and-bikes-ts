import { createContext, useContext, useState, type ReactNode } from 'react';
import { LAYER_KEYS } from '../shared/utils/mapLayers.ts';

type InitialState = {
  [k: string]: boolean;
};

const initialState: InitialState = Object.fromEntries(
  LAYER_KEYS.map((key) => [key, true])
);

type LayersVisibilityContextType = {
  layerVisibility: InitialState;
  setLayerVisibility: React.Dispatch<React.SetStateAction<InitialState>>;
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
  const [layerVisibility, setLayerVisibility] = useState(() => {
    return initialState;
  });

  return (
    <LayersVisibilityContext.Provider
      value={{ layerVisibility, setLayerVisibility }}
    >
      {children}
    </LayersVisibilityContext.Provider>
  );
}
