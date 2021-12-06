#Write Battery Info to sampleOutput.json
system_profiler SPPowerDataType -json > systemPower.json
# Run batteryApp javascript file
node batteryApp.js
#
x=$(cat result.txt)
#
if [[ $x == 0 ]];
then
shortcuts run Unplug\ Computer
elif [[ $x == 1 ]];
then
shortcuts run Charge\ Computer
fi