import {
  LayoutAnimation,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {View} from '../components/view/View.component';
import {Button} from '../components/Button/button';
import {PropsStack} from '../routes/stack.routes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorsContex} from '../context/colors.context';
import {TextInput} from '../components/TextInput/TextInput';
import api from '../utils/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStoreUser} from '../context/user.zustand.context';
import {SocketContex} from '../context/socket.context';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Start(props: PropsStack<'Start'>) {
  LayoutAnimation.linear();
  const {secondary} = useContext(ColorsContex);
  const [form, setForm] = useState(1);
  // const dispatch = useStoreUser(state => state.dispatch);
  // useEffect(()=>{},[]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View style={{alignItems: 'center'}}>
        <AntDesign name="dingding" size={200} color={secondary} />
        <Text style={{fontSize: 30, fontWeight: 'bold', color: secondary}}>
          Title
        </Text>
        {/* <Text style={{color: secondary}}>Eslogan</Text> */}
      </View>
      <View style={{alignItems: 'center', width: '100%'}}>
        {form == 1 && StartForm(secondary, setForm)}
        {form == 2 && <Login props={props} setForm={setForm} />}
        {form == 3 && <Register props={props} setForm={setForm} />}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          width: '60%',
        }}>
        <Button
          secondary
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
          }}>
          <AntDesign name="twitter" size={25} color={secondary} />
        </Button>
        <Button
          secondary
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
          }}>
          <AntDesign name="facebook-square" size={25} color={secondary} />
        </Button>
        <Button
          secondary
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
          }}>
          <AntDesign name="google" size={25} color={secondary} />
        </Button>
      </View>
      <Text style={{color: secondary}}>derechos reservados</Text>
    </View>
  );
}

type dispatch = React.Dispatch<React.SetStateAction<number>>;
interface form {
  props: PropsStack<'Start'>;
  setForm: dispatch;
}

const StartForm = (secondary: string, setForm: dispatch) => {
  return (
    <>
      <Text style={{color: secondary}}>Sign Up</Text>
      <Text style={{color: secondary}}>It's easier to sign up now</Text>
      <Button
        text="Log In"
        style={{width: '60%', marginTop: 30}}
        onPress={() => setForm(2)}
      />
      <Button
        secondary
        text="Sign Up"
        style={{width: '50%'}}
        onPress={() => setForm(3)}
      />
    </>
  );
};
const Login = ({props, setForm}: form) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [save, setSave] = useState(false);
  const [errors, setErrors] = useState({});
  const {connectToWebSockets} = useContext(SocketContex);
  const dispatch = useStoreUser(state => state.dispatch);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const {email: userE, password: userP} = JSON.parse(user);
        email = userE;
        password = userP;
        onSubmit();
      }
    };
    getUser();
  }, []);

  const onSubmit = () => {
    api
      .post('/auth/login', {email, password})
      .then(res => {
        const {data} = res;
        if (data.token) AsyncStorage.setItem('token', data.token);
        connectToWebSockets(data.user.id);
        dispatch(data.user);
        if (save)
          AsyncStorage.setItem('user', JSON.stringify({email, password}));
        props.navigation.replace('Home',{user:data.user});
      })
      .catch(e => {
        console.log(e);

        if (e.response.data.errors) setErrors(e.response.data.errors);
        else if (e.response.data.error)
          setErrors({email: e.response.data.error});
      });
  };

  return (
    <>
      <Text>Login In!</Text>
      <TextInput
        containerProps={{style: styles.Input}}
        label="Email"
        name="email"
        value={email}
        error={errors}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        containerProps={{style: styles.Input}}
        isPaswword
        label="Password"
        name="password"
        value={password}
        error={errors}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <View
        style={{
          flexDirection: 'row',
          width: '75%',
          justifyContent: 'flex-end',
        }}>
        <Button
          text={save ? 'not save' : 'save'}
          style={{paddingVertical: 1, marginVertical: 1}}
          onPress={() => setSave(!save)}
        />
      </View>

      <Button text="Log in" style={{width: '60%'}} onPress={onSubmit} />
      <Button
        secondary
        text="Back"
        style={{width: '50%'}}
        onPress={() => setForm(1)}
      />
    </>
  );
};
const Register = ({props, setForm}: form) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const dispatch = useStoreUser(state => state.dispatch);
  const {connectToWebSockets} = useContext(SocketContex);

  useEffect(() => {
    if (password !== cPassword)
      errors.cPassword = 'Las constraseñas no coinsiden';
    else delete errors.cPassword;
    setErrors({...errors});
  }, [password, cPassword]);

  const onSubmit = () => {
    if (errors.cPassword) return;
    api
      .post('/auth/register', {name, email, password})
      .then(res => {
        const {data} = res;
        if (data.token) AsyncStorage.setItem('token', data.token);
        connectToWebSockets(data.user.id);
        dispatch(data.user);
        props.navigation.replace('Home',{user:data.user});
      })
      .catch(e => setErrors(e.response.data.errors));
  };

  return (
    <>
      <Text>Sign Up!</Text>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{width: '100%'}}>
        <TextInput
          containerProps={{style: styles.Input}}
          label="Name"
          name="name"
          value={name}
          onChangeText={setName}
          error={errors}
        />
        <TextInput
          containerProps={{style: styles.Input}}
          label="Email"
          name="email"
          value={email}
          error={errors}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          containerProps={{style: styles.Input}}
          isPaswword
          label="Password"
          name="password"
          value={password}
          error={errors}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TextInput
          containerProps={{style: styles.Input}}
          isPaswword
          name="cPassword"
          label="Confirm password"
          value={cPassword}
          error={errors}
          onChangeText={setCPassword}
          autoCapitalize="none"
        />
      </ScrollView>

      <Button
        text="Sign Up"
        style={{width: '60%', marginTop: 10}}
        onPress={onSubmit}
      />
      <Button
        secondary
        text="Back"
        style={{width: '50%'}}
        onPress={() => setForm(1)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Input: {
    width: '75%',
  },
});
