Select * from passes Where pass_id = 54322

Where pass_type = 'away'
INSERT INTO public.passes VALUES (1, 13, 36, 'WSI3219904', '2019-01-01 01:33:00', 2.8, 'home
');
   
--Insert statement with embeded subquery 
INSERT INTO
    public.passes
(
    pass_id,
    tag_id, 
	station_id, 
	pass_code,
	pass_time,
	rate, 
	pass_type
)
VALUES (
    54323,
    (Select tags.tag_id
	From tags
	Where vehicle_code = 'ED51EWW52190'),
	36,
	(Select stations.station_id
	From stations
	Where station_name_abbr='KO01'), 
	'2019-01-01 01:33:00', 
	2.8, 
	'home')
	
-- Get last pass_id 
SELECT passes.pass_id + 1
FROM passes
ORDER BY pass_id DESC 
LIMIT 1

-- Get tag_id 
Select tags.tag_id
From tags
Where vehicle_code = 'ED51EWW52190' 

-- Get station_id
Select stations.station_id
From stations
Where station_name_abbr='KO01'
