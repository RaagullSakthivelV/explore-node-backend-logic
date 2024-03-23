import axios from 'axios';

export const getStationGaps = async (stationCoordinates) => {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyAOcbvs0MtHhAiHevyu63o1kkp7OXHfVRY',
    'X-Goog-FieldMask': 'routes.distanceMeters,routes.legs.distanceMeters'
  };
  const body = {
    "origin": {
      "location": {
        "latLng": {
          "latitude": 11.1815742,
          "longitude": 77.2412308
        }
      }
    },
    "intermediates":stationCoordinates,
    "destination": {
      "location": {
        "latLng": {
          "latitude": 11.175020,
          "longitude": 77.263242
        }
      }
    },
    "travelMode": "DRIVE",
    "routingPreference": "TRAFFIC_AWARE",
    "computeAlternativeRoutes": false,
    "routeModifiers": {
      "avoidTolls": false,
      "avoidHighways": false,
      "avoidFerries": false
    },
    "languageCode": "en-US",
    "units": "IMPERIAL"
  };
  const chargeStationGaps = [];
  await axios.post(url, body, { headers })
    .then(response => {
      console.log('getStationGaps Status:', response.status);
      console.log('getStationGaps Response.data:', response.data);
      // console.log('Response:',response)
      const gapsMap = response.data['routes'][0]['legs']
      // console.log('gapsMap:',gapsMap)
      if(gapsMap.length!=0){
        for (let gapNumber = 0; gapNumber < gapsMap.length; gapNumber++) {
          chargeStationGaps.push(gapsMap[gapNumber]['distanceMeters']);
        }
      }
      })
      
    .catch(error => {
      console.error('Error:', error);
      console.error('Error Data:', error.message);
    });
    return chargeStationGaps
}


export const getStationsEnroute = async (stationsToVisit) => {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyAOcbvs0MtHhAiHevyu63o1kkp7OXHfVRY',
    'X-Goog-FieldMask': 'routes.distanceMeters,routes.legs.distanceMeters,routes.polyline'
  };
  const body = {
    "origin": {
      "location": {
        "latLng": {
          "latitude": 11.1815742,
          "longitude": 77.2412308
        }
      }
    },
    "intermediates":stationsToVisit,
    "destination": {
      "location": {
        "latLng": {
          "latitude": 11.175020,
          "longitude": 77.263242
        }
      }
    },
    "travelMode": "DRIVE",
    "routingPreference": "TRAFFIC_AWARE",
    "computeAlternativeRoutes": false,
    "routeModifiers": {
      "avoidTolls": false,
      "avoidHighways": false,
      "avoidFerries": false
    },
    "languageCode": "en-US",
    "units": "IMPERIAL"
  };
  let route;
  await axios.post(url, body, { headers })
    .then(response => {
      console.log('getStationsEnroute Status:', response.status);
      console.log('getStationsEnroute Response.data:', response.data);
      route = response.data
      })
      
    .catch(error => {
      console.error('Error:', error);
      console.error('Error Data:', error.message);
    });
    return route
}