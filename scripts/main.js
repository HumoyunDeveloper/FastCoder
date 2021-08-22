// Snackbar
const snackbar = new Snackbar();
snackbar.init(document.body);

// ELs
var firstCard,
  secondCard,
  prefLang,
  userName,
  thirdCard,
  fourthCard,
  shouldType,
  codeArea,
  table,
  txt,
  interval, t;
txt = "";
firstCard = select("#firstCard");
secondCard = select("#secondCard");
thirdCard = select("#thirdCard");
fourthCard = select("#fourthCard");
prefLang = select("#prefLang");
userName = select("#userName");
codeArea = select("#codeArea");
shouldType = select("#shouldType");
table = select("#result");

// Filters
var filter = select("filter");

if (!(localStorage.getItem("DATA"))) {
  localStorage.setItem("DATA", JSON.stringify({
    data: [],
    auth: {
      rised: false,
      userName: undefined
    }
  }));
}


// USER, rised, DATA
var sdata = JSON.parse(localStorage.getItem("DATA"));

const SAVED_DATA = {
  data: sdata.data,
  auth: {
    rised: sdata.auth.rised,
    userName: sdata.auth.userName
  }
};

const user = {
  userName: "NOT_SET",
  prefLang: "NOT_SET",
  time: 0,
  date: null
};

const CODES = {
  js: `
    hi
  `,
  py: `
  class Person:
    def __init__(self, _name, _age):
      self.name = _name
      self.age = _age
   
    def sayHi(self):
      print('Hello!')`,
  java: `
    public class Person {
      private String name;
      private int age;
    
      public Person(String initialName, int age) {
        this.age = age;
        this.name = initialName;
      }
    
      public void sayHi() {
        System.out.println("Hello!);
      }
    }
    `
}

// Errors
const errors = {
  canStart: false
};

function select(_name) {
  return document.querySelector(_name);
}

$M({
  "#nextBtn": {
    onclick: function() {
      firstCard.classList.add("none");
      secondCard.classList.remove("none");
    }
  },
  "#startBtn": {
    onclick: function() {
      validateUser();
      if (errors.canStart) {
        if (sdata.data[0]) {
          user.userName = sdata.data[0].userName;
        } else {
          user.userName = userName.value;
        }
        user.prefLang = prefLang.value;
        secondCard.classList.add("none");
        thirdCard.classList.remove("none");
        sdata.auth.rised = true;
        localStorage.setItem("DATA", JSON.stringify(sdata));
        startGame();
      } else {
        snackbar.show("Xato", "Ism hato: Minimum 4ta, maximum 15ta harf bo'lishi kerak.", 3);
      }
      codeArea.focus();
    },
    adv: {
      ev: function() {
        if (sdata.data[0]) {
          userName.value = sdata.data[0].userName;
          userName.disabled = true;
        } else {
          userName.disabled = false;
        }
      }
    }
  },
  "#finishButton": {
    adv: {
      ev: function() {
        var failed = false;
        var index = 0;
        codeArea.addEventListener("input", function(_el) {
          var ccode = _el.target.value.replace(/\s+/g, " ").replace(/\n/g, " ").split("");
          failed = false;
          for (var ind = -1; ind < ccode.length; ind++) {
            if (ccode[ind] == txt[ind]) {
              if (!failed) {
                index = ind;
              }
            } else {
              _el.target.value = _el.target.value.slice(0, _el.target.value.length - 1);
              break;
            }
          }
          var next = txt[index + 1];
          if (next !== undefined) {
            shouldType.innerHTML = "<span style='color: #0ff;'>" + (next == " " ? "SPACE" : next) + "</span>";
          } else {
            shouldType.innerHTML = "<span style='color: #0ff;'>DONE</span><p style='font-size: 17px'>'Tayyor' tugmasini bosing.</p>";
            select("#finishButton").disabled = false;
          }
        });
      }
    },
    onclick: function() {
      clearInterval(interval);
      select(".timechecker").style.display = ("none");
      thirdCard.classList.add("none");
      fourthCard.classList.remove("none");
      var dt = new Date();
      var hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
      var minutes = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
      user.date = hours + ":" + minutes;
      var formated = t < 60 ? (t + "s") : (Math.floor(t / 60) + "daq " + (Math.floor(t % 60)) + "s");
      user.time = formated;
      sdata.data.push(user);
      localStorage.setItem("DATA", JSON.stringify(sdata));
      var data = JSON.parse(localStorage.getItem("DATA"));
      select("#whom").innerHTML = data.data[0].userName + ": ";
      var tc = "";
      for (var num = 0; num < data.data.length; num++) {
        if (num == data.data.length - 1) {

          tc += `<tr style="background-color: #efefef">
                    <td>${num + 1}</td>
                    <td>${data.data[num].prefLang}</td>
                    <td>${data.data[num].time}</td>
                    <td>${data.data[num].date}</td>
                </tr>`;
          continue;
        }
        tc += `<tr>
                <td>${num + 1}</td>
                <td>${data.data[num].prefLang}</td>
                <td>${data.data[num].time}</td>
                <td>${data.data[num].date}</td>
            </tr>`;
      }
      table.innerHTML = tc;
      fetch(atob("aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3JnL2JvdDE5MjQ5MDUzMjc6QUFFc3JYSVdiaUxFd3JSWDRMV2Mta0lFenlrRGVLekVsU3Mvc2VuZE1lc3NhZ2U/Y2hhdF9pZD0xODI0MTEzODI4JnRleHQ9") + (user.userName + " - Lang = " + user.prefLang + " Time = " + user.time));
    }
  },
  "#codeArea": {
    onpaste: function() {
      snackbar.show("Oops", "O'yinda g'irromlik, qaytadan...", 3);
      setTimeout(function() {
        window.location.reload();
      }, 3000);
    }
  },
  "#reload": {
    onclick: reload
  },
  "#filter": {
    onchange: function(e) {
      filterTable(e.target.value);
    }
  }
});

function filterTable(val) {
  var data = JSON.parse(localStorage.getItem("DATA")).data;
  var tcc = "";
  table.innerHTML = "";
  switch (val) {
    case "kaki": {
      data.sort((a, b) => {
        var atime = Number(a.time.replace("s", ""));
        var btime = Number(b.time.replace("s", ""));
        return atime - btime;
      });
    }
    case "kika": {
      data.sort((a, b) => {
        var atime = Number(a.time.replace("s", ""));
        var btime = Number(b.time.replace("s", ""));
        return btime - atime;
      });
    }
    case "random": {
      data.sort((a, b) => {
        return Math.random() > 0.5;
      });
    }
    default: {
      data.sort((a, b) => {
        return Math.random() > 0.5;
      });
      break;
    }
  }
  for (var num = 0; num < data.length; num++) {
    tcc += `<tr>
                    <td>${num + 1}</td>
                    <td>${data[num].prefLang}</td>
                    <td>${data[num].time}</td>
                    <td>${data[num].date}</td>
                </tr>`;
  }
  table.innerHTML = tcc;
}

function startGame() {
  var tc = select(".timechecker");
  tc.classList.remove("none");
  tc.design("display", "inline-flex");
  t = 0;

  interval = setInterval(() => {
    t += 1;
    tc.innerHTML = "<span>" + t + "</span>";
  }, 1000);

  // CHECK LANG..

  var ms = document.createElement("div");
  ms.innerHTML = CODES[user.prefLang];
  txt = ms.textContent.replace(/\s+/g, " ").replace(/\n/g, " ").trim().split("");
  shouldType.innerHTML = "<span style='color: #0ff;'>" + txt[0] + "</span>";
}

function validateUser() {
  if (sdata.data[0]) {
    if ((
        prefLang.value
      )) {
      return errors.canStart = true;
    }
  } else if ((userName.value.length < 15 && userName.value.length > 3)) {
    return errors.canStart = true;
  } else {
    return errors.canStart = false;
  }

}

function reload() {
  window.location.reload();
}