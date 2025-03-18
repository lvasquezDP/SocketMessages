import {AppRegistry, PermissionsAndroid, Platform} from 'react-native';
import PushNotification, {
  PushNotificationObject,
} from 'react-native-push-notification';

class PushNotificationConfig {
  constructor() {
    this.configure();
  }

  async configure() {
    if (Platform.OS == 'android') this.AndroidPermissions();
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
    // PushNotification.localNotification({
    //   channelId: 'default-channel-id',
    //   message: "My Notification Message", // (required)
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
  async AndroidPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'The App Permission',
          message: 'The App needs access notifications ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

export default PushNotificationConfig;
