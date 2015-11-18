# web-paint

An implementation of a simple pixel editor to investigate a good architecture for a real pixel editor.
[Demo](http://misterwilliam.github.io/web-paint/)

## Key design learnings:
* The graphics stack chosen (in this case Canvas (2D context)), determines the graphics abstractions that are built on.
* If a multiplatform (iOS, Android, and Web) solution is wanted, the only graphics stack that is available across all platforms is Open/WebGL.
* Performance of rendering quickly becomes a bottleneck, it is important to be able to modify rendering algorithms with minimal disruptions to the rest of the codebase.
* A good abstraction for a grid of pixels is a key part in solving all the problems described above.

## Open Questions
* UI Elements that appear in the canvas area were not implemented (for example temporary lines to show alignment between pixesl).
* That probably should be implemented with a transparent layer that sits above the canvas, but was not investigated.

## General Architecture

```
+---------------------------------+
|     UI Layer                    |
+---------------------------------+
|     Application Layer           |
+---------------------------------+
|     Pixel Grid                  |
+---------------------------------+
|     Platform Graphics Stack     |
+---------------------------------+
```

### UI Layer

Responsible for how the UI looks and calls into the application layer to manipulate application state.

### Application Layer

Responsible for maintaining and changing application state.

### Pixel Grid

Responsible for maintaining the state of the pixel gride, provides a convenient abstraction for manipulating a grid of pixels, and calling into the platform graphics stack to do efficient rendering of the actual graphics.

### Platform Graphics Stack

Third-party graphics stack provided by the OS (or browser), and possibly third-party libraries. The actual graphics stack chosen is a key design decision that has a strong influence on developer productivity and the rendering performance of the application.
