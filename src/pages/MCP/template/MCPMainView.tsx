import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Box, Button } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useGetCurrentLocation } from "../../../utils/hooks/useGetCurrentLocation";
import { TextField } from "@mui/material";

const libraries: any = ["places"];

const MCPMainView = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionResponse, setDirectionResonse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const originRef = useRef<any>();
  const destinationRef = useRef<any>();
  const center = useGetCurrentLocation();

  const calculateRoute = async () => {
    if (originRef.current && destinationRef.current) {
      if (
        originRef.current.value.trim === "" ||
        destinationRef.current.value.trim === ""
      )
        return;

      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (result) {
        setDirectionResonse(result);

        if (result.routes.length > 0) {
          const fastestRoute = result.routes[0];

          if (fastestRoute.legs.length > 0) {
            const routeOpt = fastestRoute.legs[0];
            if (routeOpt.distance && routeOpt.duration) {
              setDistance(routeOpt.distance.text);
              setDuration(routeOpt.duration.text);
            }
          }
        }
      }
    }
  };

  const clearRoute = () => {
    setDirectionResonse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  return (
    <div className="w-100 h-100 position-relative mt-2 mcp">
      <LoadScript
        googleMapsApiKey="AIzaSyC9j30TST3NDMqcJMsXClZphUMiHyBSqmk"
        id="google-map"
        libraries={libraries}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          sx={{
            width: 700,
            backgroundColor: "#fff",
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: "50%",
            borderRadius: 2,
            padding: 2,
            transform: "translateX(-50%)",
          }}
          className="d-flex flex-column justify-content-between gap-2"
        >
          <Box className="d-flex align-items-center justify-content-between map-control">
            <Autocomplete>
              <TextField inputRef={originRef} label="Origin" />
            </Autocomplete>
            <Autocomplete>
              <TextField inputRef={destinationRef} label="Destination" />
            </Autocomplete>
            <Button variant="contained" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <button className="map-button" onClick={clearRoute}>
              X
            </button>
          </Box>
          <Box className="container-fluid m-0 p-0">
            <div className="d-flex align-items-center justify-content-between m-0 p-0">
              <div className="p-0">Distance: {distance}</div>
              <div className="p-0">Duration: {duration}</div>
              <button className="map-button" onClick={() => map?.panTo(center)}>
                <NavigationIcon />
              </button>
            </div>
          </Box>
        </Box>
      </LoadScript>
    </div>
  );
};

export default MCPMainView;
