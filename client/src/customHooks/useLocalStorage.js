import React, {useEffect, useState} from 'react'

const PREFIX = "chat-app-clone-";
/*
    useLocalStorage is a custom Hook of useState
*/
//key is where the thing you store in localStorange. (to put it to the prefixKey -> find the correct value)
//initialValue is the parameter that you pass to useState (could be as a function or just a variable)

export default function useLocalStorage(key, initialValue) {
    //read from localStorage + store data to our state
    let prefixKey = PREFIX + key;
    const [value, setValue] = useState(()=>{
        //get the value on localStorage 
        const jsonVal = localStorage.getItem(prefixKey);
        //every return below are all for set the value [value, setValue] initially
        if (jsonVal != null){
            return JSON.parse(JSON.stringify(jsonVal));         
        }
        //passing function to initialValue (useState(()=>{})) 
        if (typeof(initialValue) === "function"){
            return initialValue();
        }else{
            return initialValue;
        }
    });

    //get value(state) and save to the localStorage
    useEffect(()=>{
        //set the value you want to store to localStorage
        if (value){
            localStorage.setItem(prefixKey, value);
        }
    }, [prefixKey,value])

    return [value, setValue];
}
