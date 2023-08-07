import { data, initAnimation, recurringInput } from "./utils.js";

(function() {
  console.log("Loaded");

  const container = document.getElementById('container');
  
  const animationCompleteFn = () => {
    recurringInput(container);
  };

  initAnimation(data, container, animationCompleteFn.bind(this));
})()