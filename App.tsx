import 'react-native-gesture-handler';
import React from 'react';
import {ColorsContext} from './src/context/colors.context';
import {NavigationContainer} from '@react-navigation/native';
import {StackNav} from './src/routes/stack.routes';
import {SocketContext} from './src/context/socket.context';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ColorsContext>
        <SocketContext>
          <StackNav />
        </SocketContext>
      </ColorsContext>
    </NavigationContainer>
  );
}

export default App;
