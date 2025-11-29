import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Platform, BackHandler, Alert, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MenuBar from './components/MenuBar';
import ExternalLinksModal from './components/ExternalLinksModal';
import ExternalLinksSheet from './components/ExternalLinksSheet';
import SocialWidget from './components/SocialWidget';
import SplashScreen from './components/SplashScreen';
import ToastMessage from './components/ToastMessage';
import OnlineCoursePage from './components/OnlineCoursePage';

import {
  BASE_URL,
  MENU_ITEMS,
  EXTERNAL_LINKS,
  SOCIAL_LINKS,
  JOBMELA_URL,
  ONLINE_COURSE_LINKS,
} from './constants/links';

const INITIAL_URL = BASE_URL + MENU_ITEMS[0].url;

export default function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(INITIAL_URL);
  const [actualUrl, setActualUrl] = useState(INITIAL_URL);
  const [showOnlineCourse, setShowOnlineCourse] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const toastTimeoutRef = useRef(null);
  const splashTimerRef = useRef(null);
  const webViewRef = useRef(null);

  useEffect(() => {
    // Auto-hide splash screen after 3 seconds on initial load only
    splashTimerRef.current = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => {
      if (splashTimerRef.current) {
        clearTimeout(splashTimerRef.current);
      }
    };
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

  const isRootMenuUrl = urlValue => {
    if (!urlValue) {
      return false;
    }
    // Remove query parameters for comparison
    const cleanUrl = urlValue.split('?')[0].replace(/\/$/, ''); // Remove trailing slash
    
    // Check if URL matches any root menu URL exactly
    return MENU_ITEMS.some(item => {
      if (item.type === 'externalModal' || item.type === 'onlineCourse') {
        return false;
      }
      let rootUrl;
      if (item.type === 'jobmela') {
        rootUrl = item.url.replace(/\/$/, '');
      } else {
        rootUrl = (BASE_URL + item.url).replace(/\/$/, '');
      }
      return cleanUrl === rootUrl;
    });
  };

  const isMenuItemActive = (item, urlValue) => {
    if (item.type === 'onlineCourse') {
      return showOnlineCourse;
    }

    // If online course is showing, don't mark other items as active
    if (showOnlineCourse) {
      return false;
    }

    if (!urlValue) {
      return false;
    }

    if (item.type === 'course') {
      return urlValue.startsWith(`${BASE_URL}/course`);
    }

    if (item.type === 'jobmela') {
      return urlValue.startsWith(JOBMELA_URL);
    }

    if (item.type === 'internal') {
      return urlValue.startsWith(BASE_URL + item.url);
    }

    return false;
  };

  const loadUrl = targetUrl => {
    const timestamp = Date.now();
    const separator = targetUrl.includes('?') ? '&' : '?';
    const versionedUrl = `${targetUrl}${separator}v=${timestamp}`;
    setCurrentUrl(versionedUrl);
    setActualUrl(targetUrl);
  };

  const handleMenuPress = item => {
    if (item.type === 'externalModal') {
      setShowExternalModal(true);
      return;
    }

    if (item.type === 'onlineCourse') {
      setShowOnlineCourse(true);
      return;
    }

    if (item.type === 'course') {
      setShowOnlineCourse(false);
      const courseUrl = BASE_URL + item.url;
      loadUrl(courseUrl);
      showToast('Loading course content...');
      return;
    }

    if (item.type === 'jobmela') {
      setShowOnlineCourse(false);
      loadUrl(item.url);
      showToast('Opening Job Mela...');
      return;
    }

    setShowOnlineCourse(false);
    const fullUrl = BASE_URL + item.url;
    loadUrl(fullUrl);
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

  const handleOnlineCourseLinkPress = link => {
    const message = `You are being redirected to ${link.label}. Continue?`;

    if (Platform.OS === 'web') {
      const proceed = window.confirm(message);
      if (proceed) {
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
        {showOnlineCourse ? (
          <OnlineCoursePage 
            links={ONLINE_COURSE_LINKS} 
            onLinkPress={handleOnlineCourseLinkPress}
          />
        ) : (
          <View style={styles.iframeWrapper}>
            <iframe
              key={currentUrl}
              title="Skill Mission Assam Course"
              src={currentUrl}
              style={iframeStyles}
              allow="fullscreen"
            />
          </View>
        )}
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
        {isRootMenuUrl(currentUrl) && !showOnlineCourse && (
          <SocialWidget links={SOCIAL_LINKS} onPress={handleSocialPress} />
        )}
        <ToastMessage visible={toast.visible} message={toast.message} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showOnlineCourse ? (
        <OnlineCoursePage 
          links={ONLINE_COURSE_LINKS} 
          onLinkPress={handleOnlineCourseLinkPress}
        />
      ) : (
        <WebView
          key={currentUrl}
          ref={webViewRef}
          source={{ uri: currentUrl }}
          startInLoadingState
          onNavigationStateChange={navState => {
            setCanGoBack(navState.canGoBack);
            if (navState.url) {
              const sanitizedUrl = navState.url.split('?')[0];
              setActualUrl(sanitizedUrl);
            }
          }}
          style={styles.webView}
        />
      )}

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

      {isRootMenuUrl(actualUrl) && !showOnlineCourse && (
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

