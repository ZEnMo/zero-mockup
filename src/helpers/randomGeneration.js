function randomFloatBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const timeCurve = {
  livingHouse: [0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 1, 1.2, 1.4, 1.6, 1.8, 1.9, 1.8, 1.6, 1.4, 1.2, 1, 0.8, 0.7, 0.6, 0.5, 0.4],
  smallBusiness: [0.4, 0.3, 0.3, 0.4, 0.6, 0.9, 1.2, 1.5, 1.7, 1.8, 1.9, 2, 1.9, 1.8, 1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.5, 0.4, 0.3, 0.3],
  largeBusiness: [2, 1.8, 1.6, 1.4, 1.3, 1.2, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2]
};

const energyCurve = {
  solar: [0, 0, 0, 0, 0.1, 0.4, 0.7, 0.9, 1, 0.9, 0.7, 0.4, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  wind: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7]
};
export function calculate(hoodInfo, updateHoodInfo) {
 

    // Existing new code for time and generation calculation
    const date = hoodInfo.date;
    date.setHours(date.getHours() + 1);
    const hour = date.getHours();
  
    const solarGeneration = Number(energyCurve.solar[hour] * hoodInfo.solarAssets * hoodInfo.solarCapacity).toFixed(2);
    const windGeneration = Number(energyCurve.wind[hour] * hoodInfo.windAssets * hoodInfo.windCapacity).toFixed(2);
    const totalGeneration = parseFloat(solarGeneration) + parseFloat(windGeneration);
  
    // Old logic for consumption calculation with randomness
    let consumption = (
      timeCurve.livingHouse[hour] * hoodInfo.compositions.living_houses +
      timeCurve.smallBusiness[hour] * hoodInfo.compositions.small_business +
      timeCurve.largeBusiness[hour] * hoodInfo.compositions.large_business
    );
    consumption += Math.random() * 0.1; // Small random addition
  
    // Old logic for handling energy surplus or deficit
    let updatedHoodInfo = { ...hoodInfo, date, solarGeneration, windGeneration, totalGeneration, consumption };
  
    if (totalGeneration >= consumption) {
      const surplus = totalGeneration - consumption;
      if (hoodInfo.batteryLevel < hoodInfo.batteryUnits * hoodInfo.singleBatteryCapacity) {
        updatedHoodInfo.batteryLevel = Math.min(hoodInfo.batteryLevel + surplus, hoodInfo.batteryUnits * hoodInfo.singleBatteryCapacity);
      } else {
        updatedHoodInfo.grid = -surplus; // Surplus energy is sent to the grid
      }
    } else {
      const deficit = consumption - totalGeneration;
      const batteryDischarge = Math.min(deficit, hoodInfo.batteryLevel);
      updatedHoodInfo.batteryLevel -= batteryDischarge;
  
      if (consumption > totalGeneration) {
        updatedHoodInfo.grid = consumption - totalGeneration; // Deficit is made up from the grid
      }
    }
  
    // Call updateHoodInfo to update the state
    updateHoodInfo(updatedHoodInfo);
  }

  // Function to generate random JSON object
export function generateRandomJSONObject() {
    const gridConnections = randomIntBetween(100, 1000);
    const livingHouses = randomIntBetween(1, gridConnections);
    const smallBusiness = randomIntBetween(1, gridConnections - livingHouses);
    const largeBusiness = gridConnections - (livingHouses + smallBusiness);
  
    return {
      "area": randomFloatBetween(0.5, 9.0).toFixed(1),
      "grid_connections": gridConnections,
      "compositions": {
        "living_houses": livingHouses,
        "small_business": smallBusiness,
        "large_business": largeBusiness
      },
      "total_consumption_MWh_mo": randomFloatBetween(0.5, 12.0).toFixed(1),
      "average_bill_eur_mo": randomFloatBetween(20.00, 80.00).toFixed(2)
    };
  }