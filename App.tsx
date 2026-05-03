import './global.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/common/ToastConfig';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
