import './global.css';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { useAppSelector } from './src/redux/hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/common/ToastConfig';

const ThemedApp = () => {
  const theme = useAppSelector((state) => state.auth.theme);
  return (
    <View className={`flex-1${theme === 'dark' ? ' dark' : ''}`}>
      <Navigation />
      <Toast config={toastConfig} />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemedApp />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
