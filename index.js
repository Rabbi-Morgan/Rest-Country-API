var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "select": */
x = document.getElementsByClassName("select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
      // 
      update();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

// this is to toggle the dark class on the body
const mainCont = document.querySelector('body');
const darkToggle = document.querySelector('.dark_mode');


let locVal = localStorage.getItem('mode')


const darkMode = ()=> {
  mainCont.classList.add('dark')
  localStorage.setItem('mode', 'dark')
}
const lightMode = ()=> {
  mainCont.classList.remove('dark');
  localStorage.setItem('mode', null)
}

if(locVal == 'dark') {
  darkMode();
}

darkToggle.addEventListener('click', () => {
  locVal = localStorage.getItem('mode');
  if(locVal !== 'dark') {
    darkMode();
  }else {
    lightMode();
  }
})



fetch ('https://restcountries.com/v3.1/region/africa').then(response => response.json()).then((data)=> {
  var listCount = data.length;
  for(let i=0; i<=listCount; i++){
    data[i].name.official
};
});

let defaultCountry = ['germany', 'usa', 'brazil', 'iceland', 'afghanistan', 'aland', 'albania', 'algeria'];

for(let i=0; i<= defaultCountry.length; i++) {
  
  fetch (`https://restcountries.com/v2/name/${defaultCountry[i]}`).then(response => {
      // indicates whether the response is successful (status code 200-299) or not
      if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`)
      }
      return response.json()
    }).then((data) => {
    document.querySelectorAll('.img img')[i].src = data[0].flag;
    document.querySelectorAll('.desc-heading')[i].innerText = data[0].name;
      // well, I tried this one because it's short but I have a doubt if it will work for safari, and that will be a problem if it doesn't. I will know when I deploy it since I don't use mac :) 
    document.querySelectorAll('.pop-num')[i].innerText = (data[0].population).toLocaleString('en-US');
    // this code seems to be the safest, really don't understand it yet because of the rejex
      
    // document.querySelectorAll('.pop-num')[i].innerText = data[0].population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");;
    document.querySelectorAll('.region')[i].innerText = data[0].region;
    document.querySelectorAll('.capital')[i].innerText = data[0].capital;
  });
}

var select = document.getElementById('region');
function update() {

  // for the function update, we have to do 3 basic things: 1. get the value of the option, 2. use the value to fetch data from the API 3. display the data that was fetched 

  // 1
  var option = select.options[select.selectedIndex].value;
  
  //document.getElementById('value').value = option.value;

  // 2

  return fetch(`https://restcountries.com/v3.1/region/${option}`).then(response => response.json()).then((data) => {
    guiUpdate(data);
});
  //document.getElementById('text').value = option.text;

  // 3
}
let bigCont = document.getElementsByClassName('contries');
let guiUpdate = (info)=> {
  for(let i=0; i<= info.length; i++){
    /*var fc = document.createElement("DIV");
    fc.setAttribute("class", "country-cont");
    fc.innerHTML = info[i].name.common;
    bigCont.appendChild(fc); */
      console.log(info[i].name.common)
    }
}
