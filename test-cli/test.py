from asyncio.windows_events import NULL
import pandas as pd 
from pathlib import Path
from colorama import Fore, Style
import os, csv

providers = {"AO": "1", "GF": "2", "EG": "3", "KO": "4", "MR": "5", "NE": "6" , "OO": "7"}
se2138="cd ../cli && node --no-warnings index.js"


def takeparam(x, line, y=3):
    if(x==1):
        return(line[0],line[1])
    elif (x==2 or y==4) and y!=3:
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
        return(ret)
    else:
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

def takedate(line):
    d=takeparam(2,line,2)
    start_date=d[0]+d[1]+d[2]+"01"
    if ((int(d[2])+1)%13) == 0:
        month = "{:02d}".format((int(d[2])+1)%13 + 1)
        d[1] = str(int(d[1])+1)
    else:
        month = "{:02d}".format(int(d[2])+1)
    end_date=d[0]+d[1]+month+"01"
    return (start_date,end_date)

def makecli(x, date, param, y=0):
    if (x==1):
        return (se2138+" passesperstation --station "+param[0]+" --datefrom "+date[0]+" --dateto "+date[1]+" --format json")
    if (x==2 and y==1):
        return (se2138+" passesanalysis --op1 "+providers[param[1]]+" --op2 "+providers[param[0]]+" --datefrom "+date[0]+" --dateto "+date[1]+" --format json")
    if (x==2 and y==3):
        return (se2138+" passescost --op1 "+providers[param[1]]+" --op2 "+providers[param[0]]+" --datefrom "+date[0]+" --dateto "+date[1]+" --format json")
    if (y==4):
        return (se2138+" chargesby --op1 "+providers[param[0]]+" --datefrom "+date[0]+" --dateto "+date[1]+" --format csv")
    if (y==5):
        return (se2138+" "+param)
    

def retans(command,y=1):
    stream = os.popen(command)
    if(y==4): 
        return solve_csv(stream)
    output = stream.read()
    if(y==1):
        txt=output.partition("NumberOfPasses: ")
        ans,_,_=txt[2].partition(",")
    elif(y==2 or y==3):
        txt=output.partition("PassesCost: ")
        ans,_,_=txt[2].partition("}")
        if ans[0]!='n':
            ans = ans[1:-2]
            ans = float(ans)
        else:
            ans = 'null'
    return ans

def solve_csv(stream):
    data = csv.reader(stream)
    arr = []
    next(data)
    next(data)
    next(data)
    for row in data:
        arr.append(row[2])
    return arr

def check(function,x,y=0):
    sheet=pd.read_excel(file, sheet_name=function)
    line=sheet.values.tolist()
    counter=1
    print(Style.RESET_ALL+Fore.YELLOW+function+" TEST START"+Style.RESET_ALL)
    for i in range(2,tests+1):
        if(line[i][0][0]=="2"):
            date=takedate(line[i])
            counter+=1
            continue
        param=takeparam(x,line[i])
        command=makecli(x,date,param,y)
        cli=retans(command,y)
        xl=param[x]
        if y==3 and type(cli) != type(xl):
            print(Fore.RED + f"failed! retans(command,y): {cli}, xl: {xl}!")
        else:
            if cli == 'null' or cli == 'nan':
                counter = counter + 1
            elif((abs(float(cli)-float(xl)))<0.001):
    
                counter+=1
            else:
                print(Fore.RED+"Checking ", i, "->False")
    print(f"Passes: {counter}/{tests}")
    if(counter==tests):
        print("Status: "+Fore.GREEN+"Passed")
    else:
        print("Status: "+Fore.RED+"Failed" )
    print(Fore.YELLOW+function+" TEST END\n"+Style.RESET_ALL)

def charge(function):
    sheet=pd.read_excel(file, sheet_name=function)
    line=sheet.values.tolist()
    counter=1
    print(Style.RESET_ALL+Fore.YELLOW+function+" TEST START"+Style.RESET_ALL)
    last="xx"
    cli="a"
    j=0
    for i in range(2,tests_charge+1):
        if(line[i][0][0]=="2"):
            date=takedate(line[i])
            counter+=1
            continue
        param=takeparam(2,line[i],4)
        xl=param[2] #answer in e.g. param[2]
        if(param[0]!=last): 
            last=param[0]
            command=makecli(4,date,param,4)
            cli=retans(command,4) #answer from CLI
            j=0
        cli_param=cli[j]
        j+=1
        if(round(float(cli_param),2)==round(float(xl),2)): 
            counter+=1
        else:
            print(Fore.RED+"Checking ", i, "->False"+Style.RESET_ALL)
    print(f"Passes: {counter}/{tests_charge}")
    if(counter==tests_charge):
        print("Status: "+Fore.GREEN+"Passed"+Style.RESET_ALL)
    else:
        print("Status: "+Fore.RED+"Failed"+Style.RESET_ALL)
    print(Fore.YELLOW+function+" TEST END\n"+Style.RESET_ALL)    

def admin(function):
    command=makecli(NULL,NULL,param=function,y=5)
    stream = os.popen(command)
    output = stream.read()
    _,c,_=output.partition("OK")
    if c=="OK" or c=="OK,":
        print("Status: "+Fore.GREEN+"Passed"+Style.RESET_ALL)
    else:
        print("Status: "+Fore.RED+"Failed"+Style.RESET_ALL)


tests=100
tests_charge=100
file=Path("sampledata01.xlsm")
check("PASSES_ANALYSIS", 2, 1)
check("PASSES_PER_STATION",1, 1)
check("PASSES_COST",2,3)
charge("CHARGES_BY")

print(Style.RESET_ALL+Fore.YELLOW+"ADMIN TEST START"+Style.RESET_ALL)
for a in ("healthcheck", "resetstations", "resetvehicles", "resetpasses"):
    admin(a)
print(Style.RESET_ALL+Fore.YELLOW+"ADMIN TEST END"+Style.RESET_ALL)



