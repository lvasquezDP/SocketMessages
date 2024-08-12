import React from 'react';
import {View, Text, Image} from 'react-native';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ColorsContex} from '../../context/colors.context';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface MessageInterface {
  emisor: string;
  receptor: string;
  message: string;
  entregado: string;
  visto: string;
}

export default function CardMessage({
  item,
  onPress,
  owner = false,
}: {
  item: MessageInterface;
  horizontal?: boolean;
  onPress?: () => void;
  owner?: boolean;
}) {
  const styles = Styles(owner);

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.textHeader}>{item.message}</Text>
        {owner && (
          <View style={styles.status}>
            <AntDesign
              name="check"
              size={12}
              style={styles.icon}
              onPress={onPress}
            />
            {item.entregado && (
              <AntDesign
                name="check"
                size={12}
                style={styles.icon}
                onPress={onPress}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export const Styles = (owner: boolean) => {
  const {primary, secondary} = useContext(ColorsContex);

  return StyleSheet.create({
    card: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: primary,
      paddingHorizontal: 15,
      paddingVertical: 8,
      alignItems: 'flex-end',
    },
    row: {
      width: '100%',
      alignItems: owner ? 'flex-end' : 'flex-start',
      padding:2,
    },
    textHeader: {
      flexWrap: 'wrap',
      fontWeight: '300',
      color: secondary,
    },
    icon: {
      color: secondary,
    },
    status: {
      flexDirection: 'row',
    },
  });
};
