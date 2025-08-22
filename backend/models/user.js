/** @format */
const prisma = require("../utils/prisma");

async function findByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

async function createUser({ email, password, name, role }) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
      role,
    },
  });
  return user;
}

module.exports = {
  findByEmail,
  createUser,
};
