export const getGeolocation = () => {
  const defaultCoords: google.maps.LatLngLiteral = {
    lat: 10.7721603889492,
    lng: 106.70428276829283,
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (e: GeolocationPosition) => {
    const { longitude, latitude } = e.coords;

    return { lng: longitude, lat: latitude };
  };

  const error = () => {
    return defaultCoords;
  };

  const coords = navigator.geolocation.getCurrentPosition(
    success,
    error,
    options
  );

  return coords;
};
