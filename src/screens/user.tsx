import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {View} from '../components/view/View.component';
import {PropsStack} from '../routes/stack.routes';
import {ColorsContex} from '../context/colors.context';
import {Asset} from 'react-native-image-picker';
import api from '../utils/api/api';
import ImagePicker from '../utils/imagePicker';
import {useStoreUser} from '../context/user.zustand.context';
import Image from '../components/Image/image.component';
import {IUser} from '../utils/interfaces/user';

export default function User(props: PropsStack<'User'>) {
  const {backgroundColor, secondary} = useContext(ColorsContex);
  const [images, setImages] = useState([]);
  const itemZ = useStoreUser(state => state);
  const [item, setItem] = useState<IUser>(props.route.params?.user ?? itemZ);

  const dispatch = useStoreUser(state => state.dispatch);

  const selectImg = (type: 'avatar' | 'imagen') =>{
    if(item.id==itemZ.id)
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) console.log('cancel');
      else if (response.errorMessage) console.log(response.errorMessage);
      else if (response.assets && response.assets[0])
        onSubmit(response.assets[0], type);
    });
  }

  const onSubmit = (img: Asset, rute: string) => {
    let data = new FormData();

    data.append('file', {
      name: img.fileName,
      uri: img.uri,
      type: img.type,
    });
    api
      .post('/files/' + rute, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (props.route.params.user) setItem(res.data);
        else dispatch(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    api
      .get('/images/' + item.id)
      .then(res => {
        setImages(res.data.map((x: any) => x.Media));
      })
      .catch(console.log);
  };

  const {width} = Dimensions.get('window');
  const imageSize = width / 3 - 15;

  const Inf = ({header, value}: {header: string; value: number}) => {
    return (
      <View style={styles.inf}>
        <Text style={styles.textHeader}>{header}</Text>
        <Text style={styles.textValue}>{value} M</Text>
      </View>
    );
  };

  return (
    <View style={[styles.card, {backgroundColor: backgroundColor}]}>
      <View style={[styles.header]}>
        <Image
          contentContainerStyle={{flex: 1}}
          onPress={() => selectImg('imagen')}
          style={styles.cardImage}
          uri={item.img?.Media}
        />
        <Image
          onPress={() => selectImg('avatar')}
          contentContainerStyle={{}}
          style={[styles.avatar, {borderColor: backgroundColor}]}
          uri={item.avatar?.Media}
        />
        <Text style={[styles.textHeader, {color: secondary}]}>{item.name}</Text>
        <Text style={[styles.textDesc, {color: secondary}]}>{item.email}</Text>
      </View>
      <View style={styles.cardBody}>
        <View
          style={{
            width: '80%',
            padding: 0.2,
            backgroundColor: '#ccc',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '80%',
          }}>
          <View style={styles.inf}>
            <Text style={styles.textHeaderINF}>Fotos</Text>
            <Text style={styles.textValue}>{images.length}</Text>
          </View>
          <View style={styles.inf}>
            <Text style={styles.textHeaderINF}>Amigos</Text>
            <Text style={styles.textValue}>0</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={images}
        numColumns={3}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}
        renderItem={({item}) => (
          <Image
            style={{
              width: imageSize,
              height: imageSize,
              margin: 2,
            }}
            // resizeMode='contain'
            uri={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    flex: 1,
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
  },
  header: {
    height: 150,
    paddingHorizontal: 20,
  },
  avatar: {
    position: 'absolute',
    borderRadius: 100,
    padding: 35,
    left: 10,
    // alignSelf: 'center',
    bottom: -35,
    borderWidth: 5,
  },
  cardBody: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    textAlign: 'center',
  },
  inf: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textHeader: {
    marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textHeaderINF: {
    marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textDesc: {
    fontWeight: '200',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 3,
    //   color:secondary
  },
  textValue: {
    fontWeight: '100',
    //   color:secondary
  },
});


