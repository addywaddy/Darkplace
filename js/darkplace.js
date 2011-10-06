DP = {
  store: {
    all: function() {
      return Object.keys(localStorage).filter(function(key) {
        return key.match(/^DP:/)
      })
    },

    getCurrent: function() {
      return localStorage.getItem('_DP')
    },

    setCurrent: function(val) {
      localStorage.setItem("_DP", val)
      return this.getCurrent()
    },

    get: function(name) {
      return localStorage.getItem("DP:" + name)
    },

    set: function(name, val) {
      return localStorage.setItem("DP:" + name, val)
    },

    delete: function(name) {
      localStorage.removeItem("DP:" + name)
    }
  },
  open: function(name) {
    textArea.value = DP.store.get( DP.store.setCurrent(name) )
  },

  openOrDelete: function(e) {
    if (e.target.className == 'destroy') {
      var name = e.target.parentElement.firstChild.textContent
      if (confirm("Sure you want to delete '" + name + "'?")) {
        if (DP.store.getCurrent() == name) {
          // Clears the current page
          DP.store.setCurrent('')
        }
        DP.store.delete(name)
        DP.renderMenu()
      }
    } else {
      var name = e.target.firstChild.textContent
      DP.open(name)
    }
    return false;
  },

  save: function() {
    if(DP.store.getCurrent()) {
      console.log("saving")
      DP.store.set(DP.store.getCurrent(), textArea.value)
    }
  },

  renderMenu: function() {
   document.querySelector("#darkplaces").innerHTML = ""
   var list = [], link, li
   DP.store.all().forEach(function(key) {
     with (link = document.createElement('a')) {
       setAttribute('href', '')
       innerHTML = "x"
       setAttribute("class", 'destroy')
     }

     with ((li = document.createElement('li'))) {
       appendChild(document.createTextNode(key.match(/^DP:(.+)$/)[1]))
       appendChild(link)
     }
     document.querySelector("#darkplaces").appendChild(li)
   })
  },

  create: function(e) {
    setTimeout(function() {
      if (e.keyCode == 13 && !e.target.value.match(/^\s+$/)) {
        window.clearInterval(interval)
        DP.store.set(e.target.value, '')
        DP.store.setCurrent(e.target.value)
        e.target.value = ''
        DP.open(DP.store.getCurrent())
        interval = setInterval(DP.save, 2e3)
        DP.renderMenu()
      }
    }, 0);
  },

  start: function() {
    DP.renderMenu()
    DP.open(DP.store.getCurrent())
  }
}

document.querySelector("#newDarkplace").addEventListener("keypress", DP.create, false)
document.querySelector("#darkplaces").addEventListener("click", DP.openOrDelete, false)
var textArea = document.querySelector("#darkplace")

var interval = setInterval(DP.save, 2e3)
DP.start()
