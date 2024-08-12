import {
  StyleSheet,
  Text,
  TextInput as Input,
  View,
  TextInputProps,
  ViewProps,
} from 'react-native';
import React, {FC, useContext} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {ColorsContex} from '../../context/colors.context';

interface props extends TextInputProps {
  label?: string;
  name?: string;
  containerProps?: ViewProps;
  isPaswword?: boolean;
  error?: {[key: string]: string};
  icon?: React.ReactElement;
}

export const TextInput: FC<props> = (props): React.ReactElement => {
  const {name = ''} = props;
  const {secondary, backgroundColor} = useContext(ColorsContex);

  const styles = StyleSheet.create({
    Input: {
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 13,
      paddingVertical: 9,
      minWidth: 120,
      borderColor: props.error && props.error[name] ? 'red' : secondary,
      color: secondary,
    },
    label: {
      top: -9,
      marginLeft: 15,
      backgroundColor,
      zIndex: 1,
      position: 'absolute',
      color: secondary,
    },
    container: {
      margin: 10,
    },
    icon: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      right: 10,
      bottom:3,
    },
    error: {
      alignSelf: 'flex-start',
      fontSize: 10,
      color: 'red',
    },
  });

  return (
    <View
      {...props.containerProps}
      style={[styles.container, props.containerProps?.style]}>
      <View>
        <Text style={styles.label}>{props.label}</Text>
        <Input
          style={[styles.Input, props.style]}
          secureTextEntry={props.isPaswword}
          {...props}
        />
        {(props.isPaswword || props.icon) && (
          <View style={styles.icon}>
            {props.icon || (
              <EvilIcons
                name="lock"
                color={secondary}
                size={25}
              />
            )}
          </View>
        )}
      </View>
      {props.error && props.error[name] && (
        <Text style={styles.error}>{props.error[name]}</Text>
      )}
    </View>
  );
};
