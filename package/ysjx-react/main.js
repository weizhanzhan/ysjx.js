import { createElement,render, Component } from './toy-react'

class MyComponent extends Component{
  render(){
    return <div>
      <div>234</div>
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