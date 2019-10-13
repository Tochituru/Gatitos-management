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
    const newBtn = document.createElement('button');
    newBtn.setAttribute('id', idValue)
    newBtn.innerText = text
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
        .then(kittens => createTable(kittens.kittens))

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

//hacer el patch 
//hacer modal de delete
//hacer delete 
//hacer el campo de busqueda
// hacer el filter
// hacer las validaciones 
