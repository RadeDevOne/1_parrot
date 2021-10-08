/**
 *
 * @param routeWithBracket "/foo/[bar]/foo" or "/foo/[bar]""
 * @param valueToBePassedToBracket string to be passed as [bar]
 */
const parseDynamicRoute = (
  routeWithBracket: string,
  valueToBePassedToBracket: string
) => {
  if (!routeWithBracket.startsWith("/")) {
    throw new Error("route needs to start with a '/'");
  }
  if (routeWithBracket.endsWith("/")) {
    throw new Error("route cant end with '/'");
  }

  const routeArr = routeWithBracket.split("/");

  let indexOfBracketed = 0;

  routeArr.forEach((item, i) => {
    if (item.startsWith("[")) {
      indexOfBracketed = i;
    }
  });

  const newArr = routeArr.concat([]);

  newArr[indexOfBracketed] = valueToBePassedToBracket;

  const builtRoute = newArr.join("/");

  // console.log({ builtRoute, routeWithBracket });

  return builtRoute;
};

export default parseDynamicRoute;
