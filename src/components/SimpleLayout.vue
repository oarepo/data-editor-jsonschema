<template lang="pug">
  div
    pre {{layout}}
    pre {{currentSchema}}
    data-renderer(:data="json_file" :layout="layout" :show-empty="false" :schema="currentSchema")
    p.q-mb-lg.q-mt-lg Original
    data-renderer(:data="json_file" :schema="currentSchema")
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
      json_file: {
        firstName: 'John',
        lastName: 'Doe',
        age: 21
      },
      json_schema: {
        $id: 'https://example.com/person.schema.json',
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'Person',
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: "The person's first name."
          },
          lastName: {
            type: 'string',
            description: "The person's last name."
          },
          age: {
            description: 'Age in years which must be equal to or greater than zero.',
            type: 'integer',
            minimum: 0
          }
        }
      },
      schema: 'table'
    }
  },
  computed: {
    layout () {
      return new SchemaToLayout(this.json_schema).layout.children
    },
    currentSchema () {
      return this.$attrs.displaySchema
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
