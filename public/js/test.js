const editKittenSecondTry = () => {
    event.preventDefault();
    fillObject(editForm);
    //Regex for date and email not working in the context of validatios
    if (conditional(formObject.name, validations.name) && conditional(formObject.color, validations.color) && conditional(formObject.favoriteToy, validations.favoriteToy)) {
        if (dateRegex.test(formObject.adoptionDate)) {
            if (emailRegex.test(formObject.email)) {
                let catEdit = { ...formObject };
                console.log('cat', catEdit);
                
                fetch(`${api}/id/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editCat)
                })
                    .then(res => res.json())
                    .then(() => {            
                        cleanForm(editFormElements);
                        initialize();
                        console.log('kitten edited')
                    })
                    .catch(error => console.log(`You have an error ${error}`));
            
            }
        }
    } else {
        console.log('cat Not added');
    
    }
    }