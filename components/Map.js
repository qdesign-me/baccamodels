import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map({ className }) {
  console.log(process.env.MAPBOX_ACCESS_TOKEN);
  const MapGL = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoicWRlc2lnbi1ieSIsImEiOiJjanZ6ZXk0cW0wMGwwNDNxbmNpczk4Mjh5In0.Iz6fWbgKtW7oIinBx2mWFA',
  });
  return (
    <div className={className}>
      {MapGL && (
        <MapGL
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
        >
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </MapGL>
      )}
    </div>
  );
}

export default Map;
