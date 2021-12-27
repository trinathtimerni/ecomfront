<template>
  <v-btn
    :style="styles"
    color="primary"
    fab
    small
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'BaseBtn',

  props: {
    square: Boolean
  },

  computed: {
    styles () {
      return {
        borderRadius: this.square ? '2px' : undefined
      }
    }
  }
}
</script>
<!-- <base-btn
          class="mr-0"
          square
          title="Go to top"
          @click="$vuetify.goTo(0)"
        >
          <v-icon style="background: black;
    border-radius: 50%;
    padding: 5px;color:#fff;z-index:101">mdi-chevron-up</v-icon>
        </base-btn> -->