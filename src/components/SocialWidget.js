import { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SocialWidget({ links, onPress }) {
  if (!links?.length) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const animationDuration = 800; // Total time for one button animation
    const pauseBetween = 400; // Pause before next button starts
    const totalCycle = animationDuration + pauseBetween;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % links.length);
    }, totalCycle);

    return () => clearInterval(interval);
  }, [links.length]);

  return (
    <View style={styles.socialWidgetContainer} pointerEvents="box-none">
      <View style={styles.socialWidget}>
        {links.map((link, index) => (
          <AnimatedButton
            key={link.label}
            link={link}
            onPress={onPress}
            isActive={activeIndex === index}
          />
        ))}
      </View>
    </View>
  );
}

function AnimatedButton({ link, onPress, isActive }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isActive) {
      // Reset to default when not active
      scaleAnim.setValue(1);
      pulseAnim.setValue(1);
      return;
    }

    // Smooth bounce animation
    const bounceAnimation = Animated.sequence([
      // Scale up with bounce
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Bounce back
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Settle to normal
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    bounceAnimation.start();
  }, [isActive, scaleAnim, pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.animatedButtonContainer,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.pulseRing,
          {
            backgroundColor: link.bgColor,
            transform: [{ scale: pulseAnim }],
            opacity: pulseAnim.interpolate({
              inputRange: [1, 1.1, 1.4],
              outputRange: [0, 0.3, 0],
            }),
          },
        ]}
      />
      <TouchableOpacity
        style={[styles.socialButton, { backgroundColor: link.bgColor }]}
        onPress={() => onPress(link.url)}
        accessibilityRole="button"
        accessibilityLabel={`Open ${link.label}`}
      >
        <MaterialCommunityIcons name={link.icon} size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  socialWidgetContainer: {
    position: 'absolute',
    right: 10,
    top: '40%',
    transform: [{ translateY: -60 }],
    zIndex: 30,
  },
  socialWidget: {
    alignItems: 'center',
    gap: 6,
  },
  animatedButtonContainer: {
    position: 'relative',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  pulseRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});

