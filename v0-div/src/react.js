(() => {
  function div(children){
    const aDiv = document.createElement('div')
    aDiv.innerHTML = children.join(' ')
    return aDiv
  }

  function createElement(el, props, ...children){
    return div(children)
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
