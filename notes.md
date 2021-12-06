# Create automatic battery reminder:
#### _by Cmitche on Decemeber 4th,  2021_  
_@cmitche__

---
## About

I recently purchased a MacBook Pro from Apple. The new computer exceeded my wildest expectations with it's lightening fast processing speed, super quiet fan noise, and long-lasting battery life.  

However the computer didn't provide a great way for it's users to monitor or manage the bettery health, (an issue with my previous 2017 MacBook Pro). Proper battery management is important if you want to keep your MacBook healthy for many years to come.  

This is my solution.

---
### Navigate to

**Apple -> About This Mac - > System Report -> Hardware -> Power -> Battery Information -> Charge Information**

### OR

**Finder -> Applications -> Utilities -> System Information -> Hardware -> Power -> Battery Information -> Charge Information**  

---

## Computer Battery Charge Information  
Charge Information:  
  The battery’s charge is below the critical level.:	No  
  Fully Charged:	No  
  Charging:	No  
  State of Charge (%):	88  

---

## Shell Commands  

### Get Apple Computer information  
command: `$ system_profiler`  

### List System Profiler Data Types
command: `$ system_profiler -listDataTypes`  

### Get Power Information
command: `$ system_profiler SPPowerDataType`

### Write to JSON
command: `$ system_profiler SPPowerDataType -json`

### Get help with System Profiler command  
command: `$ system_profiler --help`  

### Get Charge Information
command: `$ system_profiler SPPowerDataType | grep -A 4 "Charge\ Information:"`  

output:
``` 
Charge Information:
          The battery’s charge is below the critical level.: No
          Fully Charged: No
          Charging: Yes
          State of Charge (%): 47
```

### Get Battery Below Critical Level
command: `$ system_profiler SPPowerDataType | grep "The\ battery\Ws\ charge\ is\ below\ the\ critical\ level\W:\w*"`   

output:
```
The battery’s charge is below the critical level.: No
```

### Get Fully Charged Indicator
command: `$ system_profiler SPPowerDataType | grep -m1 "Fully\ Charged:"`   

output:
```
Fully Charged: No
```

### Get Charging Status  
command: `$ system_profiler SPPowerDataType | grep -m1 "Charging:"` 

output:  
```
Charging: Yes
```

### Find the battery percentage  
command: `$ system_profiler SPPowerDataType | grep "State\ of\ Charge"` 

output: 
```
State of Charge (%): 47
```

---

**Resources Used:**  
- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet)
- [Grep Unix Command Help](https://www.tutorialspoint.com/unix_commands/grep.htm)
- [System Profiler information aka system_profiler --help](https://www.unix.com/man-page/mojave/8/system_profiler/)
- [About System Info Mac](https://support.apple.com/en-us/HT203001)
- [Get system info via terminal](https://www.itechlounge.net/2013/09/mac-osx-get-full-system-information-through-terminal/)
- [Learned about the GREP command](https://www.tutorialspoint.com/unix_commands/grep.htm)
- [Learned about standard inputs and outputs in shell](https://support.apple.com/guide/terminal/redirect-terminal-input-and-output-apd1dbe647b-7e11-49dc-aa76-89aa7e53ce36/mac)
- [Learn about System Profiler --help command](https://hints.macworld.com/article.php?story=20020128084130130)
- [Learned how to get information based on System Profiler dataType](https://stackoverflow.com/questions/70188271/system-profiler-command-not-always-showing-all-properties)
- [Learned how to print only the first grep match](https://unix.stackexchange.com/questions/57876/how-to-print-only-the-first-match-with-grep)
- [Regex Debugging Tool](https://regex101.com/)
- [How to read JSON with Javascript](https://qawithexperts.com/article/javascript/read-json-file-with-javascript/380)
- [How to create a simple shell script](https://www.tecmint.com/create-shell-scripts-in-linux/)
- [How to run script at mac start up](https://www.karltarvas.com/2020/09/11/macos-run-script-on-startup.html)
- Schedule shell scripts using cron
- [Run shortcuts from command line](https://support.apple.com/guide/shortcuts-mac/run-shortcuts-from-the-command-line-apd455c82f02/mac)