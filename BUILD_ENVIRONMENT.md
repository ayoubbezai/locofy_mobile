# Build Environment Configuration

This document describes the development environment used to build and test this React Native project.

## System Information

- **Operating System**: macOS 26.2 (Build 25C56)
- **Architecture**: Apple Silicon (ARM64)

## Development Tools

### Node.js & Package Managers
- **Node.js**: v25.2.1
- **npm**: 11.6.2
- **Package Manager Used**: npm

### Java
- **Java Version**: OpenJDK 17.0.18 (Homebrew)
  - Note: Java 17 is required for React Native. Java 21 or 25 may cause build issues.
  - Set JAVA_HOME: `export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home`

### iOS Development
- **Xcode**: 26.2 (Build 17C52)
- **CocoaPods**: 1.16.2

### Android Development
- **Android SDK**: Installed via Android Studio
- **SDK Location**: `~/Library/Android/sdk`
- **Gradle**: 8.13 (configured in project)
- **Android Build Tools**: 35.0.0
- **NDK**: 27.1.12297006
- **CMake**: 3.22.1

## React Native Configuration

- **React Native Version**: 0.84.0
- **React Version**: 19.2.3
- **React Native CLI**: 20.1.2

## Key Dependencies

```json
{
  "@react-navigation/native": "^7.1.30",
  "@react-navigation/bottom-tabs": "^7.15.0",
  "@tanstack/react-query": "^5.90.21",
  "react-native-bootsplash": "^7.1.0",
  "react-native-linear-gradient": "^2.8.3",
  "react-native-safe-area-context": "^5.7.0",
  "react-native-screens": "^4.24.0",
  "react-native-svg": "^15.15.3",
  "react-native-vector-icons": "^10.3.0"
}
```

## Setup Instructions

### Prerequisites Installation

1. **Install Homebrew** (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js**:
   ```bash
   brew install node
   ```

3. **Install Java 17** (Required):
   ```bash
   brew install openjdk@17
   export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
   export PATH="$JAVA_HOME/bin:$PATH"
   ```

4. **Install Xcode** (for iOS):
   - Download from Mac App Store
   - Install Command Line Tools: `xcode-select --install`

5. **Install CocoaPods**:
   ```bash
   sudo gem install cocoapods
   ```

6. **Install Android Studio** (for Android):
   - Download from https://developer.android.com/studio
   - Install Android SDK, Build Tools, and NDK through SDK Manager

### Project Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ayoubbezai/locofy_mobile.git
   cd locofy_mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **iOS Setup**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Android Setup**:
   Create `android/local.properties`:
   ```properties
   sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
   ```

### Running the App

#### iOS
```bash
npx react-native run-ios
```

#### Android
```bash
# Set Java 17 first
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home

# Run the app
npx react-native run-android
```

### Building APK (Android)

```bash
# Set Java 17
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home

# Build debug APK
cd android
./gradlew assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

## Common Issues & Solutions

### Issue: "Unsupported class file major version"
**Solution**: Make sure you're using Java 17, not Java 21 or 25:
```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
java -version  # Should show version 17
```

### Issue: "SDK location not found"
**Solution**: Create `android/local.properties` with your SDK path:
```bash
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

### Issue: Metro bundler cache issues
**Solution**: Clear cache and restart:
```bash
npx react-native start --reset-cache
```

### Issue: iOS build fails
**Solution**: Clean and reinstall pods:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```



## Contact

If you encounter any issues setting up the build environment, please let me know.
