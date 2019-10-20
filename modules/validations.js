const validations = {
    name: /^[(a-z)\ +(a-z)]{2,30}$/i,
    adoptionDate: /^[0-9]{8}$/i,
    color: /^[(a-z)\ +(a-z)]{3,30}$/i,
    favoriteToy: /^[(a-z)\ +(a-z)]{3,30}$/i,
    email: /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/i,
}

const validate = (field, regex) => {
    if (regex.test(field.value)) {
        console.log(`${field.value} is valid`);
        return true
    } else {
        console.log(`${field.value} is invalid`);
        return false
    };
}
const conditional = (field, objectProperty) => {
    if (validate(field, objectProperty)) {
        return true;
    } else { return false }
}

const validateAllFields = (name, date, color, toy, email) => {
    conditional(name, validations.name);
    conditional(date, validations.adoptionDate);
    conditional(color, validations.color);
    conditional(toy, validations.favoriteToy);
    conditional(email, validations.email);
    return true
}

module.exports = validateAllFields;