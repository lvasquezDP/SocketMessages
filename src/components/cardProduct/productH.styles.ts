import { useContext } from 'react';
import {StyleSheet} from 'react-native';
import { ColorsContex } from '../../context/colors.context';

export const StylesH=()=> {
  const {primary,secondary,border}=useContext(ColorsContex);

  return StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: primary,
      // borderWidth: 1,
      // borderColor: border,
      padding: 20,
      alignItems: 'center',
    },
    cardImage: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: 10,
    },
    header: {
      height: 100,
      width: 100,
    },
    avatar: {
      position: 'absolute',
      borderRadius: 100,
      padding: 25,
      right: -25,
      bottom: -10,
      borderWidth: 4,
      backgroundColor: 'red',
      borderColor: secondary,
    },
    cardBody: {
      flex: 0.8,
      paddingHorizontal: 15,
      textAlign: 'center',
    },
    footer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: 10,
    },
    inf: {
      alignItems: 'center',
      margin: 5,
      // padding:5,
      // borderWidth: 1,
      // borderRadius: 10,
      // borderColor: border,
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
    textValue: {
      fontWeight: '200',
      color: secondary,
    },
  });
}
