import { animateText } from "./animation.js";

export function handleInput(value) {
  switch(value) {
    case 'help':
      printHelp()
      break;

    case 'studies':
    default:
      return printStudies();
  }
  console.log("Value:", value);
}

function printHelp() {
  console.log("Currently WIP");
}  

async function printStudies() {
  const container = document.getElementById('container');
  const promise = new Promise(async (resolve, _) => {
    animateText('../data/education.txt', container, () => {
      resolve();
    })
  });

  return promise;
}