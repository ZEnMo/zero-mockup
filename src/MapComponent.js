import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import { HoodContext } from './HoodContext';
import { generateRandomJSONObject } from './randomGeneration';

const MapComponent = () => {
  const { hoodInfo, updateHoodInfo } = useContext(HoodContext);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [simulationRun, setSimulationRun] = useState(false);

  useEffect(() => {
    fetch('./buurten.json')
      .then((response) => response.json())
      .then((data) => {
        const featuresWithSelection = data.features.map((feature) => ({
          ...feature,
          properties: { ...feature.properties, isSelected: false },
        }));
        setGeoJsonData({ ...data, features: featuresWithSelection });
      })
      .catch((error) => console.error('Error fetching GeoJSON data:', error));
  }, []);

  const onFeatureClick = (feature,layer,e) => {
    
    if (simulationRun) {
      console.log('Simulation has been run, selection is locked.');
      return;
    }
  // Generate random data only when a new feature is clicked
  const randomAreaInfo = generateRandomJSONObject();

  // Now update the global state with the random data
  updateHoodInfo({
    selectedNeighborhood: feature.properties.buurtnaam,
    livingHouses: randomAreaInfo.compositions.living_houses,
    smallBusinesses: randomAreaInfo.compositions.small_business,
    largeBusinesses: randomAreaInfo.compositions.large_business,
    gridConnections: randomAreaInfo.grid_connections
    // ... include other relevant data you want to update
  });
 
    setGeoJsonData((prevData) => {
      const newData = { ...prevData };
      newData.features = newData.features.map((f) => {
        return {
          ...f,
          properties: {
            ...f.properties,
            isSelected: f.properties.buurtnaam === feature.properties.buurtnaam,
          },
        };
      });
      console.log('Feature clicked:', feature.properties.buurtnaam);

      console.log(randomAreaInfo)
      updateHoodInfo({ ...randomAreaInfo, selectedNeighborhood: feature.properties.buurtnaam });
      return newData;
    });

 
  };

  const styleFeature = (feature) => {
    return {
      color: '#000',
      weight: 2,
      fillOpacity: feature.properties.isSelected ? 0.7 : 0.1,
      fillColor: feature.properties.isSelected ? 'var(--map-color)' : '#000',
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on('click', () => onFeatureClick(feature));
  };

  return (
    <MapContainer center={[51.4416, 5.4573]} zoom={14} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && (
        <FeatureGroup>
          <GeoJSON
            key={JSON.stringify(geoJsonData)} // Added key to force re-render
            data={geoJsonData}
            onEachFeature={onEachFeature}
            style={styleFeature}
          />
        </FeatureGroup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
