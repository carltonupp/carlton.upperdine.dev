---
title: "Domain modelling with State Machines and TypeScript"
blurb: "A simple domain-modelling exercise showing off TypeScript's wonderful type system"
date: "2023-05-28"
---

For the last few years or so, I have been writing a lot of TypeScript. It has
become one of my favourite languages to work with, and a total game changer for
my front-end development experience.

Unfortunately, a lot of developers I speak with still don't see TypeScript as a
valid back-end option - even with Node.js and Deno having the success that they
have. To them, it's still just a language for wrangling HTTP and propagating the
response into the UI.

What I hope to accomplish with this post is to get people looking at TypeScript
differently, and show off what I believe to be one of the best type systems in a
mainstream language.

# Starting point

Consider the following code:

```ts
type Line = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  orderReference: string;
  status: string;
  lines: Line[];
};

function createOrder(orderReference: string, lines: Line[]): Order {
  return {
    orderReference: orderReference,
    lines: lines,
    status: "Open",
  };
}

function dispatchOrder(order: Order): Order {
  return {
    ...order,
    status: "Dispatched",
  };
}

function completeOrder(order: Order): Order {
  return {
    ...order,
    status: "Complete",
  };
}

function cancelOrder(order: Order): Order {
  return {
    ...order,
    status: "Cancelled",
  };
}
```

So far, it looks like bog-standard business logic for processing online orders,
albeit quite simplified.

Now add some rules:

- An order status must be `Open` in order for it to be dispatchable
- An order status must be `Open` in order for it to be cancellable
- An order status must be `Dispatched` in order for it to be completable

Modelling this very simply we can modify our code to look like this:

```ts
type Line = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  orderReference: string;
  status: string;
  lines: Line[];
};

function createOrder(orderReference: string, lines: Line[]): Order {
  return {
    orderReference,
    lines,
    status: "Open",
  };
}

function dispatchOrder(order: Order): Order {
  if (order.status !== "Open") {
    return order;
  }
  return {
    ...order,
    status: "Dispatched",
  };
}

function completeOrder(order: Order): Order {
  if (order.status !== "Dispatched") {
    return order;
  }
  return {
    ...order,
    status: "Complete",
  };
}

function cancelOrder(order: Order): Order {
  if (order.status !== "Open") {
    return order;
  }
  return {
    ...order,
    status: "Cancelled",
  };
}
```

This is okay, but leaves a lot of room for bugs to appear over time.

Firstly, `status` being a string type leaves a lot of room for typos and case
inconsistency.

If we only have a finite amount of options available, the obvious choice is to
create a union type representing the different states an order can be in. By
doing this, we are reducing the risk of future developers changing the casing or
terminology of the states without taking this into account everywhere they are
used.

```ts
type OrderState =
  | "Open"
  | "Dispatched"
  | "Complete"
  | "Cancelled";

type Order = {
  orderReference: string;
  status: OrderState;
  lines: Line[];
};
```

Secondly, each operation is checking the state of the order before performing
the relevant check. If that check fails, it will return the order as-is. The
function names aren't very representative of what they are doing- but
`completeOrderIfStateIsDispatched` doesn't exactly have a ring to it.

# Making the implicit explicit

A good software design principle is to **make the implicit explicit**. Looking
at our code, we should immediately know what it is doing without having to make
any assumptions.

Looking at our code, what differentiates an Open order from a Completed or
Cancelled one? What is to stop us passing a Cancelled order into the
`dispatchOrder` function? With proper use of our type system, we are able to
make invalid states impossible, and validatable without even running our code.

Using union types, we can modify our `Order` type to be a representation of the
various states that an order can take in real life:

```ts
type Line = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type OpenOrder = {
  orderReference: string;
  status: "Open";
  lines: Line[];
};

type DispatchedOrder = {
  orderReference: string;
  status: "Dispatched";
  lines: Line[];
};

type CompletedOrder = {
  orderReference: string;
  status: "Complete";
  lines: Line[];
};

type CancelledOrder = {
  orderReference: string;
  status: "Cancelled";
  lines: Line[];
};

type Order =
  | OpenOrder
  | DispatchedOrder
  | CompletedOrder
  | CancelledOrder;
```

By creating an explicit differentiation between the various states an order can
be in, we are able to use our compiler to impose domain logic instead of having
to litter our code with if statements.

We can now turn our four functions into a State Machine:

```ts
function createOrder(orderReference: string, lines: Line[]): OpenOrder {
  return {
    orderReference,
    lines,
    status: "Open",
  };
}

function dispatchOrder(order: OpenOrder): DispatchedOrder {
  return {
    ...order,
    status: "Dispatched",
  };
}

function completeOrder(order: DispatchedOrder): CompletedOrder {
  return {
    ...order,
    status: "Complete",
  };
}

function cancelOrder(order: OpenOrder): CancelledOrder {
  return {
    ...order,
    status: "Cancelled",
  };
}
```

By doing so, this means that only a correct state may be passed in as an
argument to our functions, so no run-time property checking is needed, and
invalid states are not representable.

This is a huge improvement, but a couple of issues still remain:

- Our order status is back to being a simple string
- Our various order state types involve a lot of code duplication - imagine if
  we need to add a new property to each type!

Lets reduce the duplication:

```ts
// extract what is common
type OrderDetail = {
  orderReference: string;
  lines: Line[];
};

// then add the rest
type OpenOrder = OrderDetail & { status: "Open" };
type DispatchedOrder = OrderDetail & { status: "Dispatched" };
type CompletedOrder = OrderDetail & { status: "Complete" };
type CancelledOrder = OrderDetail & { status: "Cancelled" };
```

It's better, but we're still relying on strings for our statuses and duplicating
that type pattern every time - imagine if we added a new property or changed the
name of one.

Lets make it more resilient to change:

```ts
type Status<S extends OrderState> = {
  status: S;
};

type OpenOrder = OrderDetail & Status<"Open">;
type DispatchedOrder = OrderDetail & Status<"Dispatched">;
type CompletedOrder = OrderDetail & Status<"Complete">;
type CancelledOrder = OrderDetail & Status<"Cancelled">;
```

Lets review our code so far:

```ts
type OrderState =
  | "Open"
  | "Dispatched"
  | "Complete"
  | "Cancelled";

type Line = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type OrderDetail = {
  orderReference: string;
  lines: Line[];
};

type Status<S extends OrderState> = {
  status: S;
};

type OpenOrder = OrderDetail & Status<"Open">;
type DispatchedOrder = OrderDetail & Status<"Dispatched">;
type CompletedOrder = OrderDetail & Status<"Complete">;
type CancelledOrder = OrderDetail & Status<"Cancelled">;

type Order = OpenOrder | DispatchedOrder | CompletedOrder | CancelledOrder;

function createOrder(orderReference: string, lines: Line[]): OpenOrder {
  return {
    orderReference,
    lines,
    status: "Open",
  };
}

function dispatchOrder(order: OpenOrder): DispatchedOrder {
  return {
    ...order,
    status: "Dispatched",
  };
}

function completeOrder(order: DispatchedOrder): CompletedOrder {
  return {
    ...order,
    status: "Complete",
  };
}

function cancelOrder(order: OpenOrder): CancelledOrder {
  return {
    ...order,
    status: "Cancelled",
  };
}
```

Now to extend this, lets imagine we start stocking a new line of digital
products. These obviously do not require dispatching, so will go straight from
`Open` to `Complete`.

This throws a curveball at our code, as our current state machine only supports
the following flows:

- Open -> Dispatched -> Complete
- Open -> Cancelled

But we need it to support the following:

- Open -> Dispatched -> Complete (for physical purchases)
- Open -> Complete (for digital purchases)
- Open -> Cancelled

To start with, we need to differentiate between a physical order and a digital
order. The traditionally imperative way of thinking would probably point us
towards using a boolean on the `OrderDetail` type, but this would just mean
littering our code with more if statements.

Let's create a new type instead and make the compiler do the work for us. We
should make our OpenOrder type look like this:

```ts
type OrderType = "Standard" | "Digital";

type Type<T extends OrderType> = {
  type: T;
};

type StandardOrder = OrderDetail & Status<"Open"> & Type<"Standard">;
type DigitalOrder = OrderDetail & Status<"Open"> & Type<"Digital">;

type OpenOrder = StandardOrder | DigitalOrder;
```

Our `dispatchOrder` function should be changed to only accept a Standard Order:

```ts
function dispatchOrder(order: StandardOrder): DispatchedOrder {
  return {
    ...order,
    status: "Dispatched",
  };
}
```

Our `completeOrder` function also needs to be modified to accept both dispatched
orders and digital orders. I would suggest creating a new union type from our
`Order` union type consisting of all types that can be returned.

We can do that using the built in `Extract` utility type from TypeScript:

```ts
type CompletableOrder = Extract<Order, DispatchedOrder | DigitalOrder>;

function completeOrder(order: CompletableOrder): CompletedOrder {
  return {
    ...order,
    status: "Complete",
  };
}
```

Finally, we just need to modify our `createOrder` function to allow us to create
both standard and digital orders:

```ts
function createOrder(
  orderReference: string,
  lines: Line[],
  type: OrderType,
): OpenOrder {
  return {
    orderReference: orderReference,
    lines: lines,
    type: type,
    status: "Open",
  };
}
```

Putting the finished product together:

```ts
type OrderState =
  | "Open"
  | "Dispatched"
  | "Complete"
  | "Cancelled";

type Line = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type OrderDetail = {
  orderReference: string;
  lines: Line[];
};

type Status<S extends OrderState> = {
  status: S;
};

type OrderType = "Standard" | "Digital";

type Type<T extends OrderType> = {
  type: T;
};

type StandardOrder = OrderDetail & Status<"Open"> & Type<"Standard">;
type DigitalOrder = OrderDetail & Status<"Open"> & Type<"Digital">;

type OpenOrder = StandardOrder | DigitalOrder;

type DispatchedOrder = OrderDetail & Status<"Dispatched">;
type CompletedOrder = OrderDetail & Status<"Complete">;
type CancelledOrder = OrderDetail & Status<"Cancelled">;

type Order =
  | OpenOrder
  | DispatchedOrder
  | CompletedOrder
  | CancelledOrder;

type DispatchableOrder = Exclude<OpenOrder, DigitalOrder>;
type CompletableOrder = Extract<Order, DispatchedOrder | DigitalOrder>;

function createOrder(
  orderReference: string,
  lines: Line[],
  type: OrderType,
): OpenOrder {
  return {
    orderReference,
    lines,
    type: type,
    status: "Open",
  };
}

function dispatchOrder(order: DispatchableOrder): DispatchedOrder {
  return {
    ...order,
    status: "Dispatched",
  };
}

function completeOrder(order: CompletableOrder): CompletedOrder {
  return {
    ...order,
    status: "Complete",
  };
}

function cancelOrder(order: OpenOrder): CancelledOrder {
  return {
    ...order,
    status: "Cancelled",
  };
}
```

Looking at this code, we are able to use TypeScript's amazing type system in
combination with a State Machine to enforce business rules, and make illegal
states unrepresentable. The benefit of using the type system is that we are able
to pick up on bugs at compile time, instead of run-time, meaning the chances of
committing buggy code are lessened (but never zero).
