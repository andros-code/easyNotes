class recivedMessageBackground{
  constructor(callback){
    chrome.runtime.onMessage.addListener ( (request, _, sendResponse) =>  {
     
      this.setNoteDom(request);
      this.setLink("https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap");
      callback();

      return true;
    });
  }
  setLink(link){
    let tag = document.createElement('link');
    tag.href=link;
    tag.rel ="stylesheet";
    document.head.appendChild(tag);
  }

  setNoteDom(html){
    document.body.insertAdjacentHTML('afterend', html);
  }
}
class dragAndDrop{
  constructor(arg){
    this.arg = arg;
    this.dragged = null;
    this.dropped = null;
    this.dropoutEvent = null;


  var events=(el, key) => {
    let elements = document.querySelectorAll(el.drag);
    let drops = document.querySelectorAll(el.drop);


    for (let i = 0; i<elements.length; i++){
      elements[i].setAttribute('draggable', 'true');

      elements[i].addEventListener('dragstart', (e) =>
       this.dragstart(e, key), false);

      elements[i].addEventListener('drag', (e) => 
        this.drag(e, key), false);

      elements[i].addEventListener('dragend', (e) => 
        this.dragend(e, key), false);

      elements[i].addEventListener('dragenter', (e) => 
        this.dragenter(e, key), false);

      elements[i].addEventListener('dragover', (e) => 
        this.dragover(e, key), false);

      elements[i].addEventListener('dragleave', (e) => 
        this.dragleave(e, key), false);

      elements[i].addEventListener('drop', (e) => 
        this.drop(e, key), false);
    }

    for (let i = 0; i<drops.length; i++){
      
      drops[i].addEventListener('drop', (e) => 
        this.drop(e, key), false);
      drops[i].style.pointerEvents = 'all';
    }
    
  }
  function getPosition(arg){ 
      let id = arg.id.substring(1, arg.drag.length);
   
      var pos = {
        top:document.getElementById(id).offsetTop - 10,
        left:document.getElementById(id).offsetLeft - 10
      }
      return pos;
  }

  for (let key = 0; key < arg.length; key++) {
      events(arg[key], key);
  }
}
animateEvent(key, animation, event){
    let animate = this.arg[key].animate && this.arg[key].animate.dragstart ? 
    this.arg[key].animate.dragstart : null;

    if(typeof(animate) == 'string' && 
      this.animations[animate].to == 'dragstart') {
      animation();
    }
}
  dragstart(evt, key){
    this.dragged=evt.target;
  }
  drag(evt, key){
   evt.preventDefault();
  }
  dragenter(evt, key){
    this.dropoutEvent = false;
    this.dropped=evt.target;
  }
  dragover(evt, key){
    evt.preventDefault();
  }
  dragleave(evt, key){
    evt.preventDefault();
    this.dropoutEvent = true;
    this.dropped=null;
  }
  dragend(evt,  key){
     
    if(this.dropoutEvent == true){this.dropout();}
  }
  drop(evt, key){
    // no quiere accionarse este evento
    console.log('ESTA MIERDA NO APARECE')
    if (this.dragged!=null) {

      let x = window.event.clientX;
      let y = window.event.clientY;

      this.dragged.style.top = y+'px';
      this.dragged.style.left = x+'px';
      this.dropped=null;
      this.dragged=null;
    }
  }  
   dropout(){ /* my event */
    console.log('dd')
    if(this.dragged != null){
     
    }
      this.dropped=null;
      this.dragged=null;
  }
}
 
 new recivedMessageBackground(() =>{

     new dragAndDrop([{
      drag:"#note", //draggable element
      drop: "body"
    }]);

 });
   