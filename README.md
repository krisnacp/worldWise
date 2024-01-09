  <!-- Title -->
  <h1 align="center">World Wise</h1>
  World Wise is a react-based user-friendly web application, designed to help avid travelers keep a record of the cities they have visited. The app provides an intuitive interface to mark and visualize the cities on a map, creating a personalized travel note that can remind the traveler what happened when they travel there.
  <hr/>

![homeWW](https://github.com/krisnacp/worldWise/assets/73422884/94ac69f5-2773-4d08-b370-ccf120ed5056)
![mainWW](https://github.com/krisnacp/worldWise/assets/73422884/20440f1a-7147-4a95-ab22-932c5c52a5c4)

<hr/>

# 😺 Features

-   Interactive Map: integrates with a powerful map API, offering an interactive and dynamic map interface. Users can explore the world map, zoom in on regions, and view city information.
-   Mark Visited Cities: Users can easily mark cities they have visited by clicking on the map
-   Fake Login: Fake login schema to protect some route from illegal access

<hr/>

# 😺 Tech Stack

World Wise is built using the following technologies:

-   ReactJS, React Router, & React-leaflet
-   Vite with HMR & ESLint
-   Geoapify API

<hr/>

# 😺 How to Run the Website on Your System

## Step 1: Download and Extract the Code

Firstly, download the entire website code and extract the ZIP file to a folder on your local system.

## Step 2: Obtain the TMDB Movies API Key and Firebase Configuration

Before starting the website, you will need to obtain the Geoapify API key. Follow these steps to obtain them and add them to your `.env` file.

### ▶️ Get Geoapify API Key

-   Go to https://www.geoapify.com/ and log in. If you don't have the account, register first.
-   When you have login, create/add new project if you haven't the project yet.
-   Go to API key on the left side bar menu, then you'll get the API key.

## Step 3: Run the Website

Open your code editor (such as VS Code) and navigate to the project directory. Then, open a terminal and run the following command:

```bash
npm install
```

To install all dependencies that needed from npm. Then:

```bash
npm run dev
```

This will start the application. Open a web browser and navigate to http://localhost:yourPortNumber to access the website.

Note: Ensure that you have carefully added the Geoapify API key to .env file. If the .env file is not working, add all the API keys and configuration manually.

<hr/>
