## Placement Cell Web Application

A placement management web application where employees can:

- Login/Signup themselves
- Manage students
  - Add a student record
  - View list of students
- Manage interviews
  - Schedule an interview with a company
  - View list of scheduled interviews
  - Allocate students to interviews
  - Modify interview result status of students
- Download CSV report of students

### Guide to setup the project on local system

#### Prerequisites for running the application on local system

The system should have the following things installed:

- git
- NodeJS and npm
- MongoDB

Open the terminal and type these commands to check if these are installed:

- `git --version`
- `node --version`
- `npm --version`
- `mongo --version`

##### Proceed to the below steps if these are installed

- Open an empty directory where you want to clone the project, then open the terminal in that directory and type `git clone https://github.com/AMiR-ANiS/placement-cell.git`
- After cloning the project, go to the project directory by typing `cd directory_name`, where directory_name is the project directory.
- Then run `npm install`. It will install all the dependencies necessary to run the application
- Then create a **_.env_** file in the project directory and define these variables:
  - PLCMNT_NAME="development"
  - PLCMNT_ASSET_PATH="/assets"
  - PLCMNT_SESSION_COOKIE_NAME="**_type your session cookie name here_**"
  - PLCMNT_SESSION_COOKIE_KEY="**_type your session cookie secret key here_**"
- Go to the **_config/mongoose.js_** file and open it
- Change the `uri` variable to `mongodb://localhost/placement_cell_db` or `mongodb://127.0.0.1/placement_cell_db`
- Then in the project directory terminal type `npm start`
- Open the browser and go to the link `localhost:3000` or `127.0.0.1:3000` to start the application
