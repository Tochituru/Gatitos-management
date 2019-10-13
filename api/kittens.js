let kittens = [
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
    
    let data = req.body;
    const name = data.name;
    const adoptionDate = data.adoptionDate;
    const color = data.color;
    const favoriteToy = data.favoriteToy;
    const email = data.email;

    let newKitten = {
            id: kittens.length + 1,
            name: name,
            adoptionDate: adoptionDate,
            color: color,
            favoriteToy: favoriteToy,
            email: email,
            
        }
        kittens.push(newKitten);
        console.log(newKitten);
        res.json({kittens})
        //res.send(`recibido con la id ${data.id} and ${newKitten.id} y ${kittens}`);
        console.log('adding kitten');
    
    next();
};


const patchKitten = (req, res, next) => {
    const reqId= req.params.id;
    const filteredKitten = kittens.filter(kitten => {
        return kitten.id === reqId
    })[0]
    res.status(200).json(filteredKitten);
    next();
    console.log('se trata de hacer un patch con : ' , filteredKitten)
}
const deleteKitten = (req, res, next) => {
    const reqId= req.params.id;
    const nonDeletedKittens = kittens.filter(kitten => {
        return kitten.id !== reqId
    })
    kittens = nonDeletedKittens
    res.status(200).json(kittens);
    next();
    console.log('delete  : ' , kittens)}
module.exports = {getKittens, postKitten, patchKitten, deleteKitten};