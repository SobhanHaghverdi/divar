function autoBind(ref) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(ref))
    .filter((name) => typeof ref[name] === "function" && name !== "constructor")
    .forEach((name) => (ref[name] = ref[name].bind(ref)));
}

export default autoBind;
