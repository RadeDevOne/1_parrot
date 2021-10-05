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
  const profileIds: string[] = [];

  for (let i = 0; i < numberOfProfiles; i++) {
    const id = cuid();

    profileIds.push(id);

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

  return { profilesData, profileIds };
};

export const generateProductData = (numberOfProducts: number) => {
  const productsData: Product[] = [];
  const productIds: string[] = [];

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

  return { productsData, productIds };
};

// FOR Reviews WE WOULD NEED EXISTING PRODUCTS
// AND EXISTING PROFILES

export const generateReviewsData = (
  prdoductIds: string[],
  profileIds: string[]
) => {
  const reviewsData: Review[] = [];

  // LETS SAY EVERY PRODUCT SHOUD HAVE 4 REVIEEWS

  for (let i = 0; i < prdoductIds.length; i++) {
    let profileNo = 0;
    let back = false;

    const profileId = profileIds[profileNo];

    for (let j = 0; j < 5; j++) {
      //
      //
      reviewsData.push({
        id: cuid(),
        productId: prdoductIds[i],
        profileId,
        comment: faker.lorem.sentences(),
        createdAt: faker.date.past(),
        rating: Math.round(Math.random() * 5.1) || 1,
        updatedAt: faker.date.future(),
      });

      if (back) {
        profileNo--;
      } else {
        profileNo++;
      }

      if (profileNo === profileIds.length) {
        back = true;
      } else if (profileNo < 0) {
        back = false;
      }
    }
  }

  return reviewsData;
};
