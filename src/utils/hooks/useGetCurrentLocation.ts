import { useState, useEffect } from "react";

const defaultCoords: google.maps.LatLngLiteral = {
  lat: 10.7721603889492,
  lng: 106.70428276829283,
};

export const useGetCurrentLocation = () => {
  const [coords, setCoords] =
    useState<google.maps.LatLngLiteral>(defaultCoords);

  const success = (pos: GeolocationPosition) => {
    const crd = pos.coords;
    setCoords({ lat: crd.latitude, lng: crd.longitude });
  };

  const error = () => setCoords(defaultCoords);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return coords;
};
