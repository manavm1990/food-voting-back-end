import { PrismaClient } from "@prisma/client";
import { prepUser } from "./user/utils.js";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const ret = { ...params };

  if (
    params.model === "User" &&
    (params.action === "create" || params.action === "update")
  ) {
    ret.args.data = await prepUser(ret.args.data);
  }

  return next(ret);
});

export default prisma;
