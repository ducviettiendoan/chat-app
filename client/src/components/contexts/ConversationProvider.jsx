import React, {useContext} from 'react';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationContext = React.createContext();

//small custom Hook
export const useConversation = () => {
    return useContext(ConversationContext);
}

export default function ConversationProvider({id, children}) {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = React.useState(0);
    //storing a new Contact the the state contacts
    const createConversation = (selectedUser) => {
        setConversations(prev => [...prev, {selectedUser, message: []}]);
    }
    const allContacts = useContacts();

    //add new recipient property to each conversation in conversations
    const formatConversations = conversations.map((conver, index)=>{
        //format the contact to display on the page
        const recipient = conver.selectedUser.map((user)=>{
            const contact = allContacts.contacts.find(contact => {
                if (contact.id === user){
                    return contact;
                };
            })
            const name = contact ?  contact.username : contact.id;
            return {id: contact.id, username: name};
        })
        //format the message to display on the page (add fromMe + senderName props to each message object)
        const formatMessage = conver.message.map((mes)=>{
            const contact = allContacts.contacts.find(contact => {
                if (contact.id === mes.sender){
                    return contact;
                };
            })
            const name = contact ?  contact.username : mes.sender;
            const fromMe = (mes.sender === id);
            return {...mes, senderName: name, fromMe};
        })

        let selected = (index === selectedConversationIndex);
        return {...conver, recipient, selected, formatMessage};
    });

    //ultility:
    const matchRecipient = (arr1, arr2) => {
        arr1.sort();
        arr2.sort();
        if (arr1.length !== arr2.length){
            return false;
        }
        for (let i = 0; i<arr1.length; i++){
            if (arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }

    const addMessageToConversation = ({recipient, text, sender}) => {
        //recipient = a list of user Id, text = text input,sender = user with current Id
        setConversations(prev => {
            let matchConversation = false;
            //each message just need the sender and the text content
            const newMessage = {sender, text};
            let newConversations = conversations.map((conver) => {
                if (matchRecipient(conver.selectedUser, recipient)){
                    matchConversation = true;
                    return {...conver, message: [...conver.message, newMessage]}
                }
                return conver;
            })
            if (matchConversation){
                return newConversations;
            }
            else{
                return [...prev, {recipient, message: [newMessage]}]
            }
        })
    }

    const sendMessage = (recipient,text) => {
        addMessageToConversation({recipient, text, sender: id});
    }

    //the final value that ConversationContext.Provider holds
    const output = {
        //all conversations
        conversations: formatConversations, 
        //one selected conversation 
        selectedConversation: formatConversations[selectedConversationIndex], 
        //change the selected conversation
        setSelectedConversationIndex, 
        //create new conversation
        createConversation,
        //to store a message to the conversation
        sendMessage
    }

    return (
        <ConversationContext.Provider value={output}>
            {children}
        </ConversationContext.Provider>
    )
}
