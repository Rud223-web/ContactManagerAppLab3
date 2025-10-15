import { Contact } from '../data/contactsData';

export type RootStackParamList = {
  ContactList: undefined;
  AddContact: { contact?: Contact }; 
  ContactDetails: { contactId: string };
};