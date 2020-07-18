import React, { useLayoutEffect } from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import HeaderTitle from '../../components/HeaderTitle';
import {
  Container,
  SettingsButton,
  ReturnButton,
  MainSection,
  BottomSection,
  Weather,
  WeatherText,
  Temp,
  LeftTemp,
  RightTemp,
  MinTemp,
  MaxTemp,
  Date,
  NextWeather,
  NextTemp,
  NextDay,
} from './styles';

const exampleData = [
  {
    date: 17,
    weekday: 'Amanhã',
    temp: 28,
    weather: 'sunny',
  },
  {
    date: 18,
    weekday: 'Segunda',
    temp: 28,
    weather: 'sunny',
  },
  {
    date: 19,
    weekday: 'Terça',
    temp: 28,
    weather: 'sunny',
  },
];

const degrees = '\u00B0';

const Day = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>{route.params.city}</HeaderTitle>,
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
  }, [navigation, route.params.city]);

  return (
    <LinearGradient
      colors={['#FF512F', '#F09819']}
      locations={[0, 1]}
      style={{ flex: 1, alignItems: 'center', jusitifyContent: 'center' }}
    >
      <Container headerHeight={`${useHeaderHeight()}px`}>
        <MainSection>
          <Weather>
            <Icon name="sun" size={80} color="#fff" />
            <WeatherText>Sunny</WeatherText>
          </Weather>
          <Temp>
            <LeftTemp>
              27
              {degrees}
            </LeftTemp>
            <RightTemp>
              <MaxTemp>
                {' '}
                32
                {degrees}c {/*eslint-disable-line*/}
              </MaxTemp>
              <MinTemp>
                {' '}
                23
                {degrees}c {/*eslint-disable-line*/}
              </MinTemp>
            </RightTemp>
          </Temp>
          <Date>Terça-feira, 15 de Julho, 2020</Date>
        </MainSection>
        <BottomSection>
          <NextWeather>
            <Icon name="cloud" size={48} color="#fff" />
            <NextTemp>
              25
              {degrees}
            </NextTemp>
            <NextDay>Segunda</NextDay>
          </NextWeather>
          <NextWeather>
            <Icon name="cloud" size={48} color="#fff" />
            <NextTemp>
              25
              {degrees}
            </NextTemp>
            <NextDay>Amanhã</NextDay>
          </NextWeather>
          <NextWeather>
            <Icon name="cloud" size={48} color="#fff" />
            <NextTemp>
              25
              {degrees}
            </NextTemp>
            <NextDay>Segunda</NextDay>
          </NextWeather>
        </BottomSection>
      </Container>
    </LinearGradient>
  );
};

export default Day;
