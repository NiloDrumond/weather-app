import styled from 'styled-components';

export const Container = styled.View`
  position: absolute;
  top: 30%;
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

export const Input = styled.TextInput`
  width: 90%;
  background-color: rgba(240, 240, 240, 0.8);
  border-color: #800c1d;
  border-width: 2px;
  font-family: 'Roboto-Regular';
  color: #000;
  font-size: 24px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 0 15px;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonContent = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 24px;
  color: #1d3acc;
`;
