import csv
data = open("sampledata01_stations.csv", "r")
output = open("Stations-Stations.csv", "w", encoding='UTF8', newline='')
writer = csv.writer(output)

providers = {"aodos":1, "gefyra":2, "egnatia":3, "kentriki_odos":4, "moreas":5, "nea_odos":6, "olympia_odos":7}

lines = data.readlines()
count = 1

header = ['StationID', 'ProviderID', 'StationName', 'StationNameAbbr', 'Geoloc']
writer.writerow(header)

for line in lines[1:]:
    l = line.split(";")
    # print([count, providers[l[1]], l[2], l[0]])
    writer.writerow([count, providers[l[1]], l[2], l[0]])
    count += 1

output.close()


