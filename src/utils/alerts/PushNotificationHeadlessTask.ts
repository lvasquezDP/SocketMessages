import PushNotificationConfig from './PushNotificationConfig';
import {host} from '../api/api';

interface sw {
  type: string;
  payload: {[key: string]: any};
}
interface state {
  users: any[];
  action?: {id: string; type: string};
}

type callback = (obj: {[key: string]: any}) => boolean;

export default function PushNotificationHeadlessTask(
    id: string,
) {
    return async () => {
    console.log('hola');
    // console.log(AppRegistry.getAppKeys());
    
  const connectToWebSockets = (id: string) => {
    const socket = new WebSocket(`ws://${host}/ws?id=${id}`);

    socket.onmessage = event => {
      const {type, payload}: sw = JSON.parse(event.data);
      PushNotificationConfig.showNotification({
        channelId: 'default-channel-id',
        message: 'payload.message.message',
        title: 'segundo plano',
      });
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
    connectToWebSockets(id);
  };
}
