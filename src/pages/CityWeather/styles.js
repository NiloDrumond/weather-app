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
  flex-grow: 0.55;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

export const BottomSection = styled.View`
  flex-grow: 0.45;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 5px;
`;

export const Weather = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  position: relative;
  top: 20px;
`;

export const WeatherText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 40px;
  color: #fff;
  margin-left: 10px;
`;

export const Temp = styled.View`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
`;

export const LeftTemp = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 140px;
  color: #fff;
  align-self: flex-start;
`;

export const RightTemp = styled.View``;

export const MaxTemp = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 42px;
  color: #fff;
  border-bottom-color: #fff;
  border-bottom-width: 2px;
`;

export const MinTemp = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 42px;
  color: #fff;
`;

export const Date = styled.Text`
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
