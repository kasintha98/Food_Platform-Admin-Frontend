import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import { updateRiderLocations } from "../../actions";
require("dotenv").config();

function Map(props) {
  const [pos, setPos] = useState(null);
  const [directions, setDirections] = useState(null);
  const [orderAddresses, setOrderAddresses] = useState([]);
  const [geoAddresses, setGeoAddresses] = useState([]);
  let geocoder = new window.google.maps.Geocoder();
  const DirectionsService = new window.google.maps.DirectionsService();
  const orders = useSelector((state) => state.order.orders);
  const allRiderLocations = useSelector((state) => state.rider.allLocations);

  const dispatch = useDispatch();

  useEffect(() => {
    let array = [];
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        let obj = {
          address: orders[i].address,
          name: orders[i].customerName,
        };
        array.push(obj);
        //setOrderAddresses(orderAddresses.push(orders[i].address));
      }
    }
    console.log(orders);
    setGeoData(array);
  }, []);

  //update live current location of rider
  useEffect(() => {
    setInterval(() => {
      if (allRiderLocations[0]) {
        dispatch(
          updateRiderLocations(
            allRiderLocations[0],
            allRiderLocations[0].latitude + 0.00001,
            allRiderLocations[0].longitude + 0.00001,
            ""
          )
        );
      }
    }, 10000);
  }, []);

  useEffect(() => {
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          allRiderLocations[0]
            ? allRiderLocations[0].latitude
            : 6.972509699999997,
          allRiderLocations[0]
            ? allRiderLocations[0].longitude
            : 79.91580280000002
        ),
        destination: geoAddresses[0] ? geoAddresses[0].geo : null,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);

  const setGeoData = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      geocoder.geocode(
        { address: data[i].address },
        function (results, status) {
          if (status === "OK") {
            let obj = { geo: results[0].geometry.location, name: data[i].name };
            arr.push(obj);
            setGeoAddresses(arr);
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    }
    console.log(arr);
  };

  function codeAddressgeocoder() {
    var address =
      "6, Station Rd, Bagansali, Tengapara, Kokrajhar, Assam 783370, India";
    geocoder.geocode({ address: address }, function (results, status) {
      if (status === "OK") {
        //map.setCenter(results[0].geometry.location);
        /* var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          }); */
        console.log(results[0].geometry.location.lat);
        setPos(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{
        lat: 6.972509699999997,
        lng: 79.91580280000002,
      }}
    >
      {props.isMarkerShown && (
        <>
          {/* <Marker position={{ lat: 6.841273, lng: 80.003059 }} label="Rahul" />
            <Marker
              position={{ lat: 6.841124370943574, lng: 79.99884379754049 }}
              label="Rajesh"
            />
            <Marker
              position={{ lat: 6.836558219136004, lng: 80.00349632925149 }}
              label="Virat"
            /> */}
          {geoAddresses.map((loc) => (
            <Marker position={loc.geo} label={loc.name} />
          ))}
          {allRiderLocations.map((loc) => (
            <Marker
              position={{ lat: loc.latitude, lng: loc.longitude }}
              label={loc.name}
            />
          ))}
        </>
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export const DeliveryRiderViewMap = () => {
  const key = process.env.REACT_APP_MAP_KEY;
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  return (
    <div>
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
