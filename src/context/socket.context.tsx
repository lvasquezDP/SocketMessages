import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {host} from '../utils/api/api';

const InitContex: Contex = {
  connectToWebSockets: (id: string) => {},
  subscribe: (type: string, callback: Function) => () => {},
  state: {users: []},
}
interface Contex {
  connectToWebSockets: (id: string) => void;
  subscribe: (type: string, callback: Function) => Function;
  state: state;
}
interface sw {
  type: string;
  payload: {[key: string]: any};
}
interface state {
  users: any[];
  action?: {id: string; type: string};
}

function reducer(state: state, action: sw) {
  switch (action.type) {
    case 'users-conected':
      return {...state, users: action.payload.users};
    case 'message-user':
      return {
        ...state,
        action: {id: action.payload.message.emisor, type: action.type},
      };
    default:
      return state;
  }
}

export const SocketContex = createContext(InitContex);

export const SocketContext: FC<{children: React.ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {users: []});
  const subscriptions = useRef<{[key: string]: Function[]}>({}).current;

  const connectToWebSockets = (id: string) => {
    const socket = new WebSocket(`ws://${host}/ws?id=${id}`);

    socket.onmessage = event => {
      const {type, payload} = JSON.parse(event.data);
      if (subscriptions[type])
        subscriptions[type].forEach(callback => callback(payload));
      dispatch({type, payload});
      console.log({type, payload});
      
    };

    socket.onclose = event => {
      setTimeout(() => {
        console.log('retrying to connect');
        connectToWebSockets(id);
      }, 1500);
    };

    socket.onopen = () => {
      console.log('Connected');
    };
  };

  const subscribe = (type: string, callback: Function) => {
    if (!subscriptions[type]) subscriptions[type] = [];

    subscriptions[type].push(callback);

    return () => {
      subscriptions[type] = subscriptions[type].filter(cb => cb !== callback);
    };
  };

  return (
    <SocketContex.Provider value={{connectToWebSockets, subscribe, state}}>
      {children}
    </SocketContex.Provider>
  );
};

export const useSocketMessage = (type: string, callback: Function) => {
  const {subscribe} = useContext(SocketContex);

  useEffect(() => {
    const unsubscribe = subscribe(type, callback);
    return () => unsubscribe();
  }, [type, callback]);
};
