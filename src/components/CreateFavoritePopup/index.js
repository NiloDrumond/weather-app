import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

import { useFavorites } from '../../hooks/favorites';

import {
  Container,
  InsideContainer,
  Input,
  Description,
  Button,
  ButtonContent,
  Error,
} from './styles';

const CreateFavoritePopup = forwardRef((config, selfRef) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState('');
  const [error, setError] = useState();

  const { checkName, addFavorite } = useFavorites();

  const handleConfirm = useCallback(() => {
    if (name.length < 1) {
      setError('Digite um nome válido!');
    } else {
      const check = checkName(name);
      if (check) {
        addFavorite({ name, coord: config.coord });
        setModalVisible(false);
        if (config.onComplete) {
          config.onComplete();
        }
      } else {
        setError('Já existe um favorito com esse nome');
      }
    }
  }, [addFavorite, checkName, config, name]);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

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
        style={{
          alignItems: 'center',
          bottom: '10%',
          justifyContent: 'center',
        }}
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
          {!!error && <Error>{error}</Error>}
          <Input
            onChangeText={value => onChangeName(value)}
            value={name}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Button>
            <ButtonContent
              onPress={() => {
                handleConfirm();
              }}
            >
              Confirmar
            </ButtonContent>
          </Button>
        </InsideContainer>
      </Modal>
    </Container>
  );
});

export default CreateFavoritePopup;
