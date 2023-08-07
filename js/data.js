function* dataGenerator(data, delay = 1000) {
  let index = 0;

  while (index < data.length) {
    const line = data[index++];
    const promise = new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(line);
      }, delay);
    });

    yield promise;
  }
}

export async function dataLoader(filePath, delay) {
  const response = await fetch(filePath);
  const text = await response.text();
  const lines = text.split('\n').map(token => token.trim());

  const data = dataGenerator(lines, delay);
  return data;
}
