# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Database Schemas

### catches

| Column          | Type        | Notes                               |
| --------------- | ----------- | ----------------------------------- |
| id              | int8 (PK)   | Auto-increment                      |
| user_id         | uuid        | FK → `profiles.id`                  |
| created_at      | timestamptz | default `now()`                     |
| caught_at       | timestamptz | optional catch date                 |
| fish_species_id | int8        | FK → `fish_species.id` _(optional)_ |
| lure_id         | int8        | FK → `lures.id` _(optional)_        |
| latitude        | numeric     | optional                            |
| longitude       | numeric     | optional                            |
| weight_kg       | numeric     | required                            |
| length_cm       | numeric     | optional                            |
| notes           | text        | optional                            |
| location_name   | text        | optional                            |

## catch_photos

| Column     | Type        | Notes                      |
| ---------- | ----------- | -------------------------- |
| id         | int8 (PK)   | Auto-increment             |
| created_at | timestamptz | default `now()`            |
| catch_id   | int8        | FK → `catches.id`          |
| image_url  | text        | stored in Supabase Storage |

## fish_species

| Column       | Type        | Notes                   |
| ------------ | ----------- | ----------------------- |
| id           | int8 (PK)   | Auto-increment          |
| created_at   | timestamptz | default `now()`         |
| english_name | text        |                         |
| swedish_name | text        |                         |
| image_url    | text        | icon/photo _(optional)_ |

## lures

| Column      | Type        | Notes                                |
| ----------- | ----------- | ------------------------------------ |
| id          | int8 (PK)   | Auto-increment                       |
| created_at  | timestamptz | default `now()`                      |
| name        | text        |                                      |
| brand       | text        | optional                             |
| type        | text        | category (spoon, jig, crankbait etc) |
| weight_gram | numeric     | optional                             |
| color       | text        | optional                             |
| image_url   | text        | optional image                       |
