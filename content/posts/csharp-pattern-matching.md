+++
title = "Pattern Matching in C#"
slug = "csharp-pattern-matching"

date = "2020-06-03"
tags = [".NET", "functional programming", "C#"]
categories = ["blog"]
+++

It's been a few months since my last blog post, so my new year's resolution of one blog post per month is officially dead in the water! I've had a few posts planned for a while now but in all honesty my motivation just hasn't been there to write. The lockdown has taken a lot from people both physically and mentally, myself included, so I made a deal with myself to take a break from any tech related hobby projects until I felt okay again. The deal worked out quite well for me, as I'm now back with a recharged mind, so expect normal scheduling to resume. Now I'm done pouring my heart out, let's get to the interesting bit!

I'm a big fan of F# and functional programming in general, and when people ask me what I like in particular about F# I immediately mention pattern matching. F# has had incredibly powerful pattern matching support available for a long time, but over time this functionality has been added to C# as well. In this post I will show off a few ways that you can use pattern matching to improve your C# code.

# Type checking

You can use the `is` keyword to check that an expression or value maps to a given type, and optionally provide a new variable name to output the result of that mapping to. For instance, imagine we have a method that takes a list of nullable integers and we need to return the sum of those integers:
```csharp
static int GetTotal(IEnumerable<int?> numbers)
{
    var total = 0;

    foreach (var number in numbers)
    {
        if (number.HasValue)
        {
            total += number.Value;
        }
    }

    return total;
}
```

This code is _fine_, but could be made a lot nicer by using the `is` keyword:
```csharp
static int GetTotal(IEnumerable<int?> numbers)
{
    var total = 0;

    foreach (var number in numbers)
    {
        if (number is int i)
        {
            total += i;
        }
    }

    return total;
}
```

And for those of us programming in a post-LINQ world, we could replace all of this with a single line of code:
```csharp
numbers.Sum(n => n is int i ? i : 0);
```

# *When* patterns

You can use a *when* pattern on a switch case to add further filtering to the condition. Here we have the traditional FizzBuzz program:

```csharp
static void FizzBuzz()
{
    foreach (var i in Enumerable.Range(1, 100))
    {
        if (i % 3 == 0 && i % 5 == 0)
        {
            Console.WriteLine("FizzBuzz");
            continue;
        }
        if (i % 3 == 0)
        {
            Console.WriteLine("Fizz");
            continue;
        }
        if (i % 5 == 0)
        {
            Console.WriteLine("Buzz");
            continue;
        }
        else
        {
            Console.WriteLine(i);
        }
    }
}
```

For those not aware of what FizzBuzz is:

```
Loop through each number from 1 to 100.

If the number is divisible by 3, print Fizz.

If the number is divisible by 5, print Buzz.

If the number is divisible by both 3 and 5, print FizzBuzz.

Otherwise, just print the number.
```

We can convert this into a switch statement and use `when` patterns, which looks like this:
```csharp
static void FizzBuzz()
{
    foreach (var i in Enumerable.Range(1, 100))
    {
        switch (i)
        {
            case int num when num % 3 == 0 && num % 5 == 0:
                Console.WriteLine("FizzBuzz");
                continue;
            case int num when num % 3 == 0:
                Console.WriteLine("Fizz");
                continue;
            case int num when num % 5 == 0:
                Console.WriteLine("Buzz");
                continue;
            default:
                Console.WriteLine(i);
                continue;
        }
    }
}
```

If we're really being fancy, we can use the brand spanking new switch expressions that shipped in C# 8:

```csharp
static void FizzBuzz()
{
    Enumerable.Range(1, 100).Select(number => {
        return number switch
        {
            _ when number.DivisibleBy(3) && number.DivisibleBy(5) => "FizzBuzz",
            _ when number.DivisibleBy(3) => "Fizz",
            _ when number.DivisibleBy(5) => "Buzz",
            _ => number.ToString()
        };
    });
}

// I like to use extension methods to make my logic clearer.
static bool DivisibleBy(this int x, int y) => x % y == 0;
```

__Bonus: use *when* patterns on your catch statements!__

```csharp
try
{
    var responseText = await streamTask;
    return responseText;
}
catch (HttpRequestException e) when (e.Message.Contains("404"))
{
    return "Page Not Found";
}
catch (HttpRequestException e)
{
    return e.Message;
}
```

# Positional patterns

When dealing with tuples in C#, you may or may not know that you can match against the values like this:
```csharp
var tuple = (1, 2);

if (tuple is (1, 2))
{
    // ...
}

switch (tuple)
{
    case (2, 2):
        // ...
}
```

As of C# 8, you are able to use this positional matching on classes too. The only requirement is that you have a `Deconstruct` method on the class in question, as demonstrated here:
```csharp
public class Coordinate
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Z { get; set; }

    public void Deconstruct(out int x, out int y, out int z)
    {
        x = X;
        y = Y;
        z = Z;
    }
}
```

Before this, checking multiple properties on this `Coordinate` class would look like this:

```csharp

if (coords.X == 6 && coords.Y == 6 && coords.Z == 6)
{
    // ...
}

```

Whereas now, you can do it like this:

```csharp
if (coords is (6, 6, 6))
{
    // ...
}
```

# Property patterns

How many times have you written code like this?

```csharp

if (employee.JobTitle == "Software Engineer" && employee.Gender == Gender.Female)
{
    // ...
}

```

It gets the job done, but in C# 8 you are able to do this:

```csharp
if (employee is { JobTitle: "Software Engineer", Gender: Gender.Female })
{
    // ...
}
```

In this particular example, it doesn't really look a great deal better, but I feel that it really shines when used in LINQ queries:

```csharp
var femaleDevelopers = employees.Where(e => e is
{
    JobTitle: "Software Engineer",
    Gender: Gender.Female
});
```

You are able to nest these property matches too, allowing for incredibly powerful querying potential:

```csharp
var femaleDevelopersWorkingForBob = employees.Where(e => e is
{
    JobTitle: "Software Engineer",
    Gender: Gender.Female,
    Manager: { FirstName: "Bob" }
});
```

# BONUS: Make your generic code more exclusive

Generic classes and interfaces have had the ability to set criteria on the type arguments passed in for a long time, so I'm guessing most of this will be common knowledge. You can use the `where` keyword to specify criteria in order for a type to be passed as an argument. For example:
```csharp
public interface IDomainService<T> where T : IDomainEntity
{
    // The type argument must implement IDomainEntity
}

public interface IFactory<T> where T : new()
{
    // The type argument must have a parameterless constructor
}
```

This is very useful to use when you want your code to be generic, but not _too_ generic.

# Looking forward to the future

As I was writing this post, Microsoft released their [preview for C# 9](https://devblogs.microsoft.com/dotnet/welcome-to-c-9-0/), which has further expanded the pattern matching toolkit of C#.

### Relational Patterns

You will be able to use relational operators such as `>` as part of your pattern matching statements. For example:

```csharp
bool IsGreaterThanTen(int x)
{
    return x switch
    {
        > 100 => true,
        _ => false
    };
}
```

### Logical Patterns

You will also be able to use logical operators such as `and`, `or`, and `not` in your pattern matches. For example:

```csharp
bool GreaterThanTenLessThanOneHundred(int x)
{
    return x switch
    {
        > 10 and < 100 => true,
        _ => false
    };
}
```

# Final thoughts

As you can see, pattern matching is an incredibly powerful feature set of the C# language and is probably only going to get better as functional programming slowly takes over the world. One thing to be wary of, however, is to make sure you don't sacrifice the readability of your code for the sake of using pattern matching. This is something I am constantly battling with in my own code, and a general rule is to use pattern matching if it improves the readability of the code, but don't sacrifice readability for the sake of being a clever clogs.