import pandas as pd 
from pathlib import Path
from colorama import Fore, Style
import os
providers = {"AO": "1", "GF": "2", "EG": "3", "KO": "4", "MR": "5", "NE": "6" , "OO": "7"}
func = {"passesperstation": 1 , "passesanalysis" : 2, "passescost": 3, "chargesby" : 4,
         "healthcheck":5, "resetpasses": 6, "resetstations":7,"resetvehicles":8}

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

def pc_param(line):
    ret=[]
    prev=""
    same = False
    check=True
    for i in range (len(line[0])):
        if line[0][i]=="-": 
            continue
        if check:
            if prev == str(line[0][i:(i+2)]):
                same = True
            prev = str(line[0][i:(i+2)])
            ret.append(prev)
            check=False
        else:
            check=True
    if not same:
        if str(line[1]) == 'nan':
            ret.append('null')
        else:
            ret.append((line[1]))
        
    else:
        ret.append('null')
    return ret

def pps_param(line):
    
    return [line[0],line[1]]

def takedate(line):
    d=pa_param(line)
    start_date=d[0]+d[1]+d[2]+"01"
    if ((int(d[2])+1)%13) == 0:
        month = "{:02d}".format((int(d[2])+1)%13 + 1)
        d[1] = str(int(d[1])+1)
    else:
        month = "{:02d}".format(int(d[2])+1)
    end_date=d[0]+d[1]+month+"01"

    return (start_date,end_date)

def makecli(date, param, testfunc):
    if(testfunc== func["passesperstation"]):
        ret=f"cd ../cli && node --no-warnings index.js passesperstation --station {param[0]} --datefrom {date[0]} --dateto {date[1]} --format json && cd../test-cli"
    elif(testfunc == func["passesanalysis"]):
        ret=f"cd ../cli && node --no-warnings index.js passesanalysis --op1 {providers[param[1]]} --op2 {providers[param[0]]} --datefrom {date[0]} --dateto {date[1]} --format json && cd../test-cli"
    elif(testfunc == func["passescost"]):
        ret=f"cd ../cli && node --no-warnings index.js passescost --op1 {providers[param[1]]} --op2 {providers[param[0]]} --datefrom {date[0]} --dateto {date[1]} --format json && cd../test-cli"
    elif(testfunc == func["chargesby"]):
        pass
    elif(testfunc==func["healthcheck"]):
        ret=f"cd ../cli && node --no-warnings index.js healthcheck && cd../test-cli"
    elif(testfunc==func["resetpasses"]):
        ret=f"cd ../cli && node --no-warnings index.js resetpasses && cd../test-cli"
    elif(testfunc==func["resetstations"]):
        ret=f"cd ../cli && node --no-warnings index.js resetstations && cd../test-cli"
    elif(testfunc==func["resetvehicles"]):
        ret=f"cd ../cli && node --no-warnings index.js resetvehicles && cd../test-cli"
    return (ret)

def programout(command,testfunc):
    stream = os.popen(command)
    output = stream.read()
    if(testfunc== func["passesperstation"]):
        txt=output.partition("NumberOfPasses: ")
        ans,_,_=txt[2].partition(",")
    elif(testfunc == func["passesanalysis"]):
        txt=output.partition("NumberOfPasses: ")
        ans,_,_=txt[2].partition(",")
    elif(testfunc == func["passescost"]):
        txt=output.partition("PassesCost: ")
        ans,_,_=txt[2].partition("}")
        if ans[0]!='n':
            ans = ans[1:-2]
            ans = float(ans)
        else:
            ans = 'null'
    elif(testfunc == func["chargesby"]):
        pass
    elif(testfunc== func["healthcheck"]):
        txt=output.partition("status: ")
        ans,_,_=txt[2].partition(",")
        ans = str(ans)
    else:
        txt=output.partition("status: ")
        ans,_,_=txt[2].partition(" }")
        ans = str(ans)
    return ans

file=Path("sampledata01_christina_yiannos.xlsm")

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
    print("Status: " + Fore.RED+f"Failed!value={value}, expected={expected}")
    exit()
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
print()

#Passes Cost Testing

print(Fore.YELLOW+"PASSES COST TEST START"+Style.RESET_ALL)

passescost=pd.read_excel(file, sheet_name="passes_cost")
line=passescost.values.tolist()

test_num=100
passed = 0
for i in range(0,test_num):
    if(line[i][0][0]=="2"):
        date=takedate(line[i])
        passed = passed + 1
        continue
    param=pc_param(line[i])
    command=makecli(date,param,func["passescost"])
    value = programout(command,func["passescost"])
    expected = param[2]   

    if type(value) != type(expected):
        print(Fore.RED + f"failed! value: {value}, expected:{expected}!")
    else:
        if expected == 'null' or expected == 'nan':
            passed = passed + 1
        elif abs(value-expected)<0.001:
            passed = passed + 1
        else:
            print(Fore.RED + f"failed! value: {value}, expected:{expected}!")

    
print(f"Passes: {passed}/{test_num}")

if passed!=test_num:
    print("Status: " + Fore.RED+"Failed!")
else:
    print("Status: " + Fore.GREEN+"Passed")

print(Fore.YELLOW+"PASSES COST TEST END"+Style.RESET_ALL)
print()

#Healthcheck Testing
print(Fore.YELLOW+"HEALTHCHECK TEST START"+Style.RESET_ALL)
command=makecli([],[],func["healthcheck"])
value = str(programout(command,func["healthcheck"]))
if value =='\'OK\'':
    print("Status: " + Fore.GREEN+"Passed")
else:
    print("Status: " + Fore.RED+"Failed!")
    print(value)

print(Fore.YELLOW+"HEALTHCHECK TEST END"+Style.RESET_ALL)
print()

#ResetPasses Testing
print(Fore.YELLOW+"RESETPASSES TEST START"+Style.RESET_ALL)
command=makecli([],[],func["resetpasses"])
value = str(programout(command,func["resetpasses"]))
if value =='\'OK\'':
    print("Status: " + Fore.GREEN+"Passed")
else:
    print("Status: " + Fore.RED+"Failed!")
    print(value)

print(Fore.YELLOW+"RESETPASSES TEST END"+Style.RESET_ALL)
print()

#ResetStations Testing
print(Fore.YELLOW+"RESETSTATIONS TEST START"+Style.RESET_ALL)
command=makecli([],[],func["resetstations"])
value = str(programout(command,func["resetstations"]))
if value =='\'OK\'':
    print("Status: " + Fore.GREEN+"Passed")
else:
    print("Status: " + Fore.RED+"Failed!")
    print(value)

print(Fore.YELLOW+"RESETSTATIONS TEST END"+Style.RESET_ALL)
print()

#ResetVehicles Testing
print(Fore.YELLOW+"RESETVEHICLES TEST START"+Style.RESET_ALL)
command=makecli([],[],func["resetvehicles"])
value = str(programout(command,func["resetvehicles"]))
if value =='\'OK\'':
    print("Status: " + Fore.GREEN+"Passed")
else:
    print("Status: " + Fore.RED+"Failed!")
    print(value)

print(Fore.YELLOW+"RESETVEHICLES TEST END"+Style.RESET_ALL)
print()
