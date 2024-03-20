const { ROLES } = require('../../../constants/constants')

const usersToSeed = [
  {
    firstName: "Rehman",
    lastName: "Akram",
    status: "active",
    email: "rehman.chughtai@focusteck.com",
    gender: "male",
    phoneNo: "+923334270732",
    password: "Abcdef@123",
    emailVerified: true,
    phoneVerified: true,
    role: ROLES.SUPER_ADMIN
  },
  {
    firstName: "Bilal",
    lastName: "Maan",
    status: "active",
    email: "bilal.yunus@focusteck.com",
    gender: "male",
    phoneNo: "+923216358444",
    password: "Abcdef@123",
    emailVerified: true,
    phoneVerified: true,
    role: ROLES.SUPER_ADMIN
  },
]
module.exports = usersToSeed