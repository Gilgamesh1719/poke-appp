<template>
  <div class="app-container">
    <div class="left-column">
      <TreeView />
    </div>
    
    <div class="right-column">
      <PokemonDetails />
    </div>
  </div>
</template>

<script>
import TreeView from './components/TreeView.vue'
import PokemonDetails from './components/PokemonDetails.vue'

export default {
  components: {
    TreeView,
    PokemonDetails
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@600&display=swap');

:root {
  --primary-blue: #1e40af;
  --secondary-blue: #3b82f6;
  --light-blue: #dbeafe;
  --dark-blue: #1e3a8a;
  --bg-gradient: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: var(--bg-gradient);
  height: 100vh;
  display: flex;
  justify-content: center;
}

.app-container {
  display: flex;
  width: 95%;
  max-width: 1400px;
  height: calc(100vh - 40px);
  margin-top: 20px;
  gap: 20px;
}

.left-column {
  width: 350px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.right-column {
  flex: 1;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    height: auto;
  }
  
  .left-column {
    width: 100%;
    height: 50vh;
  }
}
</style>