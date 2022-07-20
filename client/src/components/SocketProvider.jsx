import React, {useContext, useState, useEffect} from 'react';
import io from 'socket.io-client';
const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export default function SocketProvider({id, children}) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io("https://young-scrubland-17050.herokuapp.com/", {query: {id}});
        setSocket(newSocket);
        //each time call io() -> create a new Socket instance => close everytime update socket -> reduce the amount of 
        //sockets that connected to the server
        //also this trigger the io.on('connection')
        return () => {newSocket.close();}
    }, [id])
    console.log(socket);
    return (
        <SocketContext.Provider value = {socket}>
            {children}
        </SocketContext.Provider>
    )
}
