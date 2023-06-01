class Milk{  //宣告一個怪物類別，名稱為Monster
    constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置...)
        this.r = args.r || 40 //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有就100
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置，{x:random(width),y:random(height)} 
        this.v = args.v ||createVector(random(-1,1),random(-1,1)).limit(1) //移動的速度，如果沒有傳args參數，就會用亂數(-1,1)，抽出x,y軸移動速度
    }
    draw(){ //繪出物件程式碼
        push() //
         translate(this.p.x,this.p.y) //以該物件位置為原點
         noStroke()
         fill(255)
         ellipse(0,0,this.r/1.5)
        //  fill(0)
        //  text("milk",0,0)
        pop()
    }
    update(){ ////計算出元件移動後的位置
        this.p.add(this.v)
  
       //碰到牆壁會回彈
          if(this.p.x<=0 || this.p.x>=width){ //X軸碰到左邊(<=0)，或是碰到右邊(>=width)
              this.v.x=-this.v.x //把速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height-50){ //X軸碰到上邊(<=0)，或是碰到下邊(>=height)
          this.v.y=-this.v.y //把速度方向改變
          }
      }
      isBallinranger(x,y){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
          let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
          if(d<this.r*1.5){
            return true //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回true的值(碰觸)
          }else{
            return false //滑鼠與物件的距離大於物件的寬度，代表未碰觸，則傳回false的值(未碰觸)
          }
      }
  
  }
  