const Hello = ({name}) => {
    console.log('in function hello')
    return React.createElement('div', null, `Hello ${name}`)
}

const helloWorld = React.createElement(Hello, {name: 'Noor'}, null)
ReactDOM.render(helloWorld, document.getElementById('root'))
