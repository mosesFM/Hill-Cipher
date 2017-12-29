"use strict";
window.addEventListener("load", loadPage);

function loadPage() {
  document.getElementById("decButton").addEventListener("click", decrypt);
}

function decrypt() {
  var ciphT = strip(document.getElementById("textC").value);
  var dimension = window.sessionStorage.getObj("dimension");
  var keyArray = window.sessionStorage.getObj("km");
  var decryptedArray = [];
  var determinant;
  var columnVectors;
  var topElement;
  var bottomElement;
  var multiplicativeInverse;
  var adjugateMatrix = [];
  var inverseKeyMatrix = [];


  if ( ciphT == "" ) {
    alert("Please input a text to be decrypted.");
  }
  else {

    if ( dimension == 2 ) {
      var digrams = getDigrams(ciphT);
      determinant = keyArray[0][0] * keyArray[1][1] -
              keyArray[0][1] * keyArray[1][0];
      multiplicativeInverse = modInverse(determinant, 26);
      columnVectors = getColumnVectors(digrams, 2);
      adjugateMatrix.push([keyArray[1][1], -keyArray[0][1] + 26]);
      adjugateMatrix.push([-keyArray[1][0] + 26, keyArray[0][0]]);

      for ( var i in adjugateMatrix ) {
        inverseKeyMatrix.push([(adjugateMatrix[i][0] * multiplicativeInverse)
              % 26, (adjugateMatrix[i][1] * multiplicativeInverse) % 26])
      }

      // finally, the decryption
      for (var i in columnVectors) {
        topElement = (inverseKeyMatrix[0][0] * columnVectors[i][0] +
              inverseKeyMatrix[0][1] * columnVectors[i][1]) % 26;
        bottomElement = (inverseKeyMatrix[1][0] * columnVectors[i][0] +
              inverseKeyMatrix[1][1] * columnVectors[i][1]) % 26;
        decryptedArray.push([topElement, bottomElement]);
      }

      document.getElementById("decT").innerHTML =
                 reverseSearch(decryptedArray, 2).toString().replace(/,/ig, " ");
    }
    else {
      var trigraph = getTrigraph(ciphT);
      columnVectors = getColumnVectors(trigraph, 3);
      var middleElement;

      // determinant calculation components
      var leftElement = keyArray[0][0] * (keyArray[1][1] * keyArray[2][2] -
            keyArray[1][2] * keyArray[2][1]);
      var middleElement = keyArray[0][1] * (keyArray[1][0] * keyArray[2][2] -
            keyArray[1][2] * keyArray[2][0]);
      var rightElement = keyArray[0][2] * (keyArray[1][0] * keyArray[2][1] -
            keyArray[1][1] * keyArray[2][0]);

      determinant = leftElement - middleElement + rightElement;
      multiplicativeInverse = modInverse((determinant % 26), 26);

      // cofactor calculation
      var cf00 = keyArray[1][1] * keyArray[2][2] - keyArray[1][2] * keyArray[2][1];
      var cf01 = -(keyArray[1][0] * keyArray[2][2] - keyArray[2][0] * keyArray[1][2]);
      var cf02 = keyArray[1][0] * keyArray[2][1] - keyArray[1][1] * keyArray[2][0];
      var cf10 = -(keyArray[0][1] * keyArray[2][2] - keyArray[0][2] * keyArray[2][1]);
      var cf11 = keyArray[0][0] * keyArray[2][2] - keyArray[0][2] * keyArray[2][0];
      var cf12 = -(keyArray[0][0] * keyArray[2][1] - keyArray[0][1] * keyArray[2][0]);
      var cf30 = keyArray[0][1] * keyArray[1][2] - keyArray[0][2] * keyArray[1][1];
      var cf31 = -(keyArray[0][0] * keyArray[1][2] - keyArray[0][2] * keyArray[1][0]);
      var cf32 = keyArray[0][0] * keyArray[1][1] - keyArray[0][1] * keyArray[1][0];

      adjugateMatrix.push([cf00,cf01,cf02]);
      adjugateMatrix.push([cf10,cf11,cf12]);
      adjugateMatrix.push([cf30,cf31,cf32]);

      //find the mods
      for (var i in adjugateMatrix) {
        if (adjugateMatrix[i][0] < 0) {
          adjugateMatrix[i][0] = (adjugateMatrix[i][0] % 26) + 26;
        }
        else {
          adjugateMatrix[i][0] = adjugateMatrix[i][0] % 26;
        }

        if (adjugateMatrix[i][1] < 0) {
            adjugateMatrix[i][1] = (adjugateMatrix[i][1] % 26) + 26;
        }
        else {
            adjugateMatrix[i][1] = adjugateMatrix[i][1] % 26;
        }

        if (adjugateMatrix[i][2] < 0) {
            adjugateMatrix[i][2] = (adjugateMatrix[i][2] % 26) + 26;
        }
        else {
            adjugateMatrix[i][2] = adjugateMatrix[i][2] % 26;
        }

      }

      // multiply adjugateMatrix with multiplicativeInverse and mod
      for (var i in adjugateMatrix) {
        topElement = (multiplicativeInverse * adjugateMatrix[i][0]) % 26;
        middleElement = (multiplicativeInverse * adjugateMatrix[i][1]) % 26;
        bottomElement = (multiplicativeInverse * adjugateMatrix[i][2]) % 26;
        inverseKeyMatrix.push([topElement, middleElement, bottomElement]);
      }

      // finally, the decryption
      for (var i in columnVectors) {
        topElement = ( inverseKeyMatrix[0][0] * columnVectors[i][0] +
          inverseKeyMatrix[1][0] * columnVectors[i][1]
                  + inverseKeyMatrix[2][0] * columnVectors[i][2]) % 26;

        middleElement = (inverseKeyMatrix[0][1] * columnVectors[i][0] +
              inverseKeyMatrix[1][1] * columnVectors[i][1]
                  + inverseKeyMatrix[2][1] * columnVectors[i][2]) % 26;

        bottomElement = (inverseKeyMatrix[0][2] * columnVectors[i][0] +
              inverseKeyMatrix[1][2] * columnVectors[i][1] +
                    inverseKeyMatrix[2][2] * columnVectors[i][2]) % 26;

        decryptedArray.push([topElement, middleElement, bottomElement]);
      }

      document.getElementById("decT").innerHTML =
                 reverseSearch(decryptedArray, 3).toString().replace(/,/ig, " ");
    }
  }
}
