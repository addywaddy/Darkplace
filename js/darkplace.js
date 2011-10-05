Darkplace = {
  open: function(name) {
    localStorage.setItem("_DP", name)
    textArea.value = localStorage.getItem("DP:" + localStorage.getItem("_DP"))
  },
  openOrDelete: function(e) {
    if (e.target.className == 'destroy') {
      var name = e.target.parentElement.firstChild.textContent
      if (confirm("Sure you want to delete '" + name + "'?")) {
        if (localStorage.getItem('_DP') == name) {
          localStorage.setItem("_DP")
        }
        localStorage.removeItem("DP:" + name)
        Darkplace.renderMenu()
      }
    } else {
      var name = e.target.firstChild.textContent
      Darkplace.open(name)
    }
    return false;
  },

  save: function() {
    if(localStorage.getItem("_DP")) {
      console.log("saving")
      localStorage.setItem("DP:" + localStorage.getItem("_DP"), textArea.value)
    }
  },

  renderMenu: function() {
   document.querySelector("#darkplaces").innerHTML = ""
   var list = [], link, li
   Object.keys(localStorage).forEach(function(key) {
     if (key.match(/^DP:/)) {
       with (link = document.createElement('a')) {
         setAttribute('href', '')
         innerHTML = "X"
         setAttribute("class", 'destroy')
       }

       with ((li = document.createElement('li'))) {
         appendChild(document.createTextNode(key.match(/^DP:(.+)$/)[1]))
         appendChild(link)
       }
       document.querySelector("#darkplaces").appendChild(li)
     }
   })
  },
  create: function(e) {
    setTimeout(function() {
      if (e.keyCode == 13 && !e.target.value.match(/^\s+$/)) {
        console.log("saving")
        localStorage.setItem("DP:" + e.target.value, "");
        localStorage.setItem("_DP", e.target.value)
        e.target.value = ''
        Darkplace.renderMenu()
      }
    }, 0);
  }
}

document.querySelector("#newDarkplace").addEventListener("keypress", Darkplace.create, false)
document.querySelector("#darkplaces").addEventListener("click", Darkplace.openOrDelete, true)
var textArea = document.querySelector("#darkplace")

Darkplace.renderMenu()
Darkplace.open(localStorage.getItem('_DP'))
var interval = setInterval(Darkplace.save, 2e3)
