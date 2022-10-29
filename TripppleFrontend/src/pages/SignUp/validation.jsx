export const nameValidation = {
  required: "Обязательно для заполнения",
  validate: (value) => {
    if (!value.match(/^[A-ZА-ЯЁ]+$/i)) {
      return "Имя может содержать только русские и латинские буквы";
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
export const phoneValidation = {
  required: "Обязательно для заполнения",
  validate: (value) => {
    if (!value.match(/^[\d\+][\d\(\)\ -]{4,14}\d$/)) {
      return "номер телефона введен неверно";
    }
    return true;
  },
};
export const passwordValidation = {
  required: "Обязательно для заполнения",
};
export const lastNameValidation = {
  required: "Обязательно для заполнения",
  validate: (value) => {
    if (!value.match(/^[A-ZА-ЯЁ]+$/i)) {
      return "Фамилия может содержать только русские и латинские буквы";
    }
    return true;
  },
};
