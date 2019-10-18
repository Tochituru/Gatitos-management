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
        actionsCell.appendChild(createBtn('editBtn', element.id, 'Editar', 'getKittenId()'));
        actionsCell.appendChild(createBtn('deleteBtn', element.id, 'Eliminar', 'getKittenForDelete()'))
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

//hacer modal para el post 
const addModal = () => {
    const addModal = document.getElementById('addModalBackground');
    addModal.classList.toggle('hidden');
    console.log('Modal to add has been opened')
}
//hacer el post
const createKitten = () => {
    event.preventDefault();
    let newCatName = document.getElementById('newCatName');
    let newCatAdoptionDate = document.getElementById('newCatAdoptionDate');
    let newCatColor = document.getElementById('newCatColor');
    let newCatFavoriteToy = document.getElementById('newCatFavoriteToy');
    let newCatEmail = document.getElementById('newCatEmail');

    const result = validateAllFields(
        newCatName,
        newCatAdoptionDate,
        newCatColor,
        newCatFavoriteToy,
        newCatEmail)
    if (result == false) {
        return
    }

    let newCat = {
        name: newCatName.value,
        adoptionDate: newCatAdoptionDate.value,
        color: newCatColor.value,
        favoriteToy: newCatFavoriteToy.value,
        email: newCatEmail.value
    }
    console.log('created kitten');
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCat)
    })
        .then(res => res.json())
        .then(() => {
            newCatName.value = '';
            newCatAdoptionDate.value = '';
            newCatColor.value = '';
            newCatFavoriteToy.value = '';
            newCatEmail.value = '';
            initialize();
        })
        .catch(error => console.log(`You have an error ${error}`));
}

//hacer el fetch de edit 
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
            console.log(editId);

            editCatName.value = eachKitten.name;
            editCatAdoptionDate.value = eachKitten.adoptionDate;
            editCatColor.value = eachKitten.color;
            editCatFavoriteToy.value = eachKitten.favoriteToy;
            editCatEmail.value = eachKitten.email;
        }
        )
    console.log('open edit modal ')
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

//hacer modal de delete
const getKittenForDelete = () => {
    id = event.target.id;
    console.log("open modal for delete for ", id);
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

const inputs = document.querySelectorAll('input');
console.log(inputs);


const validations = {
    name: /^[(a-z)\ +(a-z)]{2,30}$/i,
    adoptionDate: /^[(0-9)]{8}$/i,
    color: /^[(a-z)\ +(a-z)]{5,30}$/i,
    favoriteToy: /^[(a-z)\ +(a-z)]{5,30}$/i,
    email: /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/,
}

const validate = (field, regex) => {
    if (regex.test(field.value)) {
        console.log('valid')
        return true
    } else {
        console.log('invalid')
        return false
    };

}

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
//etc
    // if (validate(name, validations.name)) {
    //     console.log('el nombre es correcto')
    // } else {
    //     console.log('el nombre es incorrecto');
    //     return false
    // }
    //se valido fecha 
    // if (validate(date, validations.adoptionDate)) {
    //     console.log('la fecha es correcta')
    // } else {
    //     console.log('la fecha es incorrecto');
    //     return false
    // }
    // se valido el color 
    // if (validate(color, validations.color)) {
    //     console.log('el color es correcto')
    // } else {
    //     console.log('el color es incorrecto');
    //     return false
    // }
    //se valido su juguete
    // if (validate(toy, validations.favoriteToy)) {
    //     console.log('el juguete es correcto')
    // } else {
    //     console.log('el juguete es incorrecto');
    //     return false
    // }
    // //se valida el mail. si, tiene mail 
    // if (validate(email, validations.email)) {
    //     console.log('el mail es correcto')
    // } else {
    //     console.log('el mail es incorrecto');
    //     return false
    // }
    return true
}

inputs.forEach(input => input.addEventListener('keyup', e => validate(e.target, validations[e.target.attributes.name.value])));

