import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {FC} from 'react';
import {Styles} from './button.styles';

interface props extends TouchableOpacityProps {
  secondary?: boolean;
  text?: string;
  propsText?: TextProps;
}

export const Button: FC<props> = props => {
  const styles = Styles();
  return (
    <TouchableOpacity
      {...props}
      style={[styles[props.secondary ? 'secondary' : 'primary'], props.style]}>
      {props.text && (
        <Text
          {...props.propsText}
          children={props.text}
          style={[
            styles[props.secondary ? 'styleTextP' : 'styleTextS'],
            props.propsText?.style,
          ]}
        />
      )}
      {props.children}
    </TouchableOpacity>
  );
};

// const primary = '#000000';
// const secondary = '#FDFBF6';
// // const secondary = '#000000';
// // const primary = '#FDFBF6';

// const styles = StyleSheet.create({
//   primary: {
//     margin: 5,
//     backgroundColor: primary,
//     borderRadius: 25,
//     borderWidth: 3,
//     paddingVertical: 7,
//     paddingHorizontal: 20,
//     borderColor: primary,
//   },
//   secondary: {
//     backgroundColor: secondary,
//     borderRadius: 25,
//     borderWidth: 3,
//     paddingVertical: 7,
//     paddingHorizontal: 20,
//     borderColor: primary,
//   },
//   styleTextP: {
//     color: primary,
//   },
//   styleTextS: {
//     color: secondary,
//   },
// });
