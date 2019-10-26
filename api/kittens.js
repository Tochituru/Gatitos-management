const uniqid = require('uniqid');
const validateAllFields = require('../modules/validations')

let kittens = [
    { id: uniqid(), name: 'Benja', date: '12102004', color: 'gris y verde', toy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: uniqid(), name: 'Honsho', date: '20062006', color: 'verde', toy: 'caja', email: 'gatito@muerdomucho.com' },
    { id: uniqid(), name: 'Bert', date: '03042019', color: 'amarillo', toy: 'Pelusa', email: 'bert@muerdomucho.com' },
    { id: uniqid(), name: 'Isabella', date: '05072010', color: 'rojo', toy: 'Catnip', email: 'orejas@muerdomucho.com' },
    { id: uniqid(), name: 'Groucho', date: '20121996', color: 'naranja y azul', toy: 'láser', email: 'mirame@muerdomucho.com' }
]

let dataObject = {};
const fillObject = (received) => {
    dataObject = {
        id: `${received.id}`,
        name: `${received.name}`,
        date: `${received.date}`,
        color: `${received.color}`,
        toy: `${received.toy}`,
        email: `${received.email}`,
    }
}


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
    let reqData = req.body;
    fillObject(reqData);

    if (validateAllFields(dataObject)) {
        let newKitten = { ...dataObject };
        newKitten.id = uniqid();
        kittens.push(newKitten);
        console.log(newKitten);
        res.status(200).json({ kittens })
        console.log('kitten added');
        next();
    } else {
        res.status(404).send('Le pifiaste al gatito')
    }
};


const patchKitten = (req, res, next) => {
    let reqData = req.body;
    let index = '';
    let resKitten = kittens.find((e, i) => {
        index = i;
        return e.id === req.params.id
    })

    if (resKitten) {
        fillObject(reqData);
        if (validateAllFields(dataObject)) {
            let editedKitten = { ...dataObject };
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
*/    } else {
        res.status(404).send('gatito no encontrado')
    }
    next()
};
module.exports = { getKittens, getKittenId, postKitten, patchKitten, deleteKitten, getKittenName };