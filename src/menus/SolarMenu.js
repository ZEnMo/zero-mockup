import React, { useContext, useEffect, useRef } from 'react';
import { HoodContext } from '../HoodContext';
import { adjustWidth } from '../inputWidthAdjuster';

const SolarMenu = () => {
    const { hoodInfo, updateHoodInfo } = useContext(HoodContext);
    const capacityRef = useRef(null);
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        console.log({ [id]: value })
        updateHoodInfo({ [id]: value });
        console.log(event.target, capacityRef)
        if (event.target===capacityRef.current) {
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
        <p>Current Solar Generation</p>
        <h2 id="current-solar-generation">{Math.round(100*hoodInfo.solarGeneration)/100}<span> kWh</span></h2>
    </div>
    <div class="block">
        <p>Solar Panels (Amount)</p>
        <input
          type="number"
          id="solarAssets" // This should match the key in hoodInfo
        
          min="0"
          step="1"
          value={hoodInfo.solarAssets}
          onChange={handleInputChange}
        />
    </div>
    <div class="block">
  <p>Generation/ Panel</p>
  <div className="input-container">
  <input
            ref={capacityRef} // Attach the ref here
            type="number"
            id="solarCapacity"
            placeholder="0"
            min="0"
            step="1"
            value={String(hoodInfo.solarCapacity)}
            onChange={handleInputChange}
            // onInput is not needed anymore, handled by adjustWidth function
          />
          <span className="unit-label">kW</span>
</div>




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
        <p>Max Potential Generation</p>
        <h2 id="max-solar-generation">{Math.round(100*hoodInfo.solarAssets*hoodInfo.solarCapacity)/100}<span> kWh</span></h2>
    </div>
    <div class="block">
        <p>Input 2</p>
        <input type="number" id="input-2" placeholder="0" step="0.1"/>
    </div>
    <div class="block">
        <p>Input 3</p>
        <input type="number" id="input-3" placeholder="0" step="0.1"/>
    </div><div class="block">
    <p>Input 3</p>
    <input type="number" id="input-3" placeholder="0" step="0.1"/>
</div>
    <div class="block">
    <p>Output</p>
    <h2 id="current-solar-generation">0<span> kWh</span></h2>
</div>
</div> 
  );
};

export default SolarMenu;
