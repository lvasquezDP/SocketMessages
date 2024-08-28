import {AppRegistry, Platform} from 'react-native';
import PushNotification, {
  PushNotificationObject,
} from 'react-native-push-notification';

class PushNotificationConfig {
  constructor() {
    this.configure();
  }

  async configure() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.configure({
      requestPermissions: Platform.OS === 'ios',
      permissions: {alert: true, badge: true, sound: true},
    });

    // AppRegistry.registerHeadlessTask('RNPushNotificationListenerService', () => async (data) => {
    //   console.log('Notificación recibida en segundo plano:', data);
    //   // Manejar la notificación aquí
    // });
    // PushNotification.localNotificationSchedule({
    //   channelId: 'default-channel-id',
    //   message: "My Notification Message", // (required)
    //   date: new Date(Date.now() + (5 * 1000)), // in 60 secs
    // });
    // // PushNotificationConfig.showNotification({
    // //   invokeApp:false,
    // //   channelId: 'default-channel-id',
    // //   message: 'action.payload.message.message',
    // // });

    // PushNotification.invokeApp({
    //   message:'hola',
    // });
  }

  static showNotification(obj: PushNotificationObject) {
    PushNotification.localNotification(obj);
  }
}

export default PushNotificationConfig;
