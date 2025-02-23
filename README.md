# Pokémon & Rick & Morty Overview Application

This project is a scalable web application built with Vue 3, TypeScript, and Nuxt. It provides comprehensive overviews and detailed pages for both Pokémon and Rick & Morty characters by integrating the following APIs:

Pokémon API: PokéAPI Documentation

Rick & Morty API: Rick and Morty API Documentation

## 🚀 Features

Separate overview pages for Pokémon and Rick & Morty characters

Consistent UI/UX across all pages

Detail pages with comprehensive information for each character and Pokémon

Grid and List view toggle for better user experience

Modular and reusable components

API data fetching with clean separation of UI and data logic

Navigation between overview and detail pages

Designed for scalability and future feature expansion

## 🏗️ Project Structure

```
app/
├── api/                  # API integration logic
│   ├── composables/      # Composables for API fetching and logic
│   ├── config/           # API configurations
│   ├── mappers/          # Mapping logic between API and UI
│   ├── types/            # TypeScript types for API responses
│   └── index.ts
│
├── assets/               # Static assets (animations, css, icons)
│   ├── animations/
│   ├── css/
│   └── icons/
│
├── components/           # Reusable UI components
│   ├── backgrounds/      # Background components
│   ├── cards/            # Character and view cards
│   ├── navigation/       # Navigation components
│   └── ui/               # UI base components (buttons, overlays, pagination)
│
├── composables/          # Store and route management
│
├── config/               # App configuration files
│
├── constants/            # Constant values (e.g., color schemes)
│
├── layouts/              # Application layout components
│   └── ContentContainer.vue
│
├── pages/                # Application pages
│   ├── pokemon/
│   │   ├── [id].vue      # Pokémon detail page
│   │   └── index.vue     # Pokémon overview page
│   └── rick-and-morty/
│       ├── [id].vue      # Rick & Morty detail page
│       └── index.vue     # Rick & Morty overview page
│
├── server/               # Server-side logic (if applicable)
│
├── store/                # Pinia store configuration
│
├── plugins/              # Nuxt plugins
│
├── public/               # Static public assets
│
├── nuxt.config.ts        # Nuxt configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## ⚡ Installation

### Prerequisites

Node.js (v16 or higher)

pnpm (Preferred package manager)

### Setup

```bash

Clone the repository

git clone
cd

Install dependencies

pnpm install

Run the development server

pnpm dev
```

## 🌐 Usage

Visit http://localhost:3000/pokemon for the Pokémon overview.

Visit http://localhost:3000/rick-and-morty for the Rick & Morty overview.

Click on an item card to navigate to its detailed page.

Use the view toggle (Grid/List) for customized browsing.

## 📦 Build for Production

```bash

Generate static files for deployment

pnpm build

Preview the production build

pnpm preview
```

## 🎨 UI/UX Design

The UI/UX is designed for consistency, with reusable components styled using TailwindCSS. The design ensures:

Identical layout structures for both overview and detail pages.

Responsive design for optimal mobile and desktop experiences.

Clear navigation and data presentation.

## 🔍 Testing

The project uses Vitest for unit testing:

```bash

Run all tests

pnpm test
```

## ⚡ Scripts

The following pnpm scripts are available:

`dev`: Run the development server

`dev:pwa`: Run the PWA development server

`build`: Build the application

`generate`: Generate static files

`prepare`: Prepare Nuxt application

`preview`: Preview the production build

`start`: Start the production server

`start:generate`: Serve the generated static files

`lint`: Lint the project using ESLint

`lint:fix`: Fix lint issues

`typecheck`: Run TypeScript type checking

## 🧩 Key Dependencies

### Dependencies

Nuxt 3 (^3.15.4)

Pinia for state management (^2.3.1)

Pinia Plugin PersistedState (^4.2.0)

Pokenode-ts (^1.20.0)

RickMortyAPI (^2.3.0)

### DevDependencies

ESLint (^9.20.0)

Vue TSC (2.1.6)

TailwindCSS Typography (^0.5.16)

Nuxt Content (^2.13.4)

Nuxt DevTools (2.0.0-beta.2)

Nuxt UI (^2.21.0)

VueUse (^12.7.0)

@vite-pwa/nuxt (^0.10.6)

## 💡 Future Improvements

Infinite scrolling or pagination for large datasets

Search and filter functionalities

Dark mode toggle

Performance optimizations

## 🛡️ License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Acknowledgments

PokéAPI

Rick and Morty API

Nuxt

Vue.js

TailwindCSS

Vitest

Created by Bekir Kaplan - Principal Software Engineer

✨ Feel free to submit issues, suggestions, and pull requests to improve the project further!
