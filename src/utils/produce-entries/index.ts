export function produceObj<T extends object>(obj: T, cols: (keyof T)[]) {
  const resArr: any[] = [];

  cols.forEach((col, index) => {
    resArr[index] = obj[col];
  });

  return resArr;
}

function produceEntries<T extends object>(
  arrayOfObj: Array<T>,
  cols: (keyof T)[]
) {
  const resArr: any[][] = [];

  arrayOfObj.forEach((obj) => {
    resArr.push(produceObj(obj, cols));
  });

  return resArr;
}

export default produceEntries;
