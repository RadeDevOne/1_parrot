/**
 *
 * @param currentPageNum number, you can find this with router (/products/<> )
 * @param productsPerPage number, use 16 (you can do more or less but 16 is alright)
 * @param buttonSpan number, use 4 (you can do more or less but 4 is alright)
 * @param totalProducts number, pass here your total amount of products that you have in your db
 * @returns hover to see what
 */
const calcPag = (
  currentPageNum: number,
  productsPerPage: number,
  buttonSpan: number,
  totalProducts: number
): {
  a__current_page_position: [number, number];
  b__array_of_buttons: (number | null)[][];
  surounding_buttons_logic: {
    first: null | number;
    previousSpanPage: null | number;
    previous: null | number;
    next: null | number;
    nextSpanPage: null | number;
    last: null | number;
  };
  currentPageNumber: number;
  skip: number;
  currentButtonSpan: (number | null)[];
  highlightedPageNum: number;
} => {
  //
  if (currentPageNum < 0) {
    throw new Error("current page number can't be a negative number");
  }

  const totalPagesRough = totalProducts / productsPerPage;
  const totalSpansRough = totalPagesRough / buttonSpan;

  const totalPages =
    totalPagesRough % Math.round(totalPagesRough) !== 0
      ? Math.floor(totalPagesRough) + 1
      : totalPagesRough;

  const totalSpans =
    totalSpansRough % Math.round(totalSpansRough) !== 0
      ? Math.floor(totalSpansRough) + 1
      : totalSpansRough;

  if (currentPageNum > totalPages) {
    throw new Error(
      "ordinl number of current page can not be higher than total numbe of pages"
    );
  }

  // WHERE DOES CURRENT PAGE NUMBER BELONGS
  const arrayOfSpans: (number | null)[][] = [];

  let itemHistory = 0;

  let lastPageNumber = 0;

  const positionOfCurrent: [number, number] = [0, 0];

  for (let i = 0; i < totalSpans; i++) {
    arrayOfSpans.push([]);
    for (let j = 0; j < buttonSpan; j++) {
      if (totalPages < itemHistory) {
        if (j === 0) {
          arrayOfSpans.pop();
          break;
        }

        arrayOfSpans[i].push(null);

        continue;
      }

      arrayOfSpans[i].push(itemHistory);

      if (currentPageNum === itemHistory) {
        positionOfCurrent[0] = i;
        positionOfCurrent[1] = j;
      }
      itemHistory++;
    }
  }

  lastPageNumber = itemHistory - 1;

  if (
    arrayOfSpans[positionOfCurrent[0]][positionOfCurrent[1]] !== currentPageNum
  ) {
    throw new Error(
      "disproportion, too much of products per page , or pick another page"
    );
  }

  const first = currentPageNum - 1 < 0 ? null : 0;
  const last = currentPageNum + 1 > lastPageNumber ? null : lastPageNumber;

  const previous = currentPageNum - 1 < 0 ? null : currentPageNum - 1;
  const next = currentPageNum + 1 > lastPageNumber ? null : currentPageNum + 1;

  // THIS IS HOW WE CAN SET CHANGING OF SPAN
  // const currentSpanBlock = arrayOfSpans[positionOfCurrent[0]];

  let previousSpanPage = null;
  let nextSpanPage = null;

  if (arrayOfSpans[positionOfCurrent[0] - 1]) {
    previousSpanPage = arrayOfSpans[positionOfCurrent[0] - 1][buttonSpan - 1];
  }

  if (arrayOfSpans[positionOfCurrent[0] + 1]) {
    nextSpanPage = arrayOfSpans[positionOfCurrent[0] + 1][0];
  }

  // CALCULATE skip (WE NEEDS THIS AS A QUERY, FROM WHICH NUMBER
  // OF PRODUCTS WE QUERY)
  const totalAmountOfProductsBeforeAndOnCurrentPage =
    currentPageNum * productsPerPage;

  const skip = totalAmountOfProductsBeforeAndOnCurrentPage;

  return {
    // THESE ARE TWO INDEXES
    a__current_page_position: positionOfCurrent, // (first number is for the index for display span view, second number is for the index of the page number)
    // FOR THIS ARRAY
    // ARRAY WITH TWO SUBARRAYS (EACH SUBARRAY REPRESENTS
    // ONE SPAN OF ORDINAL BUTTON NUMBERS, FOR BUTTONS WE WILL USE TO
    // NAVIGATE BETWEEN PAGES)
    b__array_of_buttons: arrayOfSpans,
    // THESE ARE NOT JUST NUMBERS
    // THEY ARE VALIDATIONS TWO (SOMETIMES YOU CAN NAVIGATE BACK
    // WHEN YOU ARE AT BEGGINING, AND YOU CAN NAVIGATE FORTH, WHEN YOU ARE AT THE ENDING)
    surounding_buttons_logic: {
      first,
      previousSpanPage,
      previous,
      next,
      nextSpanPage,
      last,
    },
    currentPageNumber: currentPageNum,
    skip: skip > 0 ? skip : 0,
    currentButtonSpan: arrayOfSpans[positionOfCurrent[0]],
    highlightedPageNum: currentPageNum,
  };
};

export default calcPag;
