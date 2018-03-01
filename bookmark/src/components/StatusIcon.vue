<template>
  <i class="small material-icons status-icon" :class="iconColors[status]">
    {{ iconTypes[status] }}
  </i>
</template>

<script>
  export default {
    name: 'StatusIcon',
    props: {
      status: { type: String, required: true }
    },
    data: function () {
      return {
        iconColors: {
          currentlyReading: 'orange-icon',
          read: 'green-icon',
          wantToRead: 'purple-icon'
        },
        iconTypes: {
          currentlyReading: 'bookmark',
          read: 'check_circle',
          wantToRead: 'add_circle'
        }
      }
    }
  }
</script>
