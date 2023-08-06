# Console UI

An HTML-first UI portfolio.
My goal with this file would be to document the evolution of the project: from just a bunch of static files in plain HTML/CSS/JS to wherever fate and needs take me.

## Log

Note: I don't suffer from american brain-rot so all date formats are DD/MM/YYYY. Deal with it.

### 06/08/2023

Started by creating a root folder for the project which I very uncreatively dubbed `console-ui`; and then added folders for the HTML, CSS, and JS:

```
> mkdir console-ui
> mkdir console-ui/html
> mkdir console-ui/css
> mkdir console-ui/js
```

For the initial code in `index.html` a basic HTML snippet + a few lines copied from wherever, wrapped in `<pre><output>` tags to keep the text's format.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Console UI</title>
  </head>
  <body>
    <pre>
      <output>
        ❯ git init .
        hint: Using 'master' as the name for the initial branch.
      </output>
    </pre>
  </body>
</html>
```

Then some HTML links to download a better font and use our CSS files:

```
<head>
  ...
  <!-- Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- Local CSS file -->
  <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
```

In `css/main.css` imports to other stylesheets and some reset rules:

```
@import "console.css";

*, html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

And now the actual console styles in `css/console.css`.
A radial gradient will give us the greenish-black that characterizes the old console look. The font will be white for good contrast plus a font-shadow to give it that blurred feel; we will make the console style occupy 100% of the viewport height and we will use the font-family downloaded in the HTML.

```
.console {
  position: relative;
  background-color: black;
  background-image: radial-gradient(
    rgba(0, 150, 0, 0.75), black 120%
  );
  height: 100vh;
  color: white;
  text-shadow: 0 0 5px #C8C8C8;
  font-family: 'Press Start 2P', monospace;
  font-size: 1.3rem;
}
```

Old consoles had overlaying lines on top of whatever was displayed, so we will use the `::after` selector to add an absolutely-positioned linear-gradient to create the overlaying lines effect; it will occupy the full width and height of the viewport. The `pointer-events: none;` rule will ensure that the lines don't block the selection of the text beneath them.

```
.console::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: repeating-linear-gradient(
    0deg,
    #00000027,
    #00000027 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

Finally some style for the look-and-feel of the text selection:

```
::selection {
  background: #0080FF;
  text-shadow: none;
}
```

And back in the HTML file add the class `console` to the `<body>` of the document:

```
...
<body class="console">
...
```

And we now have an old school console UI.

Now let's create a CSS animation that emulates text-typing.
In a new file `css/text-typing.css` we're going to define two keyframe animations: one for the text appearing one key at a time, and another for the cursor blink.

For the cursor blink we're going to leverage the `border-right` CSS property and do an infinite loop where we alternate the color between white and transparent.
And for the text-typing effect we will simply mess with the width of the element, expanding it slowly so that the text reveals itself little by little.

```
@keyframes blink {
  0%,100% {
    border-right:2px solid transparent;
  }
  50% {
    border-right:2px solid white;
  }
}

@keyframes typing {
  0% { width:0% }
  100% { width:100% }
}

```

Now a style that actually loops the animations and takes care of things (such as preventing the element from stretching to full-width)

```
.text-typing {
  max-width: fit-content;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 4s steps(22, end) forwards,
             blink 1s infinite;
}
```

With these classes in place we can now update `css/main.css` to import the `text-typing.css` file and then use the classes in the HTML. However, we would need to alter our markup to fully leverage the animations:

The main change is that we'll no longer use `<pre>` and `<output>`. Instead, all the text will go inside the `<body class="console">`, each line in a `<div>`; and those lines requiring the animation would need to use the class "text-typing".

```
...
<body class="console">
  <div class="text-typing">
    > git init .
  </div>
  <div class="text-typing">
    hint: Using 'master' as the name for the initial branch.
  </div>
</body>
...
```


