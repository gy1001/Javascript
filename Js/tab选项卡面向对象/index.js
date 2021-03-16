let that;
let intLength =3;
class Tab{
  // 切换
  constructor(options) {
    that = this
    this.options = options
    this.parentUl = document.querySelector(options.tabUl)
    this.addBtn = document.querySelector(options.addBtn)
    this.parentSection = document.querySelector(options.sectionUl)
    this.init()
  }

  init(){
    this.updateNodes()
    this.addBtn.onclick = this.addTab
  }
  addClick(){
    this.tabBtns.forEach((item,index) => {
      this.tabBtns[index].onclick = this.toggleTab
      this.tabElSpans[index].ondblclick=this.editTab
      this.deleteLis[index].onclick = this.deleteTab
      this.tabBtns[index].hisIndex = index
    })
  }
  clearCurrentTabClass(){
    if(document.querySelector(this.options.tabEl + ".active")){
      that.removeClass(document.querySelector(this.options.tabEl + ".active"),"active")
      that.removeClass(document.querySelector(this.options.sectionLi +".active"), "active")
    }
  }
  //判断样式是否存在
  hasClass(ele, cls){
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  }
  removeClass(ele, cls) {
    if (that.hasClass(ele, cls)) {
      let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, "");
    }
  }
  addClass(ele, cls) {
    if (!that.hasClass(ele, cls)) ele.className += " " + cls;
  }
  toggleTab(){
    const currentIndex = this.hisIndex
    that.clearCurrentTabClass()
    that.addClass(that.tabBtns[currentIndex],"active" )
    that.addClass(that.sectionEls[currentIndex],"active")
  }
  // 添加
  addTab(){
    const tabElLength = intLength++ + 1
    that.clearCurrentTabClass()
    const tabStr = `
       <li class="active" data-index="${tabElLength}">
          <span class="text">选项卡${tabElLength}</span>
          <span class="delete-icon"></span>
        </li>
     `
    const sectionStr = `
      <div class="active">测试${tabElLength}</div>
    `
    that.parentUl.insertAdjacentHTML("beforeend",tabStr)
    that.parentSection.insertAdjacentHTML("beforeend", sectionStr)
    that.updateNodes()
  }
  updateNodes(){
    this.tabBtns = document.querySelectorAll(this.options.tabEl)
    this.sectionEls = document.querySelectorAll(this.options.sectionLi)
    this.deleteLis = document.querySelectorAll(this.options.deleteLi)
    this.tabElSpans = document.querySelectorAll(this.options.tabElSpan)
    this.addClick()
  }
  // 删除
  deleteTab(e){
    e.stopPropagation()
    console.log("删除")
    const deleteIndex = this.parentNode.hisIndex
    if(that.hasClass(that.tabBtns[deleteIndex], "active")){
      deleteIndex > 0 && that.tabBtns[deleteIndex-1].click()
      deleteIndex === 0 && that.tabBtns.length > 1 && that.tabBtns[deleteIndex+1].click()
    }
    that.tabBtns[deleteIndex].remove()
    that.sectionEls[deleteIndex].remove()
    that.updateNodes()
  }
  // 修改
  editTab(){
    console.log("edit")
    const valHtml = this.innerHTML
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = `<input type='text' value="${valHtml}">`
    const input = this.querySelector("input")
    input.select()
    input.onblur= function (){
      this.parentNode.innerHTML = this.value
    }
    input.onkeyup= function (e){
      if(e.key==="Enter"){
        input.blur()
      }
    }
  }
}

new Tab({
  addBtn: '.add-btn',
  tabEl: '.tab-ui li',
  tabUl: '.tab-ui',
  sectionLi: '.content div',
  sectionUl: ".content",
  deleteLi: '.tab-ui .delete-icon',
  tabElSpan: '.tab-ui li span.text'
})