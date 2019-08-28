(() => {
  let rootDOMElement, rootReactElement
  const REACT_CLASS = 'REACT_CLASS'
  const classMap = {}
  let classCounter = 0



  function anElement(element, props, children){
    if(isClass(element)){
      return handleClass(element, props, children)
    }
    else if(isStatelessComponent(element)){
      console.log('yes, I am stateless')
      console.log('element', element, props)
      return element(props)
    }
    else {
      console.log('I am normal Html element')
      return handleHtmlElement(element, props,  children)
    }
  }

  function handleClass(clazz, props, children){
    classCounter++
    if(classMap[classCounter]){
      return classMap[classCounter]
    }
    const reactElement = new clazz(props)
    reactElement.type = REACT_CLASS
    reactElement.children = children
    classMap[classCounter] = reactElement
    return reactElement
  }

  function handleHtmlElement(element, props, children){
    console.log('children', children, 'props', props)
    const anElement = document.createElement(element)
    children.forEach(child => appendChild(anElement, child))
    _.forEach(props, (value, name) => appendProp(anElement, name, value))
    return anElement
  }

  function appendProp(element, propName, propValue){
    console.log('appending prop', element, propName, propValue)
    if(shouldAddEventListener(propName)){
      element.addEventListener(
        propName.substring(2).toLowerCase(),
        propValue
      )
    }
    else{
      if(propName === 'className'){
        propName = 'class'
      }
      if(propName === 'style'){
        propVal = _.reduce(propVal, (acc, value, key) => {
          return acc.concat(`${key}:${value}`)
        }, '')
      }
      element.setAttribute(propName, propValue)
    }
  }

  function appendChild(element, child){
    console.log('element', element)
    if(child.type === REACT_CLASS){
      appendChild(element, child.render())

    }
    else if(typeof child === 'object'){
      console.log('child is an object')
      element.appendChild(child)
    }
    else {
      console.log('child is not an object')
      element.innerHTML += child
      console.log('anElement', element)
    }

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

    setState(state){
      this.state = Object.assign({}, this.state, state)
      reRender()
    }
  }

  function reRender(){
    //clear the dom
    while(rootDOMElement.hasChildNodes()){
      rootDOMElement.removeChild(rootDOMElement.lastChild)
    }
    classCounter = 1
    ReactDOM.render(rootReactElement, rootDOMElement)

  }

  window.React = {
    createElement,
    Component
  }

  window.ReactDOM = {
    render: (el, domEl) => {
      rootDOMElement = domEl
      rootReactElement = el
      const currentDOM = rootReactElement.type === REACT_CLASS ? rootReactElement.render() : rootReactElement;
      rootDOMElement.appendChild(currentDOM);
    }
  }
})()
