//validations

const validations = {
    filter: /.*/,
    id: /.*/, //que sirva para todo
    name: /^[(a-z)\ +(a-z)]{2,30}$/i,
    date: /^[0-9]{8}$/i,
    color: /^[(a-z)\ +(a-z)]{3,30}$/i,
    toy: /^[(a-z)\ +(a-z)]{3,30}$/i,
    email: /^([\w\d\.-]+)@([\w\d-]+)\.(\w{2,8})(\.\w{2,8})?$/i,
}

const validate = (field, regex) => {
    if (field === 'filter') {
        return true
    } else if (regex.test(field.value)) {
        addModalBtn.disabled = false;
        editModalBtn.disabled = false;
        field.previousElementSibling.className = 'valid'
        field.className = 'valid';
        field.nextElementSibling.className = 'valid'
        return true
    } else {
        addModalBtn.disabled = true;
        editModalBtn.disabled = true;
        field.previousElementSibling.className = 'invalid'
        field.className = 'invalid';
        field.nextElementSibling.className = 'invalid'
        return false
    };
}
//a medida que el usuario escribe
inputs.forEach(input => {
    input.addEventListener('keyup', e => {
        console.log(e.target.name);
        validate(e.target, validations[e.target.attributes.name.value])
    }
    );
    input.addEventListener('focus', e => { validate(e.target, validations[e.target.attributes.name.value]) }
    );
    input.addEventListener('focusout', e => { validate(e.target, validations[e.target.attributes.name.value]) }
    )
});

