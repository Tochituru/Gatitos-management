const api = 'http://localhost:3000/api/kittens';
let kittenTable = document.getElementById('kittenTable')


//crear celdas
const createCell = (fieldClass, fieldValue) => {
    let newCell = document.createElement('td');
    newCell.innerHTML = fieldValue;
    newCell.classList.add(fieldClass);
    //    console.log('cell', newCell)
    return newCell
}
//crear botones editar borrar
const createBtn = (classValue, idValue, text, todo) => {
    const newBtn = document.createElement('span');
    newBtn.innerHTML = `<button class="${classValue}" id="${idValue}" onclick="${todo}">${text}</button>`
    //    console.log('btn created')
    return newBtn
}
//crear las filas
const createTable = element => {
    element.forEach(element => {
        let newRow = document.createElement('tr');
        newRow.appendChild(createCell('name', element.name)); newRow.appendChild(createCell('adoptionDate', element.adoptionDate));
        newRow.appendChild(createCell('color', element.color));
        newRow.appendChild(createCell('favoriteToy', element.favoriteToy));
        newRow.appendChild(createCell('email', element.email));
        let actionsCell = createCell('actions', '');
        newRow.appendChild(actionsCell);
        actionsCell.appendChild(createBtn('editBtn', element.id, 'Editar', 'openModal(); getKittenId()'));
        actionsCell.appendChild(createBtn('deleteBtn', element.id, 'Eliminar', 'openModal(); getKittenForDelete()'))
        //    console.log(newRow);
        return kittenTable.appendChild(newRow);
    })
}
//hacer el fetch de get 

const initialize = () => {
    fetch(api)
        .then(res => res.json())
        .then(kittens => {
            kittenTable.innerHTML = '';
            createTable(kittens.kittens)
        })
};

//hacer el post


//conseguir elementos desde document.forms para evitar las mil variables
const dateRegex = /^[0-9]{8}$/i;
const emailRegex = /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/i;

const addForm = document.forms['addCatForm'];
const formElements = Array.from(addForm.elements);

const cleanForm = (formToClean) => formToClean.forEach(inputElement => inputElement.value = '');

const conditional = (field, objectProperty) => {
    if (validate(field, objectProperty)) {
        console.log(`${field} is valid in conditional`)
        return true;
    } else { return false }
}

let formObject = {};

const fillObject = (formName) => {
    formObject = {
        name: `${formName.elements[0].value}`,
        adoptionDate: `${addForm.elements[1].value}`,
        color: `${formName.elements[2].value}`,
        favoriteToy: `${formName.elements[3].value}`,
        email: `${formName.elements[4].value}`,
    }
    console.log('formObject', formObject)
}


const createKitten = () => {

event.preventDefault();

fillObject(addForm);

//Regex for date and email not working in the context of validatios
if (conditional(formObject.name, validations.name) && conditional(formObject.color, validations.color) && conditional(formObject.favoriteToy, validations.favoriteToy)) {
    if (dateRegex.test(formObject.adoptionDate)) {
        if (emailRegex.test(formObject.email)) {
            let catAdd = { ...formObject };
            console.log('cat', catAdd);
            
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(catAdd)
            })
                .then(res => res.json())
                .then(() => {
                    cleanForm(formElements);
                    initialize();
                    console.log('kitten created')
                })
                .catch(error => console.log(`You have an error ${error}`));
        
        }
    }
} else {
    console.log('cat Not added');

}
}


//hacer el fetch de edit 
let editCatBtn = document.querySelector('.editCat')
const editForm = document.forms['editCatForm'];
const editFormElements = Array.from(editForm.elements);

const getKittenId = () => {
    let id = event.target.id;
    console.log(id)
    fetch(`${api}/id/${id}`)
        .then(res => res.json())
        .then(eachKitten => {
            let editId = document.querySelector('.editCat');
            let editCatName = document.getElementById('editCatName');
            let editCatAdoptionDate = document.getElementById('editCatAdoptionDate');
            let editCatColor = document.getElementById('editCatColor');
            let editCatFavoriteToy = document.getElementById('editCatFavoriteToy');
            let editCatEmail = document.getElementById('editCatEmail');
            editId.setAttribute('id', `${eachKitten.id}`);
            //            console.log(editId);
            editCatName.value = eachKitten.name;
            editCatAdoptionDate.value = eachKitten.adoptionDate;
            editCatColor.value = eachKitten.color;
            editCatFavoriteToy.value = eachKitten.favoriteToy;
            editCatEmail.value = eachKitten.email;

        })
}
//hacer el patch 

const editKitten = () => {
    event.preventDefault();
    let id = event.target.id;
    let editCatName = document.getElementById('editCatName');
    let editCatAdoptionDate = document.getElementById('editCatAdoptionDate');
    let editCatColor = document.getElementById('editCatColor');
    let editCatFavoriteToy = document.getElementById('editCatFavoriteToy');
    let editCatEmail = document.getElementById('editCatEmail');

    const result = validateAllFields(
        editCatName,
        editCatAdoptionDate,
        editCatColor,
        editCatFavoriteToy,
        editCatEmail)
    if (result == false) {
        return
    }
    let editCat = {
        id: id,
        name: editCatName.value,
        adoptionDate: editCatAdoptionDate.value,
        color: editCatColor.value,
        favoriteToy: editCatFavoriteToy.value,
        email: editCatEmail.value
    }
    console.log(editCat);
    console.log('edited kitten');
    fetch(`${api}/id/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editCat)
    })
        .then(res => res.json())
        .then(() => {
            editCatName.value = '';
            editCatAdoptionDate.value = '';
            editCatColor.value = '';
            editCatFavoriteToy.value = '';
            editCatEmail.value = '';
            initialize();
        })
        .catch(error => console.log(`You have an error ${error}`));
}

//hacer el fetch para delete

const getKittenForDelete = () => {
    id = event.target.id;
    let deleteAction = document.querySelector('.deleteCat');
    deleteAction.setAttribute('id', id)
}
//hacer delete 
const deleteKitten = () => {
    event.preventDefault();
    id = event.target.id
    fetch(`${api}/id/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(() => initialize())
    console.log('kitten deleted')
}

// hacer el filter
const filterKittens = () => {
    const searchField = event.target.value;
    console.log(searchField);
    fetch(`${api}/search/?name=${searchField}`)
        .then(res => res.json())
        .then(kittens => {
            kittenTable.innerHTML = '';
            createTable(kittens);
        })
}
// hacer las validaciones

// const validate = (field, regex) => {
//     if (regex.test(field.value)) {
//         console.log('valid')
//         return true
//     } else {
//         console.log('invalid')
//         return false
//     };

// }

// const conditional = (field, objectProperty) => {
//     if (validate(field, objectProperty)) {
//         console.log('field valid')
//     } else { console.log('field invalid') };

// }

// const validateAllFields = (name, date, color, toy, email) => {
//     //se validó nombre
//     conditional(name, validations.name);
//     conditional(date, validations.adoptionDate);
//     conditional(color, validations.color);
//     conditional(toy, validations.favoriteToy);
//     conditional(email, validations.email);
//     //etc
//     // if (validate(name, validations.name)) {
//     //     console.log('el nombre es correcto')
//     // } else {
//     //     console.log('el nombre es incorrecto');
//     //     return false
//     // }
//     //se valido fecha 
//     // if (validate(date, validations.adoptionDate)) {
//     //     console.log('la fecha es correcta')
//     // } else {
//     //     console.log('la fecha es incorrecto');
//     //     return false
//     // }
//     // se valido el color 
//     // if (validate(color, validations.color)) {
//     //     console.log('el color es correcto')
//     // } else {
//     //     console.log('el color es incorrecto');
//     //     return false
//     // }
//     //se valido su juguete
//     // if (validate(toy, validations.favoriteToy)) {
//     //     console.log('el juguete es correcto')
//     // } else {
//     //     console.log('el juguete es incorrecto');
//     //     return false
//     // }
//     // //se valida el mail. si, tiene mail 
//     // if (validate(email, validations.email)) {
//     //     console.log('el mail es correcto')
//     // } else {
//     //     console.log('el mail es incorrecto');
//     //     return false
//     // }
//     return true
// }

// inputs.forEach(input => input.addEventListener('keyup', e => validate(e.target, validations[e.target.attributes.name.value])));


//Modals
const addModal = document.getElementById('addModalBackground');
const editModal = document.getElementById('editModalBackground');
const deleteModal = document.getElementById('deleteModalBackground');
const addCatBtn = document.querySelector('.addCat')


const openModalCondition = (btnName, modal, modalBtn) => {
    if (event.target.className == btnName) {
        modal.classList.remove('hidden');
        //disabled should be true if all fields are empty
        if (modalBtn === addCatBtn || modalBtn === editCatBtn) modalBtn.disabled = true
    }
}

const openModal = () => {
    openModalCondition('button', addModal, addCatBtn);
    openModalCondition('editBtn', editModal, editCatBtn);
    openModalCondition('deleteBtn', deleteModal);
}

const closeModalCondition = (btnName, modal) => {
    if (event.target.className == btnName) modal.classList.add('hidden')
}

const closeModal = () => {
    closeModalCondition('addCat', addModal);
    closeModalCondition('editCat', editModal);
    closeModalCondition('deleteCat', deleteModal);
    closeModalCondition('cancelAdd', addModal);
    closeModalCondition('cancelEdit', editModal);
    closeModalCondition('cancelDelete', deleteModal);
}


//validations
const inputs = document.querySelectorAll('input');

const validations = {
    name: /^[(a-z)\ +(a-z)]{2,30}$/i,
    adoptionDate: /^[0-9]{8}$/i,
    color: /^[(a-z)\ +(a-z)]{3,30}$/i,
    favoriteToy: /^[(a-z)\ +(a-z)]{3,30}$/i,
    email: /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/i,
}

const validate = (field, regex) => {
    if (regex.test(field.value)) {
        console.log(`${field} valid in validate`)
        addCatBtn.disabled = false;
        editCatBtn.disabled = false;
        return true
    } else {
        console.log(`${field} invalid in validate`);
        addCatBtn.disabled = true;
        editCatBtn.disabled = true;
        return false
    };
}
//a medida que el usuario escribe
inputs.forEach(input => {
    input.addEventListener('keyup', e => { validate(e.target, validations[e.target.attributes.name.value]) }
    );
    input.addEventListener('focus', e => { validate(e.target, validations[e.target.attributes.name.value]) }
    )

});
