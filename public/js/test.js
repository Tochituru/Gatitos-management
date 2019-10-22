const btn = document.querySelector('.changeBackground');
console.log(btn);

const body = document.querySelector('body');
console.log(body);

const backChange = () => {
    body.classList.add('background-one');
    console.log(body);
}