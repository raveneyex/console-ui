import { initRecurringInput } from "./utils.js";
import { handleInput } from "./options.js";
import { animateText } from "./animation.js";

(async function() {
  const container = document.getElementById('container');
  const animationCompleteFn = () => {
    initRecurringInput(container, handleInput);
  };

  setTimeout(() => {
    // container.innerHTML = '';
    animateText('../data/intro.txt', container, animationCompleteFn);
  }, 5000)
  
})()