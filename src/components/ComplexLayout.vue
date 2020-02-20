<template lang="pug">
  div
    pre {{layout}}
    // p.q-mb-lg.q-mt-lg Applied layout
    data-renderer(:data="jsonFile" :layout="layout" :showEmpty="true" :schema="currentSchema")
    p.q-mb-lg.q-mt-lg Original (no layout)
    data-renderer(:data="jsonFile" :schema="currentSchema")
    p.q-mb-lg.q-mt-lg Data editor
    oarepo-record-inplace-editor(:record="jsonFile" :layout="bla" :options="options")
    // q-card.child.inline-block-child.version-card.q-ma-lg JSON File
    //   q-card-section
    //     pre.card-content {{jsonFile}}
    // q-card.child.inline-block-child.version-card.q-ma-lg JSON Schema
    //   q-card-section
    //     pre.card-content {{jsonSchema}}
</template>

<script>
import { SchemaToLayout } from '../../library/services/layout_creator'

export default {
  name: 'complex-layout',
  data: function () {
    return {
      bla: [
        {
          label: 'id',
          path: 'id'
        },
        {
          path: 'work',
          children: [
            {
              label: 'id',
              path: 'id'
            },
            {
              label: 'name',
              path: 'name'
            },
            {
              label: 'composer',
              path: 'composer'
            }
          ]
        },
        {
          label: 'recording_artists',
          path: 'recording_artists',
          array: true,
          dynamic: true
        }
      ],
      jsonFile: {
        id: 1,
        work: {
          id: 10,
          name: 'Miroirs',
          composer: {
            id: 100,
            name: 'Maurice Ravel',
            functions: ['Composer']
          }
        },
        recording_artists: [
          {
            id: 101,
            name: 'Alexandre Tharaud',
            functions: ['Piano']
          },
          {
            id: 102,
            name: 'Jean-Martial Golaz',
            functions: ['Engineer', 'Producer']
          }
        ]
      },
      jsonSchema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'Schema for a recording',
        type: 'object',
        definitions: {
          artist: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              functions: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            required: ['id', 'name', 'functions']
          }
        },
        properties: {
          id: { type: 'number' },
          work: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              composer: { $ref: '#/definitions/artist' }
            }
          },
          recording_artists: {
            type: 'array',
            items: { $ref: '#/definitions/artist' }
          }
        },
        required: ['id', 'work', 'recording_artists']
      },
      schema: 'table',
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
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
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
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
