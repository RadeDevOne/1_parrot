const calcPag = (
  currentPageNum: number,
  productsPerPage: number,
  buttonSpan: number,
  totalProducts: number
) => {
  if (currentPageNum < 0) {
    throw new Error("current page number can't be a negative number");
  }

  //
  //
  //
  //

  const totalPagesRough = totalProducts / productsPerPage;
  const totalSpansRough = totalPagesRough / buttonSpan;

  const totalPages =
    totalPagesRough % Math.round(totalPagesRough) !== 0
      ? Math.round(totalPagesRough) + 1
      : totalPagesRough;

  const totalSpans =
    totalSpansRough % Math.round(totalSpansRough) !== 0
      ? Math.round(totalSpansRough) + 1
      : totalSpansRough;

  if (currentPageNum > totalPages) {
    throw new Error(
      "ordinl number of current page can not be higher than total numbe of pages"
    );
  }

  // WHERE DOES CURRENT PAGE NUMBER BELONGS
  const arrayOfSpans: number[][] = [];

  let itemHistory = 0;

  const positionOfCurrent: [number, number] = [0, 0];

  for (let i = 0; i < totalSpans; i++) {
    arrayOfSpans.push([]);
    for (let j = 0; j < buttonSpan; j++) {
      if (totalPages < itemHistory) {
        break;
      }

      arrayOfSpans[i].push(itemHistory);

      if (currentPageNum === itemHistory) {
        positionOfCurrent[0] = i;
        positionOfCurrent[1] = j;
      }
      itemHistory++;
    }
  }

  console.log({ arrayOfSpans });
  console.log({ positionOfCurrent });

  console.log({ totalPages, totalPagesRough, totalSpans, totalSpansRough });
};

export default calcPag;
