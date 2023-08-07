export function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  const year = currentDate.getFullYear();

  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}

export function getNewLine(line, classes) {
  const newLine = document.createElement('div');
  const textNode = document.createTextNode(line);
  
  newLine.appendChild(textNode);
  if (classes) {
    newLine.classList.add(classes);
  }
  
  return newLine;
}

export function getInput() {
  const template = document.getElementById("user-input-tpl");
  const input = template.content.firstElementChild.cloneNode(true);
  return input;
}

export function initRecurringInput(target, callback) {
  const input = getInput();

  const keyPressFn = async (event) => {
    if (event.key === 'Enter') {
      const value = input.innerText.trim();
      const text = getNewLine(value, ['user-text']);
      
      input.removeEventListener("keyup", keyPressFn);
      input.remove();
      
      target.appendChild(text);
      if (callback && typeof callback === 'function') {
        callback(value).then((resp) => {
          console.log("Resp:", resp)
          initRecurringInput(target, callback);
        });
        
      } else {
        initRecurringInput(target, callback);
      }
    }
  }

  target.appendChild(input);

  input.addEventListener("keyup", keyPressFn)
  input.focus();
}




