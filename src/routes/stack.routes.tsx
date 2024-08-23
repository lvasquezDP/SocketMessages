import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Home from '../screens/home.screen';
import {useContext} from 'react';
import {ColorsContex} from '../context/colors.context';
import Start from '../screens/start';
import Message from '../screens/message.screen';

type RootStackParamList = {
  Start?: {};
  Home?: {email:string,password:string};
  Message: {user:any};
};

export type PropsStack<T extends keyof RootStackParamList> =
StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

export function StackNav() {
  const {backgroundColor, secondary} = useContext(ColorsContex);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: secondary,
        headerStyle: {backgroundColor},
        headerTitleAlign: 'center',
        // headerShown: false,
        // transitionSpec:{close:{animation:'timing',config:{}},open:{animation:'spring',config:{}}}
      }}
      initialRouteName="Start">
      <Stack.Screen options={{headerShown:false}} name="Start" component={Start} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
}
