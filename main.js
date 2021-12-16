class Position {
  constructor(x, y) {
    (this.x = x), (this.y = y);
  }
}

class Face extends Position {
  constructor(x, y, size) {
    super(x, y);
    this.size = size;
  }

  draw() {
    const centerPoint = {
      x: this.x,
      y: this.y,
    };
    drawCircle(centerPoint, this.size);
  }
}

class Eye extends Position {
  constructor(x, y, size) {
    super(x, y);
    this.size = size;
  }

  draw() {
    const centerPoint = {
      x: this.x,
      y: this.y,
    };
    drawCircle(centerPoint, this.size);
    drawCircle(centerPoint, this.size / 3);
  }
}

class Nose extends Position {
  fat = 5;

  constructor(x, y, size) {
    super(x, y);
    this.size = size;
  }

  draw() {
    const startPoint = {
      x: this.x,
      y: this.y - this.size / 2,
    };
    const endPoint = {
      x: this.x,
      y: this.y + this.size / 2,
    };
    const rightCornerPoint = {
      x: this.x + this.fat,
      y: this.y + (this.size / 2 - this.fat),
    };
    const leftCornerPoint = {
      x: this.x - this.fat,
      y: this.y + (this.size / 2 - this.fat),
    };
    drawLine(startPoint, endPoint);
    drawLine(endPoint, rightCornerPoint);
    drawLine(endPoint, leftCornerPoint);
  }
}

class Lip extends Position {
  status = "scary";

  constructor(x, y, size) {
    super(x, y);
    this.size = size;
  }

  drawPokerFace() {
    const startPoint = {
      x: this.x - this.size / 2,
      y: this.y,
    };
    const endPoint = {
      x: this.x + this.size / 2,
      y: this.y,
    };
    drawLine(startPoint, endPoint);
  }

  drawScaryFace() {
    drawCircle(
      {
        x: this.x,
        y: this.y,
      },
      this.size / 5
    );
  }

  draw() {
    if (this.status === "poker") {
      this.drawPokerFace();
    } else if (this.status === "scary") {
      this.drawScaryFace();
    }
  }
}

class Emoji {
  items = {
    face: null,
    leftEye: null,
    rightEye: null,
    nose: null,
    lips: null,
  };

  constructor(centerPointX, centerPointY) {
    const leftEyePosition = Emoji.calcEyePosition(
      centerPointX,
      centerPointY,
      "left"
    );
    const rightEyePosition = Emoji.calcEyePosition(
      centerPointX,
      centerPointY,
      "right"
    );

    this.items.face = new Face(centerPointX, centerPointY, 100);
    this.items.leftEye = new Eye(leftEyePosition.x, leftEyePosition.y, 10);
    this.items.rightEye = new Eye(rightEyePosition.x, rightEyePosition.y, 10);
    this.items.nose = new Nose(centerPointX, centerPointY - 10, 30);
    this.items.lips = new Lip(centerPointX, centerPointY + 40, 80);
  }

  render() {
    clearPage();
    for (let item of Object.values(this.items)) {
      item.draw();
    }
  }

  makeFaceScary() {
    this.items.lips.status = "scary";
    this.render();
  }

  makeFacePoker() {
    this.items.lips.status = "poker";
    this.render();
  }

  sayLie() {
    ++this.items.nose.fat;
    ++this.items.nose.size;
    this.render();
  }

  static calcEyePosition(x, y, side) {
    return {
      x: side === "left" ? x - 40 : x + 40,
      y: y - 50,
    };
  }
}

const myEmoji = new Emoji(400, 250);

myEmoji.render();
