CREATE OR REPLACE VIEW passes_transposed AS
SELECT 
pr.provider_id AS provider1_id,
pr.provider_name AS provider1_name,
pr2.provider_id AS provider2_id,
pr2.provider_name AS provider2_name,
st.station_name_abbr AS station_name,
pa.pass_code,
pa.pass_time,
pa.rate AS charge,
ta.vehicle_code,
pa.pass_type,
1 AS pass_status
FROM passes AS pa
-- PROVIDER 1
INNER JOIN stations AS st
ON st.station_id = pa.station_id
INNER JOIN providers AS pr
ON pr.provider_id = st.provider_id
-- PROVIDER 2
INNER JOIN tags AS ta
ON ta.tag_id = pa.tag_id
INNER JOIN providers AS pr2
ON pr2.provider_id = ta.provider_id