import React from 'react';
import {
  StyleSheet, View, Text, Image, Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x2-carousel';

const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: require('./assets/electrician.png'),
    cornerLabelColor: '#FFD300',
    cornerLabelText: 'NEW',
  },
  {
    coverImageUri: require('./assets/mobile.png'),
    cornerLabelColor: '#0080ff',
    cornerLabelText: 'NEW',
  },
  {
    coverImageUri: require('./assets/contact.png'),
    cornerLabelColor: '#2ECC40',
    cornerLabelText: 'NEW',
  },
];

const Banner = () => {
  const renderItem = data => (
    <View
      key={data.coverImageUri}
      style={styles.cardContainer}
    >
      <View
        style={styles.cardWrapper}
      >
        <Image
          style={styles.card}
          source={data.coverImageUri}
        />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  cardWrapper: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  card: {
    width: width,
    height: 170,
    marginTop: 2,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
});

export default Banner;