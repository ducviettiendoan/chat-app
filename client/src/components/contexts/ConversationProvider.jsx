import React, {useContext, useEffect, useCallback} from 'react';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from '../SocketProvider';

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
    //get all contacts
    const allContacts = useContacts();
    //get the socket 
    const socket = useSocket();


    //add new recipient property to each conversation in conversations
    console.log(conversations);
    const formatConversations = conversations.map((conver, index)=>{
        //format the contact to display on the page
        const recipient = conver.selectedUser.map((user)=>{
            const contact = allContacts.contacts.find(contact => {
                if (contact.id === user){
                    return contact;
                }
            })
            const name = contact ? contact.username : user;
            return {id: user, username: name};
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
        //update old form message to new formatMessage
        conver.message = formatMessage;
        let selected = (index === selectedConversationIndex);
        return {...conver, recipient, selected};
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

    const addMessageToConversation = useCallback(({recipient, text, sender}) => {
        //recipient = a list of user Id, text = text input,sender = user with current Id
        console.log({recipient, text, sender});
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
                return [...prev, {selectedUser: recipient, message: [newMessage]}]
            }
        })
    }, [conversations, setConversations])
    
    //to control when to trigger socket on receive-message event
    useEffect(() => {
        if (socket == null) return;
        socket.on('receive-message', addMessageToConversation);
        console.log(conversations);              
        return () => {
            //remove all listeners in this receive-message event
            socket.off('receive-message');
        };
    }, [socket, addMessageToConversation]);

    const sendMessage = (recipient,text) => {
        socket.emit('send-message', {recipient, text});
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
