import type { Profile, Product, Review } from "@prisma/client";
import cuid from "cuid";
import faker from "faker";

const unsplashTemplate = (name: string) => {
  const arr = name.split(" ");
  const prodName = arr[arr.length - 1];

  return `https://source.unsplash.com/800x600/?${prodName}`;
};

export const generateProfilesData = (numberOfProfiles: number) => {
  const profilesData: Profile[] = [];

  for (let i = 0; i < numberOfProfiles; i++) {
    profilesData.push({
      city: faker.address.city(),
      country: faker.address.country(),
      nick: null,
      postalCode: faker.address.zipCode(),
      streetAddress: `${faker.address.streetName()}, number: ${Math.round(
        Math.random() * 100
      )}`,
      role: "USER",
      userId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: cuid(),
    });
  }

  return profilesData;
};

export const generateProductData = (numberOfProducts: number) => {
  const productsData: Product[] = [];

  for (let i = 0; i < numberOfProducts; i++) {
    // WE WILL DO THAT EVERY OTHER PRODUCT IS OUT OF STOCK

    const countInStock = !(i % 2)
      ? 0
      : parseInt(`${Math.random() * 10}`) * parseInt(`${Math.random() * 10}`);

    const productName = faker.commerce.productName();

    productsData.push({
      id: cuid(),
      name: productName,
      image: unsplashTemplate(productName),
      countInStock,
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      brand: faker.company.companyName(),
      price: faker.commerce.price(),
      adminId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return productsData;
};
