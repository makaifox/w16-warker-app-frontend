import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';


export default function App() {
  //localização inicial 
  let [region, setRegion] = useState({
    latitude: -22.76908029525357,
    longitude: -43.415263431752315,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });



  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  //localização em tempo real
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log(location);
  }


  return (
    <View style={{ flex: 1 }} >
      {/* componente mapa */}
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
      />
    </View>
  );
}
