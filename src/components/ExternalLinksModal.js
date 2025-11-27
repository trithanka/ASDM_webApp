import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

export default function ExternalLinksModal({ visible, links, onLinkPress, onClose }) {
  if (!visible) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>External Links</Text>
            <ScrollView
              style={styles.modalLinkScroll}
              contentContainerStyle={styles.modalLinkScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {links.map(link => (
                <TouchableOpacity
                  key={link.label}
                  style={styles.modalLinkButton}
                  onPress={() => onLinkPress(link)}
                >
                  <Text style={styles.modalLinkLabel}>{link.label}</Text>
                  <Text style={styles.modalLinkDescription}>{link.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 50,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a3a5c',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalLinkButton: {
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  modalLinkScroll: {
    maxHeight: 440,
    width: '100%',
  },
  modalLinkScrollContent: {
    paddingBottom: 8,
  },
  modalLinkLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a3a5c',
  },
  modalLinkDescription: {
    fontSize: 12,
    color: '#4a4a4a',
    marginTop: 4,
  },
  modalCloseButton: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1a3a5c',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

