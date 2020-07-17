import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  InsideContainer,
  Description,
  Button,
  ButtonContent,
  ButtonContainer,
} from './styles';

const Popup = forwardRef((config, selfRef) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, []);

  useImperativeHandle(selfRef, () => ({
    toggle() {
      toggleModal();
    },
  }));

  return (
    <Container>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <InsideContainer>
          <Icon
            name="x"
            size={24}
            color="#fff"
            style={{ position: 'absolute', right: 10, top: 10 }}
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <Description>{config.description}</Description>
          <ButtonContainer>
            {!!config.button1 && (
              <Button>
                <ButtonContent
                  onPress={() => {
                    setModalVisible(false);
                    config.button1.callback();
                  }}
                >
                  {config.button1.text}
                </ButtonContent>
              </Button>
            )}
            {!!config.button2 && (
              <Button>
                <ButtonContent
                  onPress={() => {
                    setModalVisible(false);
                    config.button2.callback();
                  }}
                >
                  {config.button2.text}
                </ButtonContent>
              </Button>
            )}
          </ButtonContainer>
        </InsideContainer>
      </Modal>
    </Container>
  );
});

export default Popup;
