import { SchemaToLayout } from './services/layout_creator'
import JSONSchemaDataEditorComponent from './components/JSONSchemaDataEditorComponent'

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
