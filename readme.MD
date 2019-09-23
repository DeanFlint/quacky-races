# ------------------------------------------------
# Instructions for setting up Mongo on your local
# ------------------------------------------------
    
# Open up a terminal and enter:
    mongod

# Next, open a new terminal and enter:
    mongo

# This will make the terminal become a mongo shell for you to enter mongo commands

# Next, navigate to the data folder in your terminal
    cd data

# Now enter:
    mongoimport --db testQuackyRaces --collection duck --jsonArray --file ducks.json


# ------------------------------------------------
# To setup and run project
# ------------------------------------------------

# Instructions to run project:
    npm install

# run nodemon app to run project on localhost:3000
    nodemon app
