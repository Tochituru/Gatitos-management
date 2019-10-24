const validations = {
    id: /.*/, //que sirva para todo
    name: /^[(a-z)\ +(a-z)]{2,30}$/i,
    adoptionDate: /^[0-9]{8}$/i,
    color: /^[(a-z)\ +(a-z)]{3,30}$/i,
    favoriteToy: /^[(a-z)\ +(a-z)]{3,30}$/i,
    email: /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/i,
}

const validate = (field) => {
    if (validations[field[0]].test(field[1])) return true;
    else return false;
}

const validateAllFields = (fields) => {
    let validateResult = Object.entries(fields).map(field => validate(field));
    const isTrue = (element) => element === true;
    return validateResult.every(isTrue);
}

module.exports = validateAllFields;