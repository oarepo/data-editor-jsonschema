import { SchemaToLayout } from './services/layout_creator.js'
import JSONSchemaDataEditorComponent from './components/JSONSchemaDataEditorComponent.vue'

export default {
  install (Vue, options) {
    options = {
      ...options
    }

    Vue.component(JSONSchemaDataEditorComponent.name, JSONSchemaDataEditorComponent)
  }
}
export {
  SchemaToLayout
}
