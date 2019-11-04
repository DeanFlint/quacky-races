# ------------------------------------------------
# Initial setup instructions
# ------------------------------------------------

# Clone the project from github:
    https://github.com/DeanFlint/quacky-races.git

# Install node if you don't already have it:
    https://nodejs.org/en/download/

# In the terminal, enter the following to install packages:
    npm install

# Make sure you're using 
    npm v6.9.0 
# and
    node v10.16.3

# To check, type:
    npm -v
    node -v

# Install nvm, run:
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# You can install and use different versions of npm with nvm
    nvm install 10.16.3
    nvm use 10.16.3

# Download mongodb:
    https://www.mongodb.com/download-center/community

# On a mac, you may need to run the following:
    sudo cp * /usr/local/bin
    sudo mkdir -p /data/db
    sudo chmod 777 /data
    sudo chmod 777 /data/db

# On windows:

    Navigate to 'C:\Program Files\MongoDB\Server\[your_server_version]\bin' and copy this path

    In start menu search for View advanced system settings and open it.
    
    Select Advanced tab and select Environment Variables button.
    
    In the System Variables list find element Path, select it and click Edit.
    
    Paste the path which you copied before. 

    Now restart your system.

    Information provided from: 
        https://stackoverflow.com/questions/31055637/getting-mongoimport-is-not-recognized-as-an-internal-or-external-command-ope

# Open up a normal terminal and enter:

    mongod

# In a different normal terminal, run each of the following scripts: (these have been setup in the package.json
# file so this is where we edit the script if we add a new file or change the name of any of the existing filenames in the
# data folder).

# Either run these individually....
    npm run builddoc1
    npm run builddoc2
    npm run builddoc3
    npm run builddoc4
    npm run builddoc5
    npm run builddoc6
    npm run builddoc7

# ....or run this (which will run all of the above scripts together)
    npm run buildall


# Run nodemon app to run project on localhost:3000 
    nodemon app

# For windows, navigate to the root of the project and run:
    node app.js


# ------------------------------------------------
# Recommended extensions for VSCode
# ------------------------------------------------

# Azure Cosmos DB: This app lets you manipulate the data inside 