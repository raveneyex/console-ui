export function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  const year = currentDate.getFullYear();

  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}

export const data = [
  'Starting ChaosOS...',
  '\n',
  '\n',
  '\n',
  'Welcome to Chaos OS.',
  '\n',
  '\n',
  'ChaosOS version 1.0.0.',
  'Copyright 2023 @RavenEyex.',
  '\n',
  `Current date is ${getCurrentDate()}.`,
  'Console-UI Porfolio loaded.',
  '\n',
  'Type help to get a list of available commands.'
];

export function getNewLine(line, classes) {
  const newLine = document.createElement('div');
  const textNode = document.createTextNode(line);
  
  newLine.appendChild(textNode);
  if (classes) {
    newLine.classList.add(classes);
  }
  
  return newLine;
}

function printText(text, target, index, callback) {
  // console.log("Text:", text.length);
  const _index = index || 0;
  // console.log("Index:", _index);
  const line = text[_index];
  // console.log("Line:", line);
  const newLine = getNewLine(line, ['text-typing']);
  
  target.appendChild(newLine)

  setTimeout(() => {
    if (index + 1 < text.length) {
      printText(text, target, index+1, callback);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }, 1000);
}

export function initAnimation(text, target, callback) {
  printText(text, target, 0, callback);
}

export function getInput() {
  const template = document.getElementById("user-input-tpl");
  const input = template.content.firstElementChild.cloneNode(true);
  return input;
}

export function recurringInput(target, callback) {
  const input = getInput();
  target.appendChild(input);
  const keyPressFn = (event) => {
    if (event.key === 'Enter') {
      const value = input.innerText.trim();
      const text = getNewLine(value, ['user-text']);
      input.remove();
      target.appendChild(text);
      if (callback && typeof callback === 'function') {
        callback(value);
      }
      recurringInput(target, callback);
    }
  }

  input.addEventListener("keyup", keyPressFn)
  input.focus();
}




