import {FlatList, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {View} from '../components/view/View.component';
import {PropsStack} from '../routes/stack.routes';
import {TextInput} from '../components/TextInput/TextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorsContex} from '../context/colors.context';
import {SocketContex} from '../context/socket.context';
import CardUser from '../components/CardUser/user.component';

export default function Home(props: PropsStack<'Home'>) {
  // WebSocket
  const {secondary} = useContext(ColorsContex);
  const [sql, setSql] = useState('');
  const {state} = useContext(SocketContex);
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
            size={18}
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
              item={item}
              horizontal
              onPress={() => props.navigation.navigate('Message', {user: item})}
            />
          );
        }}
        style={{width: '90%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: '85%',
  },
});
