export const passwordValidation = {
  required: "Обязательно для заполнения",
  validate: (value) => {
    if (!value.match(/^[0-9A-ZА-ЯЁ]+$/i)) {
      return "Пароль может состоять только из цифр и заглавных или прописных латинских букв";
    }
    return true;
  },
};
export const emailValidation = {
  required: "Обязательно для заполнения",
  validate: (value) => {
    if (!value.match(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i)) {
      return "email введен неверно";
    }
    return true;
  },
};
