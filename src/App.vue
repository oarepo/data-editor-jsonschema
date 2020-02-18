<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header.glossy(elevated='')
      q-toolbar
        q-btn(flat='', dense='', round='', @click='leftDrawerOpen = !leftDrawerOpen', aria-label='Menu', icon='menu')
          q-toolbar-title
            | @oarepo/invenio-quasar
          div Quasar v{{ $q.version }}
    q-drawer(v-model='leftDrawerOpen', show-if-above='', bordered='', content-class='bg-grey-2')
      q-list
        q-expansion-item(header='' label="drawer")
          q-card
            q-card-section
              q-list
                q-item(clickable='' :to="{name: 'simple-layout'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Simple layout
    q-page-container
      q-page.q-ma-lg
        router-view
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {},
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="stylus">
</style>
