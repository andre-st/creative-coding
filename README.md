# Andre's Creative Coding Archive

Source codes on my computer that were part or should have been part of some private graphics projects.

- [Runner](#runner-2021)
- [Collage](#collage-2018)
- [Network Racks](#network-racks-2013)


I often use [OpenSCAD](http://www.openscad.org/) for 3D-models.
It creates rotatable and zoomable solid-state models (Solid CAD) 
based on _text descriptions_, which simplify the specification, organization, modification and repetitiveness of 3D-model parts.
All expressions are evaluated at compile time; there are only constants. 
A [CSG tree](https://de.wikipedia.org/wiki/Constructive_Solid_Geometry) and its graphical representation are created.



## [Runner (2021)](./runner/)

OpenSCAD code to draw running figure wireframes composed from triangles only.
Inspired by a similar CPC 6128 home computer program from my childhood in the early 1990s, 
whose name I unfortunately no longer remember (Runner Simulator?). 
It ran in mode 2. I was fascinated at the time by how little code was actually used to realize something 
like this and was therefore invited to experiment with it.

![Runner Sample 1](runner/runner1.png)
![Runner Sample 2](runner/runner2.png)
![Runner Sample 3](runner/runner3.png)

[Source Code](./runner/)  
  


## [Collage (2018)](./collage/)

Javascript/CSS to generate random collages from some given images.
Currently it reproduces the style of Jelle Marten's 
[In The Quivering Forest](https://www.google.com/search?q=Jelle+Martens+%22In+The+Quivering+Forest%22&tbm=isch) only. 
It creates and composes SVG patterns as specially shaped "windows" 
over the original image instead of pixel operations on an HTML5 canvas.

![Example](collage/example.jpg)

<small>Source Image Attributions (Wikimedia Commons):  
Salwa Farwaneh (CC), Meiffren Conte (PD), Alfred Sisley (PD), Internet Archive Book Images</small>

[Source Code](./collage/)  
  


## [Network Racks (2013)](https://github.com/andre-st/network-racks)

When a friend and colleague was building a house in 2013, 
I was asked to take on the network planning (star cabling with a central 19" rack enclosure cabinet + network gear).
I also wanted to learn OpenSCAD at that time and used it to make the cabinet planing more visual,
especially with regard to the matching of the different depth and height dimensions of the individual parts, 
space in the rear etc.

We acquired some low-end business-grade gear from bankruptcy sales, 
e.g., a managed switch with lot of ports, (port-based) VLAN, 
and backplane capacity at least as high as the throughput of all ports combined.
Hint: always google the reset or cracking options before buying.

![Rack Sample](netrack/screen-20130828.png)

[Source Code](./netrack/)  
  


## To be continued ...


