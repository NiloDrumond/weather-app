import React, { useLayoutEffect, useCallback, useState, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { FlatList, Text, PermissionsAndroid, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { getIconName } from '../../utils/weatherUtils';
import { useFavorites } from '../../hooks/favorites';
import HeaderTitle from '../../components/HeaderTitle';
import Popup from '../../components/Popup';
import CreateFavoritePopup from '../../components/CreateFavoritePopup';

import {
  Container,
  CityContainer,
  CityTitle,
  CityWeather,
  CityTemp,
} from './styles';

const degrees = '\u00B0';

const Home = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState();
  const { favorites } = useFavorites();
  const addPopupRef = useRef(null);
  const createFavoriteRef = useRef(null);

  const [, updateState] = useState();

  const forceUpdate = useCallback(() => updateState({}), []);

  const refreshFavorites = useCallback(() => {
    forceUpdate();
  }, [forceUpdate]);

  const handleCityClick = useCallback(
    async name => {
      navigation.push('CityWeather', { city: name, refresh: refreshFavorites });
    },
    [navigation, refreshFavorites],
  );

  const handleGoToMap = useCallback(() => {
    addPopupRef.current.toggle();
    navigation.push('Map');
  }, [navigation]);

  const handleGetPosition = useCallback(async () => {
    if (PermissionsAndroid.check('ACCESS_FINE_LOCATION')) {
      await Geolocation.getCurrentPosition(
        props => {
          const position = {
            lat: props.coords.latitude,
            lon: props.coords.longitude,
          };
          setUserLocation({ lat: position.lat, lon: position.lon });
          addPopupRef.current.toggle();
          createFavoriteRef.current.toggle();
        },
        () => {
          addPopupRef.current.toggle();
          navigation.push('Map');
        },
      );
    } else {
      const granted = await PermissionsAndroid.request('ACCESS_FINE_LOCATION');
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleGetPosition();
      } else {
        handleGoToMap();
      }
    }
  }, [handleGoToMap, navigation]);

  const handleAddCity = useCallback(() => {
    addPopupRef.current.toggle();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>Favoritos</HeaderTitle>,
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: 0,
        height: 70 + StatusBar.currentHeight,
      },
    });
  }, [navigation]);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#E820A2', '#09DEE8']}
      locations={[0, 1]}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <Container headerHeight={`${useHeaderHeight()}px`}>
        <Popup
          ref={addPopupRef}
          description="Selecionar localização:"
          isVisible
          button1={{
            text: 'Atual',
            callback: () => handleGetPosition(),
          }}
          button2={{
            text: 'Mapa',
            callback: () => handleGoToMap(),
          }}
        />
        <CreateFavoritePopup
          ref={createFavoriteRef}
          coord={userLocation}
          description="Digite o nome da cidade"
          isVisible
        />
        <FlatList
          data={favorites}
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
                <CityTemp>
                  {Math.trunc(city.weather.current.temp)}
                  {degrees}
                </CityTemp>
                <Icon
                  name={getIconName(
                    city.weather.current.weather.id,
                    city.weather.current.sunrise,
                    city.weather.current.sunset,
                  )}
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
