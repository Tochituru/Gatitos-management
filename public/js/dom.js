const api = 'http://localhost:3000/api/kittens';
const addForm = document.forms['addForm'];
const addInputs = Array.from(addForm.elements);
const addModal = document.getElementById('addModal');
const addModalBtn = document.querySelector('.addModalBtn')
const body = document.querySelector('body');
const bgArray = ['bgDefault', 'bgOne', 'bgTwo', 'bgThree', 'bgFour', 'bgFive'];
const deleteImg = `<div class="imgContainer"><img src="../statics/assets/icons-black/deleteIconB.png" alt="" class="icon beforeHover"><img src="../statics/assets/icons-white/deleteIconW.png" alt="" class="icon afterHover">
</div><span class="tooltiptext">ELIMINAR GATITO</span>`;
const delModal = document.getElementById('delModal')
let direction = 'asc';
const editForm = document.forms['editCatForm'];
const editInputs = Array.from(editForm.elements);
const editImg = `<div class="imgContainer"><img src="../statics/assets/icons-black/editIconB.png" alt="" class="icon beforeHover"><img src="../statics/assets/icons-white/editIconW.png" alt="" class="icon afterHover">
</div><span class="tooltiptext">EDITAR GATITO</span>`;
const editModal = document.getElementById('editModal');
const editModalBtn = document.querySelector('.editCat')
let formObject = {};
let index = 0;
const inputs = document.querySelectorAll('input');
const kittenTable = document.getElementById('kittenTable');
const msg = document.getElementById('msg');
const textMsg = document.querySelector('.textMsg');


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
    return newBtn
}
//crear las filas
const createTable = element => {
    element.forEach(({ id, name, date, color, toy, email }) => {
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
        return kittenTable.appendChild(newRow);
    })
}
//hacer el fetch de get 
const initialize = () => {
    fetch(api)
        .then(res => res.json())
        .then(({ kittens }) => {
            kittenTable.innerHTML = '';
            const dataSorted = kittens.sort(compareValues('name', 'asc'));
            createTable(dataSorted);
        })
};

//grouping api results
const allGood = (form, newClass, content) => {
    confirmation(newClass, content);
    cleanForm(form);
    initialize();
//replacing:    
// cleanForm(addInputs);
// initialize();
// confirmation('msg didWork', 'GATITO AGREGADO');

}

//validations

const validations = {
    filter: /.*/,
    id: /.*/,
    name: /^[(a-z)\ +(a-z)]{2,30}$/i,
    date: /^[0-9]{8}$/i,
    color: /^[(a-z)\ +(a-z)]{3,30}$/i,
    toy: /^[(a-z)\ +(a-z)]{3,30}$/i,
    email: /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/i,
}

const validate = (field, regex) => {
    if (field.name === 'filter') {
        return true
    } else if (regex.test(field.value)) {
        addModalBtn.disabled = false;
        editModalBtn.disabled = false;
        field.previousElementSibling.className = 'valid'
        field.className = 'valid';
        field.nextElementSibling.className = 'valid'
        return true
    } else {
        addModalBtn.disabled = true;
        editModalBtn.disabled = true;
        field.previousElementSibling.className = 'invalid'
        field.className = 'invalid';
        field.nextElementSibling.className = 'invalid'
        return false
    };
}

inputs.forEach(input => {
    input.addEventListener('keyup', e => validate(e.target, validations[e.target.attributes.name.value]));
    input.addEventListener('focus', e => validate(e.target, validations[e.target.attributes.name.value]));
    input.addEventListener('focusout', e => validate(e.target, validations[e.target.attributes.name.value]))
});

const validRule = (field) => {
    if (validations[field[0]].test(field[1])) return true;
    else return false;
}

const validateAllFields = (fields) => {
    let validateResult = Object.entries(fields).map(field => validRule(field));
    const isTrue = (element) => element === true;
    return validateResult.every(isTrue);
}

//hacer el post
const cleanForm = (formToClean) => formToClean.forEach(inputElement => {
    inputElement.value = '';
    if (formToClean === addInputs && inputElement.previousElementSibling) {
        inputElement.previousElementSibling.className = 'invalid';
        inputElement.className = 'invalid';
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
}

const createKitten = () => {
    event.stopPropagation();
    event.preventDefault();
    fillObject(addForm);
    if (validateAllFields(formObject)) {
        let catAdd = { ...formObject };
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catAdd)
        })
            .then(res => res.json())
            .then(() => allGood(addInputs, 'msg didWork', 'GATITO AGREGADO'))
            .catch(error => console.log(`Tienes el siguiente error: ${error}`));
    } else {
        confirmation('msg didNotWork', 'AY... ALGÚN DATO ESTÁ MAL...');
    }
}

//hacer el fetch de edit 
const getKittenId = () => {
    event.stopPropagation();
    event.preventDefault();
    let id = event.target.id;
    fetch(`${api}/id/${id}`)
        .then(res => res.json())
        .then(({ id, name, date, color, toy, email }) => {
            editModalBtn.setAttribute('id', `${id}`);
            editInputs[0].value = id.toUpperCase();
            editInputs[1].value = name.toUpperCase();
            editInputs[2].value = date.toUpperCase();
            editInputs[3].value = color.toUpperCase();
            editInputs[4].value = toy.toUpperCase();
            editInputs[5].value = email.toUpperCase();
        })
}

//hacer el patch 
const editKitten = () => {
    event.stopPropagation();
    event.preventDefault();
    let id = event.target.id;
    fillObject(editForm);
    if (validateAllFields(formObject)) {
        let catEdit = { ...formObject };
        fetch(`${api}/id/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catEdit)
        })
            .then(res => res.json())
            .then(() => allGood(editInputs, 'msg didWork', 'GATITO EDITADO'))
            .catch(error => console.log(`Hay un error: ${error}`));
    } else {
        confirmation('msg didNotWork', 'AY... ALGÚN DATO ESTÁ MAL...');
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
        .then(() => allGood(editInputs, 'msg didWork', 'GATITO BORRADO'))
        .catch(error => console.log(`Hay un error: ${error}`));
}
// hacer el filter
const filterKittens = () => {
    const searchField = event.target.value;
    fetch(`${api}/search/?name=${searchField}`)
        .then(res => res.json())
        .then(kittens => {
            kittenTable.innerHTML = '';
            createTable(kittens)
        });
}

//Modals

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
const bgChange = () => {
    body.className = bgArray[++index % bgArray.length];
}

//confirmation messages
const confirmation = (newClass, content) => {
    msg.className = newClass;
    textMsg.innerHTML = content;
    setTimeout(() => msg.className = 'msg hidden', 2500)
};
