import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ColorsContex} from '../../context/colors.context';

export const Styles = () => {
  const {primary, secondary, backgroundColor} = useContext(ColorsContex);

  return StyleSheet.create({
    primary: {
      margin: 5,
      backgroundColor: secondary,
      borderRadius: 25,
      borderWidth: 3,
      paddingVertical: 7,
      paddingHorizontal: 20,
      borderColor: secondary,
      alignItems: 'center',
    },
    secondary: {
      backgroundColor,
      borderRadius: 25,
      borderWidth: 3,
      paddingVertical: 7,
      paddingHorizontal: 20,
      borderColor: secondary,
      alignItems: 'center',
    },
    styleTextP: {
      color: secondary,
    },
    styleTextS: {
      color: primary,
    },
  });
};
