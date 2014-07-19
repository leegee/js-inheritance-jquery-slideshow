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

`Slideshow` is now a reference to a function (`typeof Slideshow === 'function'`).
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
  * `Word2ImgSlideshow.prototype.defaults` is a handy way of passing around default object properties.

There is another widely adovcated convention that I have tried, but
do not support, that of a `.parent` property holding a reference to
the prototype of the super- or parent-class:

    Word2ImgSlideshow.prototype.parent = Slideshow.prototype;

It is said to be a convenience for the subclass' reference, saving one
from explicitly writing the literal `Slideshow.prototype`, but less
long-winded, more semantically valuable, and making less strings to update
when changing the parent class. However:

  1. `A` isa `object`
  1. `B` isa `A`, `B.prototype.parent` isa `A`
  1. `B.prototype.contrcutor` calls `B.prototype.parent.constructor` (ie `A`)
  1. `C` isa `B`, `C.prototype.parent` isa `B`
  1. `C.prototype.contrcutor` calls `C.prototype.parent.constructor` (ie `B`)

But because the calls to the constructors are made in the context of
the caller — and not of an instance of the parent — the prototyped
value of `B.parent` is replaced with that of `C.parent`.

