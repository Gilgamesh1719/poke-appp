<template>
  <div class="app-container">
    <TreeView class="types-section" />
    <PokemonDetails class="pokemons-section" />
  </div>
</template>

<script>
import TreeView from './components/TreeView.vue';
import PokemonDetails from './components/PokemonDetails.vue';
import '@/assets/styles/main.css';

export default {
  name: 'App',
  components: {
    TreeView,
    PokemonDetails
  }
};
</script>