import React from "react";
import useFetch from "../../hooks/useFetch";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import WrappedMap from "../MapNew2";

export const DeliveryRiderViewMapNew = () => {
  const key = process.env.REACT_APP_MAP_KEY;
  const { data: paths } = useFetch(
    "https://61a4a0604c822c0017041d33.mockapi.io/shuttle/v1/path"
  );
  const { data: stops } = useFetch(
    "https://61a4a0604c822c0017041d33.mockapi.io/shuttle/v1/stops"
  );
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`;

  return (
    <div>
      {paths && stops ? (
        <WrappedMap
          paths={paths}
          stops={stops}
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="mapContainer" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
};
