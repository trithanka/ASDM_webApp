import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRoot from './src/AppRoot';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Check if font is already loaded
      if (document.querySelector('link[href*="Lexend+Giga"]')) {
        return;
      }
      
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@100..900&display=swap';
      link.rel = 'stylesheet';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      // Preload the font
      const fontLink = document.createElement('link');
      fontLink.rel = 'preconnect';
      fontLink.href = 'https://fonts.googleapis.com';
      document.head.appendChild(fontLink);
      
      const fontLink2 = document.createElement('link');
      fontLink2.rel = 'preconnect';
      fontLink2.href = 'https://fonts.gstatic.com';
      fontLink2.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink2);
      
      // Add a style tag to ensure font is available
      const style = document.createElement('style');
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@100..900&display=swap');
        * {
          font-family: 'Lexend Giga', sans-serif;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppRoot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
