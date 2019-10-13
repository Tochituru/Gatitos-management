const kittens = [
    {id:'1',name:'Benjamonja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'2',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'3',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'4',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'},
    {id:'5',name:'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com'}
]

const getKittens = (req, res, next) => {
    res.status(200).json({ kittens });
    next();
    console.log('se hizo el get kittens')
};
    
const postKitten = (req, res, next) => {
    console.log(kittens);
    
}
const patchKitten = (req, res, next) => {
    const kittenId= req.params.id;
    const kitten = kittens.filter(kitten => {
        return kitten.id === kittenId
    })[0]
    res.status(200).json(kitten);
    next();
    console.log('se trata de hacer un patch con : ' , kitten)
}
const deleteKitten = (req, res, next) => {
    console.log(kittens)
}
module.exports = {getKittens, postKitten, patchKitten, deleteKitten};