const linearSearch = (array, toFind) => {
  for(let i = 0; i < array.length; i++){
    if(array[i] === toFind) {
      return i;
    }
  }

  return -1;
};

const fruits = ['apples', 'bananas', 'cherries'];

console.log('Find cherries index in fruits array', linearSearch(fruits, 'cherries'));

const isCherries = fruit => fruit === 'cherries';
const index = fruits.findIndex(isCherries);
const cherriesElem = fruits.find(isCherries);

console.log(`Fancy-shmancy ESover9000 features for index ${index} and element ${cherriesElem} search`);
