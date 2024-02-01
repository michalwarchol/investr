const flattenObject = (obj: any, prefix: string = ""): object => {
  return Object.keys(obj).reduce((accumulator, key) => {
    const pre = prefix.length ? `${prefix}[${key}]` : key;
    const value = obj[key];

    if (
      typeof value === "object" &&
      !(value instanceof Date) &&
      !(value instanceof File) &&
      value !== null &&
      !Array.isArray(value)
    ) {
      return {
        ...accumulator,
        ...flattenObject(value, pre),
      };
    }

    return {
      ...accumulator,
      [pre]: value,
    };
  }, {});
};

export const makeQueryParams = (object: object) => {
  const flatObject = flattenObject(object);
  const encodedParams = Object.entries(flatObject).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  );

  return encodedParams.join("&");
};

export default makeQueryParams;
