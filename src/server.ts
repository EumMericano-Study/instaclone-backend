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
 * context를 이용해서 모든 resolver에서 사용할 수 있는
 * Object 혹은 function들을 지정할 수 있음
 * context는 resolver에서 3번째 argument로 제공된다.
 *
 * http 헤더를 통해 Authorization의 값으로 jwt token을 주고받는다.
 */
const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        return {
            Authorization: req.headers.authorization,
        };
    },
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() =>
        console.log(`🚀 Server is running on http://localhost:${PORT} 🚀`)
    );
