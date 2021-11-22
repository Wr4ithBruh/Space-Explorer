var player;
var playerImage;
var star, stars;
var asteroidImg, ufoImg;
var asteroids, ufos;
var gameState = "play";
var life = 4, lifeImg;
var score = 0;
var life1, life2, life3, life4;
var velocitySprites = 7;
var coinImg, coins, coinScore = 0;


function preload() {
    playerImage = loadImage("pack.png")
    asteroidImg = loadImage("asteroid.png")
    ufoImg = loadImage("ufo.png");
    lifeImg = loadImage("life.png");
    coinImg = loadImage("coin.png");
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    player = createSprite(300, height - 400, 30, 30)
    player.addImage("image", playerImage);
    //image(playerImage, 300, 400, 30, 30)
    player.scale = 1.5;
    //player.debug = true;
    player.setCollider('circle', -6, -18, 12)


    coins = new Group();
    stars = new Group();
    ufos = new Group();
    asteroids = new Group();

    //console.log(life);

}

function draw() {

    if (gameState === "play") {


        //console.log(life);
        background("black")
        drawSprites();

        textSize(30);
        fill("#57fa88")
        text("Score: " + score, 20, 50);
        fill("#e5fc7c");
        text("Coins: " + coinScore, 20, height - 50);


        if (frameCount < 200) {
            fill("#219ddb")
            text("Collect the coins and avoid the ufos and asteroids", width / 2, height - 50)
        }

        if (frameCount % 10 === 0) {
            score += 10
        }
        //score = score + Math.round(getFrameRate() / 60);


        createStars(star, stars);
        createUfo(ufos);
        createAsteroid(asteroids);
        createCoins(coins);

        //console.log(player.y)

        if (keyIsDown(DOWN_ARROW) && player.y < height) {
            player.y += 10
        }
        if (keyIsDown(UP_ARROW) && player.y > 50) {
            player.y -= 10
        }



        if (asteroids.collide(player) || ufos.collide(player)) {
            gameState = "end";
            //console.log("Game Over");
            //console.log(gameState);
        }

    }

    if (coins.collide(player)) {
        coinScore += 1
        coins.destroyEach();
    }


    if (gameState === "end") {
        //onsole.log(gameState);

        player.remove();
        asteroids.visible = false;
        asteroids.destroyEach();
        stars.visible = false;
        stars.destroyEach();
        ufos.visible = false;
        ufos.destroyEach();
        //var screen = createSprite(width / 2, height / 2, width, height);
        // screen.shapeColor = "black";
        textSize(30)
        //console.log("Game over");
        fill("red");
        text("Game Over", width / 2 - 50, height / 2);
        text("Press f5 to restart", width / 2 - 80, height / 2 + 40);
    }
}


function createStars(sprite, spriteGroup) {
    y = Math.round(random(10, height))
    sprite = createSprite(width, y, 1, 2);
    sprite.shapeColor = "yellow";
    spriteGroup.add(sprite);
    sprite.velocityX = -(7 + score / 1000);
    if (sprite.x < 0) {
        sprite.remove();
    }
    //console.log(sprite.velocityX);
}

function createUfo(ufoGroup) {
    if (frameCount % 30 == 0) {
        y = Math.round(random(10, height - 30))
        var ufo = createSprite(width, y, 30, 30);
        ufo.addImage(ufoImg);
        ufo.velocityX = -(10 + score / 1000);
        ufoGroup.add(ufo);
        ufo.scale = 3
        //ufo.debug = true;
        ufo.setCollider("circle", 0, 0, 5)
        ufo.bounceOff(player);
        if (ufo.x < 0) {
            ufo.remove();
        }
    }
}

function createAsteroid(asteroidGroup) {
    if (frameCount % 50 == 0) {
        y = Math.round(random(10, height - 30))
        var asteroid = createSprite(width, y, 30, 30);
        asteroid.addImage(asteroidImg);
        asteroid.velocityX = -(10 + score / 1000);
        asteroid.scale = 2
        asteroidGroup.add(asteroid);
        //asteroid.debug = true;
        asteroid.setCollider("circle", -2, 2, 8)
        asteroid.bounceOff(player);
        if (asteroid.x < 0) {
            asteroid.remove();
        }
    }
}

function createCoins(coinGroup) {
    if (frameCount % 150 == 0) {
        y = Math.round(random(10, height - 30))
        var coin = createSprite(width, y, 30, 30);
        coin.addImage(coinImg);
        coin.velocityX = -(10 + score / 1000);
        coin.scale = 2
        coinGroup.add(coin);
        //coin.debug = true;
        coin.setCollider("circle", 0, 0, 8)
        coin.bounceOff(player);
        if (coin.x < 0 || coin.y < 0 || coin.y > height) {
            coin.remove();
        }
    }
}