import { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

export default function ExternalLinksSheet({ visible, links, onLinkPress, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      onClosed={onClose}
      modalStyle={styles.modal}
      handleStyle={styles.handle}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <View style={styles.sheetContent}>
        <Text style={styles.sheetTitle}>External Links</Text>
        {links.map(link => (
          <TouchableOpacity
            key={link.label}
            style={styles.sheetButton}
            onPress={() => onLinkPress(link)}
          >
            <Text style={styles.sheetButtonLabel}>{link.label}</Text>
            <Text style={styles.sheetButtonDescription}>{link.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // paddingHorizontal: 16,
    // paddingBottom: 24,
  },
  handle: {
    backgroundColor: '#d9d9d9',
  },
  sheetContent: {
    paddingTop: 12,
    paddingBottom: 2,
    // gap: 6,
  },
  sheetTitle: {
    fontSize: 24,
    paddingHorizontal: 16,
    fontWeight: '700',
    color: '#1a3a5c',
    // textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sheetButton: {
    // backgroundColor: '#f0f7ff',
    // borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sheetButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    // color: '#1a3a5c',
  },
  sheetButtonDescription: {
    fontSize: 12,
    color: '#4e4e4e',
    marginTop: 2,
  },
});

