/**
 *
 * @param current number
 * @param total number
 * @description calculates numbers for easiee pagination link placement
 */
const pagCalc = (
  current: number,
  perPage: number,
  total: number
): [
  number,
  {
    first: number | null;
    prev: number | null;
    contenders: number[];
    next: number | null;
    last: number | null;
  }
] => {
  const span = 4;

  const tot = parseInt((total / perPage).toFixed(0));

  if (span > tot) {
    throw new Error("4 is minimum");
  }

  if (total === current) {
    throw new Error("`total` can't be equal to `current`");
  }

  const next = current === tot - 1 ? null : current + 1;
  const prev = current === 0 ? null : current - 1;

  const last = current === tot - 1 ? null : tot - 1;
  const first = current === 0 ? null : 0;

  const highlighted = current;

  const contenders = new Array(span).fill(0) as number[];

  if (highlighted === 0) {
    contenders[0] = highlighted;
    for (let i = 1; i < contenders.length; i++) {
      contenders[i] = i;
    }

    return [highlighted, { first, prev, contenders, next, last }];
  }

  if (highlighted === tot - 1) {
    contenders[contenders.length - 1] = highlighted;

    let n = span - 1;
    for (let i = highlighted; i > highlighted - span; i--) {
      contenders[n] = i;
      n--;
    }

    return [highlighted, { first, prev, contenders, next, last }];
  }

  // if (highlighted === 1) {
  // }

  if (highlighted === tot - 2) {
    contenders[0] = (prev as number) - 1;
    contenders[1] = prev as number;
    contenders[2] = highlighted;
    contenders[3] = highlighted + 1;

    return [highlighted, { first, prev, contenders, next, last }];
  }

  contenders[0] = prev as number;
  contenders[1] = highlighted;
  contenders[2] = next as number;
  contenders[3] = (next as number) + 1;

  return [highlighted, { first, prev, contenders, next, last }];
};

export default pagCalc;
