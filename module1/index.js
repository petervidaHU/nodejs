const getRandomNumber = () => Math.floor(Math.random()*1000+1);

const REPETITO = 5;

for (let i = 0; i < REPETITO; i++) {
    const randomNumber = getRandomNumber();
    console.log('random number: ', randomNumber)
    
}
console.log('fin')

export default getRandomNumber;