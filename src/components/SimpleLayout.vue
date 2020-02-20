<template lang="pug">
  div
    // pre {{layout}}
    p.q-mb-lg.q-mt-lg Applied layout
    data-renderer(:data="jsonFile" :layout="layout" :showEmpty="true" :schema="currentSchema")
    p.q-mb-lg.q-mt-lg Original (no layout)
    data-renderer(:data="jsonFile" :schema="currentSchema")
    p.q-mb-lg.q-mt-lg Data editor
    oarepo-record-inplace-editor(:record="jsonFile" :layout="layout" :options="options")
    q-card.child.inline-block-child.version-card.q-ma-lg JSON File
     q-card-section
       pre.card-content {{jsonFile}}
    q-card.child.inline-block-child.version-card.q-ma-lg JSON Schema
     q-card-section
       pre.card-content {{jsonSchema}}
</template>

<script>
import { SchemaToLayout } from '@oarepo/data-editor-jsonschema'

export default {
  name: 'simple-layout',
  data: function () {
    return {
      jsonFile: {
        firstName: 'John',
        lastName: 'Doe',
        age: 21
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      jsonSchema: {
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
      }
    }
  },
  computed: {
    layout () {
      return new SchemaToLayout(this.jsonSchema).layout.children
    },
    currentSchema () {
      return this.$attrs.displaySchema
    }
  },
  methods: {
    submit ({ context, prop, value }) {
      context[prop] = value
    },
    cancel (props) {
      console.log('cancelling')
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
