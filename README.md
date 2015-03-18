# Our Wedding
This is a website for the wedding of Jeremy Rimpo and Greta Brannan.
See the [live site](http://www.gretaandjeremy.com/)!

## Theme
The website theme is derived from ideas the Bride liked from other well-designed wedding websites but with our own spin. It's a one-page site with parallax effects with heavy imagery from our engagement photoshoot.

When building the site, the Groom kept mobile in mind from the start, using Bootstrap as a foundation and incorporating other modern tools and smart javascript to make it with the broadest support possible.

## Tools
### Backend
The backend for the website uses [October CMS](https://github.com/octobercms/october).
### Frontend
The frontend utilizes [jQuery](http://jquery.com/) and [Bootstrap 3](http://getbootstrap.com/) as a base framework. The nice thing about October CMS (and its Laravel base) is that you can directly modify the core LESS files and include them directly on the site. This is automatically compiled out and combined by the backend when the files are modified.
From here, several other JavaScript / jQuery libraries were used as tools to create other effects.
* [Skrollr](https://github.com/Prinzhorn/skrollr) was used for most of the dynamic background movements when scrolling. I had to hack around several features though, due to the website format. Elements are resized to fit the screen (to have large visible background elements), and the mobile Skrollr code didn't play well with this. While this does result in jerky element movement on mobile devices (particularly iOS), I consider it a bearable tradeoff.
* [Picturefill](https://github.com/scottjehl/picturefill) is used to offer backward compatibility with srcset and sources img attributes. I'm using these in any case where an img can be sent at a lower resolution to smaller screens. Wedding party portraits, image gallery, etc. This is in addition to media queries with a set of cropped and resized background images for smaller screens.
* [BackgroundSize Polyfill](https://github.com/louisremi/background-size-polyfill) is used to get the site moderately functional on 'older browsers'. Since IE8 still had a sizable usage, I couldn't ignore it completely.
* [Google Maps JS API](https://developers.google.com/maps/documentation/javascript/) is used to pull in maps and directions for the wedding event locations as well as the hotel.
* [printElement jQuery Plugin](https://github.com/erikzaadi/jQuery.printElement) is used in combination with Google Maps to dynamically print the directions for the displayed google maps. This is a bit buggy but usually works. Another solution may be better...
* [scrollTo jQuery Plugin](https://github.com/flesler/jquery.scrollTo) is used to provide smooth scrolling between sections when navigating the page via the menubar. Event hooks allow me to account for the navbar height and proper content positioning (which is not always the actual top of the target section).
* [PACE.js](http://github.hubspot.com/pace/docs/welcome/) was ultimately used (along with some hacks to stop it after the inital page load) since the imagery-heavy site needs to load before all the javascript is hooked in, due to the proper element sizing that needs to be done in combination with Skrollr. I use PACE's events as well as the window.onload event to run the JS hooks and show the page when ready.
* [History.js](https://github.com/browserstate/history.js/). I use History.js along with Bootstrap's Scrollspy to update the page hash when scrolling around the site.
