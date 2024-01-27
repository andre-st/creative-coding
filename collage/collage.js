/**
 * @file
 * @author  andre-st
 * @since   2018-11-02
 * 
 */

"use strict";




/**
 * Collage Generators
 * @namespace 
 * 
 */
const collages =
{
	_MSG_ENOINLINESVG: "Sorry, your browser does not support inline SVG.",
	
	
	/**
	 * Helper-function to reduce repetitive code / improve overall readability:
	 * creates an NS element and sets attributes with their corresponding namespace.
	 * 
	 * @return  {Element}  new element from the SVG namespace with the given attributes
	 * @param   {String}   element name (lowercase)
	 * @param   {Object}   attributes
	 * @private
	 */
	_createSvg: function( theElementName, theProps )
	{
		const el = document.createElementNS( "http://www.w3.org/2000/svg", theElementName );
		const ns = { "xlink:href": "http://www.w3.org/1999/xlink" };
		
		for( var key in theProps )
			el.setAttributeNS( ns[key] || null, key, theProps[key] );
		
		if( theElementName == "svg" )
			el.appendChild( document.createTextNode( collages._MSG_ENOINLINESVG ));
		
		return el;
	},
	
	
	
	/**
	 * Generates source-material for a collage
	 * @namespace
	 * 
	 */
	materials:
	{
		
		/**
		 * @example  new collages.materials.Color( "#AABBCC" )
		 * @param    {String}                   color hex-string
		 * @return   {collages.materials.Color}  instance
		 * @public
		 */
		Color: function( theColorHex )
		{
			this.color     = theColorHex;
			this.toPattern = function( theId, theWidth, theHeight )
			{
				const bpat = collages._createSvg( "pattern", {
					id           : theId,
					class        : "bpat bpatColor",
					patternUnits : "userSpaceOnUse",  // absolute coords
					width        : theWidth,
					height       : theHeight
				});
				
				return bpat;
			};
		},
		
		
		
		/**
		 * @example  new collages.materials.Image( "myimage.jpg" )
		 * @param    {String}                   the image url
		 * @return   {collages.materials.Image}  instance
		 * @public
		 */
		Image: function( theImageUrl )
		{
			this.imageUrl  = theImageUrl;
			this.toPattern = function( theId, theWidth, theHeight )
			{
				const bpat = collages._createSvg( "pattern", {
					id           : theId,
					class        : "bpat bpatImage",
					patternUnits : "userSpaceOnUse",  // absolute coords
					width        : theWidth,
					height       : theHeight
				});
				
				const bimg = collages._createSvg( "image", {
					class               : "bimg",
					x                   : 0,
					y                   : 0,
					width               : theWidth,
					height              : theHeight,
					"xlink:href"        : this.imageUrl,
					preserveAspectRatio : "xMidYMid slice"
				});
				
				bpat.appendChild( bimg );
				return bpat;
			};
		},
		
	},
	
	
	/**
	 * Collage inspired by Jelle Marten's series "In The Quivering Forest":
	 * 
	 * "A typical photograph from Jelle Martens would normally 
	 *  include a geometrical triangle pattern with
	 *  one   line  of triangles being of a very vibrant scene such as a forest and the
	 *  other lines of triangles being a gradient in an opposite colour of the opposing triangles. 
	 *  This creates contrast within the image and it makes the image eye-catching.
	 *  
	 *  The original photographs look very natural with the exception of some
	 *  although this doesn't matter too much as they are then transformed in
	 *  to almost a collage of images to create Jelle Marten's desired effect.
	 * 
	 *  This image in particular uses multiple images instead of just two and
	 *  the images are of all different colours and I believe some are even
	 *  rotated."
	 *  
	 * - no white-tile points to the left: 
	 *   as heaviest tile it gives all a reading direction/flow to the right, 
	 *   also emphasises the triangle geometries even more;
	 *   tells the brain how to read this thing;
	 *   to both sides it would give it another character, not so triangular anymore;
	 *   i recognized this as i did it wrong the first time (pointing to both directions);
	 *   these triangles are anchor points; although it seems not a rule
	 *   in other collages of Martens, it's the catchy thing with QuiveringForest imho
	 *   
	 * - white-tiles become fewer to the right side, 
	 *   constituting some kind of triangle again
	 *  
	 * - white-tiles use a (horizontally defined) cardboard paper texture 
	 *   (material, not just color)
	 *   
	 * - triangles = stability, energy, aggression; 
	 *   rhombus (2 triangles) = vibrant and contemporary
	 *   
	 * - equilateral triangles
	 *   
	 * - photos: paintings, structured, old teared out worne out photos, 
	 *   all colors of all(!) photos harmonize with eachother:
	 *   brown, green, blue, sand, ... (earth/nature colors)
	 *   
	 * - if sth looks unexpected check load-states of your image material (borwser's network view)
	 *
	 *   
	 *
	 * The algorithm:
	 * 
	 * The primitive consists of two triangles A and B, 
	 * where A and B can potentially have same fill and thus 
	 * appear as a larger tile among the others; 
	 * not just random triangles but some relation between 
	 * A and B, and B and A'
	 *
	 *  /|\
	 * /A|B\ -----> repeated along x-axis
	 * \ | /|\
	 *  \|/ | \ --> repeated along x-axis
	 *   1\ | /
	 *     \|/
	 *      2
	 * 
	 * next row: x and y moved by +1/2
	 *
	 * Triangles are filled with "tile patterns" (tpat),
	 * which are views into a randomly chosen "base pattern" (bpat),
	 * which are primarily large images (bimg).
	 * The white-tile pattern applies to A-triangles only.
	 * Tile-pattern position is not random but successive.
	 * 
	 *  ____________________________________
	 * |                  .-------.         |
	 * |  --------------> | tpat3 |   bpat2 |
	 * |                  '-------'   image |
	 * |____________________________________|
	 * |  .-------.-------.                 |
	 * |  | tpat1 | tpat2 | ------>   bpat1 |
	 * |  '-------'-------'           image |
	 * |____________________________________|
	 *            _          _
	 *           /|\        /|\
	 *          / | \      / | \
	 *         /  |  \    /  |
	 *        /   |   \  /   |
	 *       /tpat|tpat\/tpat| --->
	 *       \  1 | 2  /\  3 |
	 *        \   |   /  \   |
	 *         \  |  /    \  |
	 *          \ | /      \ | /
	 *           \|/        \|/
	 *
	 *
	 *
	 *
	 * @param  {DOMElement}  container block-element
	 * @param  {Array}       source materials for the collage:
	 *                       same-sized instances of `collages.materials.Image` 
	 *                       or `collages.materials.Color` (3-5 instances prefered, 4 best?); 
	 *                       style the white-tiles via `.collage { background-color... }`
	 * @return {void}
	 * @pre    theMaterials.length > 0
	 * @public
	 */
	drawMartens: function( theContainer, theMaterials )
	{
		if( !theContainer )
			throw "drawMartens: Invalid argument for theContainer";
		
		if( !theMaterials || theMaterials.length == 0 ) 
			throw "drawMartens: Invalid argument for theMaterials";
		
		const w            = theContainer.clientWidth;
		const h            = theContainer.clientHeight;
		const numTriPerRow = 4;
		const numTriPerCol = 4;
		const triW         = w / numTriPerRow;
		const triH         = h / numTriPerCol;
		var   tpatIdx      = 0;
		
		const svg = collages._createSvg( "svg", { 
			class  : "collage martens",
			width  : w,
			height : h 
		});
		
		const def = collages._createSvg( "defs" );
		svg.appendChild( def );
		
		for( var i = 0; i < theMaterials.length; i++ )  // Define base patterns:
			def.appendChild( theMaterials[i].toPattern( "bpat"+i, w, h ) );
		
		for( var y = -triH; y < h; y += triH/2 )  // All the triangles:
		{
			const xoff = ((y*2)/triH) % 2 ? triW : 0;
			for( var x = -triW; x < w; x += triW )
			{
				const isTriA = x/triW % 2;
				var   points;
				
				if( isTriA )
				{
					points = [[ xoff + x,        y            ],
					          [ xoff + x + triW, y + triH / 2 ],
					          [ xoff + x,        y + triH     ]];
				}
				else // TriB:
				{
					points = [[ xoff + x + triW, y + 0        ],
					          [ xoff + x       , y + triH / 2 ],
					          [ xoff + x + triW, y + triH     ]];
				}
				
				// Choose a fill:
				if( isTriA && Math.random()*(w-x) > w/2 ) continue;                 // Fewer white-tiles to the right
				
				const bpatIdx = Math.floor( Math.random() * theMaterials.length );  // Random tile-pattern
				
				const tpat = collages._createSvg( "pattern", {
					id           : "tpat"  + tpatIdx++,
					"xlink:href" : "#bpat" + bpatIdx,                     // Base pattern
					patternUnits : "userSpaceOnUse",                      // Absolute coords
					viewport     : x + "," + y + "," + triW + "," + triH  // Window over base pattern
				});
				
				const tile = collages._createSvg( "polygon", {
					class  : "tile",
					fill   : "url(#" + tpat.id + ")",
					points : points[0][0] + "," + points[0][1] + " " +    // "x,y x,y ..."
					         points[1][0] + "," + points[1][1] + " " +
					         points[2][0] + "," + points[2][1]
				});
				
				def.appendChild( tpat );
				svg.appendChild( tile );
			}
		}
		
		theContainer.appendChild( svg );
	}
}







