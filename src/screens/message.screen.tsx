import {FlatList, Image, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {View} from '../components/view/View.component';
import {PropsStack} from '../routes/stack.routes';
import {TextInput} from '../components/TextInput/TextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorsContex} from '../context/colors.context';
import {useSocketMessage} from '../context/socket.context';
import CardMessage, {
  MessageInterface,
} from '../components/CardMessage/message.component';
import api from '../utils/api/api';
import {useStoreUser} from '../context/user.zustand.context';
import ImagePicker from '../utils/imagePicker';
import {Asset} from 'react-native-image-picker';

export default function Message(props: PropsStack<'Message'>) {
  const {secondary, primary} = useContext(ColorsContex);
  const [message, setMessage] = useState('');
  const [img, setImg] = useState<Asset>();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const id = useStoreUser(state => state.id);
  const flatListRef = useRef<FlatList>(null);

  const getMessages = (payload: {[key: string]: any}) => {
    api
      .post('/user/getMessages', {
        emisor: id,
        receptor: props.route.params.user.id,
      })
      .then(res => {
        const {data} = res;
        setMessages(data);
      })
      .catch(e => {
        console.log(e.message);
      });

    return payload.user?.email == props.route.params.user.email;
  };

  useSocketMessage('message-user', getMessages);

  useEffect(() => {
    props.navigation.setOptions({title: props.route.params.user.email});
    getMessages({});
  }, []);

  const onSubmit = () => {
    let data = new FormData();
    data.append('message', message);
    data.append('receptor', props.route.params.user.id);
    data.append('emisor', id);
    console.log(img);
    
    data.append('file', {
      name: img?.fileName,
      uri: img?.uri,
      type: img?.type,
    });
    api
      .post('/user/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        const {data} = res;
        setMessages([...messages, data]);
        setMessage('');
        setImg({});
      })
      .catch(e => {
        console.log(e);
      });
  };

  const selectImg = () =>
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) console.log('cancel');
      else if (response.errorMessage) console.log(response.errorMessage);
      else if (response.assets && response.assets[0])
        setImg(response.assets[0]);
    });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => {
          return <CardMessage item={item} owner={id == item.emisor} />;
        }}
        style={{width: '90%'}}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({animated: true});
        }}
        onLayout={() => {
          flatListRef.current?.scrollToEnd({animated: true});
        }}
      />
      {img?.uri && (
        <View style={styles.imageViewer}>
          <View style={styles.image}>
            <Image style={{width: 50, height: 50}} source={{uri: img?.uri}} />
          </View>
          <AntDesign
            style={[styles.imgClose, {backgroundColor: secondary}]}
            color={primary}
            size={12}
            name="close"
            onPress={() => setImg({})}
          />
        </View>
      )}
      <TextInput
        containerProps={{style: styles.Input}}
        label="Message"
        name="message"
        value={message}
        onChangeText={setMessage}
        icon={
          <AntDesign
            name="arrowright"
            color={secondary}
            size={25}
            onPress={onSubmit}
          />
        }
        leftIcon={
          <AntDesign
            name="ellipsis1"
            color={secondary}
            size={25}
            onPress={selectImg}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: '85%',
  },
  imageViewer: {
    alignSelf: 'flex-start',
    left: 30,
  },
  image: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imgClose: {
    position: 'absolute',
    right: -7,
    top: -7,
    padding: 5,
    overflow: 'hidden',
    borderRadius: 10,
  },
});
