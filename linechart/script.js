

let VA_RESULT_NAME;

if (window.addEventListener) {
  // For standards-compliant web browsers
  window.addEventListener("message", onMessage, false);
} else {
  window.attachEvent("onmessage", onMessage);
}
// Retrieve data and begin processing
function onMessage(event) {
  if (event && event.data)
  {
    VA_RESULT_NAME = event.data.resultName;
      //process event.data
      console.log(event.data);
      if(validateData(event.data)){
        const selections = [];
        selections.push({ row: 0 });
        console.log(selections);
        console.log(VA_RESULT_NAME);
        va.messagingUtil.postSelectionMessage(VA_RESULT_NAME, selections);
        getApi().then((resp) => {
            let thresholds =  csvToArray(resp).sort(function(a, b){
            v1= a.variable.toLowerCase();
            v2 = b.variable.toLowerCase();
            if (v1 < v2) return -1;
            if (v1 > v2) return 1;
            return 0;});
      
          console.log(thresholds)
          lineChart(event.data,thresholds);

           });
      }
      

  }
}

va.messagingUtil.setOnDataReceivedCallback(a);

function a(resultData) {

      //process event.data
      console.log(resultData)

}
function validateData(data) {
  
  if (data) return true;
  false;
}


var viewportwidth;
var viewportheight;


let leftMargin=5;
let rightMargin=5;
let topMargin=30;
let axisBaseHeight=0;
let axisLeft=0;
let legendWidth=60;
let tickPadding=20;

const getApi = async () => {

  const resp = await fetch('https://10.70.12.114/test/linechart/lineChartBound.csv')  
  return resp.text();
  
  }
  
 
  

function resizeFromframe(){

     
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
   
  if (typeof window.innerWidth != 'undefined')
  {
       viewportwidth = window.innerWidth,
       viewportheight = window.innerHeight
  }
   
 // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  
  else if (typeof document.documentElement != 'undefined'
      && typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth != 0)
  {
        viewportwidth = document.documentElement.clientWidth,
        viewportheight = document.documentElement.clientHeight
  }
   
  else
    {
          viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
          viewportheight = document.getElementsByTagName('body')[0].clientHeight
    }
    //-->
  }



function lineChart(rd,thresholds) {


  //remove old
  d3.select(".svg-container").remove();
  d3.select("svg").selectAll("circle").remove();
  
  //refresh view point
  resizeFromframe();
  viewportwidth=viewportwidth*0.95;
  //DataSource: eMarketer, March 2018
//   var data = [
//     { year: 2016, media: "Digital", spending: 72.2 },
// ];

  console.log("get web data");  
  console.log(rd);
  data= rd.data;

  let numCols=data[0].length;
  let nums_variables=numCols-1;
  let indexArray=[];
  let variablesWidth=nums_variables*tickPadding;
  axisBaseHeight=viewportheight*0.8;
  axisLeft=leftMargin+variablesWidth+10;
   





  let xaxisWidth=viewportwidth-leftMargin-legendWidth;

  
  //set canvas margins

  var xName=rd.columns[0].label;
  //format the year 
  var parseTime = d3.timeParse("%d%b%Y %H:%M:%S");
  
  // data.forEach(function (d) {

  //     d[0] = parseTime(d[0]);
  //     console.log(d[0]);
  // });
  
  //scale xAxis 
  var xExtent = d3.extent(data, d => d[0]);

  var xData=data.map(function(d) { return d[0] });
  var xScale = d3
  .scalePoint()
  .domain(xData)
  .range([axisLeft, xaxisWidth]);
  console.log("s xscale");
  //scale yAxis

  //we will draw xAxis and yAxis next

//draw xAxis and xAxis label
xAxis = d3.axisBottom()
    .scale(xScale)

d3.select("div#chartId")
  .append("div")
  // Container class to make it responsive.
  .classed("svg-container", true) 
  .style('height',viewportheight+'px')
  .style('width',viewportwidth+'px')
  .append("svg")
  // Responsive SVG needs these 2 attributes and no width and height attr.
  // .attr("preserveAspectRatio", "none")
  // .attr("viewBox", "0 0 1200 900")
  // Class to make it responsive.
  .classed("svg-content-responsive", true)
  // Fill with a rectangle for visualization.
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,"+axisBaseHeight+") ")
    .call(xAxis)
    .append("text")
    .attr("x", axisLeft+(900)/2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text(xName)

    d3.select("svg")
    .select(".axis")
    .selectAll("text")
    .attr("transform", function(d) {
      return "translate(" + this.getBBox().height * -2 + "," + this.getBBox().height*1.5 + ")rotate(-45)"});
    
    // build y axis
    for(let i =0;i<nums_variables;i++){
      indexArray.push(i);
    }

    let color = d3.scaleLinear().domain([0,(data[0].length/2-1), data[0].length - 1]).range(["#4A4AFF","#1AFD9C", "#FFA042"])
    console.log(data[0].length);




    //right legend
    var boxWidth=10;
    var legend = d3.select('svg').selectAll('.legend')
    .data(rd.columns)
    .enter()
    .append('g')
    .attr('class', 'legend');

    legend.append('rect')
    .attr('x', viewportwidth - legendWidth+5)
    .attr('y', function(d, i) {
      if (i==0) return -100;
      return i * 15;
    })
    .attr('width', boxWidth)
    .attr('height', boxWidth)
    .style('fill', function(d, i) {
      return color(i);
    });

    legend.append('text')
    .attr('x', viewportwidth - legendWidth+boxWidth+10)
    .attr('y', function(d, i) {
      if (i==0) return -100;
      return (i * 15)+9;
    })
    .text(function(d) {
      return d.label;
    });




    //draw y axis, lines and circles
     if(data[0].length>1){

       for(let i =1; i<numCols;++i){

        console.log("s yscale"+i);
        columnName=rd.columns[i].label;
        let threshold=thresholds.find( d =>{ console.log( d.variable); return d.variable.toLowerCase()===columnName.toLowerCase()});
        
        console.log("find column:"+columnName);
        // console.log("find threshold:"+threshold.upper_bound);       
        drawLineAndPoint(columnName,data,color,i,xScale,threshold);
       }
     } 
     console.log("s yscale");
  

  


  // var mediaName = sumstat.map(d => d.key) 

  

   }


   function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      row=row.split('\r')[0];
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header.trim()] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }


function drawLineAndPoint(columnName,data,color,i,xScale,threshold){
//   var sumstat = d3.nest() 
//   .key(d => d.media)
//   .entries(data);

// console.log(sumstat)


// var body = d3.select('body');

//    body.append('input')
//        .attr('type','text')
//        .attr('id','thresholdUp'+i)
//        .attr('name','textInput')
//        .attr('value','Text goes here').attr("transform", "translate("+startLeft+",0)") ;

   
//    body.append('input')
//        .attr('type','text')
//        .attr('id','thresholdLow'+i)
//        .attr('name','textInput')
//        .attr('value','Text goes here').attr("transform", "translate("+startLeft+",0)") ;


var div = d3.select("#chartId").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);





var yMax=(Math.floor(d3.max(data,d=>{
  return d[i]
})/10)+1)*10;
console.log(yMax);


if (!isNaN(yMax)){
var  yScale = d3.scaleLinear().domain([0, yMax]).range([axisBaseHeight, topMargin])
ticks=5;
//yAxis and yAxis label
var gap=yMax/ticks;
let tickValues=[]
for (let i =0;i<=ticks;i++){
  tickValues.push(i*gap);
}
yAxis = d3.axisLeft()
.scale(yScale)
.tickValues(tickValues)
.tickPadding(tickPadding*(i-1));

d3.select('svg')
.append("g")

.attr("id", "yaxis"+i)
.attr("class", "axis")
.attr("transform", "translate("+axisLeft+",0)") //use variable in translate
.call(yAxis)
// .append("text")
// .attr("transform", "rotate(-90)")
// .attr("x", "-150")
// .attr("y", "-50"-i*20)
// .attr("text-anchor", "end")
// .text("US Media Ad Spending (Billions)")

d3.select('#yaxis'+i)
.selectAll("text")
.attr("fill", color(i));


d3.select('#yaxis'+i)
.append("text")
.attr("x", -6+tickPadding*(i-1))
.text(columnName);


//set color pallete for different vairables
//select path - three types: curveBasis,curveStep, curveCardinal

var lineDrawer= d3.line()
    .defined(d=>d.y)
    .x(d=>xScale(d.x))
    .y(d=>yScale(d.y))
    // .curve(d3.curveCardinal)
;



let maps=data.map(function(d) { 
  yValue=d[i];
  if (isNaN(d[i])) yValue=null;
  return {x:d[0],y:yValue} });
var svg=d3.select("svg");
svg
  // .selectAll(".line")
  // .append("g")
  // .attr("class", "line")
  // .data(data)
  // .enter()
  .append("path")
  .attr("d",lineDrawer(maps))
  .attr("fill", "none")
  .attr("stroke", d => color(i))
  .attr("stroke-width", 2)
  .attr("z-index", 1)
  .attr("class","line"+i);
var line = svg.select(".line"+i);  
svg.selectAll(".circle"+i)
.data(data)
.enter()
.append("circle")
.attr("r", function(d) { return isNaN(d[i])  ? 0 : 3; })
.attr("cx", d => xScale(d[0]))
.attr("cy", d =>  yScale(d[i]))
.style("fill", d => {
  try { // statements to try
    if (d[i]>threshold.upper_bound){
      return "red";
    }else if (d[i]<threshold.lower_bound){
      return "yellow";
    }
  }
  catch (e) {
  }
  return color(i);})
  .on("mouseover", function(event,d) { 
    console.log(event);
    console.log(d);
    let x =event.pageX;
    let y =event.pageY;
    div.transition()
      .style("opacity", .9)
      .style("left", (x) + "px")
      .style("top", (y - 28) + "px");
    div.html(columnName+" :"+d[i])


    line.attr("stroke-width", 4);
    })
  .on("mouseout", function(d) {
    div.transition()
      .duration(10)
      .style("left", 0 + "px")
      .style("top", 0 + "px")
      .style("opacity", 0);
    line.attr("stroke-width", 3); 
    });

//append circle 

  // .selectAll("circle")


  }

}


