# Ajeoba

### This is a React Native Developer Assessment app, from [Ajeoba]('https://ajeoba.com/)

Built using using the [`React Native CLI`](https://github.com/react-native-community/cli).


>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Installation

Clone the repo on a local directory.
```bash
git clone git@github.com:HERYORDEJY-DEV/Ajeoba.git
```

Install dependencies, run the following command from the _root_ of the cloned project:
- with _yarn_
```bash
yarn install
```
- with _npm_
```bash
yarn install
```

Then start Metro, 

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
# to install pods (cocoapods)
npx pod-install
```
- with Xcode
  - open the ios directory of the app in the (new) terminal, i.e. ```cd ios```
  - enter the command ```xed .``` to open Xcode directly for the app
  - at the top bar of the Xcode environment, select your destination simulator (or device) for build and the press the _play_ button by the left side of the top-menu bar 


- with terminal
```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Project Structure
- src
   -  |--- assets
      -   |--- fonts
      -   |--- images
      -   |--- svgs
   -  |--- screens
   -  |--- navigation
   -  |--- components
   -  |--- hooks
   -  |--- utils
   -  |--- styles

## Features
- Home Screen 
  - Farm products carousel
  - Products sectioned list
- Product list scree (View All)
- Product details screen

## Screenshots and demos

