import styled from 'styled-components';

export const Container = styled.View`
  position: absolute;
  text-align: center;
  margin: auto;
`;

export const InsideContainer = styled.View`
  background-color: #cc2740;
  height: auto;
  width: 80%;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5px;
`;

export const Description = styled.Text`
  margin: 15px 0px;
  font-family: 'Roboto-Regular';
  font-size: 24px;
  color: #fff;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonContent = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 24px;
  color: #1d3acc;
`;
