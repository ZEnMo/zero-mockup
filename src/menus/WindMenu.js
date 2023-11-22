import React, { useContext, useEffect, useRef } from 'react';
import { HoodContext } from '../HoodContext';
import { MenuStates } from '../App';
import { adjustWidth } from '../inputWidthAdjuster';
const WindMenu = () => {
    const { hoodInfo, updateHoodInfo } = useContext(HoodContext);
    const capacityRef = useRef(null);
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        updateHoodInfo({ [id]: value });
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
        <p>Current Wind Generation</p>
        <h2 id="current-wind-generation">{Math.round(100*hoodInfo.windGeneration)/100}<span> kWh</span></h2>
    </div>
   
    <div className="block">
        <p>Wind Turbines (Amount)</p>
        <input
          type="number"
          id="windAssets"
          placeholder="0"
          min="0"
          step="1"
          value={hoodInfo.windAssets}
          onChange={handleInputChange}
        />
      </div>
      <div className="block">
        <p>Generation/ Turbine</p>
        <div className="input-container">
          <input
            ref={capacityRef}
            type="number"
            id="windCapacity"
            placeholder="0"
            min="0"
            step="50"
            value={String(hoodInfo.windCapacity)} 
            onChange={handleInputChange}
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
    <h2 id="max-wind-generation">{Math.round(100*hoodInfo.windAssets*hoodInfo.windCapacity)/100}<span> kWh</span></h2>
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

export default WindMenu;
