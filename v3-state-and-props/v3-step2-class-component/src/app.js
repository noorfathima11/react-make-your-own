class Hello extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return React.createElement(
      'div',
      null,
      `Hello ${this.props.name}`
    )
  }
}


const helloWorld = React.createElement(
  Hello,
  {name: 'Noor'},
  null)
  
ReactDOM.render(helloWorld, document.getElementById('root'))
