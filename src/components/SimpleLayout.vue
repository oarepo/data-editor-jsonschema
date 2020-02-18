<template lang="pug">
  div
    pre {{layout}}
    data-renderer(:data="json_file" :layout="layout" :show-empty="false" schema="table")
    p.q-mb-lg.q-mt-lg Original
    data-renderer(:data="json_schema" schema="table")
    q-card.child.inline-block-child.version-card.q-ma-lg JSON File
     q-card-section
       pre.card-content {{json_file}}
    q-card.child.inline-block-child.version-card.q-ma-lg JSON Schema
     q-card-section
       pre.card-content {{json_schema}}
</template>

<script>
import { SchemaToLayout } from '../../library/services/layout_creator'

export default {
  name: 'simple-layout',
  data: function () {
    return {
      json_file: {},
      json_schema: {}
    }
  },
  computed: {
    layout () {
      return new SchemaToLayout(this.json_schema).layout.children
    }
  }
}
</script>

<style scoped lang="stylus">
.version-card
  max-width 300px;
  width: 100%
  min-width 200px

.version-detail
  max-width 600px

.inline-block-child
  display: inline-block

.card-content
  max-width: 300px;
  white-space: pre-wrap
</style>
