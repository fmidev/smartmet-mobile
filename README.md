**Prerequisites**
---

- Node (12.14.1)
- Yarn (1.21.1)
- Android Studio (3.5.3)

**Installation**
---

```git clone https://github.com/fmidev/smartmet-mobile.git```

```cd smartmet-mobile```

```yarn global add expo-cli```

```yarn global add react-native-cli```

```yarn install```

**Development**
---

1. Create **.env** file in the project root and copy the properties from ENV_EXAMPLE. Check descriptions from env-table.

2. Create **.env.production** file in the project root and copy the properties from ENV_EXAMPLE (optional)

#### Run in development environment (Android)

1. Open **{PROJECT_DIR}/android** in Android Studio and wait build to be completed

2. Create / open Android **virtual device** (tested with: Pixel 3a, API Level 29, Android 10.0)
    - Click AVD Manager from top bar
    - Create virtual device

3. ```yarn android```

#### Run in development environment (iOS)

1. cd ios  && pod install && cd ..

2. ```yarn ios```

#### Debugging

1. Open http://localhost:8081/debugger-ui/ in Chrome

2. Open the developer console in Chrome

2. cmd + m "debug" in virtual device

#### Run with production configuration (or any other)

```ENVFILE=.env.production react-native run-android```

#### Reset cache

```react-native start --reset-cache```

#### ESLint

This project is following Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript

Check all files: ```yarn eslintall```

**ENV Table**
---

| UNIT_TEMPERATURE | Description |
| ---------------- | ----------- |
| 1                | Celsius     |
| 2                | Fahrenheit  |



| UNIT_PRECIPITATION | Description |
| ------------------ | ----------- |
| 1                  | Millimeter  |
| 2                  | Inch        |



| UNIT_WIND   | Description |
| ----------- | ----------- |
| 1           | m/s         |
| 2           | km/h        |
| 3           | mph         |
| 4           | Bft         |
| 5           | kn          |



| UNIT_PRESSURE | Description |
| ------------- | ----------- |
| 1             | hPa         |
| 2             | inHg        |
| 3             | mmHg        |
| 4             | mbar        |


**How to Contribute**
---

1. Clone the repo and create a new branch: ```git checkout https://github.com/fmidev/smartmet-mobile -b branch_name```
2. Make changes and test.
3. Submit a pull request with comprehensive description of changes.

**License**
---

MIT
