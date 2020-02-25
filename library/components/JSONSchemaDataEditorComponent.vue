<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :layout="currentLayout" :options="options")
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
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    currentLayout () {
      return new SchemaToLayout(this.jsonSchema).layout.children
    }
  }
}
</script>

<style scoped>

</style>
