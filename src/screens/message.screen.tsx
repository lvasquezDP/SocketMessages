import {FlatList, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {View} from '../components/view/View.component';
import {PropsStack} from '../routes/stack.routes';
import {TextInput} from '../components/TextInput/TextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorsContex} from '../context/colors.context';
import {useSocketMessage} from '../context/socket.context';
import {Text} from 'react-native';
import CardMessage, {
  MessageInterface,
} from '../components/CardMessage/message.component';
import api from '../utils/api/api';
import {useStoreUser} from '../context/user.zustand.context';

export default function Message(props: PropsStack<'Message'>) {
  const {secondary} = useContext(ColorsContex);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const id = useStoreUser(state => state.id);
  const flatListRef = useRef<FlatList>(null);

  const getMessages = () => {
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
  };

  useSocketMessage('message-user', getMessages);

  useEffect(() => {
    getMessages();
  }, []);

  const onSubmit = () => {
    api
      .post('/user/', {emisor: id, receptor: props.route.params.user.id, message})
      .then(res => {
        const {data} = res;
        setMessages([...messages, data]);
        setMessage('');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Text style={{color: secondary}}>{props.route.params.user.email}</Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: '85%',
  },
});
