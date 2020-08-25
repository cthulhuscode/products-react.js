import firebase from "firebase/app";
import "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export default database;
