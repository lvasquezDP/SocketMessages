import {PermissionsAndroid, Platform} from 'react-native';
import {
  Callback,
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export default class ImagePicker {
  constructor() {
    // this.requestStoragePermission();
  }
  public async requestStoragePermission() {
    try {
        if(Platform.OS === 'ios')return;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permiso de Almacenamiento',
          message:
            'Esta aplicación necesita acceso al almacenamiento para enviar imágenes.',
          buttonNeutral: 'Preguntar luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permiso concedido');
      } else {
        console.log('Permiso denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  static launchCamera(options: CameraOptions, callback?: Callback) {
    return launchCamera(options, callback);
  }

  static launchImageLibrary(options: CameraOptions, callback?: Callback) {
    return launchImageLibrary(options, callback);
  }
}
