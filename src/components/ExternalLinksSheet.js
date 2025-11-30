import { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

export default function ExternalLinksSheet({ visible, links, governmentLinks, privateCompanyLinks, onLinkPress, onClose }) {
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

  // Use categorized links if provided, otherwise fall back to flat links array
  const govLinks = governmentLinks || [];
  const privateLinks = privateCompanyLinks || [];
  const flatLinks = links || [];

  const hasCategories = govLinks.length > 0 || privateLinks.length > 0;

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
        {hasCategories ? (
          <>
            {govLinks.length > 0 && (
              <>
                <View style={styles.sectionHeaderWrapper}>
                  <Text style={styles.sectionHeader}>Government Portals</Text>
                </View>
                {govLinks.map(link => (
                  <TouchableOpacity
                    key={link.label}
                    style={styles.sheetButton}
                    onPress={() => onLinkPress(link)}
                  >
                    <Text style={styles.sheetButtonLabel}>{link.label}</Text>
                    <Text style={styles.sheetButtonDescription}>{link.description}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            {privateLinks.length > 0 && (
              <>
                <View style={[styles.sectionHeaderWrapper, styles.privateSectionHeader]}>
                  <Text style={styles.sectionHeader}>Private Job Portals</Text>
                </View>
                {privateLinks.map(link => (
                  <TouchableOpacity
                    key={link.label}
                    style={styles.sheetButton}
                    onPress={() => onLinkPress(link)}
                  >
                    <Text style={styles.sheetButtonLabel}>{link.label}</Text>
                    <Text style={styles.sheetButtonDescription}>{link.description}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        ) : (
          flatLinks.map(link => (
            <TouchableOpacity
              key={link.label}
              style={styles.sheetButton}
              onPress={() => onLinkPress(link)}
            >
              <Text style={styles.sheetButtonLabel}>{link.label}</Text>
              <Text style={styles.sheetButtonDescription}>{link.description}</Text>
            </TouchableOpacity>
          ))
        )}
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
  sectionHeaderWrapper: {
    backgroundColor: '#f0f7ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 0,
    marginBottom: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#1a3a5c',
  },
  privateSectionHeader: {
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a3a5c',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

