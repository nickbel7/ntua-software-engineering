/* =====================
	CREATE ENTITIES 
======================*/
CREATE TABLE IF NOT EXISTS "Providers" (
	"ProviderID" serial PRIMARY KEY,
	"ProviderName" varchar (50),
	"ProviderAbbr" varchar (50)
);

CREATE TABLE IF NOT EXISTS "Tags" (
	"TagID" serial PRIMARY KEY,
	"ProviderID" int,
	"TagCode" varchar (50),
	"VehicleCode" varchar (50),
	"VehicleLicenceYear" varchar (10)
);

CREATE TABLE IF NOT EXISTS "Passes" (
	"PassID" serial PRIMARY KEY,
	"TagID" int,
	"StationID" int,
	"Timestamp" timestamp,
	"Rate" float (20),
	"Type" varchar (20)
);

CREATE TABLE IF NOT EXISTS "Stations" (
	"StationID" serial PRIMARY KEY,
	"ProviderID" int,
	"StationName" varchar (50),
	"StationNameAbbr" varchar (50),
	"Geoloc" varchar (255)
);


/* =====================
	CREATE USERS AND ROLES 
======================*/
CREATE TABLE IF NOT EXISTS "Users" (
	"UserID" serial PRIMARY KEY,
	"Username" varchar (100),
	"PasswordHash" varchar (100),
	"Email" varchar (50)
);

CREATE TABLE IF NOT EXISTS "UserGroups" (
	"UserGroupID" serial PRIMARY KEY,
	"UserGroupName" varchar (50)
);

CREATE TABLE IF NOT EXISTS "UserGroupUsers" (
	"UserID" int NOT NULL,
	"UserGroupID" int NOT NULL,
	PRIMARY KEY ("UserID", "UserGroupID"),
	FOREIGN KEY ("UserID")
		REFERENCES "Users" ("UserID"),
	FOREIGN KEY ("UserGroupID")
		REFERENCES "UserGroups" ("UserGroupID")
);


/* =====================
	ADD ALL FOREIGN KEYS
======================*/
ALTER TABLE "Tags" DROP CONSTRAINT IF EXISTS fk_providers;
ALTER TABLE "Tags"
ADD CONSTRAINT fk_providers
FOREIGN KEY ("ProviderID")
REFERENCES "Providers" ("ProviderID");

ALTER TABLE "Passes" DROP CONSTRAINT IF EXISTS fk_tags;
ALTER TABLE "Passes"
ADD CONSTRAINT fk_tags
FOREIGN KEY ("TagID")
REFERENCES "Tags" ("TagID");

ALTER TABLE "Passes" DROP CONSTRAINT IF EXISTS fk_stations;
ALTER TABLE "Passes"
ADD CONSTRAINT fk_stations
FOREIGN KEY ("StationID")
REFERENCES "Stations" ("StationID");

ALTER TABLE "Stations" DROP CONSTRAINT IF EXISTS fk_providers;
ALTER TABLE "Stations"
ADD CONSTRAINT fk_providers
FOREIGN KEY ("ProviderID")
REFERENCES "Providers" ("ProviderID");




