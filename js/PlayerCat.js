import obstacles from "./obstacles.js";
import { cat_run_path_image, canvas } from "./constants.js";

class PlayerCat {
  constructor(x, y, size, imageElement) {
    this.position = {
      x: x,
      y: y,
    };
    this.direction = {
      left: false,
      right: false,
      jump: false,
    };
    this.size = this.size(size, imageElement); //usado para dimensionamento
    this.height = 150; //usado para colisão
    this.width = 150; //usado para colisão
    this.jumpStrength = -20;
    this.speed = 10;
    this.moving = false;
    this.velocityY = 25;
    this.gravity = 1;
    this.offsetImage = 25;
    this.initPosition(imageElement);
    this.image = imageElement;
    this.isOnGround = false;
  }

  applyGravity() {
    this.velocityY += this.gravity;
    this.position.y += this.velocityY;
    this.image.style.top = `${this.position.y}px`;
  }

  checkFloor() {
    obstacles.forEach((platform) => {
      const rightEdge =
        canvas.offsetLeft +
        platform.position.x +
        platform.width -
        this.offsetImage;
      const leftEdge =
        platform.position.x +
        canvas.offsetLeft -
        (this.width - this.offsetImage);
      const topEdge = platform.position.y + canvas.offsetTop - this.height;

      if (
        this.position.y > topEdge &&
        this.position.x > leftEdge &&
        this.position.x < rightEdge &&
        this.velocityY > 0 &&
        this.position.y + this.height - this.velocityY <=
          platform.position.y + canvas.offsetTop
      ) {
        this.isOnGround = true;
        this.velocityY = 0;
        this.position.y = topEdge;
        this.image.style.top = `${this.position.y}px`;
      }
    });
  }

  initPosition(image) {
    // inicia a posição dos players
    image.style.left = `${this.position.x}px`;
    image.style.top = `${this.position.y}px`;
  }

  size(size, imageElement) {
    //atualiza o tamanho dos players
    imageElement.style.width = `${size}px`;
    imageElement.style.height = `${size}px`;
    return size;
  }

  jump() {
    if (this.isOnGround) {
      this.velocityY = this.jumpStrength;
      this.image.style.top = `${this.position.y}px`;
    }
    this.isOnGround = false;
  }

  moveLeft() {
    this.position.x -= this.speed;
    this.image.style.left = `${this.position.x}px`;
    this.image.classList.add("changeToLeft");
    if (this.moving == false) {
      this.image.src = cat_run_path_image;
      this.moving = true;
    }
  }

  moveRight() {
    this.position.x += this.speed;
    this.image.style.left = `${this.position.x}px`;
    this.image.classList.remove("changeToLeft");
    if (this.moving == false) {
      this.image.src = cat_run_path_image;
      this.moving = true;
    }
  }
}

export default PlayerCat; //exporta a classe para onde o new é chamado
