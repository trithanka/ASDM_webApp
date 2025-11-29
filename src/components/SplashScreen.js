import { SafeAreaView, Image, View, Text, StyleSheet, Platform } from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <View style={styles.centerSection}>
        <Image 
          source={require('../../assets/logo-sm.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      <View style={styles.textContainer}>
        <View style={styles.horizontalLine} />
        {Platform.OS === 'web' ? (
          <Text style={[styles.prativaText, { fontFamily: '"Lexend Giga", sans-serif' }]}>
            ASDM Pratibha
          </Text>
        ) : (
          <>
            <Text style={styles.asdmText}>Assam Skill Development Mission</Text>
            <Text style={styles.prativaText}>Pratibha</Text>
          </>
        )}
      </View>
      </View>
      <View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
      
      <View style={styles.bottomSection}>
        <Image 
          source={require('../../assets/emblem-logo.png')} 
          style={styles.emblemLogo} 
          resizeMode="contain" 
        />
        <View style={styles.govtTextContainer}>
          <Text style={styles.mainTitle}>SKILL, EMPLOYMENT & ENTREPRENEURSHIP DEPARTMENT</Text>
          <Text style={styles.departmentText}>Government of Assam</Text>
          {/* <Text style={styles.govtText}>Government of Assam</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 100,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  emblemLogo: {
    width: 60,
    height: 60,
    marginRight: 0,
    marginLeft: 20,
  },
  govtTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: 200,
  },
  mainTitle: {
    fontSize: Platform.OS === 'web' ? 14 : 12,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'left',
    marginTop: 10,
    // letterSpacing: 0.5,
    // lineHeight: Platform.OS === 'web' ? 28 : 22,
  },
  departmentText: {
    fontSize: Platform.OS === 'web' ? 12 : 10,
    fontWeight: '400',
    color: '#6a7282',
    textAlign: 'left',
    marginBottom: 0,
    // lineHeight: Platform.OS === 'web' ? 20 : 18,
  },
  govtText: {
    fontSize: Platform.OS === 'web' ? 12 : 10,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'left',
    fontStyle: 'italic',
    lineHeight: Platform.OS === 'web' ? 18 : 16,
  },
  logo: {
    width: 120,
    height: 120,
    // marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
    // marginTop: 10,
  },
  horizontalLine: {
    width: 80,
    height: 0,
    backgroundColor: '#4a9eff',
    // marginVertical: 8,
  },
  asdmText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#364153',
    textAlign: 'center',
    textTransform: 'uppercase',
    // letterSpacing: 0.5,
    ...(Platform.OS === 'web' && {
      fontFamily: '"Lexend Giga", sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }),
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#364153',
    textAlign: 'center',
    marginVertical: 50,
  },
  prativaText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#364153',
    textAlign: 'center',
    // letterSpacing: 0.5,
    ...(Platform.OS === 'web' && {
      fontFamily: '"Lexend Giga", sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }),
  },
});

