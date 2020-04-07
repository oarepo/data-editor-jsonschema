<template lang="pug">
  .row
    .col-4
      h6.q-mb-lg.q-mt-lg JSON schema data editor component
      json-schema-data-editor-component(:record="record" :options="currentOptions" :jsonSchema="jsonSchema")
    .col-4.row
      .col-8
        h6 JSON Schema
        pre {{jsonSchema}}
      .col-4
        h6 Generated layout
        pre {{layout}}
</template>

<script>
import { SchemaToLayout } from '../../library'

export default {
  name: 'demo-component',
  props: {
    record: Object,
    jsonSchema: Object,
    options: {
      type: Object,
      default: () => ({})
    },
    displaySchema: String
  },
  computed: {
    layout () {
      return new SchemaToLayout(this.jsonSchema).layout
    },
    currentSchema () {
      return this.displaySchema
    },
    currentOptions () {
      const opts = { ...this.options }
      if (opts.schema !== this.currentSchema) {
        opts.schema = this.currentSchema
      }
      return opts
    }
  }
}
</script>

<style scoped>

</style>
