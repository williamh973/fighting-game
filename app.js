const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 1250
canvas.height = 685
canvas.style.backgroundColor = "black"

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7




// ------------------------------------------------------------------------------

function createMissile(imageSrc) {
    const missile = new Image()
    missile.src = "./images/ryu/missile.png"
    return missile
}



let theMissile = createMissile("./images/ryu/missile.png")

// ------------------------------------------------------------------------------



class Background {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
 }
 
 class Sprite {
     constructor({ 
       position, 
       imageSrc, 
       scale = 1, 
       framesMax = 1, 
       offset = { 
        x: 0, 
        y: 0 
    } 
    }) {
         this.position = position
         this.width = 50
         this.height = 150
         this.image = new Image()
         this.image.src = imageSrc
         this.scale = scale
         this.framesMax = framesMax
         this.framesCurrent = 0
         this.framesElapsed = 0
         this.framesHold = 10
         this.offset = offset
 }
    draw() {
 c.drawImage(
    this.image,
    this.framesCurrent * (this.image.width / this.framesMax),
    0,
    this.image.width / this.framesMax,
    this.image.height, 
    this.position.x - this.offset.x,
    this.position.y - this.offset.y,
    (this.image.width / this.framesMax ) * this.scale,
    this.image.height * this.scale
    )
 }
 animateFrames() {
    this.framesElapsed++
 
    if (this.framesElapsed % this.framesHold === 0) {
       if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
       } else {
          this.framesCurrent = 0
       }  
    }
 }
 update() {
    this.draw()
    this.animateFrames()
 }
 }

 class Sprite2 {
    constructor({ 
      position, 
      imageSrc, 
      scale = 1, 
      framesMax = 1, 
      offset = { 
       x: 0, 
       y: 0 
   } 
   }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
}
   draw() {
c.drawImage(
   this.image,
   this.framesCurrent * (this.image.width / this.framesMax),
   0,
   this.image.width / this.framesMax,
   this.image.height, 
   this.position.x - this.offset.x,
   this.position.y - this.offset.y,
   (this.image.width / this.framesMax ) * this.scale,
   this.image.height * this.scale
   )
}
animateFrames() {
   this.framesElapsed++

   if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
         this.framesCurrent++
      } else {
         this.framesCurrent = 0
      }  
   }
}
update() {
   this.draw()
   this.animateFrames()
}
}

 class Ring {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
 }

 class Ryu extends Sprite {
    constructor({
        position, 
        velocity, 
        color = 'red',
        imageSrc, 
        scale = 1,
        framesMax = 1, 
        offset = { x: 0, y: 0 },
        sprites,
        attackBoxPunch = { offset: {}, width: undefined, height: undefined }
    }) {
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                offset,
            })

      this.velocity = velocity
        this.width = 105
        this.height = 105
        this.lastKey
        this.attackBoxPunch = {
            position: {
            x: this.position.x,           
            y: this.position.y
            },
            offset: attackBoxPunch.offset,
            width: attackBoxPunch.width,
            height: attackBoxPunch.height
            }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
 
        for ( const sprite in this.sprites) {
         sprites[sprite].image = new Image()
         sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
   draw() {
c.drawImage(
   this.image,
   this.framesCurrent * (this.image.width / this.framesMax),
   0,
   this.image.width / this.framesMax,
   this.image.height, 
   this.position.x,
   this.position.y,
   (this.image.width / this.framesMax ) * this.scale,
   this.image.height * this.scale
   )
}
animateFrames() {
   this.framesElapsed++

   if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
         this.framesCurrent++
      } else {
         this.framesCurrent = 0
      }  
   }
}
update() {
   this.draw()
   this.animateFrames()

   this.attackBoxPunch.position.x = this.position.x - this.attackBoxPunch.offset.x
    this.attackBoxPunch.position.y = this.position.y
 
c.fillRect(
    this.attackBoxPunch.position.x, 
    this.attackBoxPunch.position.y,
    this.attackBoxPunch.width, 
    this.attackBoxPunch.height
)


    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
 
    // fonction de gravité
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
     this.velocity.y = 0
     this.position.y = 0
    } else  this.velocity.y += gravity
 
 }
 attack1() {
    this.switchSprite('attack1')
 this.isAttacking = true
 setTimeout(() => {
   this.isAttacking = false
   }, 100)
  }
  attack2() {
    this.switchSprite('attack2')
 this.isAttacking = true
 setTimeout(() => {
   this.isAttacking = false
   }, 100)
  }
 jump() {
    this.switchSprite('jump')
    keys.z.pressed = true 
 setTimeout(() => {
    keys.z.pressed = false
   }, 100)
  }
  hadouken() {
    this.switchSprite('hadouken')
    keys.r.pressed = true 
 setTimeout(() => {
    keys.r.pressed = false
   }, 100)
  }
//   shoot(){
//     missiles.push(new Missile({
//         position:{
//             x: this.position.x + this.width,
//             y: this.position.y
//         },  
//     }));
// }
  switchSprite(sprite) {
    if ( this.image === this.sprites.attack1.image && 
       this.framesCurrent < this.sprites.attack1.framesMax - 1 )  // - 1
        return
        if ( this.image === this.sprites.attack2.image && 
            this.framesCurrent < this.sprites.attack2.framesMax - 1 )  // - 1
             return
             if ( this.image === this.sprites.jump.image && 
                this.framesCurrent < this.sprites.jump.framesMax - 1 )  // - 1
                 return
                 if ( this.image === this.sprites.jumpForward.image && 
                    this.framesCurrent < this.sprites.jumpForward.framesMax - 1 )  // - 1
                     return
                     if ( this.image === this.sprites.crouch.image && 
                        this.framesCurrent < this.sprites.crouch.framesMax - 2 )  // - 1
                         return
                         if ( this.image === this.sprites.blockUp.image && 
                            this.framesCurrent < this.sprites.blockUp.framesMax - 2 )  // - 1
                             return
                             if ( this.image === this.sprites.hadouken.image && 
                                this.framesCurrent < this.sprites.hadouken.framesMax - 1 )  // - 1
                                 return






    switch (sprite) {
       case 'idle':
          if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
       }
          break
          case 'run':
             if(this.image !== this.sprites.run.image) {
             this.image = this.sprites.run.image
             this.framesMax = this.sprites.run.framesMax
             this.framesCurrent = 0
          }
             break
             case 'jump':
                if(this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
             }
                break
                case 'jumpForward':
                    if(this.image !== this.sprites.jumpForward.image) {
                        this.image = this.sprites.jumpForward.image
                        this.framesMax = this.sprites.jumpForward.framesMax
                        this.framesCurrent = 0
                     }
                    break
                    case 'crouch':
                        if(this.image !== this.sprites.crouch.image) {
                            this.image = this.sprites.crouch.image
                            this.framesMax = this.sprites.crouch.framesMax
                            this.framesCurrent = 1
                         }
                        break
                        case 'blockUp':
                            if(this.image !== this.sprites.blockUp.image) {
                                this.image = this.sprites.blockUp.image
                                this.framesMax = this.sprites.blockUp.framesMax
                                this.framesCurrent = 1
                             }
                            break
                            case 'hadouken':
                                if(this.image !== this.sprites.hadouken.image) {
                                    this.image = this.sprites.hadouken.image
                                    this.framesMax = this.sprites.hadouken.framesMax
                                    this.framesCurrent = 0
                                 }
                                break
                             case 'attack1':
                                if(this.image !== this.sprites.attack1.image) {
                                this.image = this.sprites.attack1.image
                                this.framesMax = this.sprites.attack1.framesMax
                                this.framesCurrent = 0
                             }
                      break
                      case 'attack2':
                        if(this.image !== this.sprites.attack2.image) {
                        this.image = this.sprites.attack2.image
                        this.framesMax = this.sprites.attack2.framesMax
                        this.framesCurrent = 0
                     }
                        break
    }
  }
 }

 class Ken extends Sprite2 {
    constructor({
        position, 
        velocity, 
        color = 'red',
        imageSrc, 
        scale = 1,
        framesMax = 1, 
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                offset,
            })

      this.velocity = velocity
        this.width = 105
        this.height = 105
        this.lastKey
        this.attackBox = {
            position: {
            x: this.position.x,           
            y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
            }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
 
        for ( const sprite in this.sprites) {
         sprites[sprite].image = new Image()
         sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
   draw() {
c.drawImage(
   this.image,
   this.framesCurrent * (this.image.width / this.framesMax),
   0,
   this.image.width / this.framesMax,
   this.image.height, 
   this.position.x,
   this.position.y,
   (this.image.width / this.framesMax ) * this.scale,
   this.image.height * this.scale
   )
}
animateFrames() {
   this.framesElapsed++

   if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
         this.framesCurrent++
      } else {
         this.framesCurrent = 0
      }  
   }
}
update() {
   this.draw()
   this.animateFrames()

   this.attackBox.position.x = this.position.x - this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
 
c.fillRect(
    this.attackBox.position.x, 
    this.attackBox.position.y,
    this.attackBox.width, 
    this.attackBox.height
)


    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
 
    // fonction de gravité
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
     this.velocity.y = 0
     this.position.y = 0
    } else  this.velocity.y += gravity
 
 }
 attack() {
    this.switchSprite('attack1')
 this.isAttacking = true
 setTimeout(() => {
   this.isAttacking = false
   }, 100)
  }
  attack2() {
    this.switchSprite('attack2')
 this.isAttacking = true
 setTimeout(() => {
   this.isAttacking = false
   }, 100)
  }
 jump() {
    this.switchSprite('jump')
    keys.ArrowUp.pressed = true 
 setTimeout(() => {
    keys.ArrowUp.pressed = false
   }, 100)
  }
//   hadouken() {
//     this.switchSprite('hadouken')
//     keys.r.pressed = true 
//  setTimeout(() => {
//     keys.r.pressed = false
//    }, 100)
//   }
//   shoot(){
//     missiles.push(new Missile({
//         position:{
//             x: this.position.x + this.width,
//             y: this.position.y
//         },  
//     }));
// }
  switchSprite(sprite) {
    if ( this.image === this.sprites.attack1.image && 
       this.framesCurrent < this.sprites.attack1.framesMax - 1 )  // - 1
        return
        if ( this.image === this.sprites.attack2.image && 
            this.framesCurrent < this.sprites.attack2.framesMax - 1 )  // - 1
             return
             if ( this.image === this.sprites.jump.image && 
                this.framesCurrent < this.sprites.jump.framesMax - 1 )  // - 1
                 return
            //      if ( this.image === this.sprites.jumpForward.image && 
            //         this.framesCurrent < this.sprites.jumpForward.framesMax - 1 )  // - 1
            //          return
            //          if ( this.image === this.sprites.crouch.image && 
            //             this.framesCurrent < this.sprites.crouch.framesMax - 2 )  // - 1
            //              return
            //              if ( this.image === this.sprites.blockUp.image && 
            //                 this.framesCurrent < this.sprites.blockUp.framesMax - 2 )  // - 1
            //                  return
            //                  if ( this.image === this.sprites.hadouken.image && 
            //                     this.framesCurrent < this.sprites.hadouken.framesMax - 1 )  // - 1
            //                      return






    switch (sprite) {
       case 'idle':
          if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
       }
          break
          case 'run':
             if(this.image !== this.sprites.run.image) {
             this.image = this.sprites.run.image
             this.framesMax = this.sprites.run.framesMax
             this.framesCurrent = 0
          }
             break
             case 'jump':
                if(this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
             }
                break
                    case 'crouch':
                        if(this.image !== this.sprites.crouch.image) {
                            this.image = this.sprites.crouch.image
                            this.framesMax = this.sprites.crouch.framesMax
                            this.framesCurrent = 1
                         }
                        break
                        case 'blockUp':
                            if(this.image !== this.sprites.blockUp.image) {
                                this.image = this.sprites.blockUp.image
                                this.framesMax = this.sprites.blockUp.framesMax
                                this.framesCurrent = 1
                             }
                            break
                            case 'hadouken':
                                if(this.image !== this.sprites.hadouken.image) {
                                    this.image = this.sprites.hadouken.image
                                    this.framesMax = this.sprites.hadouken.framesMax
                                    this.framesCurrent = 0
                                 }
                                break
                             case 'attack1':
                                if(this.image !== this.sprites.attack1.image) {
                                this.image = this.sprites.attack1.image
                                this.framesMax = this.sprites.attack1.framesMax
                                this.framesCurrent = 0
                             }
                      break
                      case 'attack2':
                        if(this.image !== this.sprites.attack2.image) {
                        this.image = this.sprites.attack2.image
                        this.framesMax = this.sprites.attack2.framesMax
                        this.framesCurrent = 0
                     }
                        break
    }
  }
 }



 function createBackground(imageSrc) {
        const background = new Image()
        background.src = "./images/background/00008.png"
        return background
    }



    function createRing(imageSrc) {
        const ring = new Image()
        ring.src = "./images/ring.png"
        return ring
    }




    let backgrounds = [];
    let rings = [];
   let missiles = [];






    


const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    z: {
        pressed: false
    },
    a: {
        pressed: false
    },
    e: {
        pressed: false
    },
    s: {
        pressed: false
    },
    c: {
        pressed: false
    },
    r: {
        pressed: false
    },



    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}
let lastKey 





let player = new Ryu({
    position: {
        x: 200,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    // position rectangle d'attaque
    offset: {
        x: 38,
        y: 38 // 38
    },
    imageSrc: 'images/ryu/idle.png',
    framesMax: 4,
    scale: 2,
    // position par offset du joueur
    offset: {
        x: 0,
        y: 0
 },
 attackBox: {
   offset: {
    x: -70,
    y: 0
   },
   width: 50,
   height: 25
 },
sprites: {
    idle: {
        imageSrc: 'images/ryu/idle.png',
        framesMax: 4
    },
    run: {
        imageSrc: 'images/ryu/run.png',
        framesMax: 5
    },
    jump: {
        imageSrc: 'images/ryu/jump.png',
        framesMax: 7
    },
    jumpForward: {
        imageSrc: 'images/ryu/jump-forward.png',
        framesMax: 7
    },
    crouch: {
        imageSrc: 'images/ryu/crouch.png',
        framesMax: 2
    },
    blockUp: {
        imageSrc: 'images/ryu/blocking-standup.png',
        framesMax: 2
    },
    attack1: {
        imageSrc: 'images/ryu/attack1.png',
        framesMax: 3
    },
    attack2: {
        imageSrc: 'images/ryu/attack2.png',
        framesMax: 3
    },
    hadouken: {
        imageSrc: 'images/ryu/hadouken.png',
        framesMax: 5
    },
}
})   







let enemy = new Ken({
    position: {
        x: 800,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
     // position rectangle d'attaque
    offset: {
        x: -50,
        y: 0
    },
   imageSrc: 'images/ken/idle.png',
   framesMax: 4,
   scale: 2,
  // position par offset du joueur
   offset: {
      x: 0,
      y: 0
},
attackBox: {
    offset: {
     x: -80, //-210
     y: 0
    },
    width: 50,
    height: 25
  },
    sprites: {
        idle: {
            imageSrc: 'images/ken/idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: 'images/ken/run.png',
            framesMax: 5
        },
        jump: {
            imageSrc: 'images/ken/jump.png',
            framesMax: 7
        },
        attack1: {
            imageSrc: 'images/ryu/attack1.png',
            framesMax: 3
        },
        attack2: {
            imageSrc: 'images/ryu/attack2.png',
            framesMax: 3
        },
    }
    })   


    


// function init() {

    backgrounds = [];
    rings = [];
  


    
    backgrounds = [ 
        new Background({
            x: 0,
            y: 0,
            image: createBackground("./images/background/00008.png")
    })
    ]
    rings = [ 
        new Ring({
            x: 90,
            y: 600,
            image: createRing("./images/ring.png")
    })
    ]
    

    // }





  






//     A N I M A T E


function animate() {
window.requestAnimationFrame(animate)
c.clearRect(0, 0, canvas.width, canvas.height)





backgrounds.forEach(background => {
    background.draw()
});

rings.forEach(ring => {
    ring.draw()
});


rings.forEach((ring) => {
    if (
        player.position.y + player.height <= ring.position.y &&
        player.position.y + player.height + player.velocity.y >= ring.position.y - 87 &&
        player.position.x + player.width >= ring.position.x + 23 &&  // ajustement des bords coté gauche de chaque plateformes lorsque mario tombe.
        player.position.x + player.width <= ring.position.x + ring.width + 35  // ajustement des bords coté droit de chaque plateformes lorsque mario tombe.
    ) {
        player.velocity.y = 0
    }
})
rings.forEach((ring) => {
    if (
        enemy.position.y + enemy.height <= ring.position.y &&
        enemy.position.y + enemy.height + enemy.velocity.y >= ring.position.y - 87 &&
        enemy.position.x + enemy.width >= ring.position.x + 23 &&  // ajustement des bords coté gauche de chaque plateformes lorsque mario tombe.
        enemy.position.x + enemy.width <= ring.position.x + ring.width + 35  // ajustement des bords coté droit de chaque plateformes lorsque mario tombe.
    ) {
        enemy.velocity.y = 0
    }
})



player.update()
enemy.update()



player.velocity.x = 0
enemy.velocity.x = 0

// mouvement du joueur
if(keys.q.pressed) {
    player.velocity.x = -6
player.switchSprite('run')
} else if(keys.d.pressed ) {
    player.velocity.x = 6
    player.switchSprite('run')
} else {
    player.switchSprite('idle')
}
if( player.velocity.y < 0 && keys.d.pressed  ) {
    player.switchSprite('jump')
}
if(  keys.s.pressed ) {
    player.switchSprite('crouch')
}
if(  keys.c.pressed ) {
    player.switchSprite('blockUp')
}




// mouvement de l'enemy
if(keys.ArrowLeft.pressed) {
    enemy.velocity.x = -6
    enemy.switchSprite('run')
} else if(keys.ArrowRight.pressed ) {
    enemy.velocity.x = 6
    enemy.switchSprite('run')
} else {
    enemy.switchSprite('idle')
}
if( player.velocity.y < 0 && keys.ArrowUp.pressed  ) {
    enemy.switchSprite('jump')
}
// if(  keys.ArrowDown.pressed ) {
//     enemy.switchSprite('crouch')
// }
// if(  keys.c.pressed ) {
//     enemy.switchSprite('blockUp')
// }









//  detection pour collision player
if (
   rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
   }) &&
     player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%' 
     }
//  detection pour collision enemy
    if (
        rectangularCollision({
         rectangle1: enemy,
         rectangle2: player
        }) &&
          enemy.isAttacking
         ) {
            enemy.isAttacking = false
            player.health -= 10
            document.querySelector('#playerHealth').style.width = player.health + '%' 
         }



        //  fin du jeu
        if(enemy.health <= 0 || player.health <= 0) {
determineWinner({player, enemy, timerId})
        }





     
}
animate()








// timer
let timer = 60
let timerId
function decreaseTimer() {
if(timer > 0) {
 timerId = setTimeout(decreaseTimer, 1000)
timer--
document.querySelector('#timer').innerHTML = timer
}

if(timer === 0 ) {
    determineWinner({player, enemy, timerId})
}
}

decreaseTimer()






// collision des rectangles d'attaques
function rectangularCollision({rectangle1, rectangle2}) {
    return (
    rectangle1.attackBoxPunch.position.x + rectangle1.attackBoxPunch.width >= rectangle2.position.x &&
    rectangle1.attackBoxPunch.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBoxPunch.position.y + rectangle1.attackBoxPunch.height >= rectangle2.position.y &&
    rectangle1.attackBoxPunch.position.y <= rectangle2.position.y + rectangle2.height
    )
}




// pour déterminer le gagnant
function determineWinner({ player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    }  else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}







// clavier

let counterKeydown = 0
let counterKeydown2 = 0


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'q':
            keys.q.pressed = true
            player.lastKey = 'q'
            break;
        case 'z':
             if(event.repeat) {
                return 
            }
            counterKeydown++
            if( counterKeydown === 1) {
             player.velocity.y = -17
             player.lastKey = 'z'
                setTimeout(() => {
                    counterKeydown = 0
                   }, 1000); // 500
            }
            player.jump()
             break;
             case 's':
                keys.s.pressed = true
                player.lastKey = 's'
                break;
                case 'c':
                    keys.c.pressed = true
                    player.lastKey = 'c'
                    break;
             case 'e':
                if(event.repeat) {
                    return 
                }
               player.attack()
                break;
                case 'a':
                    if(event.repeat) {
                        return 
                    }
                   player.attack2()
                    break;
                    case 'r':
                        if(event.repeat) {
                            return 
                        }
                        keys.r.pressed = true
                        player.lastKey = 'r'
                        player.hadouken()
                        player.shoot();
                        break;



            //  keydown enemy
             case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break;
            case 'ArrowUp':
                if(event.repeat) {
                    return 
                }
                counterKeydown2++
                if( counterKeydown2 === 1) {
                 enemy.velocity.y = -17
                 enemy.lastKey = 'ArrowUp'
                    setTimeout(() => {
                        counterKeydown2 = 0
                       }, 1000); // 500
                }
                enemy.jump()
                 break;
                 case 'ArrowDown':
                    keys.ArrowDown.pressed = true
                    enemy.lastKey = 'ArrowDown'
                    break;
                 case '0':
               enemy.isAttacking = true
                break;
    }
}) 
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'q':
            keys.q.pressed = false
            break;
        case 'z':
             keys.z.pressed = false
             break;
             case 'e':
                keys.e.pressed = false
                break;
                case 'a':
                    keys.a.pressed = false
                    break;
                    case 's':
                        keys.s.pressed = false
                        break;
                        case 'c':
                            keys.c.pressed = false
                            break;
                            case 'r':
                                keys.r.pressed = false
                                break;





                // keyup enemy
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false
                    break;
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = false
                    break;
                 case 'ArrowUp':
                    keys.ArrowUp.pressed = false
                    break;
                    case 'ArrowDown':
                        keys.ArrowDown.pressed = false
                        break;
    }
}) 



