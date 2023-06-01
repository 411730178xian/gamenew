let points = [[0,26],[3,27],[7,28] ,[15,29] ,[20,28],[25,27] ,[31,25] ,[35,23] ,[36,23]
  ,[37,24],[38,28],[38,37],[45,30],[56,30],[60,33],[62,34],[64,35],[63,25],[62,21]
  ,[63,16],[61,13],[56,8] //臉
  ,[54,5],[50,-4],[42,-21] //臉接腳轉折
  ,[39,-40],[39,-45],[40,-46],[40,-48] //前腳
  ,[40,-48],[40,-50],[32,-50],[31,-45] ,[30,-40] ,[29,-30] ,[26,-44] ,[25,-46] ,[23,-48]
  ,[21,-48],[19,-45] ,[19,-40],[20,-35],[20,-30],[18,-27]//肚子
  ,[15,-28] ,[12,-28] ,[10,-28] ,[7,-30] ,[-5,-34] ,[1,-41] ,[1,-41] ,[2,-42] ,[5,-42]
  ,[7,-44],[6,-46] ,[-1,-46],[-16,-32],[-19,-36],[-14,-44],[-11,-45],[-10,-46]
  ,[-10,-48],[-11,-49],[-17,-49],[-18,-48],[-27,-32],[-27,-30],[-25,-22],[-27,-15],[-29,-9]
  ,[-32,-4] ,[-35,-4],[-40,-3],[-46,0],[-50,3],[-54,8],[-56,14],[-56,18],[-55,22],[-53,26]
  ,[-50,30],[-46,33],[-40,37] //尾巴 // ,[-37,35] // ,[-34,38]// ,[-33,37]
  ,[-37,35],[-46,27],[-49,21]// ,[-49,19]
  ,[-49,15],[-47,10] ,[-43,6] ,[-36,3] ,[-33,3] ,[-30,6] ,[-26,10] ,[-21,15] ,[-15,20]
  ,[-9,23],[-4,25],[0,26] ,[3,27],[7,28],[15,29]]; //list資料，

var fill_colors = "eae4e9-fff1e6-fde2e4-fad2e1-e2ece9-bee1e6-f0efeb-dfe7fd".split("-").map(a=>"#"+a)
var line_colors = "96705b-ab8476eae0d5-c6ac8f".split("-").map(a=>"#"+a)
//class::類別，例子

//+++++++++++++++畫points所有點的物件定義
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此

//+++++++++++設定飛彈物件的變數
var bullet //"目前要處理"的物件，暫時放在bullet變數內
var bullets = [] //把產生"所有的物件，為物件的倉庫，所有的物件皆在此

//+++++++++++設定怪物物件的變數
var monster //"目前要處理"的物件，暫時放在bullet變數內
var monsters = [] //把產生"所有的物件，為物件的倉庫，所有的物件皆在此

//++++++++++++milk+++++++++++++++++++
var milk //"目前要處理"的物件，暫時放在bullet變數內
var milks = [] //把產生"所有的物件，為物件的倉庫，所有的物件皆在此

//+++++++++設定cheese位置
var shipP

//++++++++++++++++++++++++++++++++
var score=0

function preload(){ //程式碼準備執行之前，所執行的程式碼內容，比setup更早執行
  cat_sound = loadSound("sound/cat.mp3") //加入音樂
  bullet_sound = loadSound("sound/shoot.mp3")
  // backgroundimage =loadImage("image211217.jpg")
  mouse_sound = loadSound("sound/mouse.mp3")
  background_image = loadImage("image/1.png") //加入照片

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // textAlign(CENTER); // uncomment this line //本來要做開始的頁面結果閃太快
  // textSize(90);
  // // background("#e8e8e4")
  // // fill("#f6bd60")
  // text("老鼠退散！", width/2, height/2);
  // setTimeout(function() {
  //   clear();
  // }, 5);

  shipP=createVector(width/2,height/2) //預設砲台位置為(width/2,height/2)
    //產生cat
    for(var i=0;i<20;i=i+1){
      ball = new obj({}) //產生一個obj class元件
      balls.push(ball) //把ball的物件放到balls陣列內
    }

    //產生怪物
    for(var i=0;i<8;i=i+1){
      monster = new Monster({}) //產生一個obj class元件
      monsters.push(monster) //把monster的物件放到monsters陣列內
    }

    //產生milk
    for(var i=0;i<10;i=i+1){
      milk = new Milk({}) //產生一個obj class元件
      milks.push(milk) //把monster的物件放到monsters陣列內
    }
    
}


function draw() {
  background(background_image);
    if (monsters.length == 0) { //如果怪物數量=0
      background(220) //清空畫面
      fill("#eddea4")
      rect(width/2-220,height/2-200,420,200)
      fill("#e9c46a")
      textSize(30)
      text("你的分數是:",width/2-100,height/2-60)//顯示分數
      text(score,width/2+60,height/2-60)  
      textSize(50)
      text("成功趕走壞老鼠了",width/2-200,height/2-120)//顯示分數
      //禁止按鍵和滑鼠

      noLoop();
      noCursor();
      } else if (score<=-25) { //如果score<-20
        background(220) //清空畫面
        fill("#eddea4")
        rect(width/2-200,height/2-200,400,200)
        fill("#b1a7a6")
        textSize(30)
        text("你的分數是:",width/2-100,height/2-60)//顯示分數
        text(score,width/2+60,height/2-60)
        textSize(50)
        text("趕走老鼠失敗TT",width/2-180,height/2-120)//顯示分數  
        //禁止按鍵和滑鼠
        noLoop();
        noCursor();
      }
  //   for(var j=0;j<balls.length;j++){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){ //按下鍵盤左鍵
      shipP.x=shipP.x-5
    }
    if(key=="ArrowRight" || key=="d"){ //按下鍵盤右鍵
      shipP.x=shipP.x+5
    }
    if(key=="ArrowUp" || key=="w"){ //按下鍵盤上鍵
      shipP.y=shipP.y-5
    }
    if(key=="ArrowDown" || key=="s"){ //按下鍵盤下鍵
      shipP.y=shipP.y+5
    }
  }
  
  //cat的顯示
  for(let ball of balls) //只要是陣列的方式，都可以用此方式處理
  {
    ball.draw()
    ball.update()
      for(let bullet of bullets){ //檢查每一個物件
        if(ball.isBallinranger(bullet.p.x,bullet.p.y)){ //inranger，判斷有無碰到
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score=score - 5
        cat_sound.play()
       }
    }
  }

//飛彈的顯示
for(let bullet of bullets) //只要是陣列的方式，都可以用此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示
  for(let monster of monsters) //只要是陣列的方式，都可以用此方式處理
  {
    if(monster.dead == true && monster.timenumber>4){
    monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isBallinranger(bullet.p.x,bullet.p.y)){ //inranger，判斷有無碰到
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫monsters取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
      bullets.splice(bullets.indexOf(bullet),1)
      score=score + 1
      monster.dead = true //代表怪物死亡
      mouse_sound.play()
     }
    }
    //milk的顯示
  for(let milk of milks) //只要是陣列的方式，都可以用此方式處理
  {
    milk.draw()
    milk.update()
      for(let bullet of bullets){ //檢查每一個物件
        if(milk.isBallinranger(bullet.p.x,bullet.p.y)){ //inranger，判斷有無碰到
        milks.splice(milks.indexOf(milk),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score=score +3
        // cat_sound.play()
       }
    }
  }
  }

fill("#a85e44")
textSize(45)
text(score,40,50) //在座標為(50,50)上顯示score分數內容
textSize(15)
text("拿起司攻擊老鼠讓他吃太飽而撤退吧！",30,80) //在座標為(30,80)上顯示內容
text("打到貓咪-5分,打到老鼠+1分,牛奶球可以打到+3分喔!",30,100)

//================設置砲台=======================
  push() //重新規劃原點(0,0)，在視窗的中間
  let dx=mouseX-width/2
  let dy=mouseY-height/2
  let angle=atan2(dy,dx) //dy分子，dx分母
  // translate(width/2,height/2) //把砲台中心點放在視窗中間
  translate(shipP.x,shipP.y)
  fill("#ffd166")
  noStroke()
  rotate(angle)
  //  triangle(-25,25,25,25,0,-50) //設定三個眼，畫成一個三角形
  triangle(45,10,-30,50,-50,10)
  fill("#e9c46a")
  rect(-50,-20,95,30)
  fill("#e09f3e")
  ellipse(20,-0,15)
  ellipse(35,-10,10)
  ellipse(-20,20,15)
  ellipse(-35,-10,15)
  ellipse(-5,5,10)
  ellipse(-30,40,8)
  ellipse(15,20,8)
  pop()  //恢復原本設定，原點(0,0)在視窗左上角

}

// let count = 60; // 60 seconds = 1 minute

// function startTimer() {
//   let intervalId = setInterval(function() {
//     count--;
//     textSize(45)
//     text("Time left: " + count + " seconds",40,50) //在座標為(50,50)上顯示

//     text("Time left: " + count + " seconds");
//     if (count == 0) {
//       clearInterval(intervalId);
//       console.log("Time's up! Game paused.");
//       // pause the game here
//     }
//   }, 1000); // call function every second
// }

// startTimer();


function mousePressed(){
  //++++++++++++++++產生一個物件+++++++++++++++
  // ball = new obj({  //產生一個obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) //在滑鼠按下的地方產生一個新的obj class元件
  // balls.push(ball) //把ball的物件放到balls陣列內
  //++++++++++++++++++++++++++++++++++++++++++++

  //+++++在物件上按下滑鼠，物件消失不見，分數加1分++++++++++++++++

  // for(let ball of balls){ //檢查每一個物件
  //   if(ball.isBallinranger(mouseX,mouseY)){
  //     balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
  //     score=score + 1
  //   }
  // }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  

  //+++++++++++++++++++++按一下產生一個飛彈+++++++++++++++++++++++
  bullet = new Bullet({
    r:20 //可以自己加參數color,v...
  }) //在滑鼠按下的地方，產生一個新的bullet class元件
  bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白建，發射飛彈，跟按下滑鼠功能一樣
    bullet = new Bullet({
      r:20 //可以自己加參數color,v...
    }) //在滑鼠按下的地方，產生一個新的bullet class元件
    bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
    bullet_sound.play()
  }
  
}