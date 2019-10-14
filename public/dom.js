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
const createBtn = (idValue, text, todo) => {
    const newBtn = document.createElement('span');
    newBtn.innerHTML = `<button id="${idValue}" onclick="${todo}">${text}</button>`
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
        newRow.appendChild(createBtn(element.id, 'Editar', 'getKittenId()'));
        newRow.appendChild(createBtn(element.id, 'Eliminar', 'getKittenForDelete()'))
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
const openAddModal = () => {
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
//hacer el campo de busqueda
// hacer el filter
const filterKittens = () => {
    const reqName = event.target.value;
    console.log(searchField);
    fetch(`${api}/search/${reqName}`)
        .then(res => res.json())
        .then(kittens => {
            kittenTable.innerHTML = '';
            let allKittens = kittens.kittens
            let filteredKittens = allKittens.filter(kitten => {
            return kitten.name.includes(searchField);
            })
            createTable(filteredKittens);
            console.log(filteredKittens)
        })
}
// hacer las validaciones
