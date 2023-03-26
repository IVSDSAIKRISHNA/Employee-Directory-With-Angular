To work with Angular, one should have the following installed:
1. NodeJS
2. npm
3. Angular CLI

Install NodeJS:

The latest version of NodeJS can be downloaded from the this link https://nodejs.org/

Install npm:

To install npm globally on your machine, run the below command from the terminal window

npm install -g npm

Install Angular CLI:

To install the Angular CLI globally, open a terminal window and run the following command:

npm install -g @angular/cli

To make sure you install the latest versio of CLI, add @latest after the above command:

npm install -g @angular/cli@latest

Once the CLI is installed, change the directory to the folder where you want to create the Angular project and run the following CLI command:

ng new my-app

Here, my-app is the project name

While creating the Angular project, you are asked a couple of questions:

Would you like to add Angular routing?
- You can choose Yes/No based on your requirements

Which stylesheet format would you like to use?
- You can use the stylesheet of your choice

Once the Angular project is created, navigate inside the folder and run the following command to to build and serve your app locally:

ng serve

For more information, refer https://angular.io/guide/setup-local
