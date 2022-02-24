from asyncore import write
import sys
import os 

B = os.path.dirname(os.path.realpath(__file__)) 
B = B.replace('\\','/')
B = B.replace('adminCommands','')

data = open(str(sys.argv[1]), "r")
output = open(B + 'data/data.sql', "r+",encoding='UTF8', newline='')
output.truncate(0)

lines = data.readlines()

for line in lines[1:]: 
    p = line.split(";")
    p[1] = p[1].replace("/","-")
    p[1] = p[1]+":00"
    variable = p[2] 

    if str(variable[:2]) == str(p[7]): 
        pass_type = 'home'
    else: 
        pass_type = 'away'
    
    output.write(f'INSERT INTO public.passes (pass_id, tag_id, station_id, pass_code, pass_time, rate, pass_type ) VALUES ( ( SELECT passes.pass_id + 1 FROM passes ORDER BY pass_id DESC LIMIT 1), (Select tags.tag_id From tags Where vehicle_code = \'{p[3]}\' ), (Select stations.station_id From stations Where station_name_abbr=\'{p[2]}\'), \'{p[0]}\', \'{p[1]}\',{p[4]}, \'{pass_type}\');\n')
    # output.write(f'INSERT INTO public.passes (pass_id, tag_id, station_id, pass_code, pass_time, rate, pass_type ) VALUES ( (SELECT COALESCE(MAX(passes.pass_id), 0) + 1 FROM passes), (Select tags.tag_id From tags Where vehicle_code = \'{p[3]}\' ), (Select stations.station_id From stations Where station_name_abbr=\'{p[2]}\'), \'{p[0]}\', \'{p[1]}\',{p[4]}, \'{pass_type}\');\n')


data.close()
output.close()

