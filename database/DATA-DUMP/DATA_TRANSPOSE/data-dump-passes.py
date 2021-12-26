import csv
data = open("sampledata01_passes.csv", "r")
output = open("Passes-Passes.csv", "w", encoding='UTF8', newline='')
writer = csv.writer(output)

lines = data.readlines()
count = 1

header = ['PassID', 'TagID', 'StationID', 'PassCode', 'Timestamp', 'Rate', 'Type']
writer.writerow(header)

for line in lines[1:]:
    l = line.split(",")
    # print([count, l[8], l[6], l[0], l[1], l[4], l[10]])
    writer.writerow([count, l[8], l[6], l[0], l[1], l[4], l[10]])
    count += 1

output.close()


