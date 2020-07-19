import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(255, 48, 79, 1);
`;

export const ReturnButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const SearchContainer = styled.View`
  position: absolute;
  top: 2%;
  flex: 1;
  width: 90%;
  z-index: 10;
`;

export const CalloutTouchable = styled.TouchableWithoutFeedback`
  flex: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

// #21ad32

export const ConfirmButton = styled.TouchableOpacity`
  background-color: rgba(255, 48, 79, 1);
  width: auto;
  position: absolute;
  bottom: 5%;
  height: auto;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButtonText = styled.Text`
  padding: 8px 16px;
  font-family: 'Roboto-Regular';
  font-size: 30px;
  color: #fff;
`;
