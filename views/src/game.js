let gameScene = new Phaser.Scene();

gameScene.preload = function() {
  this.load.image('forest-back', 'assets/parallax_forest_pack/layers/parallax-forest-back-trees.png');
  this.load.image('forest-lights', 'assets/parallax_forest_pack/layers/parallax-forest-lights.png');
  this.load.image('forest-middle', 'assets/parallax_forest_pack/layers/parallax-forest-middle-trees.png');
  this.load.image('forest-front', 'assets/parallax_forest_pack/layers/parallax-forest-front-trees.png');
  this.load.image('aerocephal', 'assets/allacrost_enemy_sprites/aerocephal.png');
  this.load.image('arcana_drake', 'assets/allacrost_enemy_sprites/arcana_drake.png');
  this.load.image('aurum-drakueli', 'assets/allacrost_enemy_sprites/aurum-drakueli.png');
  this.load.image('bat', 'assets/allacrost_enemy_sprites/bat.png');
  this.load.image('daemarbora', 'assets/allacrost_enemy_sprites/daemarbora.png');
  this.load.image('deceleon', 'assets/allacrost_enemy_sprites/deceleon.png');
  this.load.image('demonic_essence', 'assets/allacrost_enemy_sprites/demonic_essence.png');
  this.load.image('dune_crawler', 'assets/allacrost_enemy_sprites/dune_crawler.png');
  this.load.image('green_slime', 'assets/allacrost_enemy_sprites/green_slime.png');
  this.load.image('nagaruda', 'assets/allacrost_enemy_sprites/nagaruda.png');
  this.load.image('rat', 'assets/allacrost_enemy_sprites/rat.png');
  this.load.image('scorpion', 'assets/allacrost_enemy_sprites/scorpion.png');
  this.load.image('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png');
  this.load.image('snake', 'assets/allacrost_enemy_sprites/snake.png');
  this.load.image('spider', 'assets/allacrost_enemy_sprites/spider.png');
  this.load.image('stygian_lizard', 'assets/allacrost_enemy_sprites/stygian_lizard.png')
  this.load.image('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png');
}

gameScene.create = function() {
    var scene = this;
    let { width, height } = this.sys.canvas;

    this.background = this.add.group();
    // setup each of our background layers to take the full screen
    ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
        .forEach(function(image) {
          var bg = scene.add.tileSprite(width / 2, height / 2, width,
            height, image, '', scene.background);
          bg.setTileScale(4,4);
        });

    var monsterData = [
      {name: 'Aerocephal', image: 'aerocephal'},
      {name: 'Arcana Drake', image: 'arcana_drake'},
      {name: 'Aurum Drakueli', image: 'aurum-drakueli'},
      {name: 'Bat', image: 'bat'},
      {name: 'Daemarbora', image: 'daemarbora'},
      {name: 'Deceleon', image: 'deceleon'},
      {name: 'Demonic Essence', image: 'demonic_essence'},
      {name: 'Dune Crawler', image: 'dune_crawler'},
      {name: 'Green Slime', image: 'green_slime'},
      {name: 'Nagaruda', image: 'nagaruda'},
      {name: 'Rat', image: 'rat'},
      {name: 'Scorpion', image: 'scorpion'},
      {name: 'Skeleton', image: 'skeleton'},
      {name: 'Snake', image: 'snake'},
      {name: 'Spider', image: 'spider'},
      {name: 'Stygian Lizard', image: 'stygian_lizard'}
  ];

  this.monsters = this.add.group();

  var monster;
  monsterData.forEach(function(data) {
      // create a sprite for them off screen
      monster = scene.add.sprite(width / 2, height / 2, data.image);
      // reference to the database
      monster.name = data.name;
  
      //enable input so we can click it!
      monster.active = true;
      monster.visible = false;
      monster.setInteractive();
      scene.monsters.add(monster);
      
      monster.on('pointerdown', function() {
        scene.onClickMonster();
      });
  });

  scene.currentMonster = scene.monsters.getFirstAlive(false, width / 2, height / 2);
  scene.currentMonster.visible = true;
  scene.currentMonsterText = scene.add.text(width / 2, height / 8, scene.currentMonster.name).setScale(3).setOrigin(.5).setColor("Red");

}

gameScene.render = function() {
  
}

gameScene.onClickMonster = function() {
  let { width, height } = this.sys.canvas;
  let scene = this;
  scene.currentMonster.active = false;
  scene.currentMonster.visible = false;
  let nextMonster = scene.monsters.getFirstAlive(false, width / 2, height / 2);
  if(nextMonster === null) {
    resetMonstersToAlive(scene);
    nextMonster = scene.monsters.getFirstAlive(false, width / 2, height / 2);
  }
  scene.currentMonster = nextMonster;
  this.currentMonsterText.setText(scene.currentMonster.name);
  nextMonster.visible = true;

  function resetMonstersToAlive(scene) {
    let monsterArray = scene.monsters.getChildren();

    for(let i = 0; i < monsterArray.length; i++) {
      monsterArray[i].active = true;
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: gameScene
};

var game = new Phaser.Game(config);

 
game.scene.start(gameScene);