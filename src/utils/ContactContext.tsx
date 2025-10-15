import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleContacts, Contact } from '../data/contactsData';

interface ContactContextType {
  contacts: Contact[];
  loading: boolean;
  addContact: (contactData: Partial<Contact>) => Promise<Contact>;
  updateContact: (contactId: string, contactData: Partial<Contact>) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
  toggleFavorite: (contactId: string) => Promise<void>;
  refreshContacts: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const stored = await AsyncStorage.getItem('contacts');
      if (stored) {
        setContacts(JSON.parse(stored));
      } else {
        setContacts(sampleContacts);
        await AsyncStorage.setItem('contacts', JSON.stringify(sampleContacts));
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
      setContacts(sampleContacts);
    } finally {
      setLoading(false);
    }
  };

  const saveContacts = async (newContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
    } catch (error) {
      console.error('Failed to save contacts:', error);
    }
  };

  const addContact = async (contactData: Partial<Contact>): Promise<Contact> => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      favorite: false,
    } as Contact;
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
    return newContact;
  };

  const updateContact = async (contactId: string, contactData: Partial<Contact>) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, ...contactData } : contact
    );
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
  };

  const deleteContact = async (contactId: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
  };

  const toggleFavorite = async (contactId: string) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
    );
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
  };

  const value: ContactContextType = {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    refreshContacts: loadContacts,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};