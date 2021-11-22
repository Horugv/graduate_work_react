import { initializeApp } from 'firebase/app'

import { projectConfig } from 'src/config'

const firebaseConfig = {
  apiKey: projectConfig.firebaseApiKey,
  authDomain: projectConfig.firebaseAuthDomain,
  projectId: projectConfig.firebaseProjectId,
  storageBucket: projectConfig.firebaseStorageBucket,
  messagingSenderId: projectConfig.firebaseMessagingSenderId,
  appId: projectConfig.firebaseAppId,
  measurementId: projectConfig.firebaseMeasurementId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
