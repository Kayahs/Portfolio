$(document).ready(function() {
  var frontCover = $('.frontCoverContainer');
  var frontCoverRight = $('.frontCoverRight');
  var backCover = $('.backCoverContainer');
  var book = $('.book');
  var pages = $('.page');
/*	translateObject(frontCover, "50%");
  translateObject(backCover, "50%");*/
  $('.book').on('click', (event) => {
		frontCover.addClass("frontCoverFlip");
    pages.addClass("backCoverDuringFlip");
    // console.log(event);
    // console.log(event.target.classList);
    var currentTarget = $(`.${event.target.parentNode.className}`);
    // console.log(currentTarget);
    var findTarget = getObject(event.target.classList);
    // console.log(findContainer(findTarget));
    // translateObject(findContainer(currentTarget), "50%");

		backCover.addClass("shiftRight");
	});
  /*$('.page.first').on('click', (event) => {
    event.target.addClass('test');
  });*/
  function findContainer(obj) {
    if (obj[0].parentNode === null) {
      return false;
    } else if(obj[0].classList[0] == "frontCoverContainer") {
      console.log(`Container Found! The container is: ${obj[0].className}.`);
      return getObject(obj[0].classList);
    } else if (obj[0].classList[0] == "page") {
      console.log(`Container Found! The container is: ${obj[0].className}.`);
      return getObject(obj[0].classList);
    } else {
      console.log("Recursion Activated");
      var newObj = getObject(obj[0].parentNode.classList);
      return findContainer(newObj);
    }
  }

  function getObject(classList) {
    var finalTarget = "";
    for (var i = 0; i < classList.length; i++) {
      finalTarget += "." + classList[i];
    }
    var target = $(finalTarget);
    return target;
  }
  
  function getTransformMatrix(obj) {
    var baseMatrix = {
      scaleX: 1,
      skewX: 0,
      skewY: 0,
      scaleY: 1,
      translateX: 0,
      translateY: 0
    };
    var matrix = obj.css("transform");

    if (matrix && matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      baseMatrix.scaleX = parseFloat(values[0]);
      baseMatrix.skewX = parseFloat(values[1]);
      baseMatrix.skewY = parseFloat(values[2]);
      baseMatrix.scaleY = parseFloat(values[3]);
      baseMatrix.translateX = parseFloat(values[4]);
      baseMatrix.translateY = parseFloat(values[5]);
    }
    return baseMatrix;
  }

  function rotateObjectX(object, deg){ 
  }

  function translateObject(object, Xpercent, Ypercent = "0%") {
    var matrix = getTransformMatrix(object);
    var xper = parseFloat(Xpercent.replace('%',''))/100;
    var yper = parseFloat(Ypercent.replace('%',''))/100;
    var dx = object.outerWidth()*xper;
    var dy = object.outerHeight()*yper;
    matrix.translateX += dx;
    matrix.translateY += dy;
    object.css("transform", "matrix(" + 
      matrix.scaleX + ", " + 
      matrix.skewX + ", " + 
      matrix.skewY + ", " + 
      matrix.scaleY + ", " +
      matrix.translateX + ", " +
      matrix.translateY + ")" );
  }
});