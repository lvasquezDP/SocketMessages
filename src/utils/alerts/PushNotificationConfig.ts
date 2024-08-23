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
      requestPermissions: false,
      permissions: {alert: true, badge: true, sound: true},
    });
  }

  static showNotification(obj: PushNotificationObject) {
    PushNotification.localNotification(obj);
  }
}

export default PushNotificationConfig;
