const api = 'http://localhost:3000/api/kittens';
const addForm = document.forms['addForm'];
const addInputs = Array.from(addForm.elements);
const addModal = document.getElementById('addModal');
const addModalBtn = document.querySelector('.addModalBtn')
const deleteImg = `<img src="../statics/assets/icons-black/deleteIconB.png" alt="" class="icon beforeHover">
<img src="../statics/assets/icons-white/deleteIconW.png" alt="" class="icon afterHover">`;
const delModal = document.getElementById('delModal')
const editImg = `<img src="../statics/assets/icons-black/editIconB.png" alt="" class="icon beforeHover">
<img src="../statics/assets/icons-white/editIconW.png" alt="" class="icon afterHover">`;
const editModal = document.getElementById('editModal');
const editModalBtn = document.querySelector('.editCat')

let formObject = {};
const inputs = document.querySelectorAll('input');
const kittenTable = document.getElementById('kittenTable')

//crear celdas
const createCell = (fieldClass, fieldValue) => {
    let newCell = document.createElement('td');
    if (fieldClass === 'date') {
        let newString = `${fieldValue.slice(0, 2)}/${fieldValue.slice(2, 4)}/${fieldValue.slice(4, 8)}`
        newCell.innerHTML = newString;
        newCell.classList.add(fieldClass);
        ;
    } else {
        newCell.innerHTML = fieldValue.toUpperCase();
        newCell.classList.add(fieldClass);
    }
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
    element.forEach(({id, name, date, color, toy, email}) => {
        let newRow = document.createElement('tr');
        newRow.appendChild(createCell('name', name)); newRow.appendChild(createCell('date', date));
        newRow.appendChild(createCell('color', color));
        newRow.appendChild(createCell('toy', toy));
        newRow.appendChild(createCell('email', email));
        let actionsCell = createCell('actions', '');
        newRow.appendChild(actionsCell);
        let innerAction = document.createElement('div');
        innerAction.classList.add('innerAction')
        actionsCell.appendChild(innerAction);
        innerAction.appendChild(createBtn('editBtn', id, editImg, "toggleModal('editModal', 'editBtn'),  getKittenId()"));
        innerAction.appendChild(createBtn('delBtn', id, deleteImg, "toggleModal('delModal'); getKittenForDelete()"))
        //    console.log(newRow);
        return kittenTable.appendChild(newRow);
    })
}
//hacer el fetch de get 
const initialize = () => {
    fetch(api)
        .then(res => res.json())
        .then(({kittens}) => {
            kittenTable.innerHTML = '';
            const dataSorted = kittens.sort(compareValues('name', 'asc'));
            createTable(dataSorted);
        })
};

//Todas las validaciones (?)
const conditional = (field) => {
    if (validations[field[0]].test(field[1])) return true;
    else return false;
}
const validateAllFields = (fields) => {
    let validateResult = Object.entries(fields).map(field => conditional(field));
    const isTrue = (element) => element === true;
    return validateResult.every(isTrue);
    //object keys envía una lista de las keys del objeto
    //Object entries una lista de listas que contiene la propiedad y el valor
}
//hacer el post
//conseguir elementos desde document.forms para evitar las mil variables
const cleanForm = (formToClean) => formToClean.forEach(inputElement => {
    inputElement.value = '';
    if (inputElement.previousElementSibling) {
        inputElement.previousElementSibling.className = 'invalid';
        inputElement.nextElementSibling.className = 'invalid'
    }
});
const fillObject = (formName) => {
    formObject = {
        id: `${formName.elements[0].value}`,
        name: `${formName.elements[1].value}`,
        date: `${formName.elements[2].value}`,
        color: `${formName.elements[3].value}`,
        toy: `${formName.elements[4].value}`,
        email: `${formName.elements[5].value}`,
    }
    //console.table('formObject', formObject);
}
const createKitten = () => {
    event.stopPropagation();
    event.preventDefault();
    fillObject(addForm);
    //console.table(formObject);
    if (validateAllFields(formObject)) {
        let catAdd = { ...formObject };
        //  console.log('cat', catAdd);
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catAdd)
        })
            .then(res => res.json())
            .then(() => {
                cleanForm(addInputs);
                initialize();
                console.log('kitten created')
            })
            .catch(error => console.log(`You have an error ${error}`));
    } else {
        console.log('cat Not added');
    }
}
//hacer el fetch de edit 
const editForm = document.forms['editCatForm'];
const editInputs = Array.from(editForm.elements);
const getKittenId = () => {
    event.stopPropagation();
    event.preventDefault();
    let id = event.target.id;
    console.log(id)
    fetch(`${api}/id/${id}`)
        .then(res => res.json())
        .then(eachKitten => {
            let idForm = document.getElementById('editKittenId')
            let editCatName = document.getElementById('editCatName');
            let editCatAdoptionDate = document.getElementById('editCatAdoptionDate');
            let editCatColor = document.getElementById('editCatColor');
            let editCatFavoriteToy = document.getElementById('editCatFavoriteToy');
            let editCatEmail = document.getElementById('editCatEmail');
            editModalBtn.setAttribute('id', `${eachKitten.id}`);
            idForm.value = eachKitten.id;
            editCatName.value = eachKitten.name.toUpperCase();
            editCatAdoptionDate.value = eachKitten.date;
            editCatColor.value = eachKitten.color.toUpperCase();
            editCatFavoriteToy.value = eachKitten.toy.toUpperCase();
            editCatEmail.value = eachKitten.email.toUpperCase();
        })
}
//hacer el patch 
const editKitten = () => {
    event.stopPropagation();
    event.preventDefault();
    let id = event.target.id;
    fillObject(editForm);
    //Regex for date and email not working in the context of validatios
    if (validateAllFields(formObject)) {
        let catEdit = { ...formObject };
        console.log('cat', catEdit);
        fetch(`${api}/id/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catEdit)
        })
            .then(res => res.json())
            .then(() => {
                initialize();
                cleanForm(editInputs);
                console.log('kitten edited to', catEdit);
            })
            .catch(error => console.log(`You have an error ${error}`));
    } else {
        console.log('Cat Not Edited');
    }
}
//hacer el fetch para delete
const getKittenForDelete = () => {
    event.stopPropagation();
    event.preventDefault();
    id = event.target.id;
    let deleteAction = document.querySelector('.delModalBtn');
    deleteAction.setAttribute('id', id)
}
//hacer delete 
const deleteKitten = () => {
    event.stopPropagation();
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
            createTable(kittens)
            /* if (kittens.length < 0) {
                fetch(`${api}/search/?color=${searchField}`)
                    .then(res => res.json())
                    .then(kittens => {
                        kittenTable.innerHTML = '';
                        createTable(kittens);
                    })
            }; */
        });
}
//Modals
//toggle que reciba el elemento por id directamente;
const toggleModal = (modal, modalBtn) => {
    event.stopPropagation();
    event.preventDefault();
    let element = document.getElementById(modal);
    element.classList.toggle('hidden');
    let btnToChange = document.querySelector(modalBtn)
    if (btnToChange === addModalBtn || btnToChange === editModalBtn) btnToChange.disabled = true;
    if (modal === 'addModal') cleanForm(addInputs);
}
//salir de modal por click afuera

const clickOutsideModal = (event) => {
    if (event.target === addModal) addModal.classList.toggle('hidden');
    if (event.target === editModal) editModal.classList.toggle('hidden');
    if (event.target === delModal) delModal.classList.toggle('hidden');
};

window.addEventListener('click', clickOutsideModal)

//sorting tables
const compareValues = (key, order = 'asc') => {
    return (a, b) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
        let comparison = a[key].localeCompare(b[key]);
        return ((order == 'desc') ? (comparison * -1) : comparison)
    }
}
let direction = 'asc';
const sortColumn = () => {
    event.stopPropagation();
    const columnName = event.target.className;
    fetch(api)
        .then(res => res.json())
        .then(kittens => {
            kittenTable.innerHTML = '';
            const dataSorted = kittens.kittens.sort(compareValues(columnName, direction));
            direction = (direction === 'asc') ? direction = 'desc' : direction = 'asc';
            createTable(dataSorted);
        })
}


//change background image
const body = document.querySelector('body');

const bgArray = ['bgDefault', 'bgOne', 'bgTwo', 'bgThree', 'bgFour', 'bgFive'];
let index = 0;

const bgChange = () => {
    body.className = bgArray[++index % bgArray.length];
}
