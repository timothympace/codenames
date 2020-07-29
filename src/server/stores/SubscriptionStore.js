import { autorun, decorate, observable, toJS } from 'mobx';

export class SubscriptionStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.subscriptions = {};
  }

  registerSubscribable(obj) {
    this.subscriptions[obj.id] = {
      instance: obj,
      subscribers: [],
      dispose: null,
    };
  }

  subscribeToObservable(id, ws, req) {
    const subscription = this.subscriptions[id];

    if (!subscription) {
      throw new Error('Unknown subscribable:', id);
    }

    subscription.subscribers.push(ws);

    // If this is our first subscription, create
    // the autorun function that will dump the
    // observable.
    if (subscription.subscribers.length === 1) {
      subscription.dispose = autorun(() => {
        const msg = toJS(subscription.instance);
        subscription.subscribers.forEach(socket => {
          socket.send(JSON.stringify(msg));
        });
      });
    }

    ws.onmessage = msg => {
      this.dispatchMethod(id, msg);
    };

    ws.onclose = () => {
      subscription.subscribers = subscription.subscribers.filter(c => c !== ws);

      if (subscription.subscribers.length === 0) {
        subscription.dispose();
      }

      // TODO switch to optional chain when esm gets updated.
      // https://github.com/standard-things/esm/pull/883
      if (subscription.instance.onUnsubscribe) {
        subscription.instance.onUnsubscribe(req);
      }
    };

    // TODO switch to optional chain when esm gets updated.
    // https://github.com/standard-things/esm/pull/883
    if (subscription.instance.onSubscribe) {
      subscription.instance.onSubscribe(req);
    }
  }

  dispatchMethod(id, msg) {
    const { method, ...params } = JSON.parse(msg.data);
    const { instance } = this.subscriptions[id];

    if (!instance[method]) {
      throw new Error(`Unknown action: ${method}`);
    }

    instance[method](params);
  }
}

decorate(SubscriptionStore, {
  subscriptions: observable,
});
