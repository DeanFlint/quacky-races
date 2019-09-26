#You may need to follow these instructions if it is the first time setting up

sudo cp \* /usr/local/bin
sudo mkdir -p /data/db
sudo chmod 777 /data
sudo chmod 777 /data/db

# ------------------------------------------------

# Instructions for setting up Mongo on your local

# ------------------------------------------------

# Open up a terminal and enter:

mongod

# Next, navigate to the data folder in your terminal

cd data

# Open a new terminal and enter:

mongo

# This will make the terminal become a mongo shell for you to enter mongo commands

# Now enter:

mongoimport --db testQuackyRaces --collection duck --jsonArray --file ducks.json

# ------------------------------------------------

# To setup and run project

# ------------------------------------------------

# Instructions to run project:

    npm install

# run nodemon app to run project on localhost:3000

    nodemon app
