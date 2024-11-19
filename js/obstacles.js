import Platform from "./Platform.js" 

const obstacles = []

function createPlatform(x, y, width, height) {
  const platform = new Platform(x, y, width, height);
  obstacles.push(platform);
}

//base
createPlatform(0, 768, 1800, 20) //x, y, width, height


//plataformas
createPlatform(0, 240, 144, 20) //x, y, width, height
createPlatform(480, 240, 144, 20) //x, y, width, height
createPlatform(1608, 240, 195, 20) //x, y, width, height
createPlatform(1470, 528, 138, 20) //x, y, width, height
createPlatform(1470, 337, 138, 20) //x, y, width, height
createPlatform(1470, 433, 138, 20) //x, y, width, height
createPlatform(1470, 623, 138, 20) //x, y, width, height
createPlatform(1470, 623, 138, 20) //x, y, width, height
createPlatform(1295, 96, 288, 20) //x, y, width, height
createPlatform(1055, 190, 144, 20) //x, y, width, height
createPlatform(193, 97, 289, 20) //x, y, width, height
createPlatform(145, 311, 124, 20) //x, y, width, height
createPlatform(49, 385, 96, 20) //x, y, width, height
createPlatform(145,529, 143, 20) //x, y, width, height
createPlatform(0,625, 192, 20) //x, y, width, height
createPlatform(529,385, 143, 20) //x, y, width, height
createPlatform(817,384, 143, 20) //x, y, width, height
createPlatform(961,529, 143, 20) //x, y, width, height
createPlatform(481,625, 529, 20) //x, y, width, height


 
export default obstacles





