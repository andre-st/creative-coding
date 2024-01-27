// RUNNER.SCAD - Draws a running figure (Figure wireframes for art projects)
//
// Since 2021
//
// v   = velocity or the degree of flexion of the joints of arms and legs (extremities)
// len = length
// wid = width
//

len_head        = 50;
len_upper_arm   = len_head * 2;
len_lower_arm   = len_head * 2;
len_upper_leg   = len_head * 2;
len_lower_leg   = len_head * 2;
len_torso       = len_head * 3;
len_foot        = len_head;
len_hand        = len_head / 1.5;

wid_head        = len_head * 2/3;
wid_upper_torso = len_head * 2;
wid_lower_torso = wid_head * 2;
wid_upper_arm   = wid_head / 1.5;
wid_lower_arm   = wid_head / 2;
wid_upper_leg   = wid_lower_torso / 2;
wid_lower_leg   = wid_upper_leg / 1.25;
wid_foot        = len_head * 1/4;
wid_hand        = len_head * 1/4;


module pyramid( l, w )
{
	cylinder( l, w/2, 0, $fn=4 );
}

module head()
{
	translate([ 0, 0, len_head ])
		mirror([ 0, 0, -1 ]) 
			pyramid( len_head, wid_head );
}

module torso()
{
	pyramid( len_torso, wid_lower_torso );
	translate([ 0, 0, len_torso ])
		mirror([ 0, 0, -1 ]) 
			pyramid( len_torso, wid_upper_torso );
}

module upper_extremity( len_upper, wid_lower, wid_upper )
{
	pyramid( len_upper, wid_lower );
	translate([ 0, 0, len_upper ])
		mirror([ 0, 0, -1 ]) 
			pyramid( len_upper, wid_upper );
}

module lower_extremity( len_lower, wid_lower )
{
	mirror([ 0, 0, -1 ]) 
		pyramid( len_lower, wid_lower );
	translate([ 0, 0, -len_lower ])
		pyramid( len_hand, wid_hand );  // Foot or hand
}

module extremity( v )
{
	translate([ 0, 0, -len_upper_leg ])
	{
		upper_extremity( len_upper_leg, wid_lower_leg, wid_upper_leg );
		rotate([ v, 0, 0 ])
			lower_extremity( len_lower_leg, wid_lower_leg );
	}
}

module figure( v )
{
	torso();
	
	v_leg = min( 120, v );  // Do flex joints too much 
	v_arm = min(  60, v );  // Do not pierce own body
	
	translate([ 0, 0, len_torso ]) 
		head();
	
	translate([ wid_upper_leg/2, 0, 0 ]) 
		rotate([ v_leg, 0, 0 ])
			extremity( -v_leg );
	
	translate([ -wid_upper_leg/2, 0, 0 ])
		rotate([ -v_leg + (v_leg/2), 0, 0 ])
			extremity( -v_leg );
	
	translate([ wid_upper_torso/2 - wid_upper_arm/2, 0, len_torso ]) 
		rotate([ -v_arm, -v_arm, 0 ])
			extremity( v_arm );
	
	translate([ -wid_upper_torso/2 + wid_upper_arm/2, 0, len_torso ]) 
		rotate([ v_arm, v_arm, -v_arm])
			extremity( v_arm );
}



// Draw a num of figures at once:
//
path_radius = 1000;
v_max       = 130;
v_step      = 30;
num         = v_max/v_step + 1;

for( i = [0 : v_step : v_max] )
{
	translate([ -path_radius * cos( i * (360 / num )), -path_radius * sin( i * (360 / num )), 0 ])
		figure( i );
}

