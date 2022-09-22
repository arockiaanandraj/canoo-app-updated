# Canoo App - Updated

This is a React Native app which uses Tesseract OCR and Expo Camera modules.

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
