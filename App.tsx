import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './global.css';
import { persistor, store } from './src/redux/store';
import LandingScreen from './src/screens/home/LandingScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LandingScreen />
      </PersistGate>
    </Provider>
  );
}
