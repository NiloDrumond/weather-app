import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import HeaderTitle from '../../components/HeaderTitle';
import {
  getMainTemp,
  getIconName,
  getIconNameSimple,
} from '../../utils/weatherUtils';
import {
  capitalizeFirst,
  capitalizeMonth,
  shortenDay,
} from '../../utils/Utils';
import { useFavorites } from '../../hooks/favorites';

import {
  Container,
  SettingsButton,
  ReturnButton,
  MainSection,
  BottomSection,
  WeatherDescription,
  WeatherDescriptionText,
  Weather,
  Temp,
  WeatherDetails,
  Humidity,
  HumidityText,
  HumidityUnit,
  Wind,
  WindText,
  WindUnit,
  DateText,
  NextWeather,
  NextTemp,
  NextDay,
  CurrentForecast,
  CurrentForecastItem,
  CurrentForecastItemText,
} from './styles';

const degrees = '\u00B0';
const ms = '\u33A7';

const CityWeather = ({ route, navigation }) => {
  const { favorites } = useFavorites();
  /* eslint-disable-next-line */
  const [city, setCity] = useState(
    favorites.find(item => item.name === route.params.city),
  );

  const getDate = useCallback(() => {
    moment.locale('pt-br');
    let date = moment().format('dddd[,] D [de] MMMM[,] YYYY');
    date = capitalizeMonth(capitalizeFirst(date));
    return date;
  }, []);

  const getDay = useCallback(skip => {
    moment.locale('pt-br');
    return shortenDay(
      capitalizeFirst(moment().add(skip, 'days').format('dddd')),
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>{city.name}</HeaderTitle>,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0, height: 70 },

      headerLeft: () => (
        <ReturnButton onPress={() => navigation.pop()}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </ReturnButton>
      ),
      headerRight: () => (
        <SettingsButton onPress={() => console.log('settings')}>
          <Icon name="settings" size={30} color="#fff" />
        </SettingsButton>
      ),
    });
  }, [city.name, navigation, route.params.city]);

  return (
    <LinearGradient
      colors={['#FF512F', '#F09819']}
      locations={[0, 1]}
      style={{ flex: 1, alignItems: 'center', jusitifyContent: 'center' }}
    >
      <Container headerHeight={`${useHeaderHeight()}px`}>
        <MainSection>
          <WeatherDescription>
            <Icon
              name={getIconName(
                city.weather.current.weather.id,
                city.weather.current.sunrise,
                city.weather.current.sunset,
              )}
              size={60}
              color="#fff"
            />
            <WeatherDescriptionText>
              {city.weather.current.weather.main}
            </WeatherDescriptionText>
          </WeatherDescription>
          <Weather>
            <Temp>
              {city.weather.current.temp}
              {degrees}
            </Temp>
            <WeatherDetails>
              <Humidity>
                <Icon name="droplet" size={36} color="#fff" />
                <HumidityText>
                  {city.weather.current.weather.humidity}
                </HumidityText>
                <HumidityUnit>%</HumidityUnit>
              </Humidity>
              <Wind>
                <Icon name="wind" size={36} color="#fff" />
                <WindText>{city.weather.current.weather.wind}</WindText>
                <WindUnit>{ms}</WindUnit>
              </Wind>
            </WeatherDetails>
          </Weather>
          <DateText>{getDate()}</DateText>
          <CurrentForecast>
            <CurrentForecastItem>
              <Icon name="sunrise" size={36} color="#fff" />
              <CurrentForecastItemText>
                {city.weather.forecast[0].temp.morn}
                {degrees}
              </CurrentForecastItemText>
            </CurrentForecastItem>
            <CurrentForecastItem>
              <Icon name="sun" size={40} color="#fff" />
              <CurrentForecastItemText>
                {city.weather.forecast[0].temp.day}
                {degrees}
              </CurrentForecastItemText>
            </CurrentForecastItem>
            <CurrentForecastItem>
              <Icon name="sunset" size={40} color="#fff" />
              <CurrentForecastItemText>
                {city.weather.forecast[0].temp.eve}
                {degrees}
              </CurrentForecastItemText>
            </CurrentForecastItem>
            <CurrentForecastItem>
              <Icon name="moon" size={40} color="#fff" />
              <CurrentForecastItemText>
                {city.weather.forecast[0].temp.night}
                {degrees}
              </CurrentForecastItemText>
            </CurrentForecastItem>
          </CurrentForecast>
        </MainSection>
        <BottomSection>
          <NextWeather>
            <Icon
              name={getIconNameSimple(city.weather.forecast[1].weather.id)}
              size={48}
              color="#fff"
            />
            <NextTemp>
              {getMainTemp(city.weather.forecast[1].temp)}
              {degrees}
            </NextTemp>
            <NextDay>Amanhã</NextDay>
          </NextWeather>
          <NextWeather>
            <Icon
              name={getIconNameSimple(city.weather.forecast[2].weather.id)}
              size={48}
              color="#fff"
            />
            <NextTemp>
              {getMainTemp(city.weather.forecast[2].temp)}
              {degrees}
            </NextTemp>
            <NextDay>{getDay(2)}</NextDay>
          </NextWeather>
          <NextWeather>
            <Icon
              name={getIconNameSimple(city.weather.forecast[3].weather.id)}
              size={48}
              color="#fff"
            />
            <NextTemp>
              {getMainTemp(city.weather.forecast[3].temp)}
              {degrees}
            </NextTemp>
            <NextDay>{getDay(3)}</NextDay>
          </NextWeather>
        </BottomSection>
      </Container>
    </LinearGradient>
  );
};

export default CityWeather;
