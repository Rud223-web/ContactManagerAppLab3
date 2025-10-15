import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen';
import { ContactProvider } from './src/utils/ContactContext';

type RootStackParamList = {
  ContactList: undefined;
  AddContact: undefined;
  ContactDetails: { contactId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <ContactProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ContactList">
            <Stack.Screen
              name="ContactList"
              component={ContactListScreen}
              options={{ title: 'Contacts' }}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContactScreen}
              options={{ title: 'Add Contact' }}
            />
            <Stack.Screen
              name="ContactDetails"
              component={ContactDetailsScreen}
              options={{ title: 'Contact Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactProvider>
    </SafeAreaProvider>
  );
};

export default App;