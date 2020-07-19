import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GooglePlacesAutoComplete from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Feather';

import { googlekey } from '../../services/googleapi';
import HeaderTitle from '../../components/HeaderTitle';
import CreateFavoritePopup from '../../components/CreateFavoritePopup';

import {
  Container,
  ReturnButton,
  SearchContainer,
  CalloutTouchable,
  ConfirmButton,
  ConfirmButtonText,
} from './styles';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70',
      },
    ],
  },
];

const GooglePlacesAutoCompleteStyle = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  listView: {
    backgroundColor: '#Fff',
  },
};

const initialRegion = {
  latitude: -14.235,
  longitude: -51.9253,
  latitudeDelta: 30,
  longitudeDelta: 30,
};

const Map = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const createFavoriteRef = useRef(null);

  const handleLocationSelect = useCallback(coord => {
    setUserLocation({
      lat: coord.latitude,
      lon: coord.longitude,
    });
  }, []);

  const handleClearInput = useCallback(() => {
    searchInputRef.current.setAddressText('');
    Keyboard.dismiss();
  }, []);

  const handleLocationSearched = useCallback(
    data => {
      const coord = data.geometry.location;
      setUserLocation({ lat: coord.lat, lon: coord.lng });
      const newRegion = {
        latitude: coord.lat,
        longitude: coord.lng,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };
      mapRef.current.animateToRegion(newRegion, 300);
      handleClearInput();
    },
    [handleClearInput],
  );

  const handleConfirm = useCallback(() => {
    if (userLocation !== null) {
      createFavoriteRef.current.toggle();
    }
  }, [userLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle style={{ fontSize: 30 }}>Escolha uma cidade</HeaderTitle>
      ),
      headerStyle: {
        borderBottomWidth: 0,
        height: 70,
        backgroundColor: 'rgba(255, 48, 79, 1)',
      },
      headerTitleContainerStyle: {
        position: 'absolute',
        padding: 0,
        margin: 0,
        left: 10,
      },
      headerLeft: () => (
        <ReturnButton onPress={() => navigation.pop()}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </ReturnButton>
      ),
    });
  }, [navigation]);
  return (
    <Container>
      <CreateFavoritePopup
        ref={createFavoriteRef}
        coord={userLocation}
        description="Com que nome deseja salvar?"
        onComplete={() => navigation.pop()}
        isVisible
      />
      <SearchContainer>
        <GooglePlacesAutoComplete
          ref={searchInputRef}
          placeholder="Buscar"
          minLength={2}
          fetchDetails
          onPress={(data, details) => {
            handleLocationSearched(details);
          }}
          autoFocus={false}
          enablePoweredByContainer={false}
          isRowScrollable={false}
          returnKeyType="search"
          listViewDisplayed
          query={{
            key: googlekey,
            language: 'pt-BR',
            types: '(cities)',
          }}
          styles={GooglePlacesAutoCompleteStyle}
        />
      </SearchContainer>
      <CalloutTouchable
        onPress={() => {
          handleClearInput();
        }}
      >
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={initialRegion}
          onPress={e => {
            handleLocationSelect(e.nativeEvent.coordinate);
          }}
        >
          {!!userLocation && (
            <Marker
              draggable
              onDragEnd={e => {
                const coord = e.nativeEvent.coordinate;
                setUserLocation({
                  lat: coord.latitude,
                  lon: coord.longitude,
                });
              }}
              coordinate={{
                latitude: userLocation.lat,
                longitude: userLocation.lon,
              }}
            />
          )}
        </MapView>
      </CalloutTouchable>
      <ConfirmButton onPress={() => handleConfirm()}>
        <ConfirmButtonText>Confirmar</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
};

export default Map;
