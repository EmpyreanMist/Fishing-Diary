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

| Column          | Type        | Notes                                                                                        |
| --------------- | ----------- | -------------------------------------------------------------------------------------------- |
| id              | int8 (PK)   | Auto-incrementing primary key                                                                |
| user_id         | uuid (FK)   | _(Required_) FK → `profiles.id` links catch to the owning user                               |
| created_at      | timestamptz | Auto-set to `now()`. Timestamp when the catch entry was created in the app                   |
| caught_at       | timestamptz | _(Optional)_ The actual date and time the fish was caught. User may leave blank if unknown   |
| fish_species_id | int8 (FK)   | _(Optional)_ FK → `fish_species.id`. Species may be unknown if user cannot identify the fish |
| lure_id         | int8 (FK)   | _(Optional)_ FK → `lures.id`. User may have caught fish without a lure, or may not remember  |
| latitude        | numeric     | _(Optional)_ GPS latitude of catch location                                                  |
| longitude       | numeric     | _(Optional)_ GPS longitude of catch location                                                 |
| weight_kg       | numeric     | _(Required)_ Logged weight of fish in kilograms                                              |
| length_cm       | numeric     | _(Optional)_ Logged length of fish in centimeters                                            |
| notes           | text        | _(Optional)_ Free-text notes such as technique, weather or conditions                        |
| location_name   | text        | _(Optional)_ Own written name of location (e.g "Luleälven)                                   |

### catch_photos

| Column     | Type        | Notes                                                                    |
| ---------- | ----------- | ------------------------------------------------------------------------ |
| id         | int8 (PK)   | Auto-incrementing primary key                                            |
| created_at | timestamptz | Auto-set to `now()` when the photo record is created                     |
| catch_id   | int8 (FK)   | _(Required)_ FK → `catches.id`. Each photo must belong to a catch        |
| image_url  | text        | _(Required)_ URL link that points to the catch image in supabase storage |

### fish_species

| Column       | Type        | Notes                                                                      |
| ------------ | ----------- | -------------------------------------------------------------------------- |
| id           | int8 (PK)   | Auto-incrementing primary key                                              |
| created_at   | timestamptz | Auto-set to `now()`. Timestamp when species was added                      |
| english_name | text        | _(Required)_ English species name                                          |
| swedish_name | text        | _(Required)_ Swedish species name                                          |
| image_url    | text        | _(Required)_ URL link that points to the species image in supabase storage |

### lures

| Column      | Type        | Notes                                                                   |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| id          | int8 (PK)   | Auto-incrementing primary key                                           |
| created_at  | timestamptz | Auto-set to `now()`. Timestamp when lure was added                      |
| name        | text        | _(Required)_ The name/model of the lure                                 |
| brand       | text        | _(Optional)_                                                            |
| type        | text        | _(Optional)_ Lure category (e.g "spoon", "jig", "crankbait")            |
| weight_gram | numeric     | _(Optional)_ Weight of lure in grams                                    |
| color       | text        | _(Optional)_ Color description of the lure                              |
| image_url   | text        | _(Optional)_ URL link that points to the lure image in supabase storage |

### profiles

| Column       | Type        | Notes                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------- |
| id           | uuid (PK)   | Matches Supabase Auth user.id                                             |
| updated_at   | timestamptz | Auto-set to `now()`. Timestamp when profile was updated                   |
| avatar_url   | text        | _(Optional)_ URL link that points to the avatar image in supabase storage |
| bio          | text        | _(Optional)_ User written biography                                       |
| first_name   | text        | _(Required)_ Users first name, gets added when registering                |
| last_name    | text        | _(Required)_ Users last name, gets added when registering                 |
| phone_number | text        | _(Required)_ Users phone number, gets added when registering              |

### fishing_methods

| Column             | Type        | Notes                                                                             |
| ------------------ | ----------- | --------------------------------------------------------------------------------- |
| id                 | int8 (PK)   | Auto-incrementing primary key                                                     |
| method_img         | text        | _(Optional)_ URL link that points to the fishing method image in supabase storage |
| method_name        | text        | _(Optional)_ _(Unique)_ Fishing method name                                       |
| method_description | text        | _(Optional)_ Short description about the fishing method                           |
| created_at         | timestamptz | Auto-set to `now()`. Timestamp when fishing method was added                      |

### trip

| Column          | Type        | Notes                                                                         |
| --------------- | ----------- | ----------------------------------------------------------------------------- |
| id              | int8 (PK)   | Auto-incrementing primary key                                                 |
| trip_name       | text        | _(Required)_                                                                  |
| start_time      | timestamptz | _(Optional)_ Timestamp representing when the trip started                     |
| end_time        | timestamptz | _(Optional)_ Timestamp representing when the trip ended                       |
| participants    | text        | _(Optional)_ List of people who joined the trip                               |
| weather         | weather     | _(Optional)_ General weather description (e.g "Sunny", "Cloudy", "Rainy")     |
| temperature     | numeric     | _(Optional)_ Recorded temperature during the trip, in °C                      |
| wind            | text        | _(Optional)_ Wind description (e.g "5 m/s" or "fast winds")                   |
| water_condition | text        | _(Optional)_ Short description of water conditions (e.g "Clear" or "Murky")   |
| notes           | text        | _(Optional)_ Free-form notes about the trip (conditions, impressions, events) |
| created_at      | timestamptz | Auto-set to `now()`. Timestamp when trip was created                          |
| updated_at      | timestamptz | Auto-set to `now()`. Timestamp when trip was updated                          |
| user_id         | uuid (FK)   | _(Required)_ FK → `profiles.id` links trip to the owning user                 |
| fishing_method  | text        | _(Optional)_ How the fishing was done (e.g "Spin fishing", "Fly fishing")     |

### user_lures

| Column      | Type        | Notes                                                                          |
| ----------- | ----------- | ------------------------------------------------------------------------------ |
| id          | int8 (PK)   | Auto-incrementing primary key                                                  |
| user_id     | uuid (FK)   | _(Required)_ FK → `profiles.id` links lure to the owning user                  |
| created_at  | timestamptz | Auto-set to `now()`. Timestamp when lure was created                           |
| name        | text        | _(Required)_ Name of the lure added by the user                                |
| brand       | text        | _(Optional)_ Brand of the lure added by the user (e.g "rapala", "Savage Gear") |
| type        | text        | _(Optional)_ Lure category (e.g "Jerkbait", "Spinner")                         |
| weight_gram | numeric     | _(Optional)_ Lure weight in grams                                              |
| color       | text        | _(Optional)_ Color description (e.g "Firetiger", "Silver Blue")                |
| image_url   | text        | _(Optional)_ URL to the lure's stored image in SUpabase Storage                |
| notes       | text        | _(Optional)_ Free-form notes about the lure                                    |

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
