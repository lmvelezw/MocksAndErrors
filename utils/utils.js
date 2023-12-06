import { faker } from "@faker-js/faker";

export const generateProduct = () => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(10),
  };
};
