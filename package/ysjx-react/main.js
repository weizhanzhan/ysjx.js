import { createElement,render, Component } from './toy-react'

class MyComponent extends Component{

  constructor(){
    super();
    this.state = {
      a:1,
      b:2
    }
  }

  render(){
    return <div>
      <div>2345</div>
      <button onclick={()=>{
        this.setState({
          a:this.state.a +1
        })
      }}>add</button>
      <span>{this.state.a.toString()}</span>
      <span>{this.state.b.toString()}</span>
      { this.children }
    </div>
  }
}





render(
  <MyComponent id="1234" class="test">
    <div>abc</div>
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  </MyComponent>,document.body
)