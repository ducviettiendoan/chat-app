import React, {useContext} from 'react';
import useLocalStorage from '../../customHooks/useLocalStorage';

const ContactsContext = React.createContext();

//small custom Hook
export const useContacts = () => {
    return useContext(ContactsContext);
}


export default function ContactsProvider({children}) {
    const [contacts, setContacts] = useLocalStorage('contacts', []);
    //storing a new Contact the the state contacts
    const storeNewContacts = (id, username) => {
        setContacts(prev => {return [...prev, {id, username}]});
    }
    return (
        <ContactsContext.Provider value={{contacts, storeNewContacts}}>
            {children}
        </ContactsContext.Provider>
    )
}
