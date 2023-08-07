import { dataLoader } from "./data.js";
import { getNewLine } from "./utils.js";

function step(dataSource, target, classes, onComplete) {
  const { value, done } = dataSource.next();
  if (value) {
    value.then((textLine) => {
      const newLine = getNewLine(textLine, classes)
      target.appendChild(newLine);

      if (!done) {
        step(dataSource, target, classes, onComplete);
      }
    })
  }

  if (done && onComplete && typeof onComplete === 'function') {
    onComplete();
  }
}

async function animate(textPath, target, classes, onComplete) {
  const dataSource = await dataLoader(textPath);
  step(dataSource, target, classes, onComplete)
}

export function animateText(textPath, target, classes) {
  const promise = new Promise((resolve) => {
    animate(textPath, target, classes, () => {
      resolve();
    });
  });
  return promise;
}