import React, { useContext, useEffect, useRef } from 'react';
import { HoodContext } from '../HoodContext';
import { MenuStates } from '../App';
import { adjustWidth } from '../inputWidthAdjuster';

const BatteriesMenu = () => {
  const { hoodInfo,updateHoodInfo } = useContext(HoodContext);
  const capacityRef = useRef(null);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    updateHoodInfo({ [id]: value });
    console.log(event.target, capacityRef)
    if (event.target==capacityRef.current) {
        adjustWidth(capacityRef, value.length); // Use the imported function
    }
    
  };
  
  // Adjust the width of the input on component mount
  useEffect(() => {
    adjustWidth(capacityRef, (capacityRef.current.value.length || 1));console.log()
  }, [capacityRef.value]);
  
 
  return (
      <div style={{ all: 'inherit' }}>
     
    <div class="block block-double">
        <p>Current Battery Storage</p>
        <h2 id="current-battery-storage">{Math.round(100*hoodInfo.batteryLevel)/100}<span> kWh</span></h2>
    </div>
    <div class="block">
        <p>Batteries (Amount)</p>
        <input
          type="number"
          id="batteryUnits" // This should match the key in hoodInfo
          placeholder={hoodInfo.batteryUnits}
          min="0"
          step="1"
          value={hoodInfo.batteryUnits}
          onChange={handleInputChange}
        />
    </div>
    <div class="block">
        <p>Storage/ Battery</p>
        <div className="input-container">
        <input
            ref={capacityRef} // Attach the ref here
            type="number"
            id="singleBatteryCapacity"
            placeholder="0"
            min="0"
            step="50"
            value={String(hoodInfo.singleBatteryCapacity)}
            onChange={handleInputChange}
          /><span className="unit-label">kW</span></div>
    </div>
    <div class="block">
        <p>Control Strategy</p>
        <select id="control-strategy">
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
            <option value="3">Type 3</option>
        </select>
    </div>
    <div class="block">
        <p>Input 1</p>
        <input type="number" id="input-1" placeholder="0" step="0.1"/>
    </div>
    <div class="block">
        <p>Input 2</p>
        <input type="number" id="input-2" placeholder="0" step="0.1"/>
    </div>
    <div class="block">
        <p>Input 3</p>
        <input type="number" id="input-3" placeholder="0" step="0.1"/>
    </div><div class="block">
    <p>Input 4</p>
    <input type="number" id="input-4" placeholder="0" step="0.1"/>
</div>
    <div class="block">
    <p>Max Storage</p>
    <h2 id="max-battery-storage">{Math.round(100*hoodInfo.singleBatteryCapacity*hoodInfo.batteryUnits)/100}<span> kWh</span></h2>
</div>
    
</div> 
  );
};

export default BatteriesMenu;
