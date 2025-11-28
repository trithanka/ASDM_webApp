import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACTIVE_COLOR } from '../constants/links';

export default function MenuBar({ items, isMenuItemActive, activeUrl, onItemPress, disabled = false }) {
  return (
    <View
      style={[styles.menuBar, disabled && styles.menuBarDimmed]}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      {items.map((item, index) => {
        const isActive = isMenuItemActive(item, activeUrl);
        return (
          <TouchableOpacity
            key={`${item.label}-${index}`}
            style={[styles.menuItem, isActive && styles.menuItemActive]}
            onPress={() => onItemPress(item)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={20}
              color={isActive ? ACTIVE_COLOR : '#8b8b8b'}
            />
            <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
  },
  menuBarDimmed: {
    opacity: 0.4,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 5,
    // borderRadius: 10,    
    gap: 2,
  },
  menuItemActive: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    // borderRadius: 12,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(52, 211, 153, 1)',
  },
  menuText: {
    color: '#8b8b8b',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  menuTextActive: {
    color: ACTIVE_COLOR,
    fontWeight: '600',
  },
});

