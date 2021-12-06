
const fs = require('fs');
const { exec, execFile } = require('child_process');

// Allow users to set their own battery notification thresholds
//  - config file
let highThreshold = 80; // 80% charge
let lowThreshold = 37; // 35% charge

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
            // console.log('SUFFICIENTLY CHARGED: shortcuts run Unplug Computer');
            
        } else if(battery.percentage <= lowThreshold && battery.isCharging === "FALSE"){
            chargeComputer = 1;
            fs.writeFile('./result.txt', `${chargeComputer}`, (err) => {
                if (err){
                    console.log(err);
                }
            });
            // console.log('BATTERY LOW: shortcuts run Charge Computer');
        };
        console.log(chargeComputer);
        return chargeComputer;
    })
    .then( indicator => {
        // console.log(indicator);
        if (indicator === 0){
            // exec('bash unplugCharger.sh',{shell: '/bin/bash'}, (err, stdout, stderr) => {
            //     if (err){
            //         console.error(err);
            //         return;
            //     }
            //     if (stderr){
            //         console.log(stderr);
            //         return;
            //     }
            //     console.log("message");
            //     console.log(stdout);
            // });
        }
        if (indicator === 1){
            // exec('bash chargeComputer.sh',{shell: '/bin/bash'}, (err, stdout, stderr) => {
            //     if (err){
            //         console.error(err);
            //         return;
            //     }
            //     if (stderr){
            //         console.log(stderr);
            //         return;
            //     }
            //     console.log(stdout);
            // });
        }
    })
    .catch(err => console.error(err));