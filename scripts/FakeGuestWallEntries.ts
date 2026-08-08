import { faker } from "@faker-js/faker";

const API_URL = "http://localhost:3000";
const SLUG = "zoom";
const COUNT = 2500;

for (let i = 0; i < COUNT; i++) {
  const message = {
    name: faker.person.fullName(),
    content: faker.helpers.arrayElement([
      "Love your website!",
      "This is really cool!",
      "Just stopping by to say hello!",
      "Found your website and had to leave a message.",
      "Your site looks amazing.",
      "Greetings from the internet!",
      `Hello from ${faker.location.city()}!`,
      "Keep up the great work!",
    ]),
    website: faker.datatype.boolean({ probability: 0.3 })
      ? faker.internet.url()
      : undefined,
  };

  const response = await fetch(`${API_URL}/v1/guestwalls/${SLUG}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    console.error(`Failed to create entry ${i + 1}:`, await response.text());
    continue;
  }

  const entry = await response.json();
  //@ts-ignore
  console.log(`[${i + 1}/${COUNT}] Created ${entry?.name} (${entry?.id})`);
}
