import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
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

const Day = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle>Recife</HeaderTitle>,
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0, height: 70 },

      headerLeft: () => (
        <ReturnButton onPress={() => console.log('return')}>
          <Icon name="chevron-left" size={40} color="#fff" />
        </ReturnButton>
      ),
      headerRight: () => (
        <SettingsButton onPress={() => console.log('settings')}>
          <Icon name="settings" size={40} color="#fff" />
        </SettingsButton>
      ),
    });
  }, [navigation]);

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
          {/* <FlatList
            data={exampleData}
            horizontal
            keyExtractor={day => day.date}
            style={{ flex: 1, flexGrow: 1, width: '100%' }}
            renderItem={({ item: day }) => (
              <NextWeather>
                <Icon name="cloud" size={48} color="#fff" />
                <NextTemp>
                  25
                  {degrees}
                </NextTemp>
                <NextDay>{day.weekday}</NextDay>
              </NextWeather>
            )}
          /> */}
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
