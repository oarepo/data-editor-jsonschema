<template lang="pug">
  .row
    .col-4
      h6.q-mb-lg.q-mt-lg Applied layout
      data-renderer(:data="record" :layout="layout" :showEmpty="true" :schema="currentSchema")
      h6.q-mb-lg.q-mt-lg Original (no layout)
      data-renderer(:data="record" :schema="currentSchema")
      h6.q-mb-lg.q-mt-lg Data editor
      oarepo-record-inplace-editor(:record="record" :layout="layout" :options="options")
      h6.q-mb-lg.q-mt-lg JSON schema data editor component
      json-schema-data-editor-component(:record="record" :options="options" :jsonSchema="jsonSchema")
    .col-8.row
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
    }
  },
  computed: {
    layout () {
      return new SchemaToLayout(this.jsonSchema).layout.children
    },
    currentSchema () {
      return this.$attrs.displaySchema
    }
  }
}
</script>

<style scoped>

</style>
