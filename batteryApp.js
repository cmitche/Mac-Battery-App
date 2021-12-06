
const fs = require('fs');

// Allow users to set their own battery notification thresholds
//  - config file
let highThreshold = 80; // 80% charge
let lowThreshold = 35; // 35% charge

let chargeComputer = false;

fs.promises.readFile('./sampleOutput.json', 'utf-8')
    .then(string => {
        const data = JSON.parse(string);
        const batteryChargeInfo = data.SPPowerDataType[0].sppower_battery_charge_info;
        
        // Create Battery Object
        let battery = {
            isBatteryAtCriticalLevel: batteryChargeInfo.sppower_battery_at_critical_level,
            isFullyCharged: batteryChargeInfo.sppower_battery_fully_charged,
            isCharging: batteryChargeInfo.sppower_battery_is_charging,
            percentage: batteryChargeInfo.sppower_battery_state_of_charge
        }

        // Business Logic
        if(battery.percentage >= highThreshold && battery.isCharging === "TRUE"){
            chargeComputer = 0;
            fs.writeFile('./result.txt', `${chargeComputer}`, (err) => {
                if (err){
                    console.log(err);
                }
            });
        } else if(battery.percentage <= lowThreshold && battery.isCharging === "FALSE"){
            chargeComputer = 1;
            fs.writeFile('./result.txt', `${chargeComputer}`, (err) => {
                if (err){
                    console.log(err);
                }
            });
        };
        return chargeComputer;
    })
    .catch(err => console.error(err));