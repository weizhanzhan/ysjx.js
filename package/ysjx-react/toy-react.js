class ElementWrapper{
  constructor(type){
    this.root = document.createElement(type)
  }
  setAttribute(name,value){
    this.root.setAttribute(tagName,value)
  }
  appendChild(component){
    this.root.appendChild(component.root)
  }
}

class TextWrapper{
  constructor(content){
    this.root = document.createTextNode(content)
  }
}

export class Component{
  constructor(){
    this._root = null
    this.props = Object.create(null)
    this.children = []

  }
  setAttribute(name,value){
    this.props[name] = value
  }
  appendChild(component){
    this.children.push(component)
  }
  get root(){
    if(!this._root){
      this._root = this.render().root //如果render出来的是一个自定义组件，那么就会递归获取 最顶层的节点
    }
    return this._root
  }

}

export function createElement(type,attributes,...children){
  console.log('type', type,children)
  let e ;
  if(typeof type === 'string'){
    e = new ElementWrapper(type)
  }else{
    e = new type
  }

  for (const p in attributes) {
    e.setAttribute(p,attributes[p])
  }

  
  const insetChildren = (children) => {
    for (let child of children) {

      if(typeof child ==='string'){
        child = new TextWrapper(child)
      }
  
      if((typeof child === 'object') && (child instanceof Array)){
        insetChildren(child)
      }else{
        e.appendChild(child)
      }
    }
    
  }
  insetChildren( children )
  return e

}

export function render(component,parentElement){
  parentElement.appendChild(component.root)
}