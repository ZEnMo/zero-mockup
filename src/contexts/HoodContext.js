// HoodContext.js

import React, { createContext, useEffect, useRef, useState } from 'react';
import { calculate } from '../helpers/randomGeneration';


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
  const hoodInfoRef = useRef(hoodInfo);
  const timeoutIdRef = useRef();

  // Update the ref whenever hoodInfo changes
  useEffect(() => {
    hoodInfoRef.current = hoodInfo;
  }, [hoodInfo]);

  const updateHoodInfo = (newValues) => {
    setHoodInfo((prevHoodInfo) => ({ ...prevHoodInfo, ...newValues }));
  };

  const tick = () => {
    console.log("tickk", hoodInfoRef.current);
    calculate(hoodInfoRef.current, updateHoodInfo);
    timeoutIdRef.current = setTimeout(tick, 1000 / hoodInfoRef.current.timeScale);
  };

  const runSimulation = (isRunning) => {
    if (isRunning) {
      tick();
    } else {
      clearTimeout(timeoutIdRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutIdRef.current);
  }, []);

  return (
    <HoodContext.Provider value={{ hoodInfo, updateHoodInfo, runSimulation }}>
      {children}
    </HoodContext.Provider>
  );
};