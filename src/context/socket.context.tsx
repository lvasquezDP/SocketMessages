import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {host} from '../utils/api/api';
import PushNotificationConfig from '../utils/alerts/PushNotificationConfig';

type callback = (obj: {[key: string]: any}) => boolean;

const InitContex: Contex = {
  connectToWebSockets: id => {},
  subscribe: (type, callback) => () => {},
  state: {users: []},
};
interface Contex {
  connectToWebSockets: (id: string) => void;
  subscribe: (type: string, callback: callback) => Function;
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
      if(action.payload.message.img.length==1)
      PushNotificationConfig.showNotification({
        channelId: 'default-channel-id',
        title: action.payload.user.email,
        message: action.payload.message.message,
        picture:action.payload.message.img[0].Media,
      });
      else
      PushNotificationConfig.showNotification({
        channelId: 'default-channel-id',
        title: action.payload.user.email,
        message: action.payload.message.message+'\n Con '+action.payload.message.img.length+' imagenes',
      });
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
  const subscriptions = useRef<{[key: string]: callback[]}>({}).current;

  const connectToWebSockets = (id: string) => {
    const socket = new WebSocket(`ws://${host}/ws?id=${id}`);

    socket.onmessage = event => {
      const {type, payload}: sw = JSON.parse(event.data);
      let res = true;
      if (subscriptions[type])
        res = subscriptions[type]
          .map(callback => callback(payload))
          .some(x => x == false);

      if (res) dispatch({type, payload});
      // console.log({type, payload});
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

  const subscribe = (type: string, callback: callback) => {
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

export const useSocketMessage = (type: string, callback: callback) => {
  const {subscribe} = useContext(SocketContex);

  useEffect(() => {
    const unsubscribe = subscribe(type, callback);
    return () => unsubscribe();
  }, [type, callback]);
};
