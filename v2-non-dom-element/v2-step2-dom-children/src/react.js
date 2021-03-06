(() => {
  function anElement(element, children){
    if(typeof element === 'function'){
      return element()
    } else {
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
