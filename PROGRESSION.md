# v0.1.0

The time it takes to "complete" the game should be about 2-4 weeks. I do plan on adding more features, but for someone to buy all the food items and cat toys and hire all the baristas should take 2-4 weeks.

There is some RNG in the game for which and how many cats show up and the player might not login in every day, but this varibility is still just a guess.

There should be a balance between buying cat toys, menu items, and hiring baristas. I think it makes sense to have items cost more exponentially so that the best stragety isn' to immediatly buy all the cat toys.

(All these values are sort of arbitrary.)

It makes sense to pick the starting and ending values as a guide.

| Time  | Name               |   Price |
| ----- | ------------------ | ------: |
| Start | cardboard box      |      10 |
| End   | a new, larger cafe | 100,000 |

The different progression items are as follows

- cardboard box
- ball
- normal cat bed
- frog cat bed
- cat tree

- matcha tea
- black tea
- baconeggandchese sandwich
- cinnamon rolls
- pancakes

- Axel O
- Axel Z
- Annabelle
- Oli

thats 14 things to buy
when someone just starts out, they should make ~20 a day
half way through, they should be making 1k a day
when someone owns all of them, they should be making ~20k a day

(86400 seconds in a day)

now we can calculate the amount someone earns per second. `average_cats` is a function that takes in the number of owned cat toys and returns the average number of cats that show up per day.

```
(MENU_BONUS[0] + BARISTA_BONUS[1]) * CAT_BONUS[average_cats([1])] * 86,400 = 20
```

```
(MENU_BONUS[4] + BARISTA_BONUS[2]) * CAT_BONUS[average_cats([3])] * 86,400 = 1000
```

```
(MENU_BONUS[5] + BARISTA_BONUS[4]) * CAT_BONUS[average_cats([5])] * 86,400 = 20,000
```

chosing some arbitrary values for `CAT_BONUS` we get

```tex
(MENU_BONUS[0] + BARISTA_BONUS[1]) * 1.5 * 86,400 = 20
```

```tex
(MENU_BONUS[4] + BARISTA_BONUS[2]) * 4   * 86,400 = 1000
```

```tex
(MENU_BONUS[5] + BARISTA_BONUS[4]) * 10  * 86,400 = 20,000
```

clumping `MENU_BONUS` and `BARISTA_BONUS` into a single variable we get

`x * 1.5 * 86,400 = 20`
`y * 4   * 86,400 = 1000`
`z * 10  * 86,400 = 20,000`

`x = 0.000154320987654`
`y = 0.00289351851852`
`z = 0.0231481481481`

doing an exponential fit [Wolfram](https://www.wolframalpha.com/input?i=exponential+fit+%281%2C0.0001543209876549%29%2C%287%2C0.00289351851852%29%2C%2814%2C0.0231481481481%29) resutls in

`f(x) = 0.000349735763435 e^(0.299472834005 x)`
where `x` is some combindation of `MENU_BONUS` and `BARISTA_BONUS`

playing around on [Desmos](https://www.desmos.com/calculator/8xc8di3v4m) with the combinations where menu items should help out more early game and baristas should help out late game we land with

`menu(x) = 0.0003e^(0.25x)`
`barista(x) = 0.00015e^(1.25x)`

which fit our original function pretty well with the points

`f(1) = menu(0) + barista(1)`
`f(7) = menu(4) + barista(2)`
`f(14) = menu(5) + barista(4)`

now we can make some buying pattern for the different items

starting (20)

- first barista (10)
- cat toy (box) (10)

next days

- menu
- cat toy
- menu
- cat toy
- menu
- barista
- menu

then we know that the next item should cost around as much as the player was able to make the previous day. The average cat bonuses per day are `[1.5,2,3,5,10]`

| Item              | Formula              | Cost  |
| ----------------- | -------------------- | ----- |
| black tea         | (m(0) + b(1))\*c(1)  | 100   |
| ball              | (m(1) + b(1))\*c(1)  | 120   |
| matcha tea        | (m(1) + b(1))\*c(2)  | 150   |
| normal cat bed    | (m(2) + b(1))\*c(2)  | 175   |
| pancakes          | (m(2) + b(1))\*c(3)  | 250   |
| Annabelle         | (m(3) + b(1))\*c(3)  | 500   |
| frog cat bed      | (m(3) + b(2))\*c(3)  | 750   |
| Axel Z            | (m(3) + b(2))\*c(4)  | 1000  |
| baconeggandcheese | (m(3) + b(3))\*c(4)  | 3000  |
| cat tree          | (m(4)) + b(3))\*c(4) | 5000  |
| cinnamon rolls    | (m(4)) + b(3))\*c(5) | 7500  |
| Oli               | (m(5)) + b(3))\*c(5) | 10000 |

Now to figure out the actual cat bonuses given the averages per day. This a combination of how many cats appear per day and the chance of getting a rare cat vs a common cat.

| Chance of getting x cats | Chance of getting common/rare cat |
| ------------------------ | --------------------------------- |
| [0.4, 0.3, 0.25, 0.05]   | [0.7, 0.3]                        |
| [0.2, 0.4, 0.3, 0.1]     | [0.65, 0.35]                      |
| [0.15, 0.25, 0.4, 0.20]  | [0.6, 0.4]                        |
| [0.1, 0.25, 0.4, 0.25]   | [0.55, 0.45]                      |
| [0.05, 0.15, 0.4, 0.4]   | [0.5, 0.5]                        |

they are about the vaules poposed `[1.5,2,3,5,10]`

In hindsight, choosing the end value for money per day was very stupid. I could have just done this calculation and I wouldn't need to have done all that math. Lessons for the future.

## Ideas for the future

- some sort of cat treat that you have to buy in advance to make a specific cat like you more and show up more often
