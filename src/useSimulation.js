// useSimulation.js
import { useContext, useEffect, useRef } from 'react';
import { HoodContext } from './HoodContext';
import { calculate } from './randomGeneration';

const useSimulation = () => {
    const { hoodInfo, updateHoodInfo } = useContext(HoodContext);
    let timeoutId;
  
    useEffect(() => {
      return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, []);
  
    const runSimulation = (isRunning) => {
        var simulationRunning
      if (isRunning) {
        simulationRunning = true;
        const tick = () => {
            console.log("tickk")
          calculate(hoodInfo, updateHoodInfo);
          if (simulationRunning) {
            timeoutId = setTimeout(tick, 4000 / hoodInfo.timeScale);
          }
        };
        tick();
      } else {
        simulationRunning = false;
        clearTimeout(timeoutId);
      }
    };
  
    return { runSimulation };
  };
  

export default useSimulation;
