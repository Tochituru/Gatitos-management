let kittens = [
    { id: '1', name: 'Benja', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: '2', name: 'Honsho', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: '3', name: 'Bert', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: '4', name: 'Isabella', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' },
    { id: '5', name: 'Groucho', adoptionDate: '12-10-2004', color: 'gris y verde', favoriteToy: 'Fede', email: 'benja@muerdomucho.com' }
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
    res.json({ kittens })
    //res.send(`recibido con la id ${data.id} and ${newKitten.id} y ${kittens}`);
    console.log('adding kitten');

    next();
};


const patchKitten = (req, res, next) => {
    let data = req.body;
    let index = '';
    let resKitten = kittens.find((e, i) => {
        index = i;
        return e.id === req.params.id
    })

    if (resKitten) {
        let editedKitten = { ...resKitten, ...data };
        kittens.splice(index, 1);
        kittens.push(editedKitten);
        res.status(200).json(editedKitten);
    } else {
        res.status(404).send('Le pifiaste al gatito')
    }
    next();
    console.log('se trata de hacer un patch con : ', resKitten)
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
    console.log(queryName);
    let resKitten = kittens.filter(kitten => kitten.name.toLowerCase().startsWith(queryName))
    if (resKitten) {
        res.status(200).json(resKitten)
        console.log('llamamos al gatito por el nombre')
    } else {
        res.status(404).send('gatito no encontrado')
    }
    next()
};
module.exports = { getKittens, getKittenId, postKitten, patchKitten, deleteKitten, getKittenName };