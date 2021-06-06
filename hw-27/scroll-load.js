
let user = []

window.addEventListener("load", () => {
  const list = $("div", { className: "list" });

  const buttonTop = $("div", {
    className: "button",
    onclick: () => list.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })

  }, "↑");

  const buttonBottom = $("div", {
    className: "button",
    
    onclick: () => list.scrollTo({
      top: list.scrollHeight - list.clientHeight,
      left: 0,
      behavior: "smooth"
    })
  }, "↓")
  
  document.body.append(list, buttonTop, buttonBottom);


  const handleScroll = throttle(() => {
    console.log(list.scrollTop, list.scrollHeight, list.clientHeight);

    buttonBottom.style.display = "block";
    buttonTop.style.display = "block";

    if (list.scrollTop === 0) {
      console.log("ПОТОЛОК!");
      buttonTop.style.display = "none";

    } else if (list.scrollTop + list.clientHeight >= list.scrollHeight - 200) {
      console.log("ДНО!");
      addItems(list);

      buttonBottom.style.display = "none";
    }
  }) (100);

  list.addEventListener("scroll", handleScroll);

  addItems(list);
});


let ITEM_ID = 0;
let isLoading = null;

const addItems = list => {
  if (isLoading !== null) {
    return;
  }

  const spinner = $("div", { className: "list__spinner" }, "Загружаем данные");
  list.append(spinner);

  isLoading = setTimeout(() => {
    spinner.remove();

    if (ITEM_ID >= 30) {
      list.append($("div", { className: "list__message" }, "Новых пунктов нет"));
      isLoading = null;
    } else {
      const items = createArray(() => 
        $("div", { className: "list__item" }, ++ITEM_ID)
      ) (10);

      list.append(...items);

      isLoading = null;
    }

  }, 2000);

}