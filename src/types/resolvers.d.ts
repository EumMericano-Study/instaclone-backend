import { Context } from "./context";

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

type Resolvers = {
  /**
   * 인덱스 타입
   * 인터페이스에서 속성 이름을 구체적으로 정의하지 않고
   * 값의 타입만 정의하는 것을 인덱스(index) 타입이라고 함
   */
  [key: string]: {
    [key: string]: Resolver;
  };
};

export default Resolvers;
