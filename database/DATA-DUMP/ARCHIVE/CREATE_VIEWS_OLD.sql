-- CREATE VIEW "PassesTransposed" AS
SELECT 
pr."ProviderID" AS "Provider1ID",
pr."ProviderName" AS "Provider1Name",
pr2."ProviderID" AS "Provider2ID",
pr2."ProviderName" AS "Provider2Name",
pa."PassCode",
pa."Timestamp",
pa."Rate" AS Charge,
1 AS "Status"
FROM "Passes" AS pa
-- PROVIDER 1
INNER JOIN "Stations" AS st
ON st."StationID" = pa."StationID"
INNER JOIN "Providers" AS pr
ON pr."ProviderID" = st."ProviderID"
-- PROVIDER 2
INNER JOIN "Tags" AS ta
ON ta."TagID" = pa."TagID"
INNER JOIN "Providers" AS pr2
ON pr2."ProviderID" = ta."ProviderID"
WHERE pa."Type" LIKE '%away%'