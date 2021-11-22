export const projectConfig = {
  googleMapApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  apiPath: 'http://localhost:3000/api/',
  firebaseApiKey: process.env.REACT_APP__FIREBASE_API_KEY,
  firebaseAuthDomain: process.env.REACT_APP__FIREBASE_AUTH_DOMAIN,
  firebaseProjectId: process.env.REACT_APP__FIREBASE_PROJECT_ID,
  firebaseStorageBucket: process.env.REACT_APP__FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId:
    process.env.REACT_APP__FIREBASE_MESSAGING_SENDER_ID,
  firebaseAppId: process.env.REACT_APP__FIREBASE_APP_ID,
  firebaseMeasurementId: process.env.REACT_APP__FIREBASE_MEASUREMENT_ID,
}
