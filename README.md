## Overview

A fishing diary mobile app built with Expo React Native, Supabase, Gluestack UI and TypeScript.  
Users can log catches, upload photos, store lure and species data, view statistics, browse popular fishing spots on a map and sync everything to the cloud.

## Features

- Secure login with Supabase Auth
- Fishing trips
  - Log complete fishing sessions
  - Trip name, date, start time and end time
  - Choose fishing method
  - Add participants
  - Record weather, wind, temperature and water conditions
  - Add notes and observations
  - Log multiple catches inside a trip
  - Select trip location via interactive map
- Create catches with:
  - Species
  - Lure
  - Weight
  - Length
  - Notes
  - GPS location
  - Date and time
  - Multiple photos (compressed & uploaded to Supabase Storage)
- Browse catches in a Recent Catches view
- Personal statistics dashboard (total catches, favourite species, best month, etc)
- Map screen with:
  - User location
  - Markers for favourite spots
  - Popular saved locations
- Fully typed TypeScript codebase
- Modern UI using Gluestack components and react native

## Tech Stack

- Expo React Native
- TypeScript
- Supabase (Auth, Database, Storage)
- Gluestack UI
- React Native Maps
- Expo Image Manipulator
- Expo Location

## Screenshots

To be added

- Dashboard
- Create Catch
- Stats screen
- Catches screen
- Log Trip
- Map Screen
- Login screen
- Signup screen

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a .env file in the root with:

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=your_url
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key
   ```

3. Start the app

   ```bash
   npx expo start
   ```

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

<h2  style="text-align: center;">Authors</h2>
<div style="display: flex; flex-wrap: wrap; gap: 40px; justify-content: center;">

  <div style="text-align: center;">
    <a href="https://github.com/EmpyreanMist">
      <img src="https://avatars.githubusercontent.com/u/175473868?v=4" width="80" style="border-radius:50%;" />
      <p><strong>Christian Fryksten</strong><br/><sub>EmpyreanMist</sub></p>
    </a>
  </div>

  <div style="text-align: center;">
    <a href="https://github.com/SpinalGlitter">
      <img src="https://avatars.githubusercontent.com/u/180339467?v=4" width="80" style="border-radius:50%;" />
      <p><strong>Johannes Persson</strong><br/><sub>SpinalGlitter</sub></p>
    </a>
  </div>

  <div style="text-align: center;">
    <a href="https://github.com/Marcusmoller97">
      <img src="https://avatars.githubusercontent.com/u/56174711?v=4" width="80" style="border-radius:50%;" />
      <p><strong>Marcus Möller</strong><br/><sub>Marcusmoller97</sub></p>
    </a>
  </div>

</div>
