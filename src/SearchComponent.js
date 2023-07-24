// SearchComponent.js
import React from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import "./styles.css";

const SearchComponent = () => {
  const map = useMap();

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const customIcon = new L.Icon({
        iconUrl: require("./icons/placeholder.png"),
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const searchControl = new GeoSearchControl({
      provider: provider,
      autoComplete: true,
      showMarker: true,
      showPopup: false,
      marker: {
        icon: customIcon,
        draggable: false,
      },
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default SearchComponent;
