# Pokémon & Rick & Morty Overview Application

This project is a scalable web application built with **Vue 3**, **TypeScript**, and **Nuxt**. It provides comprehensive overviews and detailed pages for both **Pokémon** and **Rick & Morty** characters by integrating the following APIs:

- **Pokémon API**: [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- **Rick & Morty API**: [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation/)

## 🚀 Features

- Separate overview pages for Pokémon and Rick & Morty characters
- Consistent UI/UX across all pages
- Detail pages with comprehensive information for each character and Pokémon
- Grid and List view toggle for better user experience
- Modular and reusable components
- API data fetching with clean separation of UI and data logic
- Navigation between overview and detail pages
- Designed for scalability and future feature expansion

## 🏗️ Project Structure

```
app/
├── api/                  # API integration logic
│   ├── composables/      # Composables for API fetching and logic
│   │   ├── usePokemonApi.ts
│   │   └── useRickAndMortyApi.ts
│   ├── config/           # API configurations
│   │   ├── pokemonApi.ts
│   │   └── rickMortyApi.ts
│   ├── mappers/          # Mapping logic between API and UI
│   │   ├── pokemon.mapper.ts
│   │   └── rickAndMorty.mapper.ts
│   └── types/            # TypeScript types for API responses
│       ├── character.types.ts
│       ├── common.types.ts
│       └── pokemon.types.ts
│   └── index.ts
│
├── assets/               # Static assets (animations, css, icons)
│   ├── animations/
│   ├── css/
│   └── icons/
│
├── components/           # Reusable UI components
│   ├── backgrounds/      # Background components
│   │   └── WallpaperBackground.vue
│   ├── cards/            # Character and view cards
│   │   ├── CharacterDetail.vue
│   │   ├── GridCard.vue
│   │   └── ListView.vue
│   ├── navigation/       # Navigation components
│   │   ├── MainNavigation.vue
│   │   ├── SubNavigation.vue
│   │   └── ViewToggle.vue
│   └── ui/               # UI base components (buttons, overlays, pagination)
│       ├── Alert.vue
│       ├── Avatar.vue
│       ├── Badge.vue
│       ├── BaseButton.vue
│       ├── BaseCard.vue
│       ├── BaseGradient.vue
│       ├── CustomPagination.vue
│       ├── FixedPagination.vue
│       ├── LoadingOverlay.vue
│       ├── Progress.vue
│       └── ScrollToTop.vue
│   └── DetailView.vue
│
├── composables/          # Store and route management
│   ├── clientSide/
│   ├── useAppStore.ts
│   └── useRouteManager.ts
│
├── config/               # App configuration files
│   ├── appConfig.ts
│   ├── defaultConfig.ts
│   ├── pokemonConfig.ts
│   ├── pwa.ts
│   └── rickMortyConfig.ts
│
├── constants/            # Constant values (e.g., color schemes)
│   ├── ConstPokemonColor.ts
│   ├── ConstRickMortyColor.ts
│   └── index.ts
│
├── layouts/              # Application layout components
│   ├── CardLayout.vue
│   ├── ContentContainer.vue
│   ├── DetailLayout.vue
│   ├── ListItemLayout.vue
│   ├── MainLayout.vue
│   └── PagesLayout.vue
│
├── pages/                # Application pages
│   ├── pokemon/
│   │   ├── [id].vue      # Pokémon detail page
│   │   └── index.vue     # Pokémon overview page
│   └── rick-and-morty/
│       ├── [id].vue      # Rick & Morty detail page
│       └── index.vue     # Rick & Morty overview page
│   └── index.vue         # Main landing page
│
├── server/               # Server-side logic (if applicable)
│
├── store/                # Pinia store configuration
│   └── view.ts
│
├── tests/                # Testing-related files
│
├── types/                # Global TypeScript definitions
│   ├── common.ts
│   ├── config.types.ts
│   └── route.types.ts
│
├── plugins/              # Nuxt plugins
│   └── pinia-plugin-persistedstate.ts
│
├── public/               # Static public assets
│
├── app.vue               # Root Vue component
├── nuxt.config.ts        # Nuxt configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## ⚡ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) (Preferred package manager)

### Setup

```bash
git clone <repository-url>
cd <project-folder>
pnpm install
pnpm dev
```

## 🌐 Usage

- Visit `http://localhost:3000/pokemon`
- Visit `http://localhost:3000/rick-and-morty`

## 📦 Build for Production

```bash
pnpm build
pnpm preview
```

## 🎨 UI/UX Design

- Identical layout structures
- Responsive design
- Clear navigation

## 🔍 Testing

```bash
pnpm test
```

## ⚡ Scripts

- `dev`: Run dev server
- `build`: Build app
- `preview`: Preview build
- `test`: Run tests

## 🧩 Key Dependencies

- **Nuxt 3** (`^3.15.4`)
- **Pinia** (`^2.3.1`)
- **TailwindCSS** (`^0.5.16`)

## 💡 Future Improvements

- Infinite scrolling
- Search functionality
- Dark mode

## 🛡️ License

**MIT License** - See [LICENSE](LICENSE)

## 🤝 Acknowledgments

- [PokéAPI](https://pokeapi.co/)
- [Rick and Morty API](https://rickandmortyapi.com/)

---

**Created by Bekir Kaplan** - Principal Software Engineer

---
