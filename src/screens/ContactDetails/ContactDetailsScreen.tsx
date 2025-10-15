import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  route: RouteProp<RootStackParamList, 'ContactDetails'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ContactDetails'>;
};

const ContactDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { contacts, toggleFavorite, deleteContact } = useContacts();

  const contact = contacts.find((c) => c.id === contactId);

  const handleCallPress = useCallback(() => {
    if (!contact?.phone) return;
    const url = `tel:${contact.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    });
  }, [contact]);

  const handleMessagePress = useCallback(() => {
    if (!contact?.phone) return;
    const url = `sms:${contact.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'SMS is not supported on this device');
      }
    });
  }, [contact]);

  const handleFavoritePress = useCallback(() => {
    if (contact) {
      toggleFavorite(contact.id);
    }
  }, [contact, toggleFavorite]);

  const handleDeletePress = useCallback(() => {
  if (!contact) return;

  Alert.alert(
    'Delete Contact',
    'Are you sure you want to delete this contact?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteContact(contact.id);
            Alert.alert('Deleted', 'Contact has been removed');
            navigation.goBack();
          } catch (error) {
            console.error('Delete failed:', error);
            Alert.alert('Error', 'Failed to delete contact');
          }
        },
      },
    ]
  );
}, [contact, deleteContact, navigation]);

  if (!contact) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Contact not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {contact.firstName} {contact.lastName}
        </Text>
        <TouchableOpacity onPress={handleFavoritePress}>
          <Icon
            name={contact.favorite ? 'star' : 'star-border'}
            size={28}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Company</Text>
      <Text style={styles.value}>{contact.company || '—'}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{contact.email || '—'}</Text>

      <Text style={styles.label}>Phone</Text>
      <Text style={styles.value}>{contact.phone || '—'}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCallPress}>
          <Icon name="call" size={24} color={Colors.text.light} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleMessagePress}>
          <Icon name="message" size={24} color={Colors.text.light} />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Delete contact"
      >
        <Text style={styles.deleteText}>Delete Contact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    padding: Spacing.md,
  },
  centered: {
    ...GlobalStyles.centered,
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  label: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  value: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
  },
  actionText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    marginLeft: Spacing.sm,
  },
  deleteButton: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
});

export default ContactDetailsScreen;