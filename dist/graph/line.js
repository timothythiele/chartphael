/************************************************
****** Chartphael graph plugin component ********
*************************************************
based on Raphael.js
component requieres chartphael.js
developed by Davor Eric
https://github.com/davoreric/chartphael
************************************************/

/************************************************
*********** Line graph **************************
************************************************/

chartphael.line = function(options) {

	//set public options and merge it with passed option object
	this.options = chartphael.helper.extend({}, chartphael.line.defaults, options);

	//set internal data
	this.node = this.options.node;
	this.data = this.options.data;

	this.paperSize = {
		'x': this.node.offsetWidth,
		'y': this.node.offsetHeight
	};
	
	//get boundary coordinates for grid and graph
	this.bound = chartphael.helper.getBound.call(this,this.paperSize,this.options.padding);

	//set SVG paper workarea
	this.paper = Raphael(this.node,this.paperSize.x,this.paperSize.y);

	//start
	this.init();

};

chartphael.helper.extend(chartphael.line.prototype, {

	init: function(){

		//call method for creating grid
		this.setGrid();

		//call method for creating line graph
		this.setGraph();

	},

	setGrid: function(){

		//call global grid create function and apply styles
		this.grid = this.paper.path(
			chartphael.draw.grid.call(this)
		).attr(this.options.grid.style);

	},

	setGraph: function(){

		chartphael.draw.line.call(this);

		this.grid.toBack();

	},

	updateJSON: function(json){

		//replace current JSON
		this.data = json;

		//clear paper
		this.paper.clear();

		//draw chart
		this.init();

	}

});

//default values
chartphael.line.defaults = {

	//setup X axis
	xAxis: {
		show: true,
		text: true,
		step: false,
		outerLines: false,
		direction: 'left'
	},
	
	//setup Y axis
	yAxis: {
		show: true,
		text: true,
		step: false,
		outerLines: false,
		direction: 'bottom'
	},

	//setup grid
	grid: {
		style: {
			'stroke': '#edefea',
			'stroke-width': 1
		},
		text: {
			show: true,
			style: {
				'fill': '#a1a1a1',
				'font-size':'11px'
			}
		}
	},

	//setup chart line
	line: {
		shadow: {
			show: true,
			fill: 'rgba(130,156,39,20)'
		},
		style: {
			'stroke': '#8cb428',
			'stroke-width': 3
		}
	},

	//setup chart dots
	dots: {
		show: true,
		radius: 5,
		style: {
			'fill': '#819926',
			'stroke-width': 2,
			'stroke': '#fff'
		},
		text: {
			show: false
		}
	},

	//setup outer chart padding
	padding: {
		'top': 40,
        'right': 40,
        'bottom': 40,
        'left': 40
	}

};