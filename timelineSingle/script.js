
let csvTest=
"variable,lower_bound,upper_bound,range_0,range_1\n"+
"HR,50,120,30,220\n"+
"RES,12,35,0,50\n"+
"NBPS,90,160,50,250\n"+
"NBPD,60,80,10,130\n"+
"NBPm,65,120,10,180\n"+
"ABPS,90,160,50,250\n"+
"ABPD,60,80,10,130\n"+
"ABPm,65,110,10,180\n"+
"BT,35,38,31,42\n";
let iconTest='key,location,\nangiography,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/angiography.png,\nBacteria,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Bacteria.png,\nBLOOD TRANSFUSION,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/BLOOD_TRANSFUSION.png,\nBLOOD SMEAR INTERPRETATION /BONE MARROW_M,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/BLOOD_SMEAR_INTERPRETATION_BONE MARROW_M.png,\nCHEST-M,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/CHEST-M.png,\nCPR,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/CPR.png,\nC/T,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/CT.png,\nDrainage,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Drainage.png,\nDrug,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Drug.png,\nECHO/ERCP/graphy,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/ECHO_ERCP_graphy.png,\nEEG,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/EEG.png,\nEndo,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Endo.png,\nFeeding,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Feeding.png,\nH/D,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/HD.png,\nISOLATION,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/ISOLATION.png,\nLab,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Lab.png,\nLOW PRESSURE SUCTION,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/LOW_PRESSURE_SUCTION.png,\nMRI,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/MRI.png,\nPICC,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/PICC.png,\nPuncture,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Puncture.png,\nScopy,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/Scopy.png,\nT.A.E,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/TAE.png,\nTEE,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/TEE.png,\nX-ray,file:///C:/Users/user01/Desktop/d3/d3/timeline/pics/X-ray.png'

let test=1;
let VA_RESULT_NAME;
let thresholdsUrl = "file:///E:/git_hub/d3/timeline/lineChartBound.csv";
thresholdsUrl='https://10.70.12.114/test/timeline/lineChartBound.csv';
url = "file:///E:/git_hub/d3/timeline/lineChartBound.csv";
let iconMapUrl='https://10.70.12.114/test/timeline/iconPaths.csv';
let iconCsv="file:///E:/git_hub/d3/timeline/iconPaths.csv";

// va.messagingUtil.setOnDataReceivedCallback(a);

function validateData(data) {
  if (data) return true;
  false;
}
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

var viewportwidth;
var viewportheight;

let  variableQueue = [];



variableQueue.push("id")
variableQueue.push("dateIndex")
variableQueue.push("timeIndex")
variableQueue.push("hierarchyIndex")
variableQueue.push("iconIdIndex")
variableQueue.push("typeIndex")
variableQueue.push("lineHoverIndex")
variableQueue.push("timeHoverIndex")
let id=variableQueue.indexOf("id");

let typeIndex=variableQueue.indexOf("typeIndex");
let iconIdIndex=variableQueue.indexOf("iconIdIndex");
// let contentIndex=6;
let dateIndex=variableQueue.indexOf("dateIndex");
let timeIndex=variableQueue.indexOf("timeIndex");
let hierarchyIndex=variableQueue.indexOf("hierarchyIndex");
let iconCodeIndex=variableQueue.indexOf("iconCodeIndex");
let lineHoverIndex=variableQueue.indexOf("lineHoverIndex");
let timeHoverIndex=variableQueue.indexOf("timeHoverIndex");


let startColIndex=variableQueue.length;
let leftMargin=5;
let rightMargin=5;
let topMargin=30;
let axisBaseHeight=0;
let axisLeft=0;
let legendWidth=60;
let tickPadding=30;
let baseHeight=20;

let interval=5;
let dayWidth=50;
let xAxisWidth=1000;
let containerWidth;

let lineChartHeight=0;
let timeChartHeight=0;
let lineTimeChartRatio=0.6;
let lineChartCircleRadius=4;
let lineChartLineWidth=3;
let lineChartHoverOpacity=0.9;
let timeFormat ="YYYYMMDDH:m"
let dateFormat ="YYYYMMDD"
let xPosArray=[]
let start_t
let end_t
let period_value=0; 

  let legendTop=10;
  let iconMap=new Map();
  let iconPadding=2;
let clickZIndex = 5;
let defaultZIndex=1;
let clickedEleIndex=-1;
let selectBorderWidth=5;
let clickedBorderStyle="";
let timelineCardVerticalGap=40;
let border_color=' #dde5e8 solid';
let p_background_color='#f2f9ff';
let p_word_color="#000000";
let date_p_padding=10;
let date_p_l_border=2;
let lineChartTicks=4;
console.log(dateIndex)

// let imagePath ='https://cdn.dribbble.com/users/22018/screenshots/2456036/d3_1x.png';
function formatDate(){}
function sendSelectedRowToVA(rowId){
  const selections = [];
          selections.push({ row: rowId });
          console.log(selections);
          console.log(VA_RESULT_NAME);
          va.messagingUtil.postSelectionMessage(VA_RESULT_NAME, selections);


}
function originGetBeginEndDay(){

  if (startDay<interval)
  {
      startDay=1;   
  }else {
      
      startDay=Math.floor(startDay%interval)===0? (Math.floor(startDay/interval)-1)*interval+1 :Math.floor(startDay/interval)*interval+1;
      let lastDayOfMonth=get_end_of_month(begin);

      if(startDay>lastDayOfMonth){
          startDay=lastDayOfMonth;
      }
      
  }  
  startDay-=5;
  if (endDay<interval)
  {
      endDay=1;   
  }else {
      
      endDay= Math.floor(endDay%interval)===0? (Math.floor(endDay/interval))*interval:(Math.floor(endDay/interval)+1)*interval;
      let lastDayOfMonth=get_end_of_month(end);

      if(endDay>lastDayOfMonth){
          endDay=lastDayOfMonth;
      }
}
}


function getMinMax(arr) {
  if (!arr) {
    return null;
  }
  var minV = moment(arr[0], dateFormat, true);
  var maxV = moment(arr[0], dateFormat, true);
  var min="";
  var max="";
  for (a of arr) {
    var cur =moment(a, dateFormat, true)
    if  (cur< minV){
      minV = cur;
      // min=a;
    }else if (cur > maxV)  {
      maxV = cur;
      // max=a;
    }

  }
  
  return [minV, maxV];
}
function getMinMaxSorted(arr) {
  if (!arr) {
    return null;
  }
  var minV = moment(arr[0], dateFormat, true);
  var maxV = moment(arr[arr.length-1], dateFormat, true);
 
  
  return [minV, maxV];
}



const CSVToObject = (data, delimiter = ",", omitFirstRow = true) =>
 
   Object.fromEntries(data.split("\n").slice(omitFirstRow ? 1 : 0).map(v => {
    let fields = v.split(delimiter);
    return [fields[0].toUpperCase(), fields[1]];
  }));


  




function setXAxisSize(data) {


  let dateArray = new Array();
  var dateData=data.map(function(d) { return d[dateIndex] });
  // console.log(dateData);
  let minMax=getMinMaxSorted(dateData);
  console.log(minMax)
  let begin= minMax[0] ;
  let end=  minMax[1];
  let startDate= moment(minMax[0].toDate()) ;
  let endDate= moment(minMax[1].toDate()) ;
  
 console.log(minMax)

  // startDate=moment(s[3]+s[1]+s[2]+" "+"00:00:00", "YYYYMMMDD HH:mm:ss", true);
  // endDate=get_date(end,endDay);
  let numsOfDays=0
  while (startDate<= endDate) {


    dateArray.push(startDate)

    startDate = moment(startDate.clone().add(1, 'days').toDate());
    ++numsOfDays;
  }
  //  dateArray.push(startDate)

  startDate = moment(startDate.clone().add(1, 'days').toDate());
  // for(d in dateArray){
  //     console.log(d.toString());
  // }
  // let s= dateArray[0].format('YYYYMMDD').split('-');
  // let e= dateArray[dateArray.length-1].format('YYYYMMDD').split('-');

  // console.log(dateArray[0])
  // start_t=moment(s[0]+s[1]+s[2]+" "+"00:00:00", "YYYYMMDD HH:mm:ss", true);

  // end_t=moment(e[0]+e[1]+e[2]+" "+"23:59:59", "YYYYMMDD HH:mm:ss", true);
  start_t=moment(dateArray[0].format('YYYYMMDD')+" "+"00:00:00", "YYYYMMDD HH:mm:ss", true);

  end_t=moment(dateArray[dateArray.length-1].format('YYYYMMDD')+" "+"23:59:59", "YYYYMMDD HH:mm:ss", true);
  console.log(start_t)
  console.log(end_t)
  period_value=end_t.valueOf()-start_t.valueOf();
  console.log(period_value) 
  if (numsOfDays<interval){
    dayWidth=viewportwidth/numsOfDays;
  }
  else{
    dayWidth=viewportwidth/interval;
  }
  xAxisWidth=dayWidth*dateArray.length;
  console.log("day:"+dayWidth)
  console.log(xAxisWidth)
  return dateArray;
}

function xScaleS(dateTime){
  // console.log(dateTime)
  let t = moment(dateTime, timeFormat, true);
  // console.log(start_t.valueOf())
  let p = (t.valueOf()-start_t.valueOf())/period_value*(xAxisWidth);
  // console.log(p)
  return p;
}
function lineXScaleS(dateTime){
  return axisLeft+ xScaleS(dateTime);
}

function resizeFromframe(data){

     
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

    lineChartHeight=viewportheight*(1-lineTimeChartRatio)
    timeChartHeight=viewportheight*lineTimeChartRatio
    //-->
  }

  function padLeft(str,length,char){
    if(str.length >= length)
        return str;
    else
        return padLeft(char +str,length);
}
function formatData(data,i){
  result=data;
  console.log(result);
  for (j=0; j<result.length ;++j){

    result[j][i]= padLeft(result[j][i],5, "0");
    // console.log(result[j][i]);
  }

  return result;
}
function lineChart(data,dateArray,columns,thresholds,contentIndex) {
  //remove old
  let containerHeight= lineChartHeight;
  console.log(data);  
  d3.select(".svg-container").remove();
  d3.select("svg").selectAll("circle").remove();
  
  //refresh view point



  let numCols=0;
  for (i=0; i<columns.length;++i){
    if ('label' in columns[i]) {
      numCols++;
    }
  }



  
  let nums_variables=numCols-startColIndex;
  let indexArray=[];
  let variablesWidth=nums_variables*(tickPadding+5);

  axisBaseHeight=containerHeight-5;
  axisLeft=leftMargin+variablesWidth+5;
  containerWidth=xAxisWidth+axisLeft+legendWidth;
 





  //let xaxisWidth=viewportwidth-leftMargin-legendWidth;

  
  //set canvas margins

  var xName=columns[0].label;
  //format the year 
  var parseTime = d3.timeParse("%d%b%Y %H:%M:%S");
  
  // data.forEach(function (d) {

  //     d[0] = parseTime(d[0]);
  //     console.log(d[0]);
  // });
  
  //scale xAxis 
  var xExtent = d3.extent(data, d => d[0]);




  var xData=dateArray;
  
  var xScale = d3
  .scalePoint()
  .domain([xData[0],xData[xData.length-1]])
  .range([axisLeft, xAxisWidth+axisLeft]);
  console.log("s xscale");
  //scale yAxis

  //we will draw xAxis and yAxis next

//draw xAxis and xAxis label
xAxis = d3.axisBottom()
    .scale(xScale)

let svgContainer =d3.select("div#chartId")
.style('height',containerHeight+'px')
  .style('width',containerWidth+'px')
  .append("div")
  // // Container class to make it responsive.
  .classed("svg-container", true) 
  
  svgContainer.append("svg")
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


    svgContainer.append("svg")
    .classed("svg-left", true)
    .attr("height",axisBaseHeight+10+"px")
    .attr("width", axisLeft+"px")
 
    
    svgContainer.append("svg")
    .classed("svg-right", true)
    .attr("height",axisBaseHeight+10+"px")
    .attr("width", axisLeft+"px")

    // build y axis
    for(let i =0;i<nums_variables;i++){
      indexArray.push(i);
    }
    let domain=[]
    for(let i = startColIndex ; i<data[0].length; ++i){
      domain.push(i)
    }
    // let color = d3.scaleLinear().domain([0,(startColIndex), data[0].length - 1]).range(["#2A1594","#EE6002","#A349A4", "#26A69A"])
    let color = d3.scaleOrdinal().domain(domain).range(["#2A1594","#EE6002","#A349A4", "#26A69A","#F0CC00"])
   
    console.log(data[0].length);



    dataColumns = columns.slice(startColIndex)
    //right legend

    let mouseOverDiv = d3.select("#chartId").append("div")

    .attr("class", "tooltip")
    .style("opacity", 0);



    //draw y axis, lines and circles
     if(data[0].length>1){

       for(let i =startColIndex; i<numCols;++i){

        console.log("s yscale"+i);
        columnName=columns[i].label;
        console.log("find column:"+columnName);          
 
        let threshold=thresholds.find( d =>{ console.log( d.variable); return d.variable.toLowerCase()===columnName.toLowerCase()});
        
        console.log("find column:"+columnName);
        // console.log("find threshold:"+threshold.upper_bound);       
        drawLineAndPoint(columnName,data,color,i,xScale,threshold,mouseOverDiv,contentIndex);
        var boxWidth=10;



    var legend = d3.select('svg')
    .append('g')
    .attr('class', 'legend');
    let j=i-startColIndex

    legend.append('rect')
    .attr('x', containerWidth - legendWidth+7)
    .attr('y', function(d) {

      return (j) * 15+topMargin;
    })
    .attr('width', boxWidth)
    .attr('height', boxWidth)
    .style('fill', function(d) {
      return color(i);
    });

    legend.append('text')
    .attr('x', containerWidth - legendWidth+boxWidth+12)
    .attr('y', function(d) {

      return (j * 15)+9+topMargin;
    })
    .text(function(d) {
      return columnName;
    });

       }
     } 
     console.log("s yscale");
  
   }


   function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    console.log(str)
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


function drawLineAndPoint(columnName,data,color,i,xScale,threshold,mouseOverDiv,contentIndex){
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








var yMax=(Math.floor(d3.max(data,d=>{
  return isNaN(d[i]) ? -1: d[i]
})/10)+1)*10;
console.log(yMax);
console.log(threshold);
let  yScale
if (!isNaN(yMax)){
    ticks=lineChartTicks;
  let gap=yMax/ticks;
  let tickValues=[]
    if (threshold){
      let range0=parseInt(threshold.range_0);
      let range1=parseInt(threshold.range_1);
      yScale = d3.scaleLinear().domain([range0, range1]).range([axisBaseHeight, topMargin])
      //yAxis and yAxis label
      gap=(range1-range0)/ticks;
      for (let i =0;i<=ticks;i++){
        tickValues.push(range0+i*gap);
      }
      console.log(tickValues)
    }
    else {
      yScale = d3.scaleLinear().domain([0, yMax]).range([axisBaseHeight, topMargin])
      //yAxis and yAxis label
      for (let i =0;i<=ticks;i++){
        tickValues.push(i*gap);
      }
    }

    // tickPadding=axisLeft/(i-startColIndex-1)-40
yAxis = d3.axisLeft()
.scale(yScale)
.tickValues(tickValues)
.tickPadding(tickPadding*(i-startColIndex));

d3.select('.svg-left')
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
.attr("x", tickPadding*(i-startColIndex+2))
.text(columnName);


//set color pallete for different vairables
//select path - three types: curveBasis,curveStep, curveCardinal

var lineDrawer= d3.line()
    .defined(d=>d.y)
    .x(d=>lineXScaleS(d.x))
    .y(d=>yScale(d.y))
    // .curve(d3.curveCardinal)
;



let maps=data.map(function(d) { 
  yValue=d[i];
  if (isNaN(d[i])) yValue=null;
  return {x:d[dateIndex]+d[timeIndex],y:yValue} });
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
  .attr("stroke-width", lineChartLineWidth)
  .attr("z-index", 1)
  .attr("class","line"+i);
var line = svg.select(".line"+i);  


svg.selectAll(".circle"+i)
.data(data)
.enter()
.append("circle")
.attr("class","c"+i)
.attr("r", function(d) { return isNaN(d[i])  ? 0 : lineChartCircleRadius; })
.attr("cx", d => {
  // console.log(d[i])
  if(isNaN(d[i])||d[i]===""){
    // console.log(d[i])
    return -9999
  }else{
      
    return lineXScaleS(d[dateIndex]+d[timeIndex])
  }
  })
.attr("cy", d =>  yScale(d[i]))
.style("fill", d => {
  try { // statements to try

    if (parseInt(d[i])>threshold.upper_bound){
      console.log(d[i]+">"+threshold.upper_bound)
      // return "red";
      return color(i); 
    }else if (parseInt(d[i])<threshold.lower_bound){
      // return "yellow";
      console.log(d[i]+"<"+threshold.lower_bound)
      // return "red";
      return color(i); 
    }
  }
  catch (e) {
    
  }
  return "white";
  // return color(i);
})
   .style("stroke", d => { 
    // try {
//     if (parseInt(d[i])>threshold.upper_bound){
//     console.log(d[i]+">"+threshold.upper_bound)
//     return "red";
//   }else if (parseInt(d[i])<threshold.lower_bound){
//     // return "yellow";
//     console.log(d[i]+"<"+threshold.lower_bound)
//     return "red";
//   }
//   return color(i); 
// }catch (e) {
  // return color(i);
  //  }
   return color(i); 
  })

  .each(function(d,rowid) {
    // if (d.date()%interval===1) {

      d3.select(this)
      .on("mouseover", function(event) { 
        console.log(event);
        console.log(d[dateIndex]+d[timeIndex]);
        svg.selectAll(".c"+i).attr("r", lineChartCircleRadius*1.5)
    
        let x =event.pageX;
        let y =event.pageY;
        // div.transition()
        mouseOverDiv
          .style("opacity", lineChartHoverOpacity)
          .style("left", (x+10) + "px")
          .style("top", (y -3) + "px")
          .style("z-index", 5);
    
          try { // statements to try
            let temContent=d[contentIndex]
            if (temContent=="(��箸�����)"){
              temContent=""
            }
            mouseOverDiv.html(columnName+":"+ d[i]+ "<br>"+ d[dateIndex]+" "+d[timeIndex]+ "<br>"+temContent+ "<br>up:"+threshold.upper_bound+ " <br>low:"+threshold.lower_bound)
          }
          catch (e) {
            mouseOverDiv.html(columnName+":"+ d[i])        
          }  
        line.attr("stroke-width", lineChartLineWidth*1.5);
        })
      .on("mouseout", function(d) {
        // div.transition()
        svg.selectAll(".c"+i).attr("r", lineChartCircleRadius)
        mouseOverDiv
          .style("left", 0 + "px")
          .style("top", 0 + "px")
          .style("opacity", 0);
        line.attr("stroke-width", lineChartLineWidth); 
        })
        .on("click", function(d){
          sendSelectedRowToVA(rowid);

        });
      
    // }
  })
  

//append circle 

  // .selectAll("circle")


  

}



}

// if (window.addEventListener) {
//   // For standards-compliant web browsers
//   window.addEventListener("message", onMessage, false);
// } else {
//   window.attachEvent("onmessage", onMessage);
// }
// // Retrieve data and begin processing
// function onMessage(event) {
//   if (event && event.data)
//   {
//       //process event.data
//       console.log(event.data)
//   }
// }

// va.messagingUtil.setOnDataReceivedCallback(a);

// function a(resultData) {

//       //process event.data
//       console.log(resultData)

// }









var svg =d3.select("#svgID");
const card_horizen_gap=5;
const invisible_pos=-9999;
let p_border_color="";

var zoom = d3.zoom()
  .scaleExtent([0.1, 3 ])
  .on('zoom', zoomed);

var root = d3.select('#contain').call(zoom);
var canvas = d3.select('#contain');

function zoomed() {
  var transform = d3.event.transform;
  console.log( d3.event.transform);
  canvas.style("transform", "translate("+transform.x+"px,"+transform.y+"px) scale(" + transform.k + ")")
  .style("transition", "transform 30ms ease-in-out 0s");
}





function CardStyle(background_color,border_color, icon){
 this.background_color=background_color;
 this.border_color=border_color;
 if(this.border_color===""){
  this.border_color=background_color;
 }

 this.icon=icon;

};

let exam_style=new CardStyle("feefda","","fas fa-exclamation-triangle");
let pic_style=new CardStyle("fbfeeb","","far fa-image");
let test_style=new CardStyle("e5d4fe","","");
let HO_style=new CardStyle("fddfe7","dac0cd","");
let EmergencyMedicine_style=new CardStyle("f8d4f0","","");
let MedicalCommon_style=new CardStyle("e6fede","","");
let default_style=new CardStyle("fddfe7","dac0cd","");
let second_style=new CardStyle("e5d4fe","C1C1FF","");
let EC_style=new CardStyle("dfd6f5","","fas fa-eye-dropper");
let HO_inhouse=new CardStyle("d5dcf6","c7cee0","");
let map_list=
[
  {"word":"E.cloacae","type":"EC"},
  {"word":"???嚙�??","type":"PHO"},
  {"word":"瑼ｇ蕭??","type":"CHE"},
  {"word":"嚙�??瘨莎蕭?嚙踝蕭?嚙踝蕭??","type":"HO"},
  {"word":"??嚙質那??嚙踝蕭??","type":"EmergencyMedicine"},
  {"word":"??嚙踝蕭????嚙踝蕭??","type":"MedicalCommon"}, 
  {"word":"嚙�??瘨莎蕭?嚙踝蕭?嚙踝蕭??嚙�?????","type":"HO_inhouse"}, 
];


let style_list=
[
  {"word":"EC","obj":EC_style},
  {"word":"PHO","obj":pic_style},
  {"word":"CHE","obj":exam_style},
  {"word":"HO","obj":HO_style},
  {"word":"EmergencyMedicine","obj":EmergencyMedicine_style},
  {"word":"MedicalCommon","obj":MedicalCommon_style}, 
  {"word":"HO_inhouse","obj":HO_inhouse}, 
];



let style_map= new Map();
for (let i = 0 ; i < style_list.length ;i++){
  style_map.set(style_list[i]["word"],style_list[i]["obj"]);
}



function CardModel(text,hover, style,type,center_pos) {
this.rowid=-1;
 this.text=text;
 this.hover=hover;
 this.style=style;
 this.type=type;
 this.center_pos=center_pos;
 this.left_pos=0;
 this.right_pos=0;
 this.bar_id=0;
 this.hierarchy=-1;
 this.iconkey='';
};

function eventPos(){
  this.type="";
  this.center_pos=0;
  this.bar_id=0;
 };

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const gap =30;
const size_type="px";

let begin="";
let end ="";
let num_day_in = 0;
let day_y_array=[];

function getDateFormat(datestring){
// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.
let mydate = new Date(parseint(datestring.substr(0,4)), parseint(datestring.substr(3,2)) - 1, parseint(datestring.substr(5,2))); 
console.log(mydate.to());
return mydate;
}





  function get_end_of_month(date){
    Day= parseInt(date.substr(6,2));
    Month= parseInt(date.substr(4,2));
    Year= parseInt(date.substr(0,4));    


    let d = new Date(Year, Month, 0);
    // last day in January
    let lastDay=parseInt(d.toDateString().split(" ")[2]);
    console.log(lastDay);
    return lastDay;

  }
//   get_end_of_month("20211112");

  function get_date(origin, day){
    Year= parseInt(origin.substr(0,4));
    Day= parseInt(origin.substr(6,2));
    Month= parseInt(origin.substr(4,2));

    let d = new Date(Year, Month-1, day);
    // last day in January
    console.log(d.toDateString());
    return d;

  }

  
  function get_y_data(jsonInput) {
    console.log(jsonInput);

    let dateArray = new Array();

    let begin= jsonInput[0].date;
    let end=jsonInput[jsonInput.length-1].date;
    let startDay= parseInt(begin.substr(6,2));
    let endDay= parseInt(end.substr(6,2));

   
    if (startDay<interval)
    {
        startDay=1;   
    }else {
        
        startDay=Math.floor(startDay%interval)===0? (Math.floor(startDay/interval)-1)*interval+1 :Math.floor(startDay/interval)*interval+1;
        let lastDayOfMonth=get_end_of_month(begin);
  
        if(startDay>lastDayOfMonth){
            startDay=lastDayOfMonth;
        }
        
    }  
    startDay-=5;
    if (endDay<interval)
    {
        endDay=1;   
    }else {
        
        endDay= Math.floor(endDay%interval)===0? (Math.floor(endDay/interval))*interval:(Math.floor(endDay/interval)+1)*interval;
        let lastDayOfMonth=get_end_of_month(end);

        if(endDay>lastDayOfMonth){
            endDay=lastDayOfMonth;
        }
    } 
    console.log(startDay);
    console.log(endDay);
    startDate=get_date(begin,startDay);
    endDate=get_date(end,endDay);
 
    while (startDate<= endDate) {

      dateArray.push(startDate)
      startDate = startDate.addDays(1);

    }
    
    dateArray.push(startDate)

    // for(d in dateArray){
    //     console.log(d.toString());
    // }
    return dateArray;
  }




function slice_month(date_array){
  let month_group= new Array();
  console.log(date_array);
    if (date_array.length<1) return month_group;

    let pre_date=date_array[0];
    let head_index=0;
    // console.log(pre_date);
    if (date_array.length===1){
      month_group.push(date_array);
      return month_group;
    }

    for (let i=0 ; i<date_array.length; i++){
        
          console.log(pre_date)
            if(pre_date.year()!== date_array[i].year()||pre_date.month() !== date_array[i].month() ){
                month_group.push(date_array.slice(head_index, i));    
 
                head_index=i;
            }else if (i===date_array.length-1){
                month_group.push(date_array.slice(head_index));                 
            }
        
        pre_date = date_array[i];
    }
    console.log(month_group);
    return month_group;
}




// function get_period(dataArray, interval){

//   begin=   parseInt(dataArray[0]["date"].substr(6,2));
//   end =    parseInt(dataArray[dataArray.length-1]["date"].substr(6,2));
//   console.log(end);
//   if (end - begin< 0) {
//       console.log("Error: wrong date order");
//       return;
//   }
//   begin=Math.floor(begin%interval)===0? (Math.floor(begin/interval)-1)*interval+1 :Math.floor(begin/interval)*interval+1;
  
//   end= Math.floor(end%interval)===0? (Math.floor(end/interval))*interval:(Math.floor(end/interval)+1)*interval;
//   console.log(end);
//   num_day_in = Math.floor((end - begin)/interval);
//   console.log(num_day_in);
//   day_y_array[0]=begin;
//   for (i=1; i<=num_day_in ;i++){
//     console.log(begin);
//     day_y_array[i]=day_y_array[0]+(i)*interval;
//     console.log(day_y_array[i]);
//   }
//   console.log(day_y_array);
// }


// get_period(datat,5);
// console.log(datat[0]["date"]);


function createPanel(top_pos,layer_num, item_h) {
  let obj = {};
  let layerPipe=[];
  let nums=0;
  let h = 100;
  let gap= (h-(item_h*layer_num))/layer_num;
  let curH=0;
  let curL=0;
  let curR=0;
  let maxH=0;
  this.createLayer=function(n) {
    let obj = {};
    obj.height = top_pos+n*(20+item_h);
    obj.left=invisible_pos;
    obj.right=invisible_pos;
    return obj;
  };

  this.addCard=function(card_left,card_right,card_height) {
    for(let i=0; i<layerPipe.length; i++){
        if(layerPipe[i].right+card_horizen_gap<card_left){
          layerPipe[i].left=card_left;
          layerPipe[i].right=card_right;
          // console.log(layerPipe[i]);
          if (layerPipe[i].height >maxH) maxH=layerPipe[i].height;
          return layerPipe[i];

        }
        else if(i===layerPipe.length-1){
          layerPipe[0].right=card_right;
          layerPipe[0].left=card_left;
          if (layerPipe[0].height >maxH) maxH=layerPipe[0].height;
          return layerPipe[0];
        }
    }
 
   

  };
  this.getMaxPanelH=function() {
    return maxH+10;
  };

  for (i=0;i<layer_num;i++){
    layerPipe.push(this.createLayer(i)); 
  };
}


function build_time_panel(data,dateArray,contentIndex){
  //adjust position
  d3.select("#contain").remove();

  let container=
  d3.select("div#base")
  .append("div")
  .attr("id", "contain")
  .style("overflow","auto");
  // // Container class to make it responsive.

  let mouseOverDiv = container.append("div")

  .attr("class", "tooltip")
  .style("opacity", 0);
  
  let divArray=["month","day_sec","type_sec","dot_sec","card_sec","line_sec","event_sec"];

  divArray.forEach(function(value){
    container
    .append("div")
    .attr("id", value)
  });
  d3.select("#contain")
  .style('left',axisLeft+size_type)
  // .style('height',containerHeight+'px')
  .style('width',containerWidth+'px')



  let month_p=d3.select("#month").selectAll("div");
  let month_array=slice_month(dateArray);
  let date_p=d3.select("#day_sec").selectAll("div");
  let type_p=d3.select("#type_sec").selectAll("div");
  let event_p=d3.select("#event_sec").selectAll("div");

  let y_ruler_length=0;
  let month_width=0;

  //console.log(month_array[i][0]);
  console.log("day:"+dayWidth)
  for (let i = 0 ; i< month_array.length; i++){
    console.log(month_array[i][0]);
    let a =[];
    a[0]=month_array[i][0].toString();

    
    let dayWidthNoPadding=dayWidth-2*date_p_padding
      date_p
      .data(month_array[i])
      .enter()
      .append("div")
      .merge(date_p)
      
      .style('width',dayWidthNoPadding+size_type).style('height',baseHeight+'px').style('display', 'inline-block')
      .style('padding',date_p_padding+size_type)
      .style('background-color',p_background_color)
      .style('color',p_word_color)
      .style('border-bottom',date_p_l_border+size_type+border_color)
      .text(d=>
        // console.log(d.date());
        // return (d.date()%interval===1)? d.date().toString():""}
        d.date().toString())
      .each(function(d,i) {
        // if (d.date()%interval===1) {
          d3.select(this)
          .style('border-left',date_p_l_border+size_type+border_color)
          .style('padding-left',date_p_padding-date_p_l_border+size_type );
        // }
      });

      type_p
      .data(month_array[i])
      .enter()
      .append("div")
      .merge(date_p)
      .style('width',dayWidthNoPadding+size_type).style('height','1000px').style('display', 'inline-block').style('padding',date_p_padding+size_type)
      .style('background-color',p_background_color)
      
      .text(d=>"")
      .each(function(d,i) {
        
        if (d.date()%interval===1) {
          d3.select(this)
          .style('border-left',date_p_l_border+size_type+border_color)
          .style('padding-left',date_p_padding-date_p_l_border+size_type );
        }
      });
      // event_p
      // .data(month_array[i])
      // .enter()
      // .append("div")
      // .merge(date_p)
      // .style('width',dayWidthNoPadding+size_type).style('height','200px').style('display', 'inline-block').style('padding',date_p_padding+size_type).style('border-top',date_p_l_border+size_type+border_color)
      // .style('background-color',p_background_color)
      // .text(d=>"")
      // .each(function(d,i) {
      //   if (d.date()%interval===1) {
      //     d3.select(this)
      //     .style('border-left',date_p_l_border+size_type+border_color)
      //     .style('padding-left',date_p_padding-date_p_l_border+size_type );
      //   }
      // });
      month_width=(dayWidth)*month_array[i].length-2*date_p_padding;
    month_p
    .data(a)
    .enter()
    .append("div")
    .merge(month_p)
    .text(d=>d.split(' ')[1])
    .style('width',month_width+size_type)
    .style('height',baseHeight+size_type)
    .style('padding',date_p_padding+size_type)
    .style('background-color',p_background_color)
    .style('border-bottom',date_p_l_border+size_type+border_color)
    .style('border-left',date_p_l_border+size_type+border_color)
    .style('border-top',date_p_l_border+size_type+border_color)
    .style('padding-left',date_p_padding-date_p_l_border+size_type )
    .style('color',p_word_color);
    y_ruler_length=y_ruler_length+(date_p_padding*2+gap)*month_array[i].length;
    
  }
  // let s= month_array[0][0].toDateString().split(' ');
  // let e= month_array[month_array.length-1][month_array[month_array.length-1].length-1].toDateString().split(' ');
  // console.log(month_array[0][0].toDateString().split(' '));
  // let td=month_array[0][0].getDate();
  // let ty=month_array[0][0].getMonth();
  // let tm=month_array[0][0].getYear();
  //start from first day;
  // let start_t= moment(s[3]+s[1]+s[2]+" "+"00:00:00", "YYYYMMMDD HH:mm:ss", true);
  
  // let end_t= moment(e[3]+e[1]+e[2]+" "+"23:59:59", "YYYYMMMDD HH:mm:ss", true);
  console.log(start_t);
  console.log(end_t);
  console.log(y_ruler_length);
  let p_array=[];
  let format_map = new Map();
  for ( let i = 0 ; i < map_list.length ;i++){

    format_map.set(map_list[i]["word"],map_list[i]["type"]);
  };

  let card_model_array=[];

  let card_model_array_index=0;

  
  for(let i = 0; i<data.length;i++){
      // while (datat[i]["type"]==="class_bar_end" && i<datat.length-1){
      //   i=i+1;
      // }
      // let key = format_map.get(datat[i]["content"]);
      // let type = data[i]["type"];
      // console.log(data[i])
      let type = data[i][typeIndex];
     
      if(type.length>0&&type!=="(遺漏值)"){

        let hierarchy= parseInt(data[i][hierarchyIndex]);
        let cardStyle=default_style;

        if(!isNaN(hierarchy)& hierarchy>=6){
          cardStyle=second_style;

        }
        let card= new CardModel(data[i][typeIndex],data[i][contentIndex],cardStyle,type,0);
        card.rowid=i;
        card.hierarchy=data[i][hierarchyIndex];
        card.iconkey=data[i][iconIdIndex];
        card_model_array[card_model_array_index]=card;
        // let period_value=end_t.valueOf()-start_t.valueOf();
      let t = moment(data[i][dateIndex]+data[i][timeIndex], timeFormat, true);
      let p = (t.valueOf()-start_t.valueOf())/period_value*(xAxisWidth);
      // console.log(t.valueOf()-start_t.valueOf())
      card_model_array[card_model_array_index].center_pos=Math.round(p, 2);
    
      // if (data[i]["bar_id"]>0){
      //   card_model_array[card_model_array_index].bar_id=data[i]["bar_id"];
      // }
      card_model_array_index=card_model_array_index+1;
      }
      
  }

  let card_border_width=2;
  let card_padding_width=5;
  let card_max_width=200;
  function no_dots(type){
    return type==="class_bar_start"||type==="class_bar_end";
  }

  let event_pos_array=[];
  for (let i = 0 ; i<data.length ;i++){
    let period_value=end_t.valueOf()-start_t.valueOf();
    let t = moment(data[i][dateIndex]+data[i][timeIndex], timeFormat, true);
    // console.log(t.valueOf()-start_t.valueOf());
    // console.log(period_value);
    // console.log((t.valueOf()-start_t.valueOf())/period_value*y_ruler_length);
    event_pos_array[i]=new eventPos();
    event_pos_array[i].type=data[i][typeIndex];
    // console.log(t);
    // console.log(start_t);
    // console.log(t.valueOf())
    // event_pos_array[i].bar_id=data[i]["bar_id"];
    let p = (t.valueOf()-start_t.valueOf())/period_value*xAxisWidth+date_p_padding+gap/2+axisLeft;

    event_pos_array[i].center_pos=Math.round(p, 2);
  }
  // for (let i = 0 ; i<card_model_array.length ;i++){
  //   let j=i;
  //   while (datat[j]["type"]==="class_bar_end"&&j<card_model_array.length)
    
  //     j++;}

 
  //   console.log(card_model_array[i]);
  // };

  // d3.select("#dot_sec").selectAll("div")
  // .data(card_model_array)
  // .enter()
  // .append("div")
  // .each(function(d,i) {
  //   if (!no_dots(d.type)) {
  //     d3.select(this)
  //     .style('left',d=>{return d.center_pos-dot_r+size_type;})
  //     .style('width',dot_r*2+size_type)
  //     .style('height',dot_r*2+size_type)
  //     .style('top',day_bottom_h-dot_r+1+size_type);
  //   }
  // });


  //fill text to card


 
  console.log(card_model_array);
  let enterSelection=
  d3.select("#card_sec")
  .selectAll("div")
  .data(card_model_array)
  .enter()
  .append("div")

  .style('background-color',d=>"#"+d.style.background_color)
  .style('border',d=>card_border_width+size_type+" #"+d.style.border_color+" solid")
  .style('padding',card_padding_width+size_type)
  .style('display','flex')
  .each(function(d,i) {
      d3.select(this)
      .attr("id", "card"+i)
      .attr('class', d.style.icon)
      .attr('font-weight', 900)
      .append('img')
      
      .attr('src', d=>{
          try{
            return iconMap[parseInt(d.iconkey)-1].location;
          }catch(e){
            return "";
          }
        }
      )
      // .attr('width','16px')
      // .attr('height','16px')
      .style('padding-right',iconPadding+size_type);
      // console.log(iconMap)
      d3.select(this)
      .append('text').text(d=>d.text);
      // if (d.type!="class_bar_start") {
      //   d3.select(this)
      //   .style('max-width',card_max_width+size_type);
      // }
      // console.log(d)
      let row=d;
      d3.select(this)
    .on("mouseover",  function(event) { 
      console.log(event);
      console.log(row);

  
      let x =event.pageX-axisLeft;
      let y =event.pageY-axisBaseHeight;
      // div.transition()
      mouseOverDiv
        .style("opacity", .8)
        .style("left", (x) + "px")
        .style("top", (y) + "px")
        .style("z-index", 10);
        try { // statements to try
  
          mouseOverDiv.html(row.hover)
        }
        catch (e) {
          mouseOverDiv.html("")      
        }  
      // line.attr("stroke-width", 4);
      })
    .on("mouseout", function(d) {
      // div.transition()
      // svg.selectAll(".c"+i).attr("r", 2.5)
      mouseOverDiv
        .style("left", 0 + "px")
        .style("top", 0 + "px")
        .style("opacity", 0);
      // line.attr("stroke-width", 2); 
      })

    // timeline click 
    .on('click', function () {
              
        try{

        

          sendSelectedRowToVA(d.rowid);
          console.log("pre "+ clickedEleIndex)
          if (clickedEleIndex>=0){
            
            d3.select("#dot"+clickedEleIndex)
            .style("z-index", defaultZIndex);
            d3.select("#line"+clickedEleIndex)
            .style("z-index", defaultZIndex);
            d3.select("#card"+clickedEleIndex)
            .style("z-index", defaultZIndex)
            .style('border',d=>card_border_width+size_type+" #"+row.style.border_color+" solid")
            // .style("border", selectBorderWidth+size_type);
          }
          clickedEleIndex=i;
          console.log("click "+ clickedEleIndex)

          d3.select("#dot"+clickedEleIndex)
          .style("z-index", clickZIndex);
          d3.select("#line"+clickedEleIndex)
          .style("z-index", clickZIndex);
          d3.select("#card"+clickedEleIndex)
          .style("z-index", clickZIndex)
          .style('border',d=>selectBorderWidth+size_type+" #"+row.style.border_color+" solid")
         

        }
        catch(e){

        }
        


    });
  })
;
 



  let event_sec_h = document.getElementById('month').offsetHeight*2;
  let type_sec_h = document.getElementById('month').offsetTop+
  (date_p_padding*2+baseHeight)*2;
  console.log("height:"+event_sec_h);
  console.log("height:"+type_sec_h);

  let type_p_abtract = new  createPanel(type_sec_h+10,1000,timelineCardVerticalGap);
  let event_p_abtract = new  createPanel(event_sec_h+10,1000,timelineCardVerticalGap);

  let children = document.getElementById('card_sec').children;

  // let card_l_array=p_array.slice();
  // let card_r_array=[];


  
  let card_h_array=[];
  for (var i = 0; i < children.length; i++) {

    // if (card_model_array[i].type==="class_bar_start") {
    //   card_model_array[i].left_pos=card_model_array[i].center_pos;
    //   for(let j = i;j < data.length; j++){
    //     if(event_pos_array[j].type==="class_bar_end"&&card_model_array[i].bar_id===event_pos_array[j].bar_id){
    //       card_model_array[i].right_pos=event_pos_array[j].center_pos;
    //       console.log(card_model_array[i].right_pos);
    //       break;
    //     }
    //     else{
    //       card_model_array[i].right_pos=9999;
    //     }
    //   }

    // }else{
      card_model_array[i].left_pos=card_model_array[i].center_pos-2;
      card_model_array[i].right_pos=card_model_array[i].center_pos+(children[i].offsetWidth);
    // }
    if (card_model_array[i]){

      let hierarchy =parseInt(card_model_array[i].hierarchy);

      card_h_array.push(type_p_abtract.addCard(card_model_array[i].left_pos, card_model_array[i].right_pos).height);
      // console.log(card_h_array);
    // if(!isNaN(hierarchy)){
    //   if (hierarchy>5 || card_model_array[i].type==="class_bar_start" || card_model_array[i].type==="class_bar_end") {
    //     card_h_array.push(type_p_abtract.addCard(card_model_array[i].left_pos, card_model_array[i].right_pos).height);  

    //   }
    //   else{
    //     card_h_array.push(event_p_abtract.addCard(card_model_array[i].left_pos, card_model_array[i].right_pos).height);
    //   }
    // }
    // else
    // {   
    //   card_h_array.push(event_p_abtract.addCard(card_model_array[i].left_pos, card_model_array[i].right_pos).height);
    // }
  }
  }

  d3.select("#card_sec").selectAll("div")
  .data(card_model_array)
  .style('left',d=>{return d.center_pos+size_type;}).style('top',10+size_type).style('top',10+size_type)
  // .each(function(d) {

  //   if (d.type==="class_bar_start") {

  //     d3.select(this)
  //     .style('width',d.right_pos-d.left_pos-card_border_width-card_padding_width+size_type);
  //   }
  // });
  // console.log(card_h_array);
  d3.select("#card_sec").selectAll("div")
  .data(card_h_array).style('top',d=>d+size_type);
  d3.select("#type_sec").selectAll("div")
  .style("height",type_p_abtract.getMaxPanelH()+"px");


  let dot_r=5;
  let day_bottom_h = document.getElementById('type_sec').offsetTop;

  d3.select("#dot_sec").selectAll("div")
  .data(card_model_array)
  .enter()
  .append("div")
  .each(function(d,i) {
    console.log(!no_dots(d.type));
    if (!no_dots(d.type)) {
      d3.select(this)
      .attr("id", "dot"+i)
      .style('left',d=>{return d.center_pos-dot_r+size_type;})
      .style('width',dot_r*2+size_type)
      .style('height',dot_r*2+size_type)
      .style('top',day_bottom_h-dot_r+1+size_type);
    }
  });
  let line_len_array=[];
  let dot_children = document.getElementById('dot_sec').children;
  for (var i = 0; i < dot_children.length; i++) {
    line_len_array[i]=children[i].offsetTop-dot_children[i].offsetTop;
  }

  let line_children = document.getElementById('line_sec').children;
  d3.select("#line_sec").selectAll("div")
  .data(card_model_array)
  .enter()
  .append("div")

  .each(function(d,i) {
    if (!no_dots(d.type)) {
      d3.select(this)
      .attr("id", "line"+i)
      .style('left',d=>{return d.center_pos-line_children[0].clientWidth/2+size_type;})
      .style('top', dot_children[0].offsetTop+size_type);
    }
  });
  d3.select("#line_sec").selectAll("div")
  .data(line_len_array)
  .each(function(d,i) {
    if (!no_dots(d.type)) {
      d3.select(this)
      .style('height',d=>{return d+size_type;});
    }
  });

  d3.select("#line_sec").selectAll("div")
  .data(card_model_array)
  .style('background-color',d=>"#"+d.style.border_color);

  d3.select("#dot_sec").selectAll("div")
  .data(card_model_array)
  .style('background-color',d=>"#"+d.style.border_color); 
  event_sec_h = document.getElementById('type_sec').offsetTop;
  console.log(event_sec_h)

  event_sec_h = document.getElementById('type_sec').offsetTop;
  console.log(event_sec_h)
};





// d3.select("#month").append("svg").append('line').attr('x1', 100).attr('y1', 0).attr('x2', 100).attr('y2', 100)
// .style('stroke', 'red')
// .style('stroke-width', 10)
// .style('z-index', 0)
;

function buildMonthPanel(input){
    let year = input.substr(0,4);
    let month = input.substr(4,2);
    let date = input.substr(6,2);

    month=monthNames[parseInt(month)-1];
    let output = year+" "+month;
    return output;
  }


  function updateScroll(){
    window.scrollTo(100, 0);
    

  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  
  // if (test===1){
  //   iconMap= csvToArray(iconTest);
 


  //   console.log(iconMap)
  //   let thresholds =  csvToArray(csvTest).sort(function(a, b){
  //   v1= a.variable.toLowerCase();
  //   v2 = b.variable.toLowerCase();
  //   if (v1 < v2) return -1;
  //   if (v1 > v2) return 1;
  //   return 0;});
  
  //   console.log(thresholds)
  //   let data=datat.data.data;
  //   let columns =datat.data.columns;
  //   data.sort((a,b)=> (a[0]+a[1]+a[2] > b[0]+b[1]+b[2] ? 1 : -1));
    
  //   resizeFromframe(data);
  //   let dateArray =setXAxisSize(data)
  //   console.log(dateArray);
  //   lineChart(data,dateArray,columns,thresholds);
    
  //   build_time_panel(data,dateArray);
   
  //   delay(1000).then(() =>window.scrollTo({top:0 ,left:window.innerWidth,behavior: 'smooth'}));
    
  // }

  
const getApi = async (url) => {

  const resp = await fetch(url)  
  return resp.text();
  
  }
  
if (window.addEventListener) {
  // For standards-compliant web browsers
  console.log('get')
  window.addEventListener("message", onMessage, false);
} else {
  window.attachEvent("onmessage", onMessage);
}

// Retrieve data and begin processing
function onMessage(event) {
  if (event && event.data )
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

        let data = event.data.data
        data=formatData(data,timeIndex)
        getApi(thresholdsUrl).then((resp) => {

            let thresholds =  csvToArray(resp).sort(
              function(a, b){
                v1= a.variable.toLowerCase();
                v2 = b.variable.toLowerCase();
                if (v1 < v2) return -1;
                if (v1 > v2) return 1;
                return 0;}
            );

            getApi(iconMapUrl).then((resp) => {
              iconMap = csvToArray(resp);
              
              console.log(thresholds)
              console.log(iconMap)
              

              // data.sort((a,b)=> (a[0]+a[1]+a[2] > b[0]+b[1]+b[2] ? 1 : -1));
              resizeFromframe(data);
              let dateArray =setXAxisSize(data)
              let columns =event.data.columns;
              console.log(dateArray)
              // lineChart(data,dateArray,columns,thresholds,lineHoverIndex);
              containerWidth=xAxisWidth
              build_time_panel(data,dateArray,timeHoverIndex);

              delay(1000).then(() =>window.scrollTo({top:0 ,left:9999999,behavior: 'smooth'}));
    
            });
        });
    }
  
  }
}
