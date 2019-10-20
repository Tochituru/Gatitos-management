const uniqid = require('uniqid');
const validateAllFields = require('../modules/validations')

let kittens = [
    { id: uniqid(), name: 'Benja', adoptionDate: '12102004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: uniqid(), name: 'Honsho', adoptionDate: '12102004', color: 'verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: uniqid(), name: 'Bert', adoptionDate: '12102004', color: 'amarillo', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: uniqid(), name: 'Isabella', adoptionDate: '12102004', color: 'rojo', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: uniqid(), name: 'Groucho', adoptionDate: '12102004', color: 'naranja y azul', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' }
]

const getKittens = (req, res, next) => {
    res.status(200).json({ kittens });
    console.log('se hizo el get kittens')
    next();
};

const getKittenId = (req, res, next) => {
    let resKitten = kittens.find(e => e.id === req.params.id);
    if (resKitten) {
        res.status(200).json(resKitten)
    } else {
        res.status(404).send('that is not your cat')
    }
    console.log('llamamos un gatito por id')
    next();
}



const postKitten = (req, res, next) => {

    let data = req.body;
    const name = data.name;
    const adoptionDate = data.adoptionDate;
    const color = data.color;
    const favoriteToy = data.favoriteToy;
    const email = data.email;
    if (validateAllFields(name, adoptionDate, color, favoriteToy, email)) {
        let newKitten = {
            id: uniqid(),
            name: name,
            adoptionDate: adoptionDate,
            color: color,
            favoriteToy: favoriteToy,
            email: email,
        }
        kittens.push(newKitten);
        console.log(newKitten);
        res.status(200).json({ kittens })
        console.log('adding kitten');
        next();
    } else {
        res.status(404).send('Le pifiaste al gatito')
    }
};


const patchKitten = (req, res, next) => {
    let data = req.body;
    let index = '';
    let resKitten = kittens.find((e, i) => {
        index = i;
        return e.id === req.params.id
    })

    if (resKitten) {
        const id = data.id;
        const name = data.name;
        const adoptionDate = data.adoptionDate;
        const color = data.color;
        const favoriteToy = data.favoriteToy;
        const email = data.email;
        if (validateAllFields(name, adoptionDate, color, favoriteToy, email)) {
            let editedKitten = {
                id: id,
                name: name,
                adoptionDate: adoptionDate,
                color: color,
                favoriteToy: favoriteToy,
                email: email,
            };
            //        let editedKitten = { ...resKitten, ...data };
            kittens.splice(index, 1);
            kittens.push(editedKitten);
            res.status(200).json(editedKitten);
        } else {
            res.status(404).send('Le pifiaste al gatito')
        }
        next();
        console.log('se trata de hacer un patch con : ', resKitten)
    }
}

const deleteKitten = (req, res, next) => {
    const reqId = req.params.id;
    const nonDeletedKittens = kittens.filter(kitten => {
        return kitten.id !== reqId
    })
    kittens = nonDeletedKittens
    res.status(200).json(kittens);
    next();
    console.log('delete  : ', kittens)
}

const getKittenName = (req, res, next) => {
    let queryName = req.query.name;
//    let queryColor = req.query.color;
    console.log(queryName);
    let resKitten = kittens.filter(kitten => kitten.name.toLowerCase().startsWith(queryName))
//    let resColor = kittens.filter(kitten => kitten.color.toLowerCase().includes(queryColor))
//    console.log(queryColor);

//        kitten.color.toLowerCase().includes(queryColor);

    if (resKitten) {
        res.status(200).json(resKitten)
        console.log('llamamos al gatito por el nombre')
/*     } else if (resColor) {
        res.status(200).json(resColor)
        console.log('llamamos al gatito por el color')
    */} else {
        res.status(404).send('gatito no encontrado')
    }
    next()
};
module.exports = { getKittens, getKittenId, postKitten, patchKitten, deleteKitten, getKittenName };