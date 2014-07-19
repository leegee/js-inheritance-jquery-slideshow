js-inheritance-jquery-slideshow
===============================

An illustration of inhertiance by prototype in Javascript through an HTML slideshow, showing require.js integration.

Boiler plate by [HTML5 Boilerplate](http://html5boilerplate.com).

* Slideshow has Slides
* Word2ImgSlideshow isa Slideshow, Word2ImgSlide isa Slide
* QuizSlideshow isa Word2ImgSlideshow isa Slideshow, Quizslide isa Word2ImgSlide isa Slide

For The Novice: OO to ES5
-------------------------
There are no classes in ES5 (aka 'JavaScript') — only prototypes.
Prototypes describe objects. Objects can be instantiated to an interface
defined in any object prototype — this is effectively inheritance.

    Slideshow = function () {}

`Slideshow` is now a reference to a function.
The function prototype allows inheritance thus:

    Word2ImgSlideshow.prototype = Object.create( Slideshow.prototype );

The assignation effectively clones the interface defined in
`Slideshow.prototype`. Having done that, we have set all the properties
of the one prototype to be identical to the other — including the
special 'system property,' `.construtor`, which is the base function
for the prototype we are defining (here called `Word2ImgSlideshow`):
it needs reverting with a redefinition:

    Word2ImgSlideshow.prototype.constructor = Word2ImgSlideshow;

The code in this package uses several techniques that are common but
by no means standard:

  * `Word2ImgSlideshow.prototype.moduleName` simply allows for easy identification in `console` dumps, and has no other significance.
  * `Word2ImgSlideshow.prototype.parent` holds the prototype of the super- or parent class: it is merely a convenience for the subclass' reference: one could equally explicitly write the literal `Slideshow.prototype`, but it is long-winded, makes the model overly concrete for natural reading, and means there are more strings to update when changing the parent class.
  * `Word2ImgSlideshow.prototype.defaults` is a handy way of passing around default object properties.

