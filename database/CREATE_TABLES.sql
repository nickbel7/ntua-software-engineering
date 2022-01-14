/* =====================
	CREATE ENTITIES 
======================*/
CREATE TABLE IF NOT EXISTS providers (
	provider_id serial PRIMARY KEY,
	provider_name varchar (50),
	provider_abbr varchar (50)
);

CREATE TABLE IF NOT EXISTS tags (
	tag_id serial PRIMARY KEY,
	provider_id int,
	tag_code varchar (50),
	vehicle_code varchar (50),
	vehicle_licence_year varchar (10)
);

CREATE TABLE IF NOT EXISTS passes (
	pass_id serial PRIMARY KEY,
	tag_id int,
	station_id int,
	pass_code varchar (50),
	pass_time timestamp,
	rate float (20),
	pass_type varchar (20)
);

CREATE TABLE IF NOT EXISTS stations (
	station_id serial PRIMARY KEY,
	provider_id int,
	station_name varchar (50),
	station_name_abbr varchar (50),
	geoloc varchar (255)
);


/* =====================
	CREATE USERS AND ROLES 
======================*/
CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,
	username varchar (100),
	password_hash varchar (100),
	email varchar (50)
);

CREATE TABLE IF NOT EXISTS user_groups (
	user_group_id serial PRIMARY KEY,
	users_group_name varchar (50)
);

CREATE TABLE IF NOT EXISTS user_group_users (
	user_id int NOT NULL,
	user_group_id int NOT NULL,
	PRIMARY KEY (user_id, user_group_id),
	FOREIGN KEY (user_id)
		REFERENCES users (user_id),
	FOREIGN KEY (user_group_id)
		REFERENCES user_groups (user_group_id)
);


/* =====================
	ADD ALL FOREIGN KEYS
======================*/
ALTER TABLE tags DROP CONSTRAINT IF EXISTS fk_providers;
ALTER TABLE tags
ADD CONSTRAINT fk_providers
FOREIGN KEY (provider_id)
REFERENCES providers (provider_id);

ALTER TABLE passes DROP CONSTRAINT IF EXISTS fk_tags;
ALTER TABLE passes
ADD CONSTRAINT fk_tags
FOREIGN KEY (tag_id)
REFERENCES tags (tag_id);

ALTER TABLE passes DROP CONSTRAINT IF EXISTS fk_stations;
ALTER TABLE passes
ADD CONSTRAINT fk_stations
FOREIGN KEY (station_id)
REFERENCES stations (station_id);

ALTER TABLE stations DROP CONSTRAINT IF EXISTS fk_providers;
ALTER TABLE stations
ADD CONSTRAINT fk_providers
FOREIGN KEY (provider_id)
REFERENCES providers (provider_id);