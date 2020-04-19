class SchemaToLayout {
  constructor (schema) {
    this.layout = {
      children: [this.convert(schema.type, schema)]
    }
  }

  convert (path, schema) {
    if (schema.type === 'object') {
      return this.convertObj(path, schema)
    } else if (schema.type === 'array') {
      return this.convertArr(path, schema)
    } else {
      return this.convertStr(path)
    }
  }

  convertObj (path, schema) {
    if (schema.properties) {
      return {
        prop: path,
        children: this.convertObjProps(schema.properties)
      }
    }
    if (schema.additionalProperties) {
      if (schema.additionalProperties.type === 'object') {
        return {
          prop: path,
          children: this.convertObjProps(schema.additionalProperties.properties)
        }
      }
      return {
        prop: path
      }
    }
  }

  convertArr (path, schema) {
    if (Array.isArray(schema.items)) {
      const arrayChildren = this.convertArrItems(schema.items)
      return {
        prop: path,
        children: [
          {
            prop: path,
            children: arrayChildren
          }
        ]
      }
    }
    if (schema.items && schema.items.type === 'object') {
      return {
        prop: path,
        item: {
          children: this.convertObjProps(schema.items.properties)
        }
      }
    }
    return {
      prop: path,
      item: {}
    }
  }

  convertStr (path) {
    return {
      prop: path
    }
  }

  convertArrItems (items) {
    console.log('arrItems', items)
    return items.map(item => {
      return Object.getOwnPropertyNames(item).filter(k => !k.startsWith('__')).map(k => {
        const val = item[k]
        console.log('arrItems', val, k)
        return this.convert(k, val)
      })
    }).flat()
  }

  convertObjProps (props) {
    return Object.getOwnPropertyNames(props).filter(k => !k.startsWith('__')).map(k => {
      const val = props[k]
      return this.convert(k, val)
    })
  }
}

export { SchemaToLayout }
