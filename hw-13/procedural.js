// Переменные как переменные 
// Функции - процедуры
// Объекты - данные (POJO), Модули - набор функционала (префикс), 

// username - обязательное, не меньше 5 символов
// passwrods - обязательное, не меньше 8 символов, (содержит символ !) (содержит большую букву и цифру)
// age - число, целое, (0, 150)

let validForm = {
  username: "anton",
  password: "anton!anton",
  age: "20",
};

let invalidForm = {
  username: "anto",
  password: "anto",
  age: "20a",
};

// const maxUsernameLength = 5;

const handleSubmit = (form) => {
  // const username = form.username;
  // .
  const { username, password, age } = form;

  let isValid = true;
  let errors = { };

  if (username.length < 5) {
    errors["username"] = "Логин должен быть не меньше 5 символов";
    isValid = false;
  }
  
  if (password.length < 8) {
    errors["password"] = "Пароль должен быть не меньше 8 символов";
    isValid = false;
  }

  if (password.indexOf("!") < 0) {
    errors["password"] = "Пароль должен содержать '!'";
    isValid = false;
  }

  let ageNumber = parseInt(age);
  // "20" !== "20.1"
  if(String(ageNumber) !== ""){
  if (isNaN(ageNumber) || age !== String(ageNumber)) {
    errors["age"] = "Возраст должен быть числом";
    isValid = false;
  }
  if(!ifInteger(ageNumber)){
    errors["age"] = "Возраст должен быть целым числом";
    isValid = false;
  }
  if (age < 0 || age > 300) {
    errors["age"] = "Возраст должен быть в промежутке от 0 до 300 лет";
    isValid = false;
  }
  }
  if (isValid) {
    // отправить форму 
    const user = {
      username,
      password,
      age,
      dateOfRegistration: new Date(),
    };

    console.log("Создаем пользователя", user);
  } else {
    // отображаем ошибки в форме
    console.log("Форма заполнена с ошибками", errors, form);
  }
}

/// 

handleSubmit(validForm);
console.log("-----");
handleSubmit(invalidForm);