<template lang="pug">
  div
    pre {{layout}}
    data-renderer(:data="json_file" :layout="layout" :show-empty="false" :schema="schema")
    p.q-mb-lg.q-mt-lg Original
    data-renderer(:data="json_file" :schema="schema")
</template>

<script>
import { SchemaToLayout } from '../../library/services/layout_creator'

export default {
  name: 'complex-layout',
  data: function () {
    return {
      json_file: {
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
      json_schema: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'Schema for a recording',
        type: 'object',
        properties: {
          id: { type: 'number' },
          work: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              composer: { $ref: 'file:/absolute/path/to/artist.json' }
            }
          },
          recording_artists: {
            type: 'array',
            items: { $ref: 'file:/absolute/path/to/artist.json' }
          }
        },
        required: ['id', 'work', 'recording_artists']
      },
      schema: 'table'
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
</style>
