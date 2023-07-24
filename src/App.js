import React, { useState } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import SearchComponent from './SearchComponent';

import { Icon, divIcon, point } from "leaflet";

// create custom icon
const customIcon = new Icon({
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// markers
const markers = [
  {
    geocode: [-33.962864, 18.409834],
    popUp: "Table Mountain",
    img: "https://images.pexels.com/photos/4064211/pexels-photo-4064211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    geocode: [-33.906546,18.419288],
    popUp: "V&A Waterfront",
    img: "https://daddysdeals.co.za/wp-content/uploads/2022/09/Cape-Wheel-12345678.jpg"
  },
  {
    geocode: [-33.950855,18.378505],
    popUp: "Camps Bay",
    img: "https://www.intotours.co.za/media/cache/2b/f4/2bf49d6cc67bddcbc93c44570eca14d8.jpg"
  },
  {
    geocode: [-33.98721,18.432312],
    popUp: "Kirstenbosch National Botanical Garden",
    img: "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2017/01/ERMHR7-e1553876093783.jpg"
  },
  {
    geocode: [-33.957652,18.461199],
    popUp: "University of Cape Town",
    img: "https://cisp.cachefly.net/assets/articles/images/resized/0001056125_resized_uctuppercampuslandscapeview1022.jpg"
  }
];

function LocationDetails({ marker }) {
  return (
    <div className="location-details">
      {marker.img && <img src={marker.img} alt="Location" className="location-image" />}
      <div className="location-content">
        <h3>Location Details:</h3>
        <p>Place: {marker.popUp}</p>
        <p>Latitude: {marker.geocode[0]}</p>
        <p>Longitude: {marker.geocode[1]}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <MapContainer center={[-33.923333, 18.422222]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* WATERCOLOR CUSTOM TILES */}
      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
      {/* GOOGLE MAPS TILES */}
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <SearchComponent />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {/* Mapping through the markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(marker)
            }}
          >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Selected marker details on the side */}
      {selectedMarker && (
        <div className="side-list">
          <LocationDetails marker={selectedMarker} />
        </div>
      )}
    </MapContainer>
  );
}
