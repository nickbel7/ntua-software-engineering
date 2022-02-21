import csv
data = open("sampledata01_vehicles_100.csv", "r")
output = open("Tags-Tags.csv", "w", encoding='UTF8', newline='')
writer = csv.writer(output)

providers = {"aodos":1, "gefyra":2, "egnatia":3, "kentriki_odos":4, "moreas":5, "nea_odos":6, "olympia_odos":7}

lines = data.readlines()
count = 1

header = ['TagID', 'ProviderID', 'TagCode', 'VehicleCode', 'VehicleLicenceYear']
writer.writerow(header)

for line in lines[1:]:
    l = line.split(";")
    # print([count, providers[l[2]], l[1], l[0], l[4]])
    writer.writerow([count, providers[l[2]], l[1], l[0], l[4]])
    count += 1

output.close()


