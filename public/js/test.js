//conseguir elementos desde document.forms para evitar las mil variables

const addForm = document.forms['addCatForm'];
const editForm = document.forms['editCatForm'];

console.log(addForm, editCatForm);
let formObject = {};
const fillObject = (formName) => {
    formObject = {
        name: `${formName.elements[0].value}`,
        adoptionDate: `${formName.elements[1].value}`,
        color: `${formName.elements[2].value}`,
        favoriteToy: `${formName.elements[3].value}`,
        email: `${formName.elements[4].value}`,
    }
    console.log(formObject)
}
fillObject(addForm);
fillObject(editCatForm)

if (true) {
    console.log('life');
    
}





//Validar que los elementos tengan los valores correctos dentro de addKitten y editKitten

const testVariable = document.querySelector('.testBtn.testClass')
console.log(testVariable);


const conditional = (field, objectProperty) => {
    if (validate(field, objectProperty)) {
        console.log('field valid')
    } else { console.log('field invalid') };

}

const validateAllFields = (name, date, color, toy, email) => {
    //se validó nombre
    conditional(name, validations.name);
    conditional(date, validations.adoptionDate);
    conditional(color, validations.color);
    conditional(toy, validations.favoriteToy);
    conditional(email, validations.email);
}

