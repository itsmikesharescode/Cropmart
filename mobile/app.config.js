export default {
  expo: {
    // ... rest of your existing config ...
    scheme: 'cropmart',
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
      eas: {
        projectId: 'c9a567de-2422-43d4-8180-1ba83522d68e'
      }
    },
    icon: './assets/images/icon.png',
    android: {
      package: 'com.crop.mart',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    }
  }
};
