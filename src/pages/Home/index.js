import React, { useLayoutEffect } from 'react';
import { Text, Image } from 'react-native';
import { Container } from './styles';

import xIcon from '../../assets/x.png';

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => <Image source={xIcon} />,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 },
    });
  }, [navigation]);
  return (
    <Container>
      <Text>Test</Text>
    </Container>
  );
};

export default Home;
