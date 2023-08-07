export function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  const year = currentDate.getFullYear();

  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}

const currentDate = getCurrentDate();
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
  `Current date is ${currentDate}.`,
  'Console-UI Porfolio loaded.',
  '\n',
  'Type help to get a list of available commands.'
];

export function getNewLine(line, useEffect) {
  const newLine = document.createElement('div');
  const textNode = document.createTextNode(line);
  
  newLine.appendChild(textNode);
  if (useEffect) {
    newLine.classList.add('text-typing');
  }
  
  return newLine;
}

function printText(text, target, index, callback) {
  console.log("Text:", text.length);
  const _index = index || 0;
  console.log("Index:", _index);
  const line = text[_index];
  console.log("Line:", line);
  const newLine = getNewLine(line, true);
  
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

export function recurringInput(target) {
  const input = getInput();
  const keyPressFn = (event) => {
    if (event.key === 'Enter') {
      debugger;
      const text = getNewLine(input.innerText.trim());
      input.remove();
      target.appendChild(text);
      recurringInput(target);
    }
  }

  input.addEventListener("keypress", keyPressFn);

  target.appendChild(input);
  input.focus();
}

export function getInput() {
  const input = document.createElement("span");
  input.id = "user-input";
  input.role = "textbox";
  input.contentEditable = true;
  input.classList.add("user-input", 'cursor-blink');
  input.innerText = "";
  // input.autofocus = true;

  // const div = document.createElement('div');
  // div.appendChild(input);

  return input;
}


