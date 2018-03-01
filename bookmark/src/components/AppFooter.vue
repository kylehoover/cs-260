<template>
  <footer>
    <hr />
    <a id="repo-link" href="https://github.com/kylehoover/cs-260/tree/master/bookmark">
      GitHub Repository
    </a>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter'
  }
</script>

<style scoped>
  footer {
    padding: 0 16px 16px 16px;
  }

  footer a {
    color: black;
  }

  footer hr {
    border-color: #8A53A6;
    margin-bottom: 16px;
  }

  #repo-link {
    color: #9e9e9e;
  }
</style>
