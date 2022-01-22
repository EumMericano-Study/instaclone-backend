/**
 * dotenv는 맨 위에만 있으면 되고,
 *
 * import dotenv from "dotenv"
 * dotenv.config()
 *
 * 와 동일한 효과로 사용할 수 있다.
 * 한곳에서 선언해주면 모든 파일에서 사용 가능하다. (서버 맨 윗줄)
 */
require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "@src/schema";
import { getUserByAuth } from "./users/users.utils";

/**
 * context를 이용해서 모든 resolver에서 사용할 수 있는
 * Object 혹은 function들을 지정할 수 있음
 * context는 resolver에서 3번째 argument로 제공된다.
 *
 * http 헤더를 통해 Authorization의 값으로 jwt token을 주고받는다.
 */
const PORT = process.env.PORT;

const startServer = async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUserByAuth(req.headers.authorization),
      };
    },
  });

  await apollo.start();

  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  /**
   * apollo위치를 로거, graphqlUploadExpress 아래줄로 이동
   *
   * 미들웨어 상단에 있으면 반영되지 않음.
   */
  apollo.applyMiddleware({ app });
  app.use("/static", express.static("src/uploads"));

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server is running on http://localhost:${PORT}${apollo.graphqlPath} 🚀`
    );
  });
};

startServer();
