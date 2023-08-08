import { animateText } from "./animation.js";

export function handleInput(value) {
  switch(value) {
    case 'help':
      printHelp()
      break;

    case 'studies':
      return printStudies();

    default:
      return empty();
  }
  console.log("Value:", value);
}

function printHelp() {
  console.log("Currently WIP");
}  

async function printStudies() {
  const container = document.getElementById('container');
  return animateText('../data/education.txt', container, ['console-output']);
}

async function empty() {
  const promise = new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
  return promise;
}