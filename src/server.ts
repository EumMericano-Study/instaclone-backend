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
import { ApolloServer } from "apollo-server";
import schema from "@src/schema";

const server = new ApolloServer({ schema });

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`🚀 Server is running on http://localhost:${PORT} 🚀`)
    );
