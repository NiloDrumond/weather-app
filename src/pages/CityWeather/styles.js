import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 90%;
  margin-top: ${props => props.headerHeight};
`;

export const SettingsButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const ReturnButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const MainSection = styled.View`
  flex-grow: 0.7;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

export const BottomSection = styled.View`
  flex-grow: 0.3;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 5px;
`;

export const WeatherDescription = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  position: relative;
  top: 10px;
`;

export const WeatherDescriptionText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 34px;
  color: #fff;
  margin-left: 10px;
`;

export const Weather = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Temp = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 140px;
  line-height: 160px;
  height: 150px;
  color: #fff;
  align-self: flex-start;
`;

export const WeatherDetails = styled.View`
  align-items: flex-start;
  margin-left: 10px;
  justify-content: center;
`;

export const Humidity = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0;
  justify-content: center;
`;

export const HumidityText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 30px;
  margin-left: 2px;
  color: #fff;
`;

export const HumidityUnit = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 20px;
  margin-left: 3px;
  color: #fff;
`;

export const Wind = styled.View`
  padding-top: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const WindText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 30px;
  margin-left: 2px;
  color: #fff;
`;

export const WindUnit = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 20px;
  margin-left: 3px;
  color: #fff;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'Roboto-Regular';
`;

export const NextWeather = styled.View`
  align-items: center;
`;

export const NextTemp = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #fff;
`;

export const NextDay = styled.Text`
  font-family: 'Robot-Regular';
  font-size: 20px;
  color: #fff;
`;

export const CurrentForecast = styled.View`
  flex-direction: row;
  margin-top: 80px;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  align-self: center;
`;

export const CurrentForecastItem = styled.View``;

export const CurrentForecastItemText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 30px;
  margin-top: 2px;
  color: #fff;
`;
