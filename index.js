"use strict";
window.addEventListener("load", main);

function main() {

  var matrix2x2 = document.forms["m22"];
  var matrix3x3 = document.forms["m33"];
  var array22 = [];
  var array33 = [];
  var choice = document.getElementById("choice");


  var submitButton = document.getElementById('subButtonH');
  var encButton = document.getElementById('enhButton0');
  var decButton = document.getElementById('dehButton0');

  // Encrypt/Decrypt div components
  var eDMenu = document.getElementById("EDMenu");

  encButton.addEventListener("click", displayEncForm);
  decButton.addEventListener("click", displayDecForm);
  submitButton.addEventListener("click", displayOptions);
  choice.addEventListener("change", displayChoice);

  function displayChoice() {
    if (choice.value == "m33") {
      matrix2x2.style.visibility = "hidden";
      matrix3x3.style.visibility = "visible";
    }
    else {
      matrix2x2.style.visibility = "visible";
      matrix3x3.style.visibility = "hidden";
    }

  }

  function displayEncForm() {
    window.location.href = "encrypt.html";
  }

  function displayDecForm() {
    window.location.href = "decrypt.html";
  }


  function displayOptions() {

    if ( choice.value == "m22" && array22.length == 0 ) {
      var m0 = matrix2x2.elements[0].value;
      var m1 = matrix2x2.elements[1].value;
      var m2 = matrix2x2.elements[2].value;
      var m3 = matrix2x2.elements[3].value;
      if ( m0 == "" || m1 == "" || m2 == "" || m3 == "") {
        alert("Please fill in key matrix");
      }
      else {
        array22.push([m0,m1]);
        array22.push([m2,m3]);
        window.sessionStorage.setObj("km", array22);
        window.sessionStorage.setObj("dimension", 2);
        eDMenu.style.visibility = "visible";
      }
    }
    else if ( choice.value == "m33" && array33.length == 0) {
      var m0 = matrix3x3.elements[0].value;
      var m1 = matrix3x3.elements[1].value;
      var m2 = matrix3x3.elements[2].value;
      var m3 = matrix3x3.elements[3].value;
      var m4 = matrix3x3.elements[4].value;
      var m5 = matrix3x3.elements[5].value;
      var m6 = matrix3x3.elements[6].value;
      var m7 = matrix3x3.elements[7].value;
      var m8 = matrix3x3.elements[8].value;
      if ( m0 == "" || m1 == "" || m2 == "" || m3 == "" || m4 == ""
      || m5 == "" || m6 == "" || m7 == ""|| m8 == "") {
        alert("Please fill in key matrix");
      }
      else {
        array33.push([m0,m1,m2]);
        array33.push([m3,m4,m5]);
        array33.push([m6,m7,m8]);
        window.sessionStorage.setObj("km", array33);
        window.sessionStorage.setObj("dimension", 3);
        eDMenu.style.visibility = "visible";
      }
    }


  }
}
