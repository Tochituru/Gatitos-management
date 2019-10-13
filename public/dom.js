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
const createBtn = (idValue, text)=> {
    const newBtn = document.createElement('span');
    newBtn.innerHTML = `<button id="${idValue}" onclick="getKittenId()">${text}</button>`
//    console.log('btn created')
    return newBtn
}
//crear las filas
const createTable = element => {
element.forEach(element=>{
    let newRow= document.createElement('tr');
    newRow.appendChild(createCell('name', element.name));    newRow.appendChild(createCell('adoptionDate', element.adoptionDate));
    newRow.appendChild(createCell('color', element.color));
    newRow.appendChild(createCell('favoriteToy', element.favoriteToy));
    newRow.appendChild(createCell('email', element.email));
    newRow.appendChild(createBtn(element.id, 'edit'));
    newRow.appendChild(createBtn(element.id, 'delete'))
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
            createTable(kittens.kittens)})

        };


//hacer modal para el post 
//hacer el post
const createKitten = () => {
    event.preventDefault();
    let newCatName= document.getElementById('newCatName');
    let newCatAdoptionDate = document.getElementById('newCatAdoptionDate');
    let newCatColor= document.getElementById('newCatColor');
    let newCatFavoriteToy= document.getElementById('newCatFavoriteToy');
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
const getKittenId= ()=> {
    let id = event.target.id;
    console.log(id)
    fetch(`${api}/${id}`) 
    .then(res => res.json())
    .then(eachKitten => {
        let editId = document.querySelector('.editCat');
        
        let editCatName= document.getElementById('editCatName');
        let editCatAdoptionDate = document.getElementById('editCatAdoptionDate');
        let editCatColor= document.getElementById('editCatColor');
        let editCatFavoriteToy= document.getElementById('editCatFavoriteToy');
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
    let editCatName= document.getElementById('editCatName');
    let editCatAdoptionDate = document.getElementById('editCatAdoptionDate');
    let editCatColor= document.getElementById('editCatColor');
    let editCatFavoriteToy= document.getElementById('editCatFavoriteToy');
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
    fetch(`${api}/${id}`, {
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
//hacer delete 
//hacer el campo de busqueda
// hacer el filter
// hacer las validaciones 
