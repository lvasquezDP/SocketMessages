import { useContext } from 'react';
import {StyleSheet} from 'react-native';
import { ColorsContex } from '../../context/colors.context';

export const Styles=()=> {
  const {primary,secondary,border}=useContext(ColorsContex);

  return StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: primary,
      // borderWidth: 1,
      // borderColor: border,
      padding: 20,
      // alignItems:'center',
    },
    cardImage: {
      flex:1,
      overflow:'hidden',
      borderRadius: 10,
    },
    header: {
      height: 100,
    },
    avatar: {
      position: 'absolute',
      borderRadius: 100,
      padding: 25,
      alignSelf: 'center',
      bottom: -25,
      borderWidth: 4,
      backgroundColor: 'red',
      borderColor: secondary,
    },
    cardBody: {
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
      paddingVertical: 15,
      textAlign: 'center',
    },
    footer: {
      flexWrap:'wrap',
      flexDirection:'row',
      justifyContent:'center',
    },
    inf: {
      alignItems: 'center',
      margin:10,
      // padding:5,
      // borderWidth: 1,
      // borderRadius: 10,
      // borderColor: border,
    },
    textHeader:{
      fontWeight:'bold',
      color:secondary
    },
    textDesc:{
      fontWeight:'300',
      textAlign:'center',
      color:secondary
    },
    textValue:{
      fontWeight:'200',
      color:secondary
    }
  });
}
