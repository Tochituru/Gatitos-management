const api = 'http://localhost:3000/api/kittens';
let kittenTable = document.getElementById('kittenTable')

//crear las filas
//crear celdas
const createCell = (fieldClass, fieldValue) => {
    let newCell = document.createElement('td');
    newCell.innerHTML = fieldValue;
    newCell.classList.add(fieldClass); 
    console.log('cell', newCell)
    return newCell 
}
//crear botones editar borrar

const createTable = element => {
element.forEach(element=>{
    let newRow= document.createElement('tr');
    newRow.appendChild(createCell('name', element.name));    newRow.appendChild(createCell('adoptionDate', element.adoptionDate));
    newRow.appendChild(createCell('color', element.color));
    newRow.appendChild(createCell('favoriteToy', element.favoriteToy));
    newRow.appendChild(createCell('email', element.email));

    console.log(newRow);
    
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
//hacer modal para el patch
//hacer el patch 
//hacer modal de delete
//hacer delete 
//hacer el campo de busqueda
// hacer el filter
// hacer las validaciones 
