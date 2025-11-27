import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SocialWidget({ links, onPress }) {
  if (!links?.length) {
    return null;
  }

  return (
    <View style={styles.socialWidgetContainer} pointerEvents="box-none">
      <View style={styles.socialWidget}>
        {links.map(link => (
          <TouchableOpacity
            key={link.label}
            style={[styles.socialButton, { backgroundColor: link.bgColor }]}
            onPress={() => onPress(link.url)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${link.label}`}
          >
            <MaterialCommunityIcons name={link.icon} size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialWidgetContainer: {
    position: 'absolute',
    right: 16,
    top: '40%',
    transform: [{ translateY: -60 }],
    zIndex: 30,
  },
  socialWidget: {
    alignItems: 'center',
    gap: 10,
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
});

