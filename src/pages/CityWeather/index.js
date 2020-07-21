import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
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
  getBackground,
} from '../../utils/weatherUtils';
import {
  capitalizeFirst,
  capitalizeMonth,
  shortenDay,
} from '../../utils/Utils';
import { useFavorites } from '../../hooks/favorites';
import Popup from '../../components/Popup';
import CreateFavoritePopup from '../../components/CreateFavoritePopup';

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
  const { favorites, removeFavorite } = useFavorites();
  const [city, setCity] = useState(
    favorites.find(item => item.name === route.params.city),
  );
  const [cityName, setCityName] = useState(route.params.city);
  const [gradientColor, setGradientColor] = useState(['#FF512F', '#F09819']);

  const settingsPopupRef = useRef(null);
  const createFavoriteRef = useRef(null);

  useEffect(() => {
    setCity(favorites.find(item => item.name === cityName));
  }, [cityName, favorites]);

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

  const handleRemove = useCallback(() => {
    settingsPopupRef.current.toggle();
    navigation.pop();
    removeFavorite(city.name);
  }, [city.name, navigation, removeFavorite]);

  const handleEdit = useCallback(() => {
    createFavoriteRef.current.toggle();
  }, []);

  const handleEditComplete = useCallback(newName => {
    setCityName(newName);
    settingsPopupRef.current.toggle();
  }, []);

  const handleSettings = useCallback(() => {
    settingsPopupRef.current.toggle();
  }, []);

  useEffect(() => {
    const gradient = getBackground(
      city.weather.current.weather.id,
      city.weather.current.sunrise,
      city.weather.current.sunset,
    );
    setGradientColor(gradient);
  }, [city.weather]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>{city.name}</HeaderTitle>,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0, height: 70 },

      headerLeft: () => (
        <ReturnButton
          onPress={() => {
            route.params.refresh();
            navigation.pop();
          }}
        >
          <Icon name="chevron-left" size={30} color="#fff" />
        </ReturnButton>
      ),
      headerRight: () => (
        <SettingsButton onPress={() => handleSettings()}>
          <Icon name="settings" size={30} color="#fff" />
        </SettingsButton>
      ),
    });
  }, [city.name, handleSettings, navigation, route.params, route.params.city]);

  return (
    <LinearGradient
      colors={gradientColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 1]}
      style={{ flex: 1, alignItems: 'center', jusitifyContent: 'center' }}
    >
      <Container headerHeight={`${useHeaderHeight()}px`}>
        <Popup
          ref={settingsPopupRef}
          description="O que deseja fazer?"
          isVisible
          button1={{
            text: 'Editar',
            callback: () => handleEdit(),
          }}
          button2={{
            text: 'Apagar',
            callback: () => handleRemove(),
          }}
        />
        <CreateFavoritePopup
          ref={createFavoriteRef}
          currentName={city.name}
          editing
          description="Digite o novo nome do favorito"
          isVisible
          onComplete={newName => handleEditComplete(newName)}
        />
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
