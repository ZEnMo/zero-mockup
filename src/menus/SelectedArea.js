import React, { useContext, useEffect } from 'react';
import { HoodContext } from '../HoodContext';
import { MenuStates } from '../App';
import { runSimulationCalc } from '../randomGeneration';
import useSimulation from '../useSimulation';

const SelectedArea = ({ onSwitchMenu }) => {
  const { hoodInfo,updateHoodInfo } = useContext(HoodContext);


  useEffect(() => {
    console.log('Component updated with new hoodInfo:', hoodInfo);
  }, [hoodInfo]);
  const { runSimulation, stopSimulation } = useSimulation();
  return (
      <div style={{ all: 'inherit' }}>
     <div class="block block-double" id="data-block1">
    <p>Selected Area</p>
    <h2 id="data1">{hoodInfo.area  }<span>km<sup>2</sup></span></h2>
</div>
<div class="block" id="data-block2">
    <p>Grid Connections</p>
    <h2 id="data2">{hoodInfo.grid_connections }</h2>
</div>
<div class="block" id="data-block3">
    <p>Living Houses</p>
    <h2 id="data3">{hoodInfo.compositions.living_houses }</h2>
</div> 
<div class="block" id="data-block4">
    <p>Small Businesses</p>
    <h2 id="data4">{hoodInfo.compositions.small_business }</h2>
</div>
<div class="block block-double" id="data-block8"  onClick={() =>{
console.log(updateHoodInfo)
    runSimulation(true)

    onSwitchMenu(MenuStates.GENERAL_MENU)} }>
    <h1>Run</h1>
    <p>Simulation</p>
</div>


<div class="block" id="data-block5"> 
    <p>Total Consumption</p>
    <h2 id="data5">{hoodInfo.total_consumption_MWh_mo }<span>MWh/mo</span></h2>
</div>
<div class="block" id="data-block6">
    <p>Average Bill</p>
    <h2 id="data6">{hoodInfo.average_bill_eur_mo }<span>€/mo</span></h2>
</div> 
<div class="block" id="data-block7">
    <p>Large Businesses</p>
    <h2 id="data7">{hoodInfo.compositions.large_business }</h2>
</div>
</div> 
  );
};

export default SelectedArea;
