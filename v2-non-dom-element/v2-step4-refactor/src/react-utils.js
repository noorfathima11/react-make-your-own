function isClass(func){
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func))
}

function isStatelessComponent(element){
  return !isClass(element) && typeof element === 'function'
}
