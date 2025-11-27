import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Platform, BackHandler, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import MenuBar from './components/MenuBar';
import ExternalLinksModal from './components/ExternalLinksModal';
import ExternalLinksSheet from './components/ExternalLinksSheet';
import SocialWidget from './components/SocialWidget';
import SplashScreen from './components/SplashScreen';
import ToastMessage from './components/ToastMessage';

import {
  BASE_URL,
  MENU_ITEMS,
  EXTERNAL_LINKS,
  SOCIAL_LINKS,
  JOBMELA_URL,
  SCHEME_URL,
} from './constants/links';

const INITIAL_URL = BASE_URL + MENU_ITEMS[0].url;

export default function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(INITIAL_URL);
  const [actualUrl, setActualUrl] = useState(INITIAL_URL);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const toastTimeoutRef = useRef(null);
  const webViewRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [canGoBack]);

  const showToast = message => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ visible: true, message });
    toastTimeoutRef.current = setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2000);
  };

  const isMenuItemActive = (item, urlValue) => {
    if (!urlValue) {
      return false;
    }

    if (item.label === 'Scheme') {
      return urlValue.startsWith(SCHEME_URL);
    }

    if (item.type === 'course') {
      return urlValue.startsWith(`${BASE_URL}/course`) && !urlValue.startsWith(SCHEME_URL);
    }

    if (item.type === 'jobmela') {
      return urlValue.startsWith(JOBMELA_URL);
    }

    if (item.type === 'internal') {
      return urlValue.startsWith(BASE_URL + item.url);
    }

    return false;
  };

  const handleMenuPress = item => {
    if (item.type === 'externalModal') {
      setShowExternalModal(true);
      return;
    }

    if (item.type === 'course') {
      const courseUrl = BASE_URL + item.url;
      setCurrentUrl(courseUrl);
      setActualUrl(courseUrl);
      showToast('Loading course content...');
      return;
    }

    if (item.type === 'jobmela') {
      setCurrentUrl(item.url);
      setActualUrl(item.url);
      showToast('Opening Job Mela...');
      return;
    }

    const fullUrl = BASE_URL + item.url;
    setCurrentUrl(fullUrl);
    setActualUrl(fullUrl);
    showToast(`Opening ${item.label}...`);
  };

  const handleExternalLinkPress = link => {
    const message = `You are being redirected to an external portal (${link.label}). Continue?`;

    if (Platform.OS === 'web') {
      const proceed = window.confirm(message);
      if (proceed) {
        setShowExternalModal(false);
        window.open(link.url, '_blank');
        showToast(`Opening ${link.label}...`);
      }
      return;
    }

    Alert.alert('External Portal', message, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Proceed',
        onPress: () => {
          setShowExternalModal(false);
          Linking.openURL(link.url);
          showToast(`Opening ${link.label}...`);
        },
      },
    ]);
  };

  const handleSocialPress = url => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
      return;
    }
    Linking.openURL(url);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <View style={styles.iframeWrapper}>
          <iframe title="Skill Mission Assam Course" src={currentUrl} style={iframeStyles} allow="fullscreen" />
        </View>
        <MenuBar
          items={MENU_ITEMS}
          isMenuItemActive={isMenuItemActive}
          activeUrl={currentUrl}
          onItemPress={handleMenuPress}
          disabled={showExternalModal}
        />
        {Platform.OS === 'web' ? (
          <ExternalLinksModal
            visible={showExternalModal}
            links={EXTERNAL_LINKS}
            onLinkPress={handleExternalLinkPress}
            onClose={() => setShowExternalModal(false)}
          />
        ) : (
          <ExternalLinksSheet
            visible={showExternalModal}
            links={EXTERNAL_LINKS}
            onLinkPress={handleExternalLinkPress}
            onClose={() => setShowExternalModal(false)}
          />
        )}
        {!currentUrl || currentUrl === INITIAL_URL ? (
          <SocialWidget links={SOCIAL_LINKS} onPress={handleSocialPress} />
        ) : null}
        <ToastMessage visible={toast.visible} message={toast.message} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={currentUrl}
        ref={webViewRef}
        source={{ uri: currentUrl }}
        startInLoadingState
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack);
          if (navState.url) {
            setActualUrl(navState.url);
          }
        }}
        style={styles.webView}
      />

      <MenuBar
        items={MENU_ITEMS}
        isMenuItemActive={isMenuItemActive}
        activeUrl={actualUrl}
        onItemPress={handleMenuPress}
        disabled={showExternalModal}
      />

      {Platform.OS === 'web' ? (
        <ExternalLinksModal
          visible={showExternalModal}
          links={EXTERNAL_LINKS}
          onLinkPress={handleExternalLinkPress}
          onClose={() => setShowExternalModal(false)}
        />
      ) : (
        <ExternalLinksSheet
          visible={showExternalModal}
          links={EXTERNAL_LINKS}
          onLinkPress={handleExternalLinkPress}
          onClose={() => setShowExternalModal(false)}
        />
      )}

      {actualUrl === INITIAL_URL && (
        <SocialWidget links={SOCIAL_LINKS} onPress={handleSocialPress} />
      )}
      <ToastMessage visible={toast.visible} message={toast.message} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    position: 'relative',
  },
  iframeWrapper: {
    flex: 1,
  },
});

const iframeStyles = {
  width: '100%',
  height: '100%',
  border: 'none',
};

