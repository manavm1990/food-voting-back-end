import { PrismaClient } from "@prisma/client";
import { prepUser } from "./user/utils.js";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (
    params.model === "User" &&
    (params.action === "create" || params.action === "update")
  ) {
    const ret = { ...params };
    ret.args.data = await prepUser(ret.args.data);
  }

  return next(params);
});

export default prisma;
