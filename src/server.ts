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

/**
 * context를 이용해서 모든 스키마에서 사용할 수 있는 공동 변수를 지정할 수 있음
 * context는 스키마에서 3번째 argument로 제공된다.
 */
const server = new ApolloServer({
    schema,
    context: {
        Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQyNzIxMjg1fQ.8dYcvgIQjUQHTazSZGGZmUSUS7nNJxUcAocU-l48Rls",
    },
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`🚀 Server is running on http://localhost:${PORT} 🚀`)
    );
