// created by Humoyun 

class Snackbar {
  constructor(_title = "", _text = "", _dur = 1) {
    this.title = _title,
      this.text = _text,
      this.elem = document.createElement("div"),
      this.dur = _dur;
    var title, message;
    title = document.createElement("div"),
      message = document.createElement("div");
    message.textContent = this.text;
    title.textContent = this.title;
    this.elem.appendChild(title);
    this.elem.appendChild(message);
    design(this.elem, {
      "position": "fixed",
      "bottom": "-30%",
      "left": "0",
      "width": "100%",
      "padding": "1.1em 1.1em 1em 1.2em",
      "background": "#333",
      "color": "#FFF",
      "font-family": "Poppins",
      "display": "flex",
      "font-size": "17px",
      "flex-direction": "row",
      "justify-content": "space-between",
      "transition": ".2s ease-in",
      "opacity": "0"
    });
    design(title, {
      "width": "90px",
      "text-overflow": "ellipsis",
      "overflow": "hidden",
      "white-space": "nowrap",
      "margin": "0 .5em 0 0",
      "border-right": "1px solid #444",
      "padding-right": ".3em"
    });
    design(message, {
      "width": "100%",
      "text-overflow": "ellipsis",
      "overflow": "hidden",
      "white-space": "nowrap"
    });
  }

  init(_parent) {
    if (typeof _parent === "object") {
      _parent.appendChild(this.elem);
    } else {
      if (document.querySelector(this.elem)) {
        document.querySelector(this.elem).appendChild(this.elem);
      }
    }
  }
  
  show(_title = "", _text = "", _dur = this.dur) {
    this.elem.firstChild.textContent = _title;
    this.elem.lastChild.textContent = _text;
    design(this.elem, {
      "opacity": "1",
      "bottom": "0"
    });
    setTimeout(() => {
      design(this.elem, {
        "opacity": "0",
        "bottom": "-30%"
      });
    }, _dur * 1000);
  }
}