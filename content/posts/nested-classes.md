+++
title = "Organising your code with C# nested types"
slug = "csharp-nested-types"
date = "2020-03-11"
tags = ["C#", ".NET", "code"]
categories = ["blog"]
+++
# Introduction

Nested types in C# have been a feature for a very long time, but I'd be lying if I found myself using them often. They have their use cases: for example, they can access private members in the containing class, and they are great for classes that won't be used outside of the file.

However, I have found another use case for them that works really well: containing your class specific validation logic. Before I demonstrate how you can do this, I'll give you a brief overview of a game I play called KeyForge. 

KeyForge is a card game from Fantasy Flight Games where you play with preconstructed, procedurally-generated decks that are completely unique. Each deck is composed of 37 cards from 3 different __Houses__. Each deck has a totally random name, and no two decks in the entire world are the same. On a basic level, the aim of the game is to forge 3 __Keys__, which is done by spending __Aether__.

You may wonder at this point why I am waffling on about a card game, but I promise that there is a good reason for this. For the code example in this post, I am going to build a KeyForge simulator, or at least a very small part of one.

# Deck Creation Logic

KeyForge is a massive game with lots of rules, and I could write an entire blog's worth of content just expressing these rules as code. Unfortunately, I don't have that much time, so for the sake of this blog post I'm going to just focus on the rules for a deck to be valid.

## Types

Just to make this easy to follow, these are the types referenced in the __Deck__ class:

```csharp
public class Card
{
    public int Number { get; set; }
    public string Name { get; set; }
    public House House { get; set; }
    public Type Type { get; set; }
}

public enum House
{
    Brobnar,
    Dis,
    Logos,
    Mars,
    Sanctum,
    Shadows,
    Untamed
}

public enum Type
{
    Action,
    Artifact,
    Creature,
    Upgrade
}
```

And the Deck class looks like this:
```csharp
public class Deck
{
    public string Name { get; set; }
    public (House, House, House) Houses { get; set; }
    public IEnumerable<Card> Cards { get; set; }

    public Deck(string name, (House, House, House) houses, IEnumerable<Card> cards)
    {
        this.Name = name;
        this.Houses = houses;
        this.Cards = cards;
    }
}
```

# Writing some validation logic

Now, good coding principles dictate that we should validate these parameters to ensure that they will create a deck that is valid by KeyForge rules. Lets remind ourselves of these rules:

* Consists of 37 cards
* Composed of three different houses
* All cards within the deck must be one of the three houses of the deck
* Valid name

If we were to write these rules as code, it would look like this:
```csharp
public class Deck
{
    public string Name { get; set; }
    public (House, House, House) Houses { get; set; }
    public IEnumerable<Card> Cards { get; set; }

    public Deck(string name, (House houseOne, House houseTwo, House houseThree) houses, IEnumerable<Card> cards)
    {
        if (cards.Count() != 37) 
            throw new Exception();

        if (houses.ItemOne == houses.houseTwo || houses.houseOne == houses.houseThree
            || houses.houseTwo == houses.houseThree)
                throw new Exception();

        if (cards.Any(card => card.House != houses.houseOne
            && card.House != houses.houseTwo
            && card.House != houses.houseThree))
                throw new Exception();

        if (string.IsNullOrWhiteSpace(name))
            throw new Exception();

        this.Name = name;
        this.Houses = houses;
        this.Cards = cards;
    }
}
```

Our code now validates all input prior to creating a new Deck object, but the constructor now has a lot of noise that makes it less readable. In my opinion, any public facing method should have as little of this noise as possible, instead abstracting it away to private methods, or into a local function if the code will not be used outside of the current method. For example, lets refactor the code to use local functions:

```csharp
public class Deck
{
    public string Name { get; set; }
    public (House, House, House) Houses { get; set; }
    public IEnumerable<Card> Cards { get; set; }

    public Deck(string name, (House houseOne, House houseTwo, House houseThree) houses, IEnumerable<Card> cards)
    {
        bool cardCountIncorrect(IEnumerable<Card> cards) =>
            cards.Count() != 37;

        bool twoHousesTheSame((House houseOne, House houseTwo, House houseThree) houses) =>
            houses.ItemOne == houses.houseTwo 
            || houses.houseOne == houses.houseThree
            || houses.houseTwo == houses.houseThree;
        
        bool cardsNotInCorrectHouses(IEnumerable<Card> cards) =>
            cards.Any(card => card.House != houses.houseOne
                && card.House != houses.houseTwo
                && card.House != houses.houseThree);

        bool invalidName(string name) =>
            string.IsNullOrWhiteSpace(name);

        if (cardCountIncorrect(cards)) 
            throw new Exception();

        if (twoHousesTheSame(houses))
            throw new Exception();

        if (cardsNotInCorrectHouses(cards))
            throw new Exception();

        if (invalidName(name))
            throw new Exception();

        this.Name = name;
        this.Houses = houses;
        this.Cards = cards;
    }
}
```

While we're at it, let's combine our local functions into a single if statement and reduce the repetition of `throw new Exception();`:

```csharp
public class Deck
{
    public string Name { get; set; }
    public (House, House, House) Houses { get; set; }
    public IEnumerable<Card> Cards { get; set; }

    public Deck(string name, (House houseOne, House houseTwo, House houseThree) houses, IEnumerable<Card> cards)
    {
        bool cardCountIncorrect(IEnumerable<Card> cards) =>
            cards.Count() != 37;

        bool twoHousesTheSame((House houseOne, House houseTwo, House houseThree) houses) =>
            houses.ItemOne == houses.houseTwo 
            || houses.houseOne == houses.houseThree
            || houses.houseTwo == houses.houseThree;
        
        bool cardsNotInCorrectHouses(IEnumerable<Card> cards) =>
            cards.Any(card => card.House != houses.houseOne
                && card.House != houses.houseTwo
                && card.House != houses.houseThree);

        bool invalidName(string name) =>
            string.IsNullOrWhiteSpace(name);

        if (cardCountIncorrect(cards) || twoHousesTheSame(houses)
            || cardsNotInCorrectHouses(cards) || invalidName(name)) 
                throw new Exception();

        this.Name = name;
        this.Houses = houses;
        this.Cards = cards;
    }
}
```

I like local functions: they are one of my favourite features of C# because of their ability to make meaty conditions more readable without polluting the scope of the class with single use methods. The constructor validation should now be far more readable than it was before, which is good, but I think we can do better than this.

# Encapsulating our validation logic

So far, we've got our code to a more readable format, but wouldn't it be great if we could encapsulate this validation logic in it's own static class?

```csharp
public static class DeckValidation
{
    private const int DeckCount = 37;

    public static bool InvalidParameters(IEnumerable<Card> cards, (House, House, House) houses, string name) =>
        InvalidName(name) || InvalidHouses(houses) || InvalidCardCount(cards) || InvalidCardHouses(cards, houses);

    private static bool InvalidName(string name) => string.IsNullOrWhiteSpace(name);

    private static bool InvalidHouses((House houseOne, House houseTwo, House houseThree) houses) =>
        houses.houseOne == houses.houseTwo
            || houses.houseOne == houses.houseThree
            || houses.houseTwo == houses.houseThree;

    private static bool InvalidCardCount(IEnumerable<Card> cards) =>
        cards.Count() != DeckCount;

    private static bool InvalidCardHouses(IEnumerable<Card> cards, 
        (House houseOne, House houseTwo, House houseThree) houses => 
            cards.Any(card =>
                card.House != houses.houseOne
                && card.House != houses.houseTwo
                && card.House != houses.houseThree);
}
```

So now, our constructor looks like this:

```csharp
public Deck(string name, (House houseOne, House houseTwo, House houseThree) houses, IEnumerable<Card> cards)
{
    if (DeckValidation.InvalidParameters(name, houses, cards)) 
        throw new Exception();

    this.Name = name;
    this.Houses = houses;
    this.Cards = cards;
}
```

Our constructor now has considerably less noise and is very clear to understand what it is doing. However, in order to finish this off, I'm going to move this class declaration within the `Deck` class, make it private and change it's public method to internal. This means the validation logic specific to this class is not freely available outside of where it's needed and also not causing name pollution within the class:

```csharp
public class Deck
{
    public string Name { get; set; }
    public (House, House, House) Houses { get; set; }
    public IEnumerable<Card> Cards { get; set; }

    public Deck(IEnumerable<Card> cards, (House, House, House) houses, string name)
    {
        if (DeckValidation.InvalidParameters(cards, houses, name))
            throw new InvalidOperationException();

        Cards = cards;
        Houses = houses;
        Name = name;
    }

    static class DeckValidation
    {
        private const int DeckCount = 37;

        internal static bool InvalidParameters(IEnumerable<Card> cards, (House, House, House) houses, string name) =>
            InvalidName(name) || InvalidHouses(houses) || InvalidCardCount(cards) || InvalidCardHouses(cards, houses);

        private static bool InvalidName(string name) => string.IsNullOrWhiteSpace(name);

        private static bool InvalidHouses((House houseOne, House houseTwo, House houseThree) houses) =>
            houses.houseOne == houses.houseTwo
                || houses.houseOne == houses.houseThree
                || houses.houseTwo == houses.houseThree;

        private static bool InvalidCardCount(IEnumerable<Card> cards) =>
            cards.Count() != DeckCount;

        private static bool InvalidCardHouses(IEnumerable<Card> cards, 
            (House, House, House) houses) => 
                cards.Any(card =>
                    card.House != houses.Item1
                    && card.House != houses.Item2
                    && card.House != houses.Item3);
    }
}
```

Perfect.