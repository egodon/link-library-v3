if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.build' });
}

module.exports = {
  env: {
    FIREBASE_CONFIG: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: '',
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
    LOGROCKET_APP_ID: process.env.LOGROCKET_APP_ID,
    MY_IP_ADDRESS: process.env.MY_IP_ADDRESS,
    GOOGLE_CLOUD_PROJECT: process.env.FIREBASE_PROJECT_ID,
  },
};
