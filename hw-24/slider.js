// 1. от html 
// 2. от js 

/**
 * 1. Управление клавиатурой
 * 2. Пролистывание мышкой
 * 3* Луп
 */

class Slider {

  _container;
  _film;
  _slides;
  _buttons;

  _paddingLeft = 0;
  _paddingRight = 0;
  _currentIndex = 0;

  _playState = false;
  _playTimer = null;
  _playDirection = 0;
  _playSpeed = 0;
  
  // const dx = 200; // шаг, на котоырй мы смещаем элемент
  // let x = 0; // реальная позицию элемента
  
  // let containerWidth = 0;
  
  // container -> film (a.k.a block) -> slides[]
  constructor(container, film, slides, buttons) {
    this._container = container;
    this._film = film;
    this._slides = slides;
    this._buttons = buttons;


    // TODO: очищать event listener при уничтожении слайдера
    window.addEventListener("resize", () => {
      this._upadatePostion();
    });

    this._upadatePostion();

  }

  _upadatePostion() {

    const min = this._container.clientWidth - this._film.offsetWidth;
    const max = this._paddingRight;

    let x = -this._slides[this._currentIndex].offsetLeft + this._paddingLeft;

    x = Math.max(min, Math.min(max, x));

    // console.log(x, this._paddingLeft);
    
    this._film.style.transform = "translateX(" + x + "px)";
  }
  moveSlide(direction) {
    this._slides[this._currentIndex].classList.remove("slide_active");

    let index = (this._currentIndex + direction) % this._slides.length;
    if (index < 0) {
      index = this._slides.length + index;
    }

    // Math.min(this._currentIndex + direction, this._slides.length - 1)
    this._currentIndex = Math.max(0, index);
    this._slides[this._currentIndex].classList.add("slide_active");

    this._upadatePostion();
  }
  

  nextSlide() {
    this.moveSlide(1);
  }

  prevSlide() {
    this.moveSlide(-1);
  }
  static fromData(data, createSlide, options = {}) {
      
    const slides = Array.from(data, (data) => 
      $("div", {
          className: "slider__slide"
        }, 
        createSlide(data)
      )
    ); 

    const film = $("div", {
      className: "slider__film",
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        // align-items: center;
        // justify-content: center;
      }
    }, ...slides);

    
    const buttonLeft = $("div", {
      className: "button button_left",
      /*onclick: () => {
        prevSlide();
        
      }*/
    });
    
    const buttonRight = $("div", {
      className: "button button_right",
      /*onclick: () => {
        nextSlide();
        
      }*/
    });
    const buttons = $("div", {
      className: "buttons",
    }, buttonLeft, buttonRight);
    const container = $("div", {
      className: "slider__container"
    }, film);
    return new Slider(container, film, slides, buttons);
  }
 
  
  // fromHtml(element) {

  // }

  appendTo(element) {
    element.append(this._container);
    this._buttons.firstChild.addEventListener("click", () => {
      this.prevSlide();
    });
    this._buttons.lastChild.addEventListener("click", () => {
      this.nextSlide();
    });
    element.append(this._buttons);

    // TODO: пересчитывать каждый раз, когда необходимо
    this._container.style.height = this._film.offsetHeight + "px";

    const style = window.getComputedStyle(this._container);
    this._paddingLeft = parseInt(style.paddingLeft);
    this._paddingRight = parseInt(style.paddingRight);

    this._upadatePostion();
  }

  // addSlides(data) {

  // }

  // 0 1 2 3 
  // 0 1 2 3 4 5 6 7 8 9 10
  // 0 1 2 3 0 1 2 3 0 1 2 ...
  // В модульной арифметике: a mod b = c [0, b)
  // В джс: -a mod b = c (-b, -0]

 

  firstSlide() {
    this.goToSlide(0);
  }


  lastSlide() {
    this.goToSlide(this._slides.length - 1);
  }


  goToSlide(index) {
    this.moveSlide(index - this._currentIndex)
  }

  currentSlide() {
    return this._slides[this._currentIndex];
  }
  

  // play(direction = 1, dt = 1000) {
  //   this._playDirection = direction;

  //   if (this._playTimer === null) {
  //     this._playTimer = setInterval(() => {
  //       console.log(this._playDirection)

  //       this.moveSlide(this._playDirection);
  //     }, dt);

  //     this.moveSlide(this._playDirection);
  //   }
  // }



  play(direction = 1, dt = 1000) {
    this._playDirection = direction;
    this._playSpeed = dt;
    // this._playState = true;

    if (this._playTimer === null) {
      const doStep = () => {
        console.log(this._playDirection, this._playSpeed);
        this.moveSlide(this._playDirection);

        this._playTimer = setTimeout(doStep, this._playSpeed);
      }

      // this._playTimer = setTimeout(() => {
      //   console.log(direction)
      //   this.moveSlide(direction);

      //   this._playTimer = 
      // }, dt);

      doStep();
      // this.moveSlide(this._playDirection);
    }
  }

  stop() {
    if (this._playTimer !== null) {
      clearInterval(this._playTimer);
    }
    // this._playState = false;
    this._playDirection = 0;
    this._playTimer = null;
  }

}
