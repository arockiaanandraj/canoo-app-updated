# Canoo App - Updated

This is a React Native app which uses Mlkit OCR and Expo Camera modules.

## Setup and Run App on Expo Go

```sh
npm install
npm run start
```

## Build App with Dev Client using Expo Server

```sh
eas build -p android --profile development
eas build -p ios --profile development
```

## Release App using Expo Server

```sh
eas build -p android --profile preview
eas build -p ios --profile preview
```

## Sample Test Results using Specimen PR Card

### Fuzzy search results

```js

// Fuse.js - Options
// https://fusejs.io/api/options.html

const fuzzySearchOptions = {
    includeScore: true,
    minMatchCharLength: 2,
    threshold: 0.6,
    distance: 25,
    useExtendedSearch: true,
  };

// Matching criteria - score < 0.6
// Score = 0 - perfect match
// Score = 1 - total mismatch

// Matching Name = true
const namePattern = "NOM LATIKA | YASMIN";

// Result
Array [
  Object {
    "item": "LATIKA YASMIN",
    "refIndex": 6,
    "score": 0.5293362949021443,
  },
]

// Matching ID No = true
const idPattern = "ID No 0018 | 5978";

// Result
Array [
  Object {
    "item": "0018-5978",
    "refIndex": 10,
    "score": 0.2,
  },
]

// Matching Date of Birth = true
const dobPattern = "Birth 18 MAY | MAI | 87";

// Result
Array [
  Object {
    "item": "PERMANENT",
    "refIndex": 2,
    "score": 0.4533333333333333,
  },
  Object {
    "item": "18 MAY MAI 87",
    "refIndex": 17,
    "score": 0.5291502622129182,
  },
  Object {
    "item": "24 MAR /MARS 14",
    "refIndex": 19,
    "score": 0.6733003292241385,
  },
]

// Matching Expiry Date = true
const expiryDtPattern = "Expiry 24 MAR | MARS | 14";

// Result
Array [
  Object {
    "item": "24 MAR /MARS 14",
    "refIndex": 19,
    "score": 0.565685424949238,
  },
]

```