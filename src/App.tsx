import LayersContextProvider from './store/layers-visibility-context.tsx';
import BikeMap from './features/bikemap/components/BikeMap.tsx';
import MainNav from './features/nav/MainNav.tsx';

function App() {
  return (
    <LayersContextProvider>
      <MainNav />
      <BikeMap />
    </LayersContextProvider>
  );
}

export default App;
