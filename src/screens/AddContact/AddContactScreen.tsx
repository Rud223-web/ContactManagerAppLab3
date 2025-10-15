import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useContacts } from '../../utils/ContactContext';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { validateContact, Contact } from '../../data/contactsData';
import { Colors, Spacing, GlobalStyles } from '../../styles/globalStyles';

type RootStackParamList = {
  AddContact: { contact?: Contact };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddContact'>;
  route: RouteProp<RootStackParamList, 'AddContact'>;
};

const AddContactScreen: React.FC<Props> = ({ navigation, route }) => {
  const { addContact, updateContact } = useContacts();
  const existingContact = route.params?.contact;
  const isEdit = !!existingContact;

  const [formData, setFormData] = useState({
    firstName: existingContact?.firstName || '',
    lastName: existingContact?.lastName || '',
    email: existingContact?.email || '',
    phone: existingContact?.phone || '',
    company: existingContact?.company || '',
    notes: existingContact?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const companyRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  const handleFieldChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: null }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(async () => {
    const { isValid, errors: validationErrors } = validateContact(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit && existingContact) {
        await updateContact(existingContact.id, formData);
        Alert.alert('Success', 'Contact updated successfully');
      } else {
        await addContact(formData);
        Alert.alert('Success', 'Contact added successfully');
      }
      navigation.goBack();
  } catch (error) {
  console.error('Save contact failed:', error);
  Alert.alert('Error', 'Failed to save contact. Please try again.');
  } finally {
      setLoading(false);
    }
  }, [formData, isEdit, existingContact, addContact, updateContact, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CustomInput
            label="First Name"
            value={formData.firstName}
            onChangeText={value => handleFieldChange('firstName', value)}
            error={errors.firstName || undefined}
            leftIcon="person"
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            blurOnSubmit={false}
          />
          <CustomInput
            ref={lastNameRef}
            label="Last Name"
            value={formData.lastName}
            onChangeText={value => handleFieldChange('lastName', value)}
            error={errors.lastName || undefined}
            leftIcon="person-outline"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          <CustomInput
            ref={emailRef}
            label="Email"
            value={formData.email}
            onChangeText={value => handleFieldChange('email', value)}
            error={errors.email || undefined}
            leftIcon="email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
            blurOnSubmit={false}
          />
          <CustomInput
            ref={phoneRef}
            label="Phone"
            value={formData.phone}
            onChangeText={value => handleFieldChange('phone', value)}
            error={errors.phone || undefined}
            leftIcon="phone"
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={() => companyRef.current?.focus()}
            blurOnSubmit={false}
          />
          <CustomInput
            ref={companyRef}
            label="Company"
            value={formData.company}
            onChangeText={value => handleFieldChange('company', value)}
            leftIcon="business"
            returnKeyType="next"
            onSubmitEditing={() => notesRef.current?.focus()}
            blurOnSubmit={false}
          />
          <CustomInput
            ref={notesRef}
            label="Notes"
            value={formData.notes}
            onChangeText={value => handleFieldChange('notes', value)}
            leftIcon="notes"
            multiline={true}
            numberOfLines={4}
            returnKeyType="done"
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={isEdit ? 'Update Contact' : 'Add Contact'}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  buttonContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.surface,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default AddContactScreen;