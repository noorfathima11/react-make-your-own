(() => {
  function anElement(element, props, children){
    if(isClass(element)){
      return handleClass(element, props)
    }
    else if(isStatelessComponent(element)){
      console.log('yes, I am stateless')
      console.log('element', element, props)
      return element(props)
    }
    else {
      console.log('I am normal Html element')
      return handleHtmlElement(element, children)
    }
  }

  function handleClass(clazz, props){
    const component = new clazz(props)
    return component.render()
  }

  function handleHtmlElement(element, children){
    console.log('children', children)
    const anElement = document.createElement(element)
      children.forEach(child => {
        if(typeof child === 'object'){
          console.log('child is an object')
          anElement.appendChild(child)
        }else {
          console.log('child is not an object')
          anElement.innerHTML += child
          console.log('anElement', anElement)
        }
      })
      return anElement
  }

  function createElement(el, props, ...children){
    console.log('props', props)
    let returnValue = anElement(el, props, children)
    console.log('returnValue', returnValue)
    return returnValue
  }

  console.log('loaded')

  class Component {
    constructor(props){
      this.props = props
    }
  }

  window.React = {
    createElement,
    Component
  }

  window.ReactDOM = {
    render: (el, domEl) => {
      domEl.appendChild(el)
    }
  }
})()
