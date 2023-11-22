// App.js

import React, { useState } from 'react';
import { HoodProvider } from './HoodContext';
import GeneralMenu from './menus/GeneralMenu';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapComponent from './MapComponent.js';
import SelectedArea from './menus/SelectedArea.js';
import BatteriesMenu from './menus/BatteriesMenu.js';
import WindMenu from './menus/WindMenu.js';
import SolarMenu from './menus/SolarMenu.js';
import AnimationContext from './AnimationContext.js';

// Define the menu states
export const MenuStates = {
  SELECTED_AREA: 'selected_area',
  GENERAL_MENU: 'general_menu',
  SOLAR_MENU:'solar_menu',
  BATTERIES_MENU:'batteries_menu',
  WIND_MENU:'wind_menu'
  // Add other menu states as needed
};

const App = () => {

  const [currentMenu, setCurrentMenu] = useState(MenuStates.SELECTED_AREA);
  const [isRising, setIsRising] = useState(true);

  const triggerRise = () => {
    setIsRising(true);
  };
  // Function to be called by child components to switch menus
  const switchMenu = (menuState) => {
    setCurrentMenu(menuState);
  };

  // Render the component based on the current menu state
  const renderMenu = () => {
    switch (currentMenu) {
      case MenuStates.GENERAL_MENU:
        return <GeneralMenu />;
        case MenuStates.BATTERIES_MENU:
          return <BatteriesMenu />;
          case MenuStates.WIND_MENU:
            return <WindMenu />;
            case MenuStates.SOLAR_MENU:
              return <SolarMenu />;
      // Add cases for other menus here
      case MenuStates.SELECTED_AREA:
      default:
        return <SelectedArea onSwitchMenu={() => switchMenu(MenuStates.GENERAL_MENU)} />;
    }
  };
  const renderTabs = () => {
    if (currentMenu === MenuStates.SELECTED_AREA) {
      return (
        <div className="bottom-bar-tabs">
          <div className="tab">
            <span>Selected Area Info</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bottom-bar-tabs">
          <div className="tab" data-tab="general" onClick={() => switchMenu(MenuStates.GENERAL_MENU)}>
            <span>General</span>
          </div>
          <div className="tab" data-tab="solar" onClick={() => switchMenu(MenuStates.SOLAR_MENU)}>
            <span>Solar</span>
          </div>
          <div className="tab" data-tab="wind" onClick={() => switchMenu(MenuStates.WIND_MENU)}>
            <span>Wind</span>
          </div>
          <div className="tab" data-tab="batteries" onClick={() => switchMenu(MenuStates.BATTERIES_MENU)}>
            <span>Batteries</span>
          </div>
        </div>
      );
    }
  };

  return  (<HoodProvider>
    
  <div className="App">
    <MapComponent />
    <div id='bottomMenu'>
      <div id='menuTab'>
        <div className='bottom-bar'>
          <div className='info-blocks'>
            {renderMenu()}
          </div>
        </div>
       
      </div>
      {renderTabs()}
    </div>
   
  </div>
 
</HoodProvider>
);
};

export default App;
