import React, { useLayoutEffect, useCallback, useState, useRef } from 'react';
import { FlatList, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useWeather } from '../../hooks/weather';
import HeaderTitle from '../../components/HeaderTitle';
import Popup from '../../components/Popup';

import {
  Container,
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
  const { getWeatherByCoordinate } = useWeather();
  const addPopupRef = useRef(null);

  const handleCityClick = useCallback(
    name => {
      navigation.push('Day', { city: name });
    },
    [navigation],
  );

  const handleAddCity = useCallback(() => {
    addPopupRef.current.toggle();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>Favoritos</HeaderTitle>,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 },
    });
  }, [navigation]);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#E820A2', '#09DEE8']}
      locations={[0, 1]}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Container headerHeight={`${useHeaderHeight()}px`}>
        <Popup
          ref={addPopupRef}
          description="Selecionar localização:"
          isVisible
          button1={{
            text: 'Atual',
            callback: () => console.log('ok'),
          }}
          button2={{
            text: 'Mapa',
            callback: () => navigation.push('Map'),
          }}
        />
        <FlatList
          data={exampleData}
          keyExtractor={city => city.name}
          style={{ width: '100%', flexGrow: 0 }}
          renderItem={({ item: city }) => (
            <CityContainer
              onPress={() => {
                handleCityClick(city.name);
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
            handleAddCity();
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
