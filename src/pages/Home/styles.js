import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  width: 90%;
  margin-top: ${props => props.headerHeight};
`;

export const SettingsButton = styled.TouchableOpacity`
  color: #fff;
  margin-right: 20px;
`;

export const CloseAppButton = styled.TouchableOpacity`
  color: #fff;
  margin-left: 20px;
`;

export const CityContainer = styled(RectButton)`
  width: 100%;
  height: 80px;
  margin: 10px 0px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: rgba(255, 48, 79, 0.8);
  border-radius: 10px;
`;

export const CityTitle = styled.Text`
  font-family: 'Robot-Regular';
  color: #fff;
  font-size: 30px;
  margin-left: 20px;
`;

export const CityWeather = styled.View`
  margin-right: 20px;
  flex-direction: row;
  align-items: center;
`;

export const CityTemp = styled.Text`
  font-size: 30px;
  color: #fff;
  padding-right: 5px;
  border-right-width: 1px;
  border-right-color: #fff;
`;
