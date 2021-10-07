import path from "path";

const parseDynamicRoute = (route: string, valueToBePassedToRoute: string) => {
  if (!route.startsWith("/")) {
    throw new Error("route needs to start with a '/'");
  }
  if (route.endsWith("/")) {
    throw new Error("route cant end with '/'");
  }

  const routeArr = route.split("/");

  let indexOfBracketed = 0;

  routeArr.forEach((item, i) => {
    if (item.startsWith("[")) {
      indexOfBracketed = i;
    }
  });

  const newArr = routeArr.concat([]);

  newArr[indexOfBracketed] = valueToBePassedToRoute;

  const blah = newArr.join("/");

  console.log({ blah, route });
};

export default parseDynamicRoute;
