import LayersContextProvider from './store/layers-visibility-context.tsx';
import MainNav from './features/nav/MainNav.tsx';

function App() {
  return (
    <LayersContextProvider>
      <MainNav />
    </LayersContextProvider>
  );
}

export default App;
