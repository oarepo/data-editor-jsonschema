<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema")
</template>

<script>
import DemoComponent from './DemoComponent'

export default {
  name: 'complex-layout',
  components: { DemoComponent },
  data: function () {
    return {
      record: {
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

<style scoped>
</style>
