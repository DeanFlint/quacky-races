#You may need to follow these instructions if it is the first time setting up

sudo cp * /usr/local/bin
sudo mkdir -p /data/db
sudo chmod 777 /data
sudo chmod 777 /data/db

# ------------------------------------------------
# Instructions for setting up Mongo on your local
# ------------------------------------------------
    
# Open up a normal terminal and enter:

mongod

# In a different normal terminal, run each of the following scripts: (these have been setup in the package.json
# file so this is where we edit the script if we add a new file or change the name of any of the existing filenames in the
# data folder).

npm run builddoc1
npm run builddoc2
npm run builddoc3
npm run builddoc4
npm run builddoc5
npm run builddoc6
npm run builddoc7


# ------------------------------------------------
# Instructions for setting up Mongo on your local
# ------------------------------------------------

# Open a new terminal and enter:

mongo

# This will make the terminal become a mongo shell for you to enter mongo commands


# ------------------------------------------------
# To setup and run project
# ------------------------------------------------

# Instructions to run project:
    npm install

# Run nodemon app to run project on localhost:3000 
    nodemon app


# ------------------------------------------------
# Recommended extensions for VSCode
# ------------------------------------------------

# Azure Cosmos DB: This app lets you manipulate the data inside 