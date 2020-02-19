+++
title = "Map, Filter & Reduce: Three Functions to rule them all!"
slug = "map-filter-reduce"

date = "2020-01-12"
tags = ["functional-programming", "code"]
categories = ["blog"]
+++

![What if I told you](../../images/linq-morpheus.jpg)

One of the most beloved language features among .NET developers has to be LINQ. It makes dealing with collections a pleasure, and something a lot of people miss when moving to another language. 

**It doesn't have to be this way.**

LINQ, or Higher-order functions as the academics call them, isn't unique to the .NET ecosystem, and most LINQ queries that we write every day can be replicated in most modern languages by using the following three functions:
* Map
* Filter
* Reduce

These functions are not new (unless you're working with Java), but as the industry moves towards using a more functional style of programming, they are only recently getting the attention they deserve. For the sake of simplicity, I will be writing the examples for this post in JavaScript, but some of the other languages that support these higher-order functions are Python, Ruby, Java, Kotlin and F#.

# Map
Map takes a collection, applies a function to every item in that collection and outputs the result. It's as simple as that. The LINQ counterpart to this is `Select`, as demonstrated in the following example.

**Given an array of integers, multiply each integer by itself, and create a new array of the results**

Using LINQ:
```c#
const arrayOfInts = new int[] {1, 2, 3, 4, 5};

var arrayOfIntsSquared = arrayOfInts.Select(x => x * x);
```

Using Map:
```javascript
const arrayOfInts = [1, 2, 3, 4, 5];

var arrayOfIntsSquared = arrayOfInts.map(x => x * x);
```

# Filter
Filter takes a collection, applies a *predicate* (boolean function) to each item in the collection, and outputs the items returning true. The LINQ counterpart to this is `Where`, as demonstrated in the following example.

**Given an array of integers, find the even numbers and create a new array out of these**

Using LINQ:
```c#
const arrayOfInts = new int[] {1, 2, 3, 4, 5};

var evenNumbers = arrayOfInts.Where(x => x % 2 == 0);
```

Using Filter:
```javascript
const arrayOfInts = [1, 2, 3, 4, 5];

var evenNumbers = arrayOfInts.filter(x => x % 2 === 0);
```

# Reduce
Reduce is similar to Map and Reduce in the sense that it takes a *functor*, which in this case is a collection of integers, and applies a function to it. If differs in the sense that the function requires two parameters:
* One to track the running total
* One to represent the current item being operated on

It then outputs the first parameter to give you your total.

For example, to get the Sum total of our array in LINQ, we would use `.Sum()`:
```c#
const arrayOfInts = new int[] {1, 2, 3, 4, 5};

var total = arrayOfInts.Sum();
```

`Sum` is a bit of syntactic sugar in LINQ, and under the hood it's really just using `Aggregate`:
```c#
const arrayOfInts = new int[] {1, 2, 3, 4, 5};

var total = arrayOfInts.Aggregate((total, x) => total + x);
```

Now we have a more direct comparison, here's the same code using `Reduce`:
```javascript
const arrayOfInts = [1, 2, 3, 4, 5];

var evenNumbers = arrayOfInts.reduce((total, x) => total + x);
```

# Putting it all together
`Map` and `Filter` are very powerful on their own, but what makes them more powerful is the ability to chain them together, just like in LINQ!

Let's take an array of integers, square them and get a total of even numbers.

```javascript
var arrayOfInts = [1, 2, 3, 4, 5];

var total = arrayOfInts
                .map(x => x * x)
                .filter(x => x % 2 == 0)
                .reduce((total, x) => total + x);

```

Now for a more realistic example: **Given a list of customers, get the names of all customers that are millenials and offer them avocado on toast**

Our customer class looks like this:
```javascript
// domain/customer.js

class Customer {

    constructor (firstName, dateOfBirth) {
        this.firstName = firstName;
        this.dateOfBirth = dateOfBirth;
    }
}

```

And now our main file:
```javascript
// index.js

const customers = [
    new Customer("Tom", new Date(1993, 2, 23)),
    new Customer("Dick", new Date(1925, 5, 24)),
    new Customer("Harry", new Date(1960, 4, 1))
];

const millenialAgeBracket = {
    lowerLimit: new Date(1981, 01, 01),
    upperLimit: new Date(1996, 12, 31)
};

const isMillenial = (customer) => {
    return customer.dateOfBirth > millenialAgeBracket.lowerLimit
        && customer.dateOfBirth < millenialAgeBracket.upperLimit
}

const offerAvocadoOnToast = (name) => {
    `Hello, ${name}! Would you like some avocado on toast?`;
};

var millenials = customers
                    .filter(isMillenial)
                    .map(x => x.firstName);

millenials.map(offerAvocadoOnToast);
```

This could be taken right out of an industry leading CRM, but to reduce the risk of litigation I will say all of the code above is my own creation. Now you can write beautiful, functional code in over ten languages! Even PHP.