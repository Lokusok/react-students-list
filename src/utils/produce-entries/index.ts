export function produceObj<T extends object>(obj: T, cols: (keyof T)[]) {
  const resArr: any[] = [];

  cols.forEach((col, index) => {
    resArr[index] = obj[col];
  });

  return resArr;
}

function produceEntries<T extends object>(
  arrayOfObj: Array<T>,
  cols: (keyof T)[],
  updaterFn?: (obj: T) => any
) {
  const resArr: any[][] = [];

  arrayOfObj.forEach((obj) => {
    if (updaterFn) {
      const objUpdated = updaterFn(obj);
      return resArr.push(produceObj(objUpdated, cols));
    }

    resArr.push(produceObj(obj, cols));
  });

  return resArr;
}

export default produceEntries;
