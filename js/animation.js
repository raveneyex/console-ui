import { dataLoader } from "./data.js";
import { getNewLine } from "./utils.js";

function step(dataSource, target, onComplete) {
  const { value, done } = dataSource.next();
  if (value) {
    value.then((textLine) => {
      const newLine = getNewLine(textLine, ['text-typing'])
      target.appendChild(newLine);

      if (!done) {
        step(dataSource, target, onComplete);
      }
    })
  }

  if (done && onComplete && typeof onComplete === 'function') {
    onComplete();
  }
}

export async function animateText(textPath, target, onComplete) {
  const dataSource = await dataLoader(textPath);
  step(dataSource, target, onComplete)
}