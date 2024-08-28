import React from 'react';
import {View, Text} from 'react-native';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ColorsContex} from '../../context/colors.context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Image from '../Image/image.component';
import {IUser} from '../../utils/interfaces/user';

export default function CardUser({
  item,
  onPress,
}: {
  item: IUser;
  horizontal?: boolean;
  onPress?: () => void;
}) {
  const styles = Styles();

  return (
    <View style={styles.card}>
      <Image style={styles.avatar} uri={item.avatar?.Media} />
      <View style={styles.cardBody}>
        <Text style={styles.textHeader}>{item.name}</Text>
        <Text style={styles.textDesc}>{item.email}</Text>
      </View>
      <AntDesign
        name="rightcircleo"
        size={25}
        style={styles.icon}
        onPress={onPress}
      />
    </View>
  );
}

export const Styles = () => {
  const {primary, secondary} = useContext(ColorsContex);

  return StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: primary,
      padding: 20,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    header: {
      height: 100,
      width: 100,
    },
    cardBody: {
      flex: 0.8,
      paddingHorizontal: 15,
      textAlign: 'center',
    },
    textHeader: {
      fontWeight: 'bold',
      color: secondary,
    },
    textDesc: {
      flexWrap: 'wrap',
      fontWeight: '300',
      color: secondary,
    },
    icon: {
      color: secondary,
    },
    avatar: {
      borderRadius: 100,
      padding: 25,
    },
  });
};
