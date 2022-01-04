CREATE TABLE Providers
(
    Provider_ID varchar (10) PRIMARY KEY,
    Provider_Name varchar (50) not null,
    Provider_Abbr varchar (20) not null
);


CREATE TABLE Tags
(
    Tag_ID varchar (42) PRIMARY KEY,
    Vehicle_ID varchar (42) not null, 
    Provider_ID varchar(10),
    CONSTRAINT Provider_ID
        FOREIGN KEY(Provider_ID) 
            REFERENCES Providers(Provider_ID),
    Vehicle_License_Year integer not null
);


CREATE TABLE Stations 
(
    Station_ID (10) PRIMARY KEY, 
    Station_Name varchar (50) not null,
    Provider_ID varchar (10), 
    CONSTRAINT Provider_ID
        FOREIGN KEY(Provider_ID) 
            REFERENCES Providers(Provider_ID)
);


CREATE TABLE Passes
(
    Pass_ID varchar (42) PRIMARY KEY, 
    Tag_ID varchar (42), 
    CONSTRAINT Tag_ID 
        FOREIGN KEY(Tag_ID) 
            REFERENCES Tags(Tag_ID),
    Station_ID varchar (10), 
    CONSTRAINT Station_ID
        FOREIGN KEY(Station_ID) 
            REFERENCES Stations(Station_ID),
    Pass_timestamp timestamp not null, 
    Pass_Rate float8 not null
)