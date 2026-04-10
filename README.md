# Rick and Morty Characters

Gallery of Rick and Morty characters built with React and Rick and Morty API.

## Getting Started

**Requirements:** Node.js 16+

```bash
git clone git@github.com:ledneev/elfsight-test-taks.git
cd your-repo
npm install
npm start
```

App will be available at http://localhost:3000

## Live Demo

https://elfsight-test-taks.vercel.app

## What Was Done

### Bug Fixes
- Fixed infinite loader in character popup (missing `.catch()` and `setIsFetching(false)`)
- Fixed pagination crash on "Last" button click (index out of bounds)
- Fixed gender icon not displaying next to character name
- Fixed inconsistent 0-based/1-based index logic in pagination

### Features
- Character filtering by Status, Gender, Species, Name and Type via API
- Filters sync with URL parameters
- Popup closes on backdrop click, Escape key press
- Body scroll locked when popup is open

### Refactoring
- Resolved all ESLint errors and warnings
- Removed unused dependencies (lodash, react-select, tinycolor2, redux)
- Split Card component into separate files (Card, CardTitle, CardStatus, Card.styles)
- Wrapped callbacks in useCallback to prevent unnecessary re-renders
- Removed duplicate PopupProvider component
