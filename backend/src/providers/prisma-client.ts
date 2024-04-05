import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import fastcsv from 'fast-csv'

const prisma = new PrismaClient()

export {
  prisma,
  fs,
  fastcsv
};
