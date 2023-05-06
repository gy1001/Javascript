namespace Component {
  export class Header {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is a header'
      document.body.appendChild(elem)
    }
  }
  export class Content {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is a content'
      document.body.appendChild(elem)
    }
  }
  export class Footer {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is a footer'
      document.body.appendChild(elem)
    }
  }
}
