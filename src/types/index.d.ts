export {
  User,
  Photo,
  Hashtag,
  Like,
  Comment,
  Room,
  Message,
} from "@prisma/client";

export { FileUpload as Upload } from "./upload";
export { default as Resolvers } from "./resolvers";
