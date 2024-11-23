export default {
  expo: {
    name: 'Crop Mart',
    slug: 'cropmart-n',
    version: '2.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'cropmart',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    extra: {
      eas: {
        projectId: 'c9a567de-2422-43d4-8180-1ba83522d68e'
      }
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.crop.mart'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true
    }
  }
};
