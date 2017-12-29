"use strict";

function strip(aString) {

  var splitString = "";

  for (var item in aString) {

    var letter = aString.charAt(item);

    // ignore whitespace and append to string
    if (letter.search(/\s|\W|\d/igm) == -1) {
      splitString += letter;
    }
  }
  return splitString;
}

function search(aChar) {
  var letter = aChar.toLowerCase();
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet.indexOf(letter);
}

function reverseSearch(array, dimension) {
  var strArray = [];
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var item;

  if (dimension == 2) {
    for (var i in array) {
      item = array[i];
      strArray.push([alphabet[item[0]], alphabet[item[1]]])
    }
  }
  else {
    for (var i in array) {
      item = array[i];
      strArray.push([alphabet[item[0]], alphabet[item[1]], alphabet[item[2]]])
    }
  }
  return strArray;
}

// A naive algorithm adopted from C
// http://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/
function modInverse(a, m)
  {
      var atemp = a;
      atemp = atemp % m;
      if ( atemp < 0 ) {
        atemp = m + atemp;
      }

      for (var x = 1; x < m; x++) {
        if ( ((atemp * x) % m) == 1) {
            return x;
        }
      }

  }

function getColumnVectors(xdimgrams, dimensions) {
  var item;
  var topElement;
  var middleElement;
  var bottomElement;
  var columnVectors = [];

  if ( dimensions == 2) {
    for (var i in xdimgrams) {
      item = xdimgrams[i];
      topElement = item.charAt(0);
      bottomElement = item.charAt(1);

      //get the index of each letter and push into column vector
      columnVectors.push([search(topElement), search(bottomElement)]);
    }
  }
  else {
    for (var i in xdimgrams) {
      item = xdimgrams[i];
      topElement = item.charAt(0);
      middleElement = item.charAt(1);
      bottomElement = item.charAt(2);

      //get the index of each letter and push into column vector
      columnVectors.push([search(topElement), search(middleElement), search(bottomElement)]);
    }
  }

  return columnVectors;
}

function getPremodMatrix(columnVectors, dimensions) {

  var keyArray = window.sessionStorage.getObj("km");
  var premodArray = [];
  var kr0 = keyArray[0][0];
  var kr1 = keyArray[0][1];
  var kr2 = keyArray[1][0];
  var kr3 = keyArray[1][1];
  var cr0;
  var cr1;
  var cr2;
  var topElement;
  var middleElement;
  var bottomElement;
  var counter = 0;

  if (dimensions == 2) {

    while (premodArray.length < columnVectors.length ) {
      for (var i in columnVectors) {
        cr0 = columnVectors[i][0];
        cr1 = columnVectors[i][1];
        topElement = (kr0 * cr0) + (kr1 * cr1);
        bottomElement = (kr2 * cr0) + (kr3 * cr1);
        premodArray.push([topElement,bottomElement]);
      }
      counter++;
    }
  }
  else {

     while (premodArray.length < columnVectors.length ) {

      for (var i in columnVectors) {

        cr0 = columnVectors[i][0];
        cr1 = columnVectors[i][1];
        cr2 = columnVectors[i][2];
        topElement = keyArray[0][0] * cr0 + keyArray[0][1] * cr1 + keyArray[0][2] * cr2;
        middleElement = keyArray[1][0] * cr0 + keyArray[1][1] * cr1 + keyArray[1][2] * cr2;
        bottomElement = keyArray[2][0] * cr0 + keyArray[2][1] * cr1 + keyArray[2][2] * cr2;
        premodArray.push([topElement, middleElement, bottomElement]);
      }
        counter++;
    }
  }

  return premodArray;
}

function getDigrams(aString) {

  var input = aString.toLowerCase();
  var tempDigram = "";
  var textLength = input.length;
  var digramLength;
  var letter;
  var array = [];
  var count = 0;


  while (count < textLength) {

    digramLength = tempDigram.length;
    letter = input.charAt(count);

    if (digramLength < 2) {
      tempDigram += letter;

      if (tempDigram.length == 2) {
        array.push(tempDigram);
        tempDigram = "";
      }
    }
    else {
      array.push(tempDigram);
      tempDigram = "";
      tempDigram += letter;
    }

    // pad if at odd  ending
    if ( count == textLength - 1 && textLength % 2 != 0 ) {
      tempDigram += "x";
      array.push(tempDigram);
    }
    count++;
  }

  return array;
}

function getTrigraph(aString) {

  var input = aString.toLowerCase();
  var tempTrigram = "";
  var textLength = input.length;
  var trigramLength;
  var letter;
  var array = [];
  var count = 0;

  while ( count < textLength ) {

    trigramLength = tempTrigram.length;
    letter = input.charAt(count);

    if (trigramLength < 3) {
      tempTrigram += letter;

      if (tempTrigram.length == 3) {
        array.push(tempTrigram);
        tempTrigram = "";
      }
    }
    else {
      array.push(tempTrigram);
      tempTrigram = "";
      tempTrigram += letter;
    }

    // pad if at odd  ending
    if ( count == textLength - 1 && textLength % 3 != 0 ) {

      if ( tempTrigram.length == 1 ) {
        tempTrigram += "xx";
      }
      else {
        tempTrigram += "x";
      }
      array.push(tempTrigram);
    }
    count++;
  }

  // pad if input does not form 3 X 3 matrix
  while (array.length < 3) {
    array.push("xxx");
  }

  return array;
}
