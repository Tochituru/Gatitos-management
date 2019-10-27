const textMsg = document.querySelector('.textMsg');

const confirmation = (newClass, content) => {
    const msg = document.getElementById('msg');
    msg.className = newClass;
    textMsg.innerHTML = content;
    console.log('final', msg);
    setTimeout(() => msg.className = 'msg hidden', 3000)
};

const allGood = (form, newClass, content) => {
    confirmation(newClass, content);
    cleanForm(form);
    initialize();
}

// cleanForm(addInputs);
// initialize();
// confirmation('msg didWork', 'GATITO AGREGADO');
