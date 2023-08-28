import getPreference from "./getPreference";
import message from "./message";

// loadash get
const get = (
  obj: Record<string, any>,
  path: string[] | string,
  defaultValue: any = undefined
) => {
  let newObj = obj;
  let newPath = [];

  if (Array.isArray(path)) {
    newPath = path;
  } else {
    newPath = path
      .replace(/\[(\w+)\]/g, ".$1")
      .replace(/^\./, "")
      .split(".");
  }

  for (const key of newPath) {
    if (!newObj) return defaultValue;

    newObj = newObj[key];
  }
  return newObj === undefined ? defaultValue : newObj;

  // return newPath.reduce((prev, curr) => {
  //   return prev ? prev[curr] : defaultValue;
  // }, obj);
};

// uuid
const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// deep clone
const deepClone = (target: any) => {
  if (target === null || typeof target !== "object") return target;

  const result: any = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = deepClone(target[key]);
    }
  }
  return result;
};

const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number = 500) => {
  let timer: NodeJS.Timeout | null = null;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const throttle = <F extends (...args: any[]) => any>(fn: F, delay: number = 500) => {
  let prev = 0;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();

    if (now - prev > delay) {
      fn.apply(this, args);
      prev = now;
    }
  };
};

// number to locale string
const numberToLocaleString = (number: number) => {
  return new Intl.NumberFormat().format(number);
  // return number.toLocaleString();
};

const utils = {
  get,
  uuid,
  deepClone,
  debounce,
  throttle,
  numberToLocaleString,
  getPreference,
  message
};

export default utils;
