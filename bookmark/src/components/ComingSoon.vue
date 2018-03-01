<template>
  <header class="page-header coming-soon">
    Coming Soon . . .
  </header>
</template>

<script>
  export default {
    name: 'ComingSoon'
  }
</script>

<style scoped>
  header.page-header.coming-soon {
    font-size: 32px;
  }

  @media only screen and (min-width: 600px) {
    header.page-header.coming-soon {
      font-size: 40px;
    }
  }
</style>
