"use strict";
window.addEventListener("load", setupPage);

function setupPage() {
  document.getElementById("encButton").addEventListener("click", encrypt);
}

function encrypt() {

  var plainT = strip(document.getElementById("textP").value);
  var dimension = window.sessionStorage.getObj("dimension");
  var encryptedArray = [];
  var columnVectors;
  var topElement;
  var bottomElement;
  var premodMatrix;


  if ( plainT == "" ) {
    alert("Please input a text to be encrypted.");
  }
  else {

    if ( dimension == 2 ) {
      var digrams = getDigrams(plainT);
      columnVectors = getColumnVectors(digrams, 2);
      premodMatrix = getPremodMatrix(columnVectors, 2);

      for (var i in premodMatrix) {
        topElement = premodMatrix[i][0];
        bottomElement = premodMatrix[i][1];
        encryptedArray.push( [topElement % 26, bottomElement % 26] );
      } 
    }
    else {
      var trigraph = getTrigraph(plainT);
      columnVectors = getColumnVectors(trigraph, 3);
      premodMatrix = getPremodMatrix(columnVectors, 3);
      var middleElement;

      for (var i in premodMatrix) {
        topElement = premodMatrix[i][0];
        middleElement = premodMatrix[i][1];
        bottomElement = premodMatrix[i][2];
        encryptedArray.push( [topElement % 26, middleElement % 26, bottomElement % 26] );
      }       
    }
    
  document.getElementById("encT").innerHTML = 
              reverseSearch(encryptedArray, dimension).toString().replace(/,/ig, " ");
  }
}
