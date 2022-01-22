import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

/**
 * pattern language
 *    **는 폴더를 뜻하고 *는 파일을 뜻함
 *    경로를 여러개 선정할 때는 glob을 사용 => {A path, B path}
 *    glob 사용시 두가지 경로 모두 탐색하게 됨
 */
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
