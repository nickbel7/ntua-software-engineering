from cgi import test
import pandas as pd 
from pathlib import Path
from colorama import Fore, Style
import os
import json
providers = {"AO": "1", "GF": "2", "EG": "3", "KO": "4", "MR": "5", "NE": "6" , "OO": "7"}
func = {"passesperstation": 1 , "passesanalysis" : 2, "passescost": 3, "chargesby" : 4, "healthcheck":5}

def pa_param(line):
    ret=[]
    check=True
    for i in range (len(line[0])):
        if line[0][i]=="-": 
            continue
        if check:
            ret.append(line[0][i:(i+2)])
            check=False
        else:
            check=True
    ret.append((line[1]))
    return ret

def pps_param(line):
    
    return [line[0],line[1]]

def takedate(line):
    d=pa_param(line)
    start_date=d[0]+d[1]+d[2]+"01"
    month = "{:02d}".format(int(d[2])+1)
    end_date=d[0]+d[1]+month+"01"

    return (start_date,end_date)

def makecli(date, param, testfunc):
    if(testfunc== func["passesperstation"]):
        ret=f"cd ../cli && node --no-warnings index.js passesperstation --station {param[0]} --datefrom {date[0]} --dateto {date[1]} --format json && cd../test-cli"
    elif(testfunc == func["passesanalysis"]):
        ret=f"cd ../cli && node --no-warnings index.js passesanalysis --op1 {providers[param[1]]} --op2 {providers[param[0]]} --datefrom {date[0]} --dateto {date[1]} --format json && cd../test-cli"
    elif(testfunc == func["passescost"]):
        pass
    elif(testfunc == func["chargesby"]):
        pass
    elif(testfunc==func["healthcheck"]):
        pass
    return (ret)

def programout(command,testfunc):
    stream = os.popen(command)
    output = stream.read()
    if(testfunc== func["passesperstation"]):
        txt=output.partition("NumberOfPasses: ")
        ans=txt[2].partition(",")
    elif(testfunc == func["passesanalysis"]):
        txt=output.partition("NumberOfPasses: ")
        ans=txt[2].partition(",")
    elif(testfunc == func["passescost"]):
        pass
    elif(testfunc == func["chargesby"]):
        pass
    elif(testfunc==func["healthcheck"]):
        pass
    return ans[0]

file=Path("sampledata01_christina.xlsx")

#Passes Per Station Testing
print(Fore.YELLOW+"PASSES PER STATION TEST START"+Style.RESET_ALL)

passesperstation = pd.read_excel(file, sheet_name="number_of_passes_per_station")
line = passesperstation.values.tolist()
line = line[2:]

test_num=100
passed = 0
for i in range(0,test_num):
    if(line[i][0][0]=="2"):
        date=takedate(line[i])
        passed = passed + 1
        continue
    param = pps_param(line[i])
    command = makecli(date,param,func["passesperstation"])
    value = str(programout(command,func["passesperstation"]))
    expected = str(param[1])
    if(value==expected):
        passed = passed + 1
    else:
        print(Fore.RED + "failed")
    
print(f"Passes: {passed}/{test_num}")

if passed!=test_num:
    print("Status: " + Fore.RED+"Failed!")
else:
    print("Status: " + Fore.GREEN+"Passed")

print(Fore.YELLOW+"PASSES PER STATION TEST END"+Style.RESET_ALL)
print()

#Passes Analysis Testing
print(Fore.YELLOW+"PASSES ANALYSIS TEST START"+Style.RESET_ALL)


passesanalysis=pd.read_excel(file, sheet_name="passes_analysis")
line=passesanalysis.values.tolist()
line= line[2:]

test_num=100
passed = 0
for i in range(0,test_num):
    if(line[i][0][0]=="2"):
        date=takedate(line[i])
        passed = passed + 1
        continue
    param=pa_param(line[i])
    command=makecli(date,param,func["passesanalysis"])
    value = str(programout(command,func["passesanalysis"]))
    expected = str(param[2])
    if(value==expected):
        passed = passed + 1
    else:
        print(Fore.RED + "failed")
    
print(f"Passes: {passed}/{test_num}")

if passed!=test_num:
    print("Status: " + Fore.RED+"Failed!")
else:
    print("Status: " + Fore.GREEN+"Passed")

print(Fore.YELLOW+"PASSES ANALYSIS TEST END"+Style.RESET_ALL)
