// HoodContext.js

import React, { createContext, useState } from 'react';

export const HoodContext = createContext(null);

export const HoodProvider = ({ children }) => {
  const [hoodInfo, setHoodInfo] = useState({
    compositions:{
        "living_houses": 0,
        "small_business": 0,
        "large_business": 0
    },
    totalGeneration: null,
    consumption: null,
    grid: 0,
    solarAssets: 0,
    solarCapacity: 0.3,
    solarGeneration: 0,
    windAssets: 0,
    windCapacity: 0.3,
    windGeneration: 0,
    livingHouses: 0,
    smallBusinesses: 0,
    largeBusinesses: 0,
    gridConnections: 0,
    batteryUnits: 0,
    singleBatteryCapacity: 0,
    batteryLevel: 0,
    timeScale: 1,
    date: new Date(),
  });

  // Function to update the hoodInfo state
  const updateHoodInfo = (newValues) => {
    setHoodInfo((prevHoodInfo) => ({ ...prevHoodInfo, ...newValues }));

    return {
   
    }
  };

  return (
    <HoodContext.Provider value={{ hoodInfo, updateHoodInfo }}>
      {children}
    </HoodContext.Provider>
  );
};
