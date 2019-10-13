const kittens = [
    {id:'1',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'2',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'3',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'4',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'5',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'}
]

const getKittens = (req, res, next) => {
    res
    console.log(kittens)
}
const postKitten = (req, res, next) => {
    console.log(kittens);
    
}
const patchKitten = (req, res, next) => {
    console.log(kittens)
}
const deleteKitten = (req, res, next) => {
    console.log(kittens)
}
module.exports = {getKittens, postKitten, patchKitten, deleteKitten};