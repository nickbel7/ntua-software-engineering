import psycopg2
import subprocess
import os

##############################################
###   CREATE THE DATABASE
##

#establishing the connection
conn = psycopg2.connect(
   database="postgres",
   user='postgres', 
   password='postgres', 
   host='localhost', 
   port= '5432'
)
conn.autocommit = True

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

# sql = ''
fd = open('database/CREATE_DATABASE.sql', 'r')
sqlFile = fd.read()
fd.close()

#Creating a database
cursor.execute(sqlFile)
print("Database created successfully........")

#Closing the connection
conn.close()


##############################################
###   CREATE THE TABLES & VIEWS
##

conn = psycopg2.connect(
   database="diode",
   user='postgres', 
   password='postgres', 
   host='localhost', 
   port= '5432'
)
conn.autocommit = True

cursor = conn.cursor()

## CREATE THE TABLES
fd = open('database/CREATE_TABLES.sql', 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Tables created successfully........")

fd = open('database/CREATE_VIEWS.sql', 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Views created successfully........")


##############################################
###   IMPORT THE DATA (providers)
##

fd = open('database/DATA-DUMP/WITH_SQL/providers.sql', 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Data inserted successfully........")

conn.close()


##############################################
###   DOWNLOAD THE DEPENDENCIES
##

# Path of project folder
dir_path = os.path.dirname(os.path.realpath(__file__))

# node_modules for cli
cli_path = os.path.join(dir_path, "cli")
os.chdir(cli_path)
subprocess.check_call('npm install', shell=True)

# node_modules for backend server
backend_path = os.path.join(dir_path, "backend")
os.chdir(backend_path)
subprocess.check_call('npm install', shell=True)

print("Dependencies downloaded successfully........")