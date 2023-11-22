// GeneralMenu.js

import React, { useContext } from 'react';
import { HoodContext } from '../HoodContext';


const GeneralMenu = () => {
  const { hoodInfo } = useContext(HoodContext);

  // Date string formatting function
  const formatDate = (date) => {
    return (
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2)
    );
  };

  const dateStr = formatDate(hoodInfo.date);

  return (
    <div  style={{ all: 'inherit' }} >
      <div class="block block-double">
        <p>Current Net Consumption</p>
        <h2 id="current-net-consumption">{Math.round(10000*hoodInfo.consumption)/100} <span>kWh</span></h2>
    </div>
    <div class="block">
    <p>Current Solar Generation</p>
    <h2 id="current-solar-generation">{Math.round(10000*hoodInfo.solarGeneration)/100}<span>kWh</span></h2>
    </div>
    <div class="block">
    <p>Current Wind Generation</p>
    <h2 id="current-wind-generation">{Math.round(10000*hoodInfo.windGeneration)/100}<span>kWh</span></h2>
    </div>
    <div class="block">
    <p>Current Battery Storage</p>
    <h2 id="current-battery-storage">{Math.round(10000*+hoodInfo.batteryLevel)/100}<span>kWh</span></h2>
    </div>
    
    <div class="block">
        <p>National Grid Addition</p>
        <h2 id="national-grid-adidition">{Math.round(10000*hoodInfo.grid)/100}<span>kWh</span></h2>
    </div>
    <div class="block">
        <p>Input 3</p>
        <input type="number" id="input-3" placeholder="0" step="0.1"/>
    </div><div class="block">
    <p>Input 3</p>
    <input type="number" id="input-3" placeholder="0" step="0.1"/>
</div>
    <div class="block">
    <p>Grid Connections</p>
    <h2 id="gird-connections">{hoodInfo.gridConnections}</h2>
</div>
      <div className="block">
        <p>Time</p>
        <span id="time-scale"> - 1x + </span> <br/>
        <span style={{ fontSize: '.9vw' }} id="date-time">{dateStr}</span>
      </div>
    </div>
  );
};

export default GeneralMenu;
