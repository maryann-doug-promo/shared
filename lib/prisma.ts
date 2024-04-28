import { PrismaClient } from '@prisma/client'

// TODO is this correct!!!
// WHAT ABOUT security!!!!
// And causing stuff to get mixed up!!!


// And you need to get better at differentiating between
// when its "development" and "production"!!!!


declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;