import { PubSubMessage } from "@src/constants";
import pubsub from "@src/pubsub";
import { withFilter } from "graphql-subscriptions";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([PubSubMessage.NEW_MESSAGE]),
        (payload, variables) => {
          console.log("payload", payload);
          console.log("variables", variables);
          return true;
        }
      ),
    },
  },
};
