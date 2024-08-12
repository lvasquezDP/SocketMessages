import {View as Vieww, ViewProps} from 'react-native';
import React, {FC, useContext} from 'react';
import {ColorsContex} from '../../context/colors.context';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props extends ViewProps {}

export const View: FC<Props> = (props): React.ReactElement => {
  const {backgroundColor} = useContext(ColorsContex);

  //   const back = 'rgb(242,244,247)';
  return <Vieww {...props} style={[{backgroundColor}, props.style]} />;
};
