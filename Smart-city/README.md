# Smart City Platform

A React Native application for iOS and Android with authentication features including registration, login, and password recovery.

## Features

### Base Setup
- **API Handler**: Centralized API management with interceptors
- **Constants**: Colors, strings, and configuration
- **Utilities**: Validation, storage, and biometric helpers
- **Common Components**: Reusable UI components (Button, Input, Loading, ErrorMessage)
- **Common Functions**: Helper functions for formatting and utilities
- **Test Setup**: Unit test configuration with Jest

### Authentication Features

1. **Registration**
   - Email registration with validation
   - Phone number registration
   - LinkedIn OAuth integration (placeholder)

2. **Login**
   - User ID and Password authentication
   - Face ID / Biometric authentication support
   - Automatic credential storage for biometric login

3. **Password Recovery**
   - Forgot Password: Reset password via User ID
   - Forgot User ID: Recover User ID via Email or Phone

## Project Structure

```
smart-city/
├── src/
│   ├── api/              # API handler, endpoints, types
│   ├── constants/         # Colors, strings, config
│   ├── utils/            # Validation, storage, biometric
│   ├── common/           # Reusable components and functions
│   ├── features/         # Feature modules
│   │   ├── registration/
│   │   ├── login/
│   │   ├── forgotPassword/
│   │   └── home/
│   ├── navigation/       # Navigation setup
│   ├── types/           # TypeScript types
│   └── __tests__/       # Unit tests
├── App.tsx              # Main app component
└── package.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS:
```bash
cd ios && pod install && cd ..
```

3. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Configuration

### API Configuration
Update the base URL in `src/api/endpoints.ts`:
```typescript
BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.smartcity.com'
```

### LinkedIn OAuth
To enable LinkedIn registration, configure your LinkedIn OAuth credentials in:
- `src/features/registration/components/LinkedInRegistration.tsx`
- Set up deep linking for OAuth callback handling

### Biometric Authentication
The app uses `react-native-biometrics` for Face ID / Touch ID support. Make sure to:
- Configure biometric permissions in `Info.plist` (iOS)
- Add biometric permissions in `AndroidManifest.xml` (Android)

## Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Development

### Adding New Features
1. Create feature folder in `src/features/`
2. Add screens, components, and hooks
3. Update navigation in `src/navigation/AppNavigator.tsx`
4. Add unit tests in `src/__tests__/features/`

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Component-based architecture
- Separation of concerns (API, UI, business logic)

## Dependencies

### Core
- React Native 0.72.0
- React Navigation 6.x
- TypeScript 5.0

### Key Libraries
- `axios`: HTTP client
- `@react-native-async-storage/async-storage`: Local storage
- `react-native-biometrics`: Biometric authentication
- `@react-navigation/native`: Navigation

## Notes

- LinkedIn OAuth implementation is a placeholder and needs proper OAuth flow setup
- Backend API endpoints need to be implemented
- Biometric credentials are stored in plain text (should be encrypted in production)
- Update API endpoints to match your backend implementation

## License

MIT
