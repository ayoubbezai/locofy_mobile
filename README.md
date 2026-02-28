# Travel App - Developatic Evaluation Test

## Overview
This is a React Native travel application built as part of the Developatic evaluation test. The app implements a pixel-perfect UI based on the provided Figma design with trending destinations carousel, profile management, and a full destinations listing screen.

## Requirements Implementation

### ✅ Core Features
- **Home Screen**: Displays basic info with a horizontal auto-animated carousel of 5 trending destinations
- **Profile Screen**: User profile with editable fields (name, location, bio)
- **Destinations Screen**: Full-screen list with pagination and filtering (custom design as requested)
- **Auto-animated Carousel**: 3-second interval with smooth transitions
- **Manual Scrolling**: Snap-to-item behavior for better UX
- **Navigation**: "See All" button navigates to full destinations list
- **Local Pagination**: Simulated API with setTimeout (600ms-1s delay), loading 10 items per page
- **Type Filtering**: Filter destinations by Mountain, Beach, or City
- **Data Source**: 51 destinations from provided JSON file stored in `assets/data/destinations.json`

### 🎨 Design Notes
- **Figma Compliance**: UI is pixel-perfect match to the Figma design
- **Bottom Tab Bar**: Minor improvement made - added focused/unfocused states for better UX (original Figma design lacked visual feedback)
- **Destinations Screen**: Custom design created as this screen was not provided in Figma (as requested in requirements)

## Tech Stack
- **React Native CLI** (not Expo)
- **JavaScript** (no TypeScript)
- **React Navigation** for routing
- **React Query** for data fetching and caching
- **React Native Vector Icons** for icons
- **React Native SVG** for custom icons

## Architecture

### Why This Architecture?
For this simple project, we chose a clean and straightforward architecture that separates concerns without over-engineering in this small test , but could change of course from project to another:

```
src/
├── app/                    # App entry and navigation
│   ├── App.jsx
│   └── navigations/        # Navigation setup
├── screens/                # Screen components
├── shared/                 # Shared resources
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Data fetching logic
│   └── theme/              # Design system (colors, typography, spacing)
└── assets/                 # Static files (images, data)
```

### Key Decisions:
1. **Service Layer**: Separated data fetching from UI components for better testability and reusability
2. **Custom Hooks**: `useDestinations` hook encapsulates data fetching logic with React Query
3. **Theme System**: Centralized colors, typography, and spacing for consistency
4. **Component Reusability**: Created `DestinationCard`, `SkeletonCard`, and `DestinationListCard` for DRY code
5. **React Query**: Handles caching, loading states, and refetching automatically

## Bonus Features
we added:
- **Search Functionality**: Real-time search with 500ms debouncing
- **Skeleton Loading**: Better UX with animated loading placeholders
- **Error Handling**: Retry mechanism for failed requests
- **Infinite Scroll**: Smooth pagination on scroll

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)
- CocoaPods (for iOS)

### Steps
```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## Project Structure Details

### Services (`src/shared/services/`)
- `destinations.service.js`: Handles data fetching with setTimeout simulation, filtering, and pagination

### Hooks (`src/shared/hooks/`)
- `useDestination.js`: React Query hook for destinations data with caching strategy

### Components (`src/shared/components/`)
- `DestinationCard.jsx`: Carousel item card
- `DestinationListCard.jsx`: Full-width list item card
- `SkeletonCard.jsx`: Loading placeholder for carousel
- `DestinationListSkeleton.jsx`: Loading placeholder for list

### Screens (`src/screens/`)
- `HomeScreen.jsx`: Main screen with carousel
- `ProfileScreen.jsx`: User profile with edit mode
- `DestinationsScreen.jsx`: Full destinations list with filters
- `CommingSoon.jsx`: Placeholder for future features

## Features Breakdown

### Home Screen
- Auto-animated carousel (3s interval)
- Manual scrolling with snap behavior
- Shows 5 trending destinations
- "See All" button for navigation
- Upcoming flight card
- Tag filters

### Profile Screen
- Editable user information
- Profile image
- Bio section
- Menu items (Payment, Covid Advisory, Referral Code, Settings, Logout)
- Toggle edit mode

### Destinations Screen
- Search bar with debouncing
- Filter chips (All, Beach, Mountain, City)
- Infinite scroll pagination (10 items per page)
- Skeleton loading states
- "End of list" indicator

## Data Flow
1. User opens app → Home screen loads 5 destinations
2. Service simulates API call with setTimeout (1s delay)
3. React Query caches the result
4. User clicks "See All" → Navigates to Destinations screen
5. Loads first 10 items with pagination
6. User scrolls → Automatically loads next 10 items
7. User applies filter → Resets to page 1 and filters results

## Notes
- All data is local (no backend integration)
- Filtering and pagination work together seamlessly
- Service layer handles all business logic
- UI components are purely presentational

---

**Developed by**: Ayoub Bezai  
**Date**: February 2026  
**For**: Developatic Evaluation Test
