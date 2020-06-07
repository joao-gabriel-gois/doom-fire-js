# Doom Fire JS

Pixel art done by studying through / with Filipe Deschamps project - pure VanillaJS version, using classes instead of functions.

Implementing and reproducing the Algorithm for Epic Game Doom in JS.

As it uses exactly the same logic of the legendary game, it is not optimized at all for perfomance. Do not try to check the demo in mobile.

Basically a number range from 0 to 36 is associated with a color pallete.
By applying the algorithm, the bottom (with the most light color possible - 36) will randomly decreasing the value above and getting
darker as it go up in the table rows. 
With some control to proportionally descrease it in this fire range colors, it will bring the fire moving impression.
