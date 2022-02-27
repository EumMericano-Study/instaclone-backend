import { PubSubMessage } from "@src/constants";
import pubsub from "@src/pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator([PubSubMessage.NEW_MESSAGE]),
    },
  },
};
