supersizr
=========

## WHAT
jQuery plugin to adjust elements font-size to fit max-width of container

## WHY 
[Fittext](http://fittextjs.com/) and [bigText](http://www.zachleat.com/web/bigtext-makes-text-big/) are very nice scripts but did not work as expected in my environment.

supersizr basically adds a more accurate yet simpler algorithm, but also better encapsulation, a destroy method that resets to previous CSS values (uses jquery data), a debouncer to avoid excessive calculations…

## HOW
### common use
Add the jquery and supersizr scripts in your page and call it as in:
```
  $("h1 span").supersizr( );
```
This example will take any `span` descendant of an `h1` and fit it to `h1` width (reduce or enlarge)
### options
You can override default settings:
```
  $("h1 span").supersizr( {"minSize": 20, "maxSize": 200, "preserveLineHeight": 1} );
```
minSize and maxSize are quite self-explainatory. 
preserveLineHeight calculates takes line-height/font-size ratio and applies it to adjust line-height after each element has been fitted.

## Dependencies:
[jQuery](http://jquery.com/) (should work from v1.7 or newer; only tested on 1.8)

## Todo:
* check external font (either google/typekit… or font-face) is ready before create/init
* new setting to keep perceived margin instead of adjusting line-height in linear proportion

## Known issues 
* Sometimes final width of an element is 1px bigger/smaller than it should. Normally you will use padding on the container, which masks the issue quite well, otherwise this can be a problem. Note: although width is 1px wrong we are using white-space: nowrap for the calculations, thus elements will always fit in one line.

## Complaints?
Use the issue tracker, send pull requests, the usual polite manners. Thanx.

## License
Eat it, burn it, use it at your own risk. Or even better, dont use it! ^_^
