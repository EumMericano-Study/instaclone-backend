import { AlertMessage } from "@src/constants";
import pubsub from "@src/pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(AlertMessage.NEW_MESSAGE),
    },
  },
};
