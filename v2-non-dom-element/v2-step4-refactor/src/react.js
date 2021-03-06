(() => {
  function anElement(element, children){
    if(isClass(element)){
      return handleClass(element)
    }
    else if(isStatelessComponent(element)){
      return element()
    } else {
      return handleHtmlElement(element, children)
    }
  }

  function handleClass(clazz){
    const component = new clazz()
    return component.render()
  }

  function handleHtmlElement(element, children){
    const anElement = document.createElement(element)
      children.forEach(child => {
        if(typeof child === 'object'){
          anElement.appendChild(child)
        }else {
          anElement.innerHTML += child
        }
      })
      return anElement
  }

  function createElement(el, props, ...children){
    return anElement(el, children)
  }

  console.log('loaded')

  window.React = {
    createElement
  }

  window.ReactDOM = {
    render: (el, domEl) => {
      domEl.appendChild(el)
    }
  }
})()
