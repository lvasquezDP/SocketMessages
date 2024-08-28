import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ColorsContex} from '../../context/colors.context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Image from '../Image/image.component';

export interface MessageInterface {
  emisor: string;
  receptor: string;
  message?: string;
  img?: any[];
  entregado: string;
  visto: string;
  created_at: string;
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
        <FlatList
          data={item.img}
          renderItem={({item: x}) => <Image uri={x.Media} />}
          numColumns={2}
        />
        {item.message && <Text style={styles.textHeader}>{item.message}</Text>}
        <View style={styles.status}>
          <Text style={styles.hora}>{item.created_at.split('T')[0]}</Text>
          {owner && (
            <>
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
            </>
          )}
        </View>
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
      padding: 2,
    },
    textHeader: {
      alignSelf: owner ? 'flex-end' : 'flex-start',
      flexWrap: 'wrap',
      fontWeight: '300',
      color: secondary,
    },
    hora: {
      fontSize: 11,
      fontWeight: '100',
      color: secondary,
    },
    icon: {
      color: secondary,
    },
    status: {
      flexDirection: 'row',
    },
    image: {
      padding: 2,
      overflow: 'hidden',
      borderRadius: 10,
    },
  });
};
