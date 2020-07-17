import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { Container } from './styles';

const Map = () => {
  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Container>
  );
};

export default Map;
