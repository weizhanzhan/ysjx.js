const RENDER_TO_DOM = Symbol("render to dom")

class ElementWrapper{
  constructor(type){
    this.root = document.createElement(type)
  }
  setAttribute(name,value){
    if(name.match(/^on([\s\S]+)$/)){
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/,c=>c.toLowerCase()),value)
    }else{
      this.root.setAttribute(name,value)
    }
    
  }
  appendChild(component){

    let range = document.createRange();
    range.setStart(this.root,this.root.childNodes.length)
    range.setEnd(this.root,this.root.childNodes.length)
    // this.root.appendChild(component.root)
    component[RENDER_TO_DOM](range)
  }
  [RENDER_TO_DOM](range){
    range.deleteContents();
    range.insertNode(this.root)
  }
}

class TextWrapper{
  constructor(content){
    this.root = document.createTextNode(content)
  }
  [RENDER_TO_DOM](range){
    range.deleteContents();
    range.insertNode(this.root)
  }
}

export class Component{
  constructor(){
    this._root = null
    this._range = null
    this.props = Object.create(null)
    this.children = []

  }
  setAttribute(name,value){
    this.props[name] = value
  }
  appendChild(component){
    this.children.push(component)
  }

  [RENDER_TO_DOM](range){
    this._range = range
    this.render()[RENDER_TO_DOM](range)
  }
  rerender(){
    let oldRange = this._range

    let range = document.createRange()
    range.setStart(oldRange.startContainer,oldRange.startOffset)
    range.setEnd(oldRange.startContainer,oldRange.startOffset)
    this[RENDER_TO_DOM](range)
    
    oldRange.setStart(range.endContainer,range.endOffset)
    oldRange.deleteContents()
   
  }
  setState(newState){
    if(this.state === null && typeof this.state !== 'object'){
      this.state = newState
      this.rerender()
      return
    }
    let merge = (oldState,newState) => {
      for(let p in newState){
        if(oldState[p]===null || typeof oldState[p] !== 'object'){
          oldState[p] = newState[p]
        }else{
          merge(oldState[p],newState[p])
        }
      }
    }
    merge(this.state,newState)
    this.rerender()
  }
  // get root(){
  //   if(!this._root){
  //     this._root = this.render().root //如果render出来的是一个自定义组件，那么就会递归获取 最顶层的节点
  //   }
  //   return this._root
  // }

}

export function createElement(type,attributes,...children){
  let e ;
  if(typeof type === 'string'){
    e = new ElementWrapper(type)
  }else{
    e = new type
  }

  for (const p in attributes) {

    if(p==='className'){
      e.setAttribute('class',attributes[p])
    }else{
      e.setAttribute(p,attributes[p])

    }
  }

  
  const insetChildren = (children) => {
    for (let child of children) {

      if(typeof child ==='string'){
        child = new TextWrapper(child)
      }
      if(child  === null){
        continue
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
  // parentElement.appendChild(component.root)
  let range = document.createRange();
  range.setStart(parentElement,0)
  range.setEnd(parentElement,parentElement.childNodes.length)
  component[RENDER_TO_DOM](range)
}