const removeProperties = (target = {}, properties = []) => {
  for (const property of properties) {
    delete target[property];
  }

  return target;
};

export { removeProperties };
