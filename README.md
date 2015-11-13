# web-paint

An implementation of a simple pixel editor to investigate a good architecture for a real pixel editor.

Key design learnings:
* The graphics stack chosen (in this case Canvas (2D context)), determines the graphics abstractions that are built on.
* If a multiplatform (iOS, Android, and Web) solution is wanted, the only graphics stack that is available across all platforms is Open/WebGL.
* Performance of rendering quickly becomes a bottleneck, it is important to be able to modify rendering algorithms with minimal disruptions to the rest of the codebase.
* A good abstraction for a grid of pixels is a key part in solving all the problems described above.
