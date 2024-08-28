import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Home from '../screens/home.screen';
import {useContext} from 'react';
import {ColorsContex} from '../context/colors.context';
import Start from '../screens/start';
import Message from '../screens/message.screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import User from '../screens/user';
import {IUser} from '../utils/interfaces/user';
import Image from '../components/Image/image.component';
import {StyleSheet} from 'react-native';

type RootStackParamList = {
  Start?: {};
  Home?: {};
  Message: {user: IUser};
  User: {user?: IUser};
};

export type PropsStack<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

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
      <Stack.Screen
        options={{headerShown: false}}
        name="Start"
        component={Start}
      />
      <Stack.Screen
        options={props => ({
          headerRight: () => (
            <AntDesign
              name="user"
              color={secondary}
              style={{marginHorizontal: 15}}
              size={20}
              onPress={() => props.navigation.navigate('User')}
            />
          ),
        })}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={props => ({
          title: props.route.params.user.email,
          headerTitleStyle:{fontSize:13},
          headerRight: () => (
            <Image
              contentContainerStyle={styles.container}
              style={styles.Image}
              uri={props.route.params.user.avatar?.Media}
              onPress={()=>props.navigation.navigate('User',{user:props.route.params.user})}
            />
          ),
        })}
        name="Message"
        component={Message}
      />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  Image: {
    width: 30,
    height: 30,
  },
  container: {
    marginHorizontal: 15,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
