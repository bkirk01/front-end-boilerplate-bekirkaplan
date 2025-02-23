<template>
  <!-- Content -->
  <div class="hero-container">
    <h1 class="hero-title" name="title">
      Welcome to Rick & Morty and Pokémon Overview
    </h1>

    <div class="hero-grid">
      <NuxtLink to="/rick-and-morty" class="feature-card">
        <div class="card-wrapper">
          <div class="card-header">
            <div class="header-content rick-and-morty-gradient">
              <h2 class="header-title">
                Rick & Morty Characters
              </h2>
            </div>
            <img src="~/assets/icons/rick.jpeg" alt="Rick" class="header-image">
          </div>
          <div class="card-content">
            <p class="card-description">
              Explore characters from the Rick & Morty universe, discover their stories, and learn
              about their adventures.
            </p>
            <div class="card-link">
              Browse Characters
              <UIcon name="i-heroicons-arrow-right" class="link-icon" />
            </div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/pokemon" class="feature-card">
        <div class="card-wrapper">
          <div class="card-header">
            <div class="header-content pokemon-gradient">
              <h2 class="header-title">
                Pokémon
              </h2>
            </div>
            <img src="~/assets/icons/pikacu.png" alt="Pikachu" class="header-image">
          </div>
          <div class="card-content">
            <p class="card-description">
              Discover and learn about different Pokémon species, their types, abilities, and
              stats.
            </p>
            <div class="card-link pokemon-link">
              Browse Pokémon
              <UIcon name="i-heroicons-arrow-right" class="link-icon" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/views/home.css';
</style>
