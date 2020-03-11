+++
title = "Organising your code with C# nested types"
slug = "csharp-nested-types"
date = "2020-03-11"
tags = ["C#", ".NET", "code"]
categories = ["blog"]
+++

Nested types in C# have been a feature for a very long time, but I'd be lying if I found myself using them often. They have their use cases: for example, they can access private members in the containing class, and they are great for classes that won't be used outside of the file.

However, I have found another use case for them that works really well: containing your class specific validation logic. Before I demonstrate how you can do this, I'll give you a brief overview of a game I play called KeyForge. 

KeyForge is a card game from Fantasy Flight Games where you play with preconstructed, procedurally-generated decks that are completely unique. Each deck is composed of 37 cards from 3 different __Houses__. Each deck has a totally random name, and no two decks in the entire world are the same.

On a basic level, the aim of the game is to forge 3 Keys

You may wonder at this point why I am waffling on about a card game, but I promise that there is a good reason for this. For the code example in this post, I am going to build a KeyForge simulator, or at least a very small part of one.

# Defining the Types
To start with, I am currently working with