import React from 'react';

import ReactMapboxGl, { Layer, Marker } from 'react-mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function Map({ className, pin }) {
  const coordinates = pin.split(',');

  const MapGL = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoicWRlc2lnbi1ieSIsImEiOiJjanZ6ZXk0cW0wMGwwNDNxbmNpczk4Mjh5In0.Iz6fWbgKtW7oIinBx2mWFA',
  });

  return (
    <>
      <div className={className}>
        {MapGL && (
          <MapGL
            style="mapbox://styles/mapbox/dark-v9"
            containerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={coordinates}
            zoom={[15]}
          >
            <Marker coordinates={coordinates} anchor="bottom">
              <div className="mapMarkerStyle" />
            </Marker>
          </MapGL>
        )}
      </div>
    </>
  );
}

export default Map;
