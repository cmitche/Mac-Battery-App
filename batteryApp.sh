#Write Battery Info to sampleOutput.json
system_profiler SPPowerDataType -json > sampleOutput.json
# Run batteryApp javascript file
node batteryApp.js
#
x=$(cat result.txt)
#
if [[ $x == 0 ]];
then
shortcuts run UnplugComputer
elif [[ $x == 1 ]];
then
shortcuts run ChargeComputer
fi