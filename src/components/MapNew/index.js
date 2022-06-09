import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

function Map(props) {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 6.841273, lng: 80.003059 }}
    >
      {props.isMarkerShown && (
        <>
          <Marker position={{ lat: 6.841273, lng: 80.003059 }} label="Rahul" />
          <Marker
            position={{ lat: 6.841124370943574, lng: 79.99884379754049 }}
            label="Rajesh"
          />
          <Marker
            position={{ lat: 6.836558219136004, lng: 80.00349632925149 }}
            label="Virat"
          />
        </>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export const MapNew = () => {
  const key = "AIzaSyBy_P5Gb5vzI-s-hMrJiurRCrnvGVS14Ao";
  return (
    <div>
      {" "}
      <WrappedMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`}
        isMarkerShown
      ></WrappedMap>
    </div>
  );
};
