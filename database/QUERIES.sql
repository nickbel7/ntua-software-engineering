/* =====================
ChargesBy (op_ID, date_from, date_to) 
======================*/
SELECT
provider2_name AS provider_name,
COUNT(charge) AS total_passes,
cast(SUM(charge) as DECIMAL(10,2)) AS total_charge
FROM passes_transposed
WHERE pass_type LIKE '%away%'
AND provider1_id = 1
AND pass_time BETWEEN '2019-01-01' AND '2019-05-01'
group by provider2_name

/* =====================
PassesCost (op1_ID, op2_ID, date_from, date_to) 
======================*/
SELECT
COUNT(charge) AS total_passes,
cast(SUM(charge) as DECIMAL(10,2)) AS total_charge
FROM passes_transposed
WHERE pass_type LIKE '%away%'
AND provider1_id = 1
AND provider2_id = 2
AND pass_time BETWEEN '2019-01-01' AND '2019-05-01'

/* =====================
PassesAnalysis (op1_ID, op2_ID, date_from, date_to) 
======================*/
SELECT 
ROW_NUMBER() OVER (ORDER BY 1),
pass_code,
station_name,
pass_time,
vehicle_code,
charge
FROM passes_transposed
WHERE pass_type LIKE '%away%'
AND provider1_id = 1
AND provider2_id = 2
AND pass_time BETWEEN '2019-01-01' AND '2019-05-01'

/* =====================
PassesPerStation (station_ID, date_from, date_to) 
======================*/
SELECT 
ROW_NUMBER() OVER (ORDER BY 1),
pass_code,
pass_time,
vehicle_code,
provider2_name,
pass_type,
charge
FROM passes_transposed
WHERE station_name = 'AO04'
