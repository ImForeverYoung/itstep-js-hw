
const mock = () => {
  /*const h2 = () => { 
    return (createArray(index1 => [
    $("h2", {style:{marginLeft: 50+"px",}}, "Header2 - " + (index1 + 1)),
    $("section", {
      style: {
        height: randomInt(200, 500) + "px",
        
      }
    },)
  ])(3)).flat();
  }
  const gg = h2();
  console.log(gg);*/
  let sections = createArray(index => [
    $("h1", {}, "Header1 - " + (index + 1)),
    $("div", {
      style: {
        height: randomInt(600, 1800) + "px",
        width: window.innerWidth,
      }
    })
  ]) (7);
  sections.map(i => i[1].append(...(createArray(index1 => [
    $("h2", {style:{marginLeft: 50+"px",}}, "Header2 - " + (index1 + 1)),
    $("section", {
      style: {
        height: randomInt(100, 200) + "px",
        
      }
    },)
  ])(3)).flat()));
  console.log(sections);
  console.log(sections.flat());
  document.body.append(...sections.flat());

};

// 1. Прогесс бар 
// 2. Дозагрузка контента
// 3. Паралакс
window.addEventListener("load", () => {

  mock();

  const documentHeight = document.body.offsetHeight - window.innerHeight;
  console.log(documentHeight);
  const header1Positions = Array.from(document.querySelectorAll("h1")).map(element => element.offsetTop);
  const header2Positions = Array.from(document.querySelectorAll("h2")).map(element => element.offsetTop);
  // console.log(header1Positions);

  const checkpoints = [header1Positions.map(position => 
    $("button", { 
        className: "progress-bar__checkpoint",
        style: {
          left: (position * 100 / documentHeight) + "%"
        },
        onclick: () => {
          // window.scrollBy - прокручивает НА Y пикселей от текущей позиции скорла 
          window.scrollTo({
            left: 0,
            top: position,
            behavior: "smooth"
          });
        }
      })
  ),  header2Positions.map(position => 
    $("button", { 
        className: "progress-bar__checkpoint__mini",
        style: {
          left: (position * 100 / documentHeight) + "%"
        },
        onclick: () => {
          // window.scrollBy - прокручивает НА Y пикселей от текущей позиции скорла 
          window.scrollTo({
            left: 0,
            top: position-20,
            behavior: "smooth"
          });
        }
      })
  )
      
  ];

  const progressBar = $("div", {
    className: "progress-bar__bar"
  })

  const progressContainer = $("div", {
    className: "progress-bar", style: { marginLeft: 10+"px",}
  }, progressBar, ...checkpoints.flat());

  document.body.append(progressContainer);

  // const debouncedHandler = debounce((event) => {
  //   document.body.style.backgroundColor = "hsl(" + randomInt(0, 359) + ", 100%, 80%)";

  //   console.log(event, window.scrollX, window.scrollY);
  // }) (500);


  const throttledHandler = throttle(() => {
    
    let lastIndex = header1Positions.findIndex(position => window.scrollY < position);
    if (lastIndex < 0) {
      lastIndex = checkpoints.length;
    }


    checkpoints.forEach((checkpoint, index) => {
      if (index < lastIndex) {
        checkpoint.classList.add("progress-bar__checkpoint_active");
      } else {
        checkpoint.classList.remove("progress-bar__checkpoint_active");
      }
    })


    console.log(window.scrollY, document.body.offsetHeight - window.innerHeight);

    progressBar.style.width = (window.scrollY * 100 / (document.body.offsetHeight - window.innerHeight)) + "%";


    //document.body.style.backgroundColor = "hsl(" + randomInt(0, 359) + ", 100%, 80%)";

    // console.log(event, window.scrollX, window.scrollY);
  }) (100);

  window.addEventListener("scroll", throttledHandler);

  // window.addEventListener("mousewheel", (event) => {
  //   console.log(event);
  // });

});