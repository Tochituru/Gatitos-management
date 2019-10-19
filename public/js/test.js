//conseguir elementos desde document.forms para evitar las mil variables

const addForm = document.forms['addCatForm'];
const editForm = document.forms['editCatForm'];
const formElements = addForm.elements;

//function not working
//const cleanForm = (formName) => Array.from(formName).forEach(element => element.value = '');

let testToNumber = parseInt(addForm.elements[1].value);

let formObject = {};
const fillObject = (formName) => {
    formObject = {
        name: `${formName.elements[0].value}`,
        adoptionDate: testToNumber,
        color: `${formName.elements[2].value}`,
        favoriteToy: `${formName.elements[3].value}`,
        email: `${formName.elements[4].value}`,
    }
    console.log(formObject)
}
fillObject(addForm);

const conditional = (field, objectProperty) => {
    if (validate(field, objectProperty)) {
        console.log(`${field} is valid in conditional`);   
        return true
    } else { return false };
}

console.log(conditional(formObject.email, validations.email));

if (conditional(formObject.name, validations.name) && conditional(formObject.color, validations.color) && conditional(formObject.favoriteToy, validations.favoriteToy) && conditional(formObject.adoptionDate, validations.adoptionDate))  {
    let catAdd = { ...formObject };
    console.log('cat', catAdd);
}

//  &&  && conditional(formObject.email, validations.email)
// 
//
//

const validateAllFields = (name, adoptionDate, color, favoriteToy, email) => {
    //se validó nombre
    console.log(conditional(name, validations.name), conditional(adoptionDate, validations.adoptionDate), conditional(color, validations.color), conditional(favoriteToy, validations.favoriteToy), conditional(email, validations.email));
    console.log('All valid in Validate All fields');
    
};

validateAllFields(formObject.name, formObject.adoptionDate, formObject.color, formObject.favoriteToy, formObject.email)


//Validar que los elementos tengan los valores correctos dentro de addKitten y editKitten

// const validateAllFields = (name, date, color, toy, email) => {
//     //se validó nombre
//     conditional(name, validations.name);
//     conditional(date, validations.adoptionDate);
//     conditional(color, validations.color);
//     conditional(toy, validations.favoriteToy);
//     conditional(email, validations.email);
// }

