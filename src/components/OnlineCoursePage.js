import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Linking, Platform, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OnlineCoursePage({ links, onLinkPress }) {
  const handleLinkPress = link => {
    if (onLinkPress) {
      onLinkPress(link);
      return;
    }

    const message = `You are being redirected to ${link.label}. Continue?`;

    if (Platform.OS === 'web') {
      const proceed = window.confirm(message);
      if (proceed) {
        window.open(link.url, '_blank');
      }
      return;
    }

    Alert.alert('External Portal', message, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Proceed',
        onPress: () => {
          Linking.openURL(link.url);
        },
      },
    ]);
  };

  if (!links || links.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No online courses available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Online Courses</Text>
        <Text style={styles.headerSubtitle}>Explore skill development programs</Text>
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        bounces={false}
        alwaysBounceVertical={false}
      >
        {links && links.length > 0 ? (
          links.map((link, index) => (
            <TouchableOpacity
              key={`${link.label}-${index}`}
              style={styles.bannerCard}
              onPress={() => handleLinkPress(link)}
              activeOpacity={0.8}
            >
              <View style={styles.bannerImageContainer}>
                {link.image ? (
                  <Image 
                    source={{ uri: link.image }} 
                    style={styles.bannerImage}
                    resizeMode="contain"
                    onError={() => console.log('Image failed to load:', link.image)}
                  />
                ) : (
                  <View style={styles.bannerImagePlaceholder}>
                    <MaterialCommunityIcons name="book-open-variant" size={40} color="#8b8b8b" />
                  </View>
                )}
              </View>
              <View style={styles.bannerContent}>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerTitle} numberOfLines={1}>{link.label}</Text>
                  <Text style={styles.bannerDescription} numberOfLines={2}>{link.description}</Text>
                </View>
                <View style={styles.bannerAction}>
                  <Text style={styles.bannerActionText}>Explore</Text>
                  <MaterialCommunityIcons name="arrow-right" size={18} color={ACTIVE_COLOR} />
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No courses available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const ACTIVE_COLOR = 'rgba(52, 211, 153, 0.8)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 100,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    zIndex: 10,
    ...(Platform.OS === 'web' && {
      position: 'sticky',
      top: 0,
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a3a5c',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
  },
  bannerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    minHeight: 100,
    maxHeight: 130,
  },
  bannerImageContainer: {
    width: 100,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    maxHeight: 80,
  },
  bannerImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    minHeight: 100,
    overflow: 'hidden',
  },
  bannerTextContainer: {
    flex: 1,
    flexShrink: 1,
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a3a5c',
    marginBottom: 6,
    lineHeight: 20,
  },
  bannerDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  bannerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  bannerActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: ACTIVE_COLOR,
  },
});

