import { SafeAreaView, Image, View, Text, StyleSheet, Platform } from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image source={require('../../assets/logo-sm.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.textContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.prativaText}>ASDM PRATIVA</Text>
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
  },
  logo: {
    width: 100,
    height: 100,
    // marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  horizontalLine: {
    width: 80,
    height: 2,
    backgroundColor: '#4a9eff',
    marginVertical: 8,
  },
  prativaText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#009966',
    letterSpacing: 0.5,
    fontFamily: 'Lexend Giga, sans-serif',
  },
});

