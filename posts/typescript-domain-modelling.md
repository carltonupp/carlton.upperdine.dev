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

- An order status must be **Open** in order for it to be dispatchable
- An order status must be **Open** in order for it to be cancellable
- An order status must be **Dispatched** in order for it to be completable

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
    orderReference: orderReference,
    lines: lines,
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

This is okay, but I see a few issues with this code that could become
problematic as the codebase grows:

- **Status** being a string type leaves a lot of room for typos and case
  inconsistency.
- The function names aren't descriptive of what they are doing. For example,
  **dispatchOrder** isn't _just_ dispatching an order - it's:
  - checking if the order is in a valid state to be dispatched
  - dispatching and returns the order if the above check passes
  - returning the order as-is if the above check fails

## Union Types

For our state, we have the following options available:

- Open
- Dispatched
- Complete
- Cancelled

If we only have a finite amount of options available, the obvious choice is to
create a union type representing the different states an order can be in:

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

By doing this, we are reducing the risk of future developers changing the casing
or terminology of the states without taking this into account everywhere they
are used.

A simple change, but we're not done yet.

## Making the implicit explicit

A good software design principle is to **make the implicit explicit**. Looking
at our code, we should immediately know what it is doing without having to make
any assumptions.

For example, what differentiates an Open order from a Completed or Cancelled
one? What is to stop us passing a Cancelled order into the **dispatchOrder**
function?

At the moment we are using the status property on each order, but with proper
use of our type system, we are able to make invalid states impossible, and
validatable without even running our code.

Using union types, we can modify our **Order** type to be a union type
representing the various states that an order can take in real life:

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
    orderReference: orderReference,
    lines: lines,
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
type OrderDetail = {
  orderReference: string;
  lines: Line[];
};

type OpenOrder = OrderDetail & { status: "Open" };
type DispatchedOrder = OrderDetail & { status: "Dispatched" };
type CompletedOrder = OrderDetail & { status: "Complete" };
type CancelledOrder = OrderDetail & { status: "Cancelled" };
```

Using the & operator, we are able to create a new type by joining multiple other
types together.

It's better, but we're still relying on strings for our statuses and duplicating
that type pattern every time - imagine if we added a new property or changed the
name of one.

Lets make it more resilient to change:

```ts
enum State {
  Open,
  Dispatched,
  Complete,
  Cancelled,
}

type OrderDetail<TStatus extends State> = {
  orderReference: string;
  lines: Line[];
  status: TStatus;
};

type OpenOrder = OrderDetail<State.Open>;
type DispatchedOrder = OrderDetail<State.Dispatched>;
type CompletedOrder = OrderDetail<State.Complete>;
type CancelledOrder = OrderDetail<State.Cancelled>;
```

Firstly I have created an **Enum** type to represent the various state values. I
personally went with an Enum instead of the union type that we created
previously because in my view **OrderDetail<"Open">** is not as readable as
**OrderDetail<State.Open>**. Another benefit is that enums have an implicit
order to them, though in this example we won't be using that.

## Putting it all together

If you have followed along, you should have a finished product that looks like
this:

```ts
enum State {
  Open,
  Dispatched,
  Complete,
  Cancelled,
}

type Line = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type OrderDetail<TStatus extends State> = {
  orderReference: string;
  lines: Line[];
  status: TStatus;
};

type OpenOrder = OrderDetail<State.Open>;
type DispatchedOrder = OrderDetail<State.Dispatched>;
type CompletedOrder = OrderDetail<State.Complete>;
type CancelledOrder = OrderDetail<State.Cancelled>;

type Order =
  | OpenOrder
  | DispatchedOrder
  | CompletedOrder
  | CancelledOrder;

function createOrder(
  orderReference: string,
  lines: Line[],
): OpenOrder {
  return {
    orderReference: orderReference,
    lines: lines,
    status: State.Open,
  };
}

function dispatchOrder(order: OpenOrder): DispatchedOrder {
  return {
    ...order,
    status: State.Dispatched,
  };
}

function completeOrder(order: DispatchedOrder): CompletedOrder {
  return {
    ...order,
    status: State.Complete,
  };
}

function cancelOrder(order: OpenOrder): CancelledOrder {
  return {
    ...order,
    status: State.Cancelled,
  };
}
```

As you can see, we are able to use TypeScript's amazing type system in
combination with a State Machine to enforce business rules, and make illegal
states unrepresentable.

The benefit of using the type system is that we are able to pick up on bugs at
compile time, instead of run-time, meaning the chances of committing buggy code
are lessened (but never zero).

I have barely scratched the surface here, but that's a good stopping point for
now. In my next post, I will be tackling a new requirement for our order
processing system and delving deeper into more of the amazing ways that you can
build a rich domain model with typescript.

In the meantime, try doing some domain modelling of your own using what we
covered in this blog post.
