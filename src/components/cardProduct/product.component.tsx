import React from 'react';
import {View, Text, Image} from 'react-native';
import {Styles} from './product.styles';
import {StylesH} from './productH.styles';

interface item {
  image: string;
  avatar?: string;
  header: string;
  description: string;
  inform: {
    header: string;
    value: number;
  }[];
}

export default function CardProduct({
  item,
  horizontal = false,
}: {
  item: item;
  horizontal?: boolean;
}) {
  const styles = horizontal ? StylesH() : Styles();

  const Inf = ({header, value}: {header: string; value: number}) => {
    return (
      <View style={styles.inf}>
        <Text style={styles.textHeader}>{header}</Text>
        <Text style={styles.textValue}>{value} M</Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.cardImage} src={item.image} />
        {item.avatar && <Image style={styles.avatar} src={item.avatar} />}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.textHeader}>{item.header}</Text>
        <Text style={styles.textDesc}>{item.description}</Text>
        {horizontal && (
          <View style={styles.footer}>
            {item.inform?.map(x => (
              <Inf key={x.header + x.value} {...x} />
            ))}
          </View>
        )}
      </View>
      {!horizontal && (
        <View style={styles.footer}>
          {item.inform?.map(x => (
            <Inf key={x.header + x.value} {...x} />
          ))}
        </View>
      )}
    </View>
  );
}
