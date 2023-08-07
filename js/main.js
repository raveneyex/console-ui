import { data, initAnimation, recurringInput } from "./utils.js";
import { handleInput } from "./options.js";

(function() {
  console.log("Loaded");

  const container = document.getElementById('container');
  
  const animationCompleteFn = () => {
    recurringInput(container, handleInput);
  };

  initAnimation(data, container, animationCompleteFn.bind(this));
})()