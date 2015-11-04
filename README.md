# Faculty Research Database

##High Level Architecture
![High Level Architecture](images/HAL.png)

##How to Setup and Run The Application

1. Download and install Node.js: <a href="https://nodejs.org/en/download/">Download Here</a>
2. Add node.js to the system path.

      Test by running the following command in bash or cmdline:

      `c:\>node --version`

      If there was no error you have successfully installed Node JS

      Now make sure NPM (Node.js Package Manager) is installed:

      `c:\>npm --version`

      If there was no Error you have successfully NPM was also successfully installed

3. Installing the Dependencies

    To download and install the dependencies run the following command in bash or cmdline:

    `c:\>npm install`

4. Getting MySQL Installed and Running

      Download and install MySQL: <a href="http://dev.mysql.com/downloads/mysql/">Download Here</a>

      Test by running the following command in bash or cmdline:

        `c:\>mysql --version`

      To Run MySQL type the following command in bash or cmdline:

        `c:\>mysqld --port=3333`

5. Running the Application

    Go to the project folder and type the following command in bash or cmdline:

    `c:\......\DB-330-FRD>npm start`

    That should start the server on port 7000

##Application Design

###Domain Model
![Domain Model Design](images/DM.png)

**Views:** Are created by the App Controller. Displays the data provided by the app controller. Talks to the App Controller via HTTP and HTTPS requests/responses.

**App Controller:** Handles the requests and responses from the views. Calls certain middleware to run depending on the request/data received. Renders the views.

**Middleware:** This takes the input data/instructions from the application controller then manipulates/retrieves data from a model.

**User Model Middleware:** This takes the input data/instructions from the application controller then manipulates/retrieves data from the User model.

**Paper Model Middleware:** This takes the input data/instructions from the application controller then manipulates/retrieves data from the Paper model.

**Model:** This represents the data of an Object. Allowing the manipulation and retrieval of it’s data from the database.

**User Model:** This represents the data of a User. Allowing the manipulation and retrieval of it’s data from the database.

**Paper Model:** This represents the data of a Paper. Allowing the manipulation and retrieval of it’s data from the database.

**Public User:** This will represent a Public’s Users data in the database. It will also provide extra functionality to manipulation and retrieval data to the Public (if any).

**Student User:** This will represent a Student’s Users data in the database. It will also provide extra functionality to retrieve data specific to the Students (if any).

**Faculty User:** This will represent an Faculty’s Users data in the database. It will also provide extra functionality to retrieve data specific to the Faculty (if any).

**Admin User:** This will represent an Admin’s Users data in the database. It will also provide extra functionality to retrieve data specific to the Admins (if any).

**Database Pool:** This represents the MySQL Driver/Library we are using. Inside there is an easy way to create a database pool. This will allow for many users to access this application at once without having to worry about the overhead caused by creating a database connection.
