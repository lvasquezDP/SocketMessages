import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {View} from '../components/view/View.component';
import CardProduct from '../components/cardProduct/product.component';
import {PropsStack} from '../routes/stack.routes';
import {TextInput} from '../components/TextInput/TextInput';
import {Button} from '../components/Button/button';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorsContex} from '../context/colors.context';
import {useStoreUser} from '../context/user.zustand.context';
import {SocketContex} from '../context/socket.context';
import CardUser from '../components/CardUser/user.component';

export default function Home(props: PropsStack<'Home'>) {
  // WebSocket
  const {secondary} = useContext(ColorsContex);
  const [sql, setSql] = useState('');
  const name = useStoreUser(state => state.name);
  const email = useStoreUser(state => state.email);
  const {state} = useContext(SocketContex);
  const data = [
    {
      image:
        'https://res.cloudinary.com/dxarbtyux/image/upload/v1703315333/color-contrast-inspector/sample-5-bg.webp',
      avatar:
        'https://res.cloudinary.com/dxarbtyux/image/upload/v1703315333/color-contrast-inspector/sample-5-avatar.webp',
      header: 'Tesla',
      description: 'Electric vehicles, giant batteries & solar',
      inform: [
        {header: 'valuation', value: 70},
        {header: 'Followers', value: 21.5},
      ],
    },
  ];
  console.log(state);
  
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <TextInput
        containerProps={{style: styles.Input}}
        label="Buscar"
        name="sql"
        value={sql}
        onChangeText={setSql}
        icon={
          <AntDesign
            name="search1"
            color={secondary}
            onPress={() => console.log('press')}
          />
        }
      />
      <FlatList
        data={state.users}
        renderItem={({item}) => {
          return (
            <CardUser
              item={{header: item.email, description: 'Conected'}}
              horizontal
              onPress={()=>props.navigation.navigate('Message',{user:item})}
            />
          );
        }}
        style={{width:'90%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: '85%',
  },
});
