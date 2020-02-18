class SchemaToLayout {
  constructor (schema) {
    this.layout = this.convert('', schema)
  }

  convert (path, schema) {
    if (schema.type === 'object') {
      return this.convertObj(path, schema)
    } else {
      return this.convertStr(path)
    }
  }

  convertObj (path, schema) {
    if (schema.properties) {
      return {
        path: path,
        children: this.convertObjProps(schema.properties)
      }
    } if (schema.additionalProperties) {
      return {
        label: path,
        path: path
      }
    }
  }

  convertArr (path, schema) {
    if (schema.properties) {
      return {
        path: path,
        children: this.convertObjProps(schema.properties)
      }
    }
  }

  convertStr (path) {
    return {
      label: path,
      path: path
    }
  }

  convertObjProps (props) {
    return Object.getOwnPropertyNames(props).filter(k => !k.startsWith('__')).map(k => {
      const val = props[k]
      return this.convert(k, val)
    })
  }
}
export { SchemaToLayout }
