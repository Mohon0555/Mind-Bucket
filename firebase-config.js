// Firebase web config for Google sign-in and cloud sync.
// These values identify the Firebase project; they are meant to be public in website code.
// Access to each person's data is protected by the Firestore rules in firestore.rules.
//
// Set to null to run Mind Bucket in guest-only mode (no sign-in button).
// The object comes from Firebase console → Project settings → General → Your apps → Web app.
// Example shape:
//
// window.MB_FIREBASE = {
//   apiKey: "…",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "…",
//   appId: "…"
// };
window.MB_FIREBASE = {
  apiKey: "AIzaSyB3IsEVmS8ug_9SoHyN_lUMylxiwrqh1Rk",
  authDomain: "mind-bucket-planner.firebaseapp.com",
  projectId: "mind-bucket-planner",
  storageBucket: "mind-bucket-planner.firebasestorage.app",
  messagingSenderId: "1004382126890",
  appId: "1:1004382126890:web:152f0c88e7024344f91453"
};
