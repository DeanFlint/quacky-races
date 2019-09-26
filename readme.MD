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

# In a different normal terminal, enter:

cd data

# Then enter in a normal terminal:

mongoimport --db testQuackyRaces --collection duck --jsonArray --file ducks.json


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