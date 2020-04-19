<template lang="pug">
div
  data-editor-component(:record="record" :layout="currentLayout" :path-layouts="pathLayouts" :options="options" :editor-components="editorComponents")
</template>

<script>
import { SchemaToLayout } from '@oarepo/data-editor-jsonschema'

export default {
  name: 'json-schema-data-editor-component',
  props: {
    record: Object,
    jsonSchema: Object,
    layout: {
      type: [Array, Function, Object]
    },
    pathLayouts: Object,
    options: {
      type: Object,
      default: () => ({})
    },
    editorComponents: Object
  },
  computed: {
    currentLayout () {
      const layout = new SchemaToLayout(this.jsonSchema).layout
      if (this.options.showEmpty) {
        layout.children[0].showEmpty = true
      }
      return layout.children[0]
    }
  }
}
</script>

<style scoped>

</style>
