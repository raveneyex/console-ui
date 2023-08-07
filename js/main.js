import { initRecurringInput } from "./utils.js";
import { handleInput } from "./options.js";
import { animateText } from "./animation.js";

(async function() {
  const container = document.getElementById('container');
  const animationCompleteFn = () => {
    initRecurringInput(container, handleInput);
  };

  setTimeout(() => {
    const child = container.querySelector('.console-info');
    container.removeChild(child);

    animateText('../data/intro.txt', container, ['text-typing', 'console-info'])
      .then(animationCompleteFn);
  }, 1500)
  
})()