function Face(centerPointX, centerPointY, size) {
  this.centerPointX = centerPointX;
  this.centerPointY = centerPointY;
  this.size = size;
  this.draw = function () {
    const centerPoint = {
      x: this.centerPointX,
      y: this.centerPointY,
    };
    drawCircle(centerPoint, this.size);
  };
}

function Eye(centerPointX, centerPointY, size) {
  this.centerPointX = centerPointX;
  this.centerPointY = centerPointY;
  this.size = size;
  this.draw = function () {
    const centerPoint = {
      x: this.centerPointX,
      y: this.centerPointY,
    };
    drawCircle(centerPoint, this.size);
    drawCircle(centerPoint, this.size / 3);
  };
}

function Nose(centerPointX, centerPointY, size) {
  this.centerPointX = centerPointX;
  this.centerPointY = centerPointY;
  this.size = size;
  this.fat = 5;
  this.draw = function () {
    const startPoint = {
      x: this.centerPointX,
      y: this.centerPointY - this.size / 2,
    };
    const endPoint = {
      x: this.centerPointX,
      y: this.centerPointY + this.size / 2,
    };
    const rightCornerPoint = {
      x: this.centerPointX + this.fat,
      y: this.centerPointY + (this.size / 2 - this.fat),
    };
    const leftCornerPoint = {
      x: this.centerPointX - this.fat,
      y: this.centerPointY + (this.size / 2 - this.fat),
    };
    drawLine(startPoint, endPoint);
    drawLine(endPoint, rightCornerPoint);
    drawLine(endPoint, leftCornerPoint);
  };
}

function Lip(centerPointX, centerPointY, size) {
  function drawPokerFace(centerPointX, centerPointY, size) {
    const startPoint = {
      x: centerPointX - size / 2,
      y: centerPointY,
    };
    const endPoint = {
      x: centerPointX + size / 2,
      y: centerPointY,
    };
    drawLine(startPoint, endPoint);
  }

  function drawScaryFace(centerPointX, centerPointY, size) {
    drawCircle(
      {
        x: centerPointX,
        y: centerPointY,
      },
      size / 5
    );
  }

  this.centerPointX = centerPointX;
  this.centerPointY = centerPointY;
  this.size = size;
  this.status = "scary";
  this.draw = function () {
    if (this.status === "poker") {
      drawPokerFace(this.centerPointX, this.centerPointY, this.size);
    } else if (this.status === "scary") {
      drawScaryFace(this.centerPointX, this.centerPointY, this.size);
    }
  };
}

function Emoji() {
  function calcEyePosition(centerFaceX, centerFaceY, side) {
    return {
      x: side === "left" ? centerFaceX - 40 : centerFaceX + 40,
      y: centerFaceY - 50,
    };
  }

  const centerPointX = 400;
  const centerPointY = 250;

  let leftEyePosition = calcEyePosition(centerPointX, centerPointY, "left");
  let rightEyePosition = calcEyePosition(centerPointX, centerPointY, "right");

  this.items = {
    face: new Face(centerPointX, centerPointY, 100),
    leftEye: new Eye(leftEyePosition.x, leftEyePosition.y, 10),
    rightEye: new Eye(rightEyePosition.x, rightEyePosition.y, 10),
    nose: new Nose(centerPointX, centerPointY - 10, 30),
    lips: new Lip(centerPointX, centerPointY + 40, 80),
  };

  this.render = function () {
    clearPage();
    for (let item of Object.values(this.items)) {
      item.draw();
    }
  };

  this.makeFaceScary = function () {
    this.items.lips.status = "scary";
    this.render();
  };

  this.makeFacePoker = function () {
    this.items.lips.status = "poker";
    this.render();
  };

  this.sayLie = function () {
    ++this.items.nose.fat;
    ++this.items.nose.size;
    this.render();
  };
}

const myEmoji = new Emoji();

myEmoji.render();
