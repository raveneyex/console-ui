# Console UI

An HTML-first UI portfolio.
My goal with this file would be to document the evolution of the project: from just a bunch of static files in plain HTML/CSS/JS to wherever fate and needs take me. 
I am intentionally starting with "just the basics" and seeing how long can I resist adding bundlers, libraries, etc.

## Log

Note: I don't suffer from american brain-rot so all date formats are DD/MM/YYYY. Deal with it.

### 06/08/2023

* Created style using `radial-gradient` for the old-school background.
* Overlaying lines done using `repeating-linear-gradient`, and fixed position stretching to the four sides ensures overlay covers all page, even with scroll.
* `text-typing` animation is done be messing with the width of the container.
* the cursor blink was achieved be alternating the right-border between white and transparent
* Rendering one line at a time with pure CSS proved trickier and the 'solution' doesn't really satisfies me:
  - it involves carefully setting the `animation-delay` of the n+1 animation to the total sum of the duration of all the previous animations.
  - doable, but it felt cheap.
  - decided to bring in the JS cannons instead.
* Created a `animateText` function that receives 3 parameters:
  - `textPath`: path to a txt file with the text to animate.
  - `target`: an HTMLElement where the text will be rendered.
  - `onComplete`: a callback to execute once the animation has completed (I'm hesitant about this pattern and I'm considering changing the function to a promise that resolves once it finishes — I'll think about it.)
* The internals of `animateText` are admitedly over-engineered but I like what I did cuz not every day I get to play with generator functions:
  - I use `textPath` to fetch the text file and break it into lines.
  - I then create a generator function that will yield a promise for each line of text. 
  - All promises take a `delay` time to resolve — this is what ensures that each line has time to render and animate before the next line is added.
  - When each line resolves it is added as a child to `target`, using the `text-typing` class.
  - Once the generator is done yielding `onComplete` is called.
* For the user input I had to use hack because `textarea`s and `input`s do not resize with the content, which is exactly what I needed to get that console input feeling. So I used a `<span contenteditable>` and threw some styles in there to style it as needed.
* Added an event listener to handle the text when the user hits enter:
  - Whatever text was in the "input" is trimmed and added to the document as a new line in the console — though using a different font color to denote that it is text supplied by the user.
  - Input is deleted from the view
  - The user input command is processed - if it produces output, the input should not be rendered until all the output is rendered and animated.


### 07/08/2023

* Created a new document where I'm defining the styles needed to display work experience.
* Thinking about adding some lint and code-format rules, but I have avoided npm so far. Let's see if I can keep resisting.
  - Also considering adding a bundler, to concatenate all my CSS and JS files. Perhaps even migrating all the CSS to SASS? We'll see.
