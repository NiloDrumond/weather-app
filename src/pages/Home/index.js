import React, { useLayoutEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  HeaderTitle,
  CityContainer,
  CityTitle,
  CityWeather,
  CityTemp,
} from './styles';

const exampleData = [
  {
    name: 'Recife',
    temp: 28,
    weather: 'sunny',
  },
  {
    name: 'BH',
    temp: 22,
    weather: 'sunny',
  },
];

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>Favoritos</HeaderTitle>,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 },

      // Next section unecessary at the moment:

      // headerLeft: () => (
      //   <CloseAppButton onPress={() => console.log('x')}>
      //     <Icon name="x" size={24} color="#fff" />
      //   </CloseAppButton>
      // ),
      // headerRight: () => (
      //   <SettingsButton onPress={() => console.log('settings')}>
      //     <Icon name="settings" size={24} color="#fff" />
      //   </SettingsButton>
      // ),
    });
  }, [navigation]);
  return (
    <LinearGradient
      colors={['#13315b', '#0091d4']}
      locations={[0, 1]}
      style={{ flex: 1, alignItems: 'center', jusitifyContent: 'center' }}
    >
      <Container headerHeight={`${useHeaderHeight()}px`}>
        <FlatList
          data={exampleData}
          keyExtractor={city => city.name}
          style={{ width: '100%', flexGrow: 0 }}
          renderItem={({ item: city }) => (
            <CityContainer
              onPress={() => {
                console.log(city.name);
              }}
            >
              <CityTitle>{city.name}</CityTitle>
              <CityWeather>
                <CityTemp>{city.temp}</CityTemp>
                <Icon
                  name="sun"
                  size={30}
                  color="#fff"
                  style={{ paddingLeft: 5 }}
                />
              </CityWeather>
            </CityContainer>
          )}
        />
        <CityContainer
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            console.log('adicionar');
          }}
        >
          <Icon
            name="plus"
            size={30}
            color="#fff"
            style={{ position: 'absolute', left: 20 }}
          />
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 30,
              color: '#fff',
            }}
          >
            Adicionar
          </Text>
        </CityContainer>
      </Container>
    </LinearGradient>
  );
};

export default Home;
