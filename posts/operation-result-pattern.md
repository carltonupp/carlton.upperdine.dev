---
title: "The Operation Result Pattern"
blurb: "Stop relying on booleans to represent the outcome of an operation."
date: "2022-04-26"
slug: "operation-result-pattern"
---

The idea of a binary decision can be found in many places in our field : **true
**or **false**, **1** or **0**, **tabs** or **spaces** - it's either one or the
other, though in the last example there is only real choice...

We can model a simple binary decision in our code by using a **boolean** type,
but what do we do when our operation has more than two possible outcomes? In
this post, I will outline a common pattern for accomplishing this, and introduce
the **Operation Result** pattern.

In the interest of making this a simple example to follow, we will begin by
considering the following piece of code:

```csharp
public class BankAccount
{
    public decimal Balance { get; private set; }
    
    public bool Withdraw(decimal amount)
    {
        if (Balance - amount >= 0)
        {
            Balance -= amount;
            return true;
        }

        return false;
    }
}
```

Looking at the `Withdraw` method, we can see that it first checks that there are
sufficient funds to withdraw the desired amount, and if so it will subtract the
amount from the balance and return `true`. If there are insufficient funds in
the account it will simply return `false`. Think about what is wrong with this.

A returned result of `false` in this situation could mean several things.
Perhaps the account simply has insufficient funds, but what if the account does
have funds but has been frozen for suspicious activity? Or perhaps this
transaction would surpass the daily withdrawal limit? Lets implement these
situations to illustrate the issue:

```csharp
public class BankAccount
{
    public AccountStatus AccountStatus { get; private set; }
    public decimal Balance { get; private set; }

    private const decimal DailyWithdrawalLimit = 300.00m;

    private ICollection<decimal> WithdrawalsToday;

    public bool Withdraw(decimal amount)
    {
        // return false if the account is frozen
        if (AccountStatus is AccountStatus.Frozen)
            return false;

        // return false if the daily withdrawal limit
        // would be exceeded by this transaction
        if (WithdrawalsToday.Sum() + amount > DailyWithdrawalLimit)
            return false;
        
        // check that the account has sufficient funds
        if (Balance - amount >= 0)
        {
            Balance -= amount;
            WithdrawalsToday.Add(amount);
            return true;
        }

        // return false if the account has insufficient funds
        return false;
    }
}
```

A very common pattern used here would be to throw exceptions for the failure
paths, creating custom exception types to map to real world business cases:

```csharp
public class BankAccount
{
    public AccountStatus AccountStatus { get; private set; }
    public decimal Balance { get; private set; }

    private const decimal DailyWithdrawalLimit = 300.00m;

    private ICollection<decimal> WithdrawalsToday;

    public bool Withdraw(decimal amount)
    {
        // return false if the account is frozen
        if (AccountStatus is AccountStatus.Frozen)
            throw new AccountFrozen();

        // return false if the daily withdrawal limit
        // would be exceeded by this transaction
        if (WithdrawalsToday.Sum() + amount > DailyWithdrawalLimit)
            throw new WithdrawalLimitExceeded();
        
        // check that the account has sufficient funds
        if (Balance - amount >= 0)
        {
            Balance -= amount;
            WithdrawalsToday.Add(amount);
            return true;
        }

        throw new InsufficientFunds();
    }
}
```

As far as handling the failure paths is concerned, this is a massive improvement
and the code is incredibly simple to follow thanks to our custom exception
types. If you've ever read anything about Domain Driven Design, you'll know that
you should write your code using the ubiquitous language of the domain, and each
potential outcome from the method should represent a unique business scenario.

However, me being the pedant that I am, I now see that a boolean isn't really a
sufficient return type anymore: the method either returns `true` or throws an
exception. One change I could make here is to change the return value to a
decimal and return the new balance, but that doesn't feel very intuitive either.
This lone decimal value could represent any value, and offers no context to what
it represents short of looking into the method.

## Introducing the Operation Result pattern

The Operation Result pattern, Result Object pattern, or even just Result pattern
is a design pattern where you return the outcome of an operation as an object
containing the result and any accompanying values. If you've ever written code
in F#, you'll know that this is built into the language and is also used by a
lot of packages that you have probably used such as `FluentValidator`.

By returning even our failure results as result objects, we are able to avoid
nesting our code in `try..catch..finally` statements and just work with the
outcome of a method. In it's simplest form, we can just create a record type and
refactor our code to use it like this:

```csharp
public record WithdrawalResult(bool Success, string Reason = null);

public class BankAccount
{
    public AccountStatus AccountStatus { get; private set; }
    public decimal Balance { get; private set; }

    private const decimal DailyWithdrawalLimit = 300.00m;

    private ICollection<decimal> WithdrawalsToday;

    public WithdrawalResult Withdraw(decimal amount)
    {
        // return false if the account is frozen
        if (AccountStatus is AccountStatus.Frozen)
            return new WithdrawalResult(false, 
                "Account is frozen due to suspicious activities");

        // return false if the daily withdrawal limit
        // would be exceeded by this transaction
        if (WithdrawalsToday.Sum() + amount > DailyWithdrawalLimit)
            return new WithdrawalResult(false, 
                "Daily withdrawal limit has been exceeded");
        
        // check that the account has sufficient funds
        if (Balance - amount >= 0)
        {
            Balance -= amount;
            WithdrawalsToday.Add(amount);
            return new WithdrawalResult(true);
        }

        return new WithdrawalResult(false, 
            "Account has insufficient funds");
    }
}
```

This is an improvement on the initial design of the method, and if we need more
information on why the operation failed, we have a reason built right into the
object. For fairly simple use cases this is perfectly sufficient, but in our
scenario I see two issues with this code in it's current state:

- Lets say that we wanted to perform an action specifically if the withdrawal
  failed due to the account being frozen: we would need to check the `Reason`
  value against a hard-coded string, which is a terrible idea.
- The `Reason` property on a successful result object is completely unused. Any
  type with properties only used in a particular use case is not a well designed
  one, and in a way a violation of the Interface Segregation principle, even
  though we aren't using an interface here.

By creating a separate record type for success and failure results, we are able
to keep the failure specific properties away from successful results:

```csharp
public abstract record WithdrawalResult(bool Success);
public record WithdrawalSuccess() : WithdrawalResult(true);
public record WithdrawalFailure(string Reason) : WithdrawalResult(false);

public class BankAccount
{
    public AccountStatus AccountStatus { get; private set; }
    public decimal Balance { get; private set; }

    private const decimal DailyWithdrawalLimit = 300.00m;

    private ICollection<decimal> WithdrawalsToday;

    public WithdrawalResult Withdraw(decimal amount)
    {
        // return false if the account is frozen
        if (AccountStatus is AccountStatus.Frozen)
            return new WithdrawalFailure( 
                "Account is frozen due to suspicious activities");

        // return false if the daily withdrawal limit
        // would be exceeded by this transaction
        if (WithdrawalsToday.Sum() + amount > DailyWithdrawalLimit)
            return new WithdrawalFailure( 
                "Daily withdrawal limit has been exceeded");
        
        // check that the account has sufficient funds
        if (Balance - amount >= 0)
        {
            Balance -= amount;
            WithdrawalsToday.Add(amount);
            return new WithdrawalSuccess();
        }

        return new WithdrawalFailure(
            "Account has insufficient funds");
    }
}
```

You are also able to utilise C# pattern matching capabilities on these objects,
which can be extremely powerful:

```csharp
var withdrawalResult = _bankAccount.Withdraw(250);
if (withdrawalResult is WithdrawalFailure failure)
{
    _logger.LogInformation("Withdrawal failed. Reason: {Reason}",
        failure.Reason);
}
```

This fixes one of the issues I saw in the code, but this approach would still
require programming against string values if we wanted to program against
specific failure outcomes.

Just as I mentioned earlier in the post when we were talking about custom
exceptions, we should treat every failure scenario as a unique business outcome,
meaning we should create a result object for every possible outcome scenario.
This allows us to use pattern matching even further and also add additional
properties for each scenario. Let's say we need the following information in
each of the following scenarios:

- If the withdrawal is successful, return the new account balance
- If the withdrawal fails due to insufficient funds, return the current account
  balance
- If the withdrawal fails due to the withdrawal limit being exceeded, return the
  maximum amount that the account holder can withdraw for the rest of the day
- If the account is frozen, return a more detailed reason as to why the account
  was frozen.

Modelling that in our code, we will come up with the following types:

```csharp
public abstract record WithdrawalResult(bool Success);
public abstract record WithdrawalFailure(string Reason) : WithdrawalResult(false);
public record WithdrawalSuccess(decimal NewBalance) : WithdrawalResult(true);

public record InsufficientFunds(decimal CurrentBalance) 
    : WithdrawalFailure("Account has insufficient funds");

public record WithdrawalLimitExceeded(decimal MaximumWithdrawalAmount)
    : WithdrawalFailure("Daily withdrawal limit has been exceeded");

public record AccountIsFrozen(string SuspiciousActivity)
    : WithdrawalFailure($"Account is frozen due to suspicious activities: {SuspiciousActivity}");
```

And then we can use them in our method like this:

```csharp
public class BankAccount
{
    public AccountStatus AccountStatus { get; private set; }
    public decimal Balance { get; private set; }

    private const decimal DailyWithdrawalLimit = 300.00m;

    private ICollection<decimal> WithdrawalsToday;

    public WithdrawalResult Withdraw(decimal amount)
    {
        // return false if the account is frozen
        if (AccountStatus is AccountStatus.Frozen)
            return new AccountIsFrozen("Fraudulent Transactions");

        // return false if the daily withdrawal limit
        // would be exceeded by this transaction
        if (WithdrawalsToday.Sum() + amount > DailyWithdrawalLimit)
            return new WithdrawalLimitExceeded(
                DailyWithdrawalLimit - WithdrawalsToday.Sum());
        
        // check that the account has sufficient funds
        if (Balance - amount >= 0)
        {
            Balance -= amount;
            WithdrawalsToday.Add(amount);
            return new WithdrawalSuccess(Balance);
        }

        return new InsufficientFunds(Balance);
    }
}
```

Now we have a more type-safe way of programming against each of our result
scenarios:

```csharp
if (withdrawalResult is InsufficientFunds insufficientFunds)
    _logger.LogInformation("The most you can withdraw is {CurrentBalance}", 
        insufficientFunds.CurrentBalance);
```

What I have shown here are 3 levels to the Operation Result pattern, depending
the complexity of your use case. Uncle Bob once said that clean code reads like
well-written prose, and by mapping each of our outcomes to Plain English
descriptions of real world scenarios, we are able to follow along our code
without having to translate what a boolean means in each scenario.

I have been using this pattern recently in a massive refactor job I have
undertaken and it has made the code infinitely more comprehensible. Record Types
in C# have been a total game changer for this approach, but you are perfectly
fine just using regular classes if you aren't able to use record types in your
environment or language of choice.

This pattern isn't really documented on any large sites and I hope that this
article can shine a light on this lesser known design pattern. Remember that the
best solution is always the simplest one that you can get away with, and
readability is more important than cleverness.
