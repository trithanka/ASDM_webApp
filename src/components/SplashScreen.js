import { SafeAreaView, Image, View, Text, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.textContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.prativaText}>PRATIVA</Text>
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
    width: 200,
    height: 200,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#4a9eff',
    letterSpacing: 0.5,
  },
});

