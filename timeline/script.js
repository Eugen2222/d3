



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
      //process event.data
      console.log(event.data)
  }
}

va.messagingUtil.setOnDataReceivedCallback(a);

function a(resultData) {

      //process event.data
      console.log(resultData)

}










var svg =d3.select("#svgID");
const card_horizen_gap=10;
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



var datat= 
    [
      {"date":"20211106","time":"00:00:00","content":"血液腫瘤科","type":"class","obj":""},
      {"date":"20211106","time":"00:00:00","content":"血液腫瘤科","type":"class","obj":""},

      {"date":"20211106","time":"00:10:00","content":"血液腫瘤科","type":"class","obj":""},
      {"date":"20201106","time":"00:00:00","content":"血液腫瘤科","type":"class","obj":""},
      {"date":"20211112","time":"00:00:00","content":"血液腫瘤科","type":"class","obj":""},
    {"date":"20211106","time":"00:00:00","content":"血液腫瘤科","type":"class","obj":""},
    {"date":"20211106","time":"00:00:00","content":"血液腫瘤科住院","type":"class_bar_start","bar_id":"1"},
    {"date":"20211112","time":"00:00:00","content":"血液腫瘤科住院","type":"class_bar_end","bar_id":"1"},
  
    ]
    
;

datat.sort((a,b)=> (a.date+a.time+a.content > b.date+b.time+b.content ? 1 : -1));
console.log(datat)
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
let default_style=new CardStyle("ffffff","ffffff","");
let EC_style=new CardStyle("dfd6f5","","fas fa-eye-dropper");
let HO_inhouse=new CardStyle("d5dcf6","c7cee0","");
let map_list=
[
  {"word":"E.cloacae","type":"EC"},
  {"word":"攝影","type":"PHO"},
  {"word":"檢驗","type":"CHE"},
  {"word":"血液腫瘤科","type":"HO"},
  {"word":"急診內科","type":"EmergencyMedicine"},
  {"word":"醫療共通","type":"MedicalCommon"}, 
  {"word":"血液腫瘤科住院","type":"HO_inhouse"}, 
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



function CardModel(text,url, style,type,center_pos) {
 this.text=text;
 this.url=url;
 this.style=style;
 this.type=type;
 this.center_pos=center_pos;
 this.left_pos=0;
 this.right_pos=0;
 this.bar_id=0;
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
const interval=5;
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


Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
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

    // for(d in dateArray){
    //     console.log(d.toString());
    // }
    return dateArray;
  }



function slice_month(date_array){
    let month_group= new Array();
    let pre_date=new Date();
    let head_index=0;
    for (let i=0 ; i<date_array.length; i++){
        if (i===0){

        }else{
            if(pre_date.getFullYear()!== date_array[i].getFullYear()||pre_date.getMonth() !== date_array[i].getMonth() ){
                month_group.push(date_array.slice(head_index, i));    
 
                head_index=i;
            }else if (i===date_array.length-1){
                month_group.push(date_array.slice(head_index));                 
            }
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
  let h = 200;
  let gap= (h-(item_h*layer_num))/layer_num;


  this.createLayer=function(n) {
    let obj = {};
    obj.height = top_pos+n*(gap+item_h);
    obj.left=invisible_pos;
    obj.right=invisible_pos;
    return obj;
  };

  this.addCard=function(card_left,card_right) {
    for(let i=0; i<layerPipe.length; i++){
        if(layerPipe[i].right+card_horizen_gap<card_left){
          layerPipe[i].left=card_left;
          layerPipe[i].right=card_right;
          console.log(layerPipe[i]);
          return layerPipe[i];

        }
        else if(i===layerPipe.length-1){
          layerPipe[0].right=card_right;
          layerPipe[0].left=card_left;
          return layerPipe[0];
        }
    }
  };

  for (i=0;i<layer_num;i++){
    layerPipe.push(this.createLayer(i)); 
  };
  

}


function build_time_panel(){
  let month_p=d3.select("#month").selectAll("div");
  let month_array=slice_month(get_y_data(datat));
  let date_p=d3.select("#day_sec").selectAll("div");
  let type_p=d3.select("#type_sec").selectAll("div");
  let event_p=d3.select("#event_sec").selectAll("div");
  let border_color=' #dde5e8 solid';
  let p_background_color='#f2f9ff';
  let p_word_color="#000000";
  let date_p_padding=10;
  let date_p_l_border=2;
  let y_ruler_length=0;
  let month_width=0;
  for (let i = 0 ; i< month_array.length; i++){
    console.log(month_array[i][0]);
    let a =[];
    a[0]=month_array[i][0].toString();


    month_width=(gap+date_p_padding*2)*month_array[i].length-2*date_p_padding;
      date_p
      .data(month_array[i])
      .enter()
      .append("div")
      .merge(date_p)
      .style('width',gap+size_type).style('height','20px').style('display', 'inline-block').style('padding',date_p_padding+size_type)
      .style('background-color',p_background_color)
      .style('color',p_word_color)
      .style('border-bottom',date_p_l_border+size_type+border_color)
      .text(d=>{return (d.getDate()%interval===1)? d.getDate().toString():""})
      .each(function(d,i) {
        if (d.getDate()%interval===1) {
          d3.select(this)
          .style('border-left',date_p_l_border+size_type+border_color)
          .style('padding-left',date_p_padding-date_p_l_border+size_type );
        }
      });

      type_p
      .data(month_array[i])
      .enter()
      .append("div")
      .merge(date_p)
      .style('width',gap+size_type).style('height','200px').style('display', 'inline-block').style('padding',date_p_padding+size_type)
      .style('background-color',p_background_color)
      
      .text(d=>"")
      .each(function(d,i) {
        
        if (d.getDate()%interval===1) {
          d3.select(this)
          .style('border-left',date_p_l_border+size_type+border_color)
          .style('padding-left',date_p_padding-date_p_l_border+size_type );
        }
      });
      event_p
      .data(month_array[i])
      .enter()
      .append("div")
      .merge(date_p)
      .style('width',gap+size_type).style('height','200px').style('display', 'inline-block').style('padding',date_p_padding+size_type).style('border-top',date_p_l_border+size_type+border_color)
      .style('background-color',p_background_color)
      .text(d=>"")
      .each(function(d,i) {
        if (d.getDate()%interval===1) {
          d3.select(this)
          .style('border-left',date_p_l_border+size_type+border_color)
          .style('padding-left',date_p_padding-date_p_l_border+size_type );
        }
      });

    month_p
    .data(a)
    .enter()
    .append("div")
    .merge(month_p)
    .text(d=>d.split(' ')[1])
    .style('width',month_width+size_type).style('padding',date_p_padding+size_type)
    .style('background-color',p_background_color)
    .style('border-bottom',date_p_l_border+size_type+border_color)
    .style('border-left',date_p_l_border+size_type+border_color)
    .style('border-top',date_p_l_border+size_type+border_color)
    .style('padding-left',date_p_padding-date_p_l_border+size_type )
    .style('color',p_word_color);
    y_ruler_length=y_ruler_length+(date_p_padding*2+gap)*month_array[i].length;
    
  }
  let s= month_array[0][0].toDateString().split(' ');
  let e= month_array[month_array.length-1][month_array[month_array.length-1].length-1].toDateString().split(' ');
  console.log(month_array[0][0].toDateString().split(' '));
  let td=month_array[0][0].getDate();
  let ty=month_array[0][0].getMonth();
  let tm=month_array[0][0].getYear();
  //start from first day;
  let start_t= moment(s[3]+s[1]+s[2]+" "+"00:00:00", "YYYYMMMDD HH:mm:ss", true);
  
  let end_t= moment(e[3]+e[1]+e[2]+" "+"23:59:59", "YYYYMMMDD HH:mm:ss", true);
  console.log(start_t);
  console.log(y_ruler_length);
  let p_array=[];
  let format_map = new Map();
  for ( let i = 0 ; i < map_list.length ;i++){

    format_map.set(map_list[i]["word"],map_list[i]["type"]);
  };

  let card_model_array=[];

  let card_model_array_index=0;
  for(let i = 0; i<datat.length;i++){
      while (datat[i]["type"]==="class_bar_end" && i<datat.length-1){
        i=i+1;
      }
      let key = format_map.get(datat[i]["content"]);
      let type = datat[i]["type"];

      if (key){
        let style = style_map.get(key);

        card_model_array[card_model_array_index]= new CardModel(datat[i]["content"],"https://",style,type,0);
      }
      else {
        card_model_array[card_model_array_index]= new CardModel(datat[i]["content"],"https://",default_style,type,0);
      }
      let period_value=end_t.valueOf()-start_t.valueOf();
      let t = moment(datat[i]['date']+" "+datat[i]['time'], "YYYYMMDD HH:mm:ss", true);
      let p = (t.valueOf()-start_t.valueOf())/period_value*y_ruler_length+date_p_padding+gap/2;
      card_model_array[card_model_array_index].center_pos=Math.round(p, 2);
    
      if (datat[i]["bar_id"]>0){
        card_model_array[card_model_array_index].bar_id=datat[i]["bar_id"];
      }
      card_model_array_index=card_model_array_index+1;
  }

  let card_border_width=2;
  let card_padding_width=5;
  function no_dots(type){
    return type==="class_bar_start"||type==="class_bar_end";
  }

  let event_pos_array=[];
  for (let i = 0 ; i<datat.length ;i++){
    let period_value=end_t.valueOf()-start_t.valueOf();
    let t = moment(datat[i]['date']+" "+datat[i]['time'], "YYYYMMDD HH:mm:ss", true);
    // console.log(t.valueOf()-start_t.valueOf());
    // console.log(period_value);
    // console.log((t.valueOf()-start_t.valueOf())/period_value*y_ruler_length);
    event_pos_array[i]=new eventPos();
    event_pos_array[i].type=datat[i]["type"];
    event_pos_array[i].bar_id=datat[i]["bar_id"];
    let p = (t.valueOf()-start_t.valueOf())/period_value*y_ruler_length+date_p_padding+gap/2;

    event_pos_array[i].center_pos=Math.round(p, 2);
  }
  // for (let i = 0 ; i<card_model_array.length ;i++){
  //   let j=i;
  //   while (datat[j]["type"]==="class_bar_end"&&j<card_model_array.length)
    
  //     j++;}

 
  //   console.log(card_model_array[i]);
  // };
  let dot_r=5;
  let day_bottom_h = document.getElementById('day_sec').children[0].offsetBottom;

  d3.select("#dot_sec").selectAll("div")
  .data(card_model_array)
  .enter()
  .append("div")
  .each(function(d,i) {
    console.log(!no_dots(d.type));
    if (!no_dots(d.type)) {
      d3.select(this)
      .style('left',d=>{return d.center_pos-dot_r+size_type;})
      .style('width',dot_r*2+size_type).style('height',dot_r*2+size_type).style('top',day_bottom_h-dot_r+1+size_type);
    }
  });
  d3.select("#dot_sec").selectAll("div")
  .data(card_model_array)
  .enter()
  .append("div")
  .each(function(d,i) {
    if (!no_dots(d.type)) {
      d3.select(this)
      .style('left',d=>{return d.center_pos-dot_r+size_type;}).style('width',dot_r*2+size_type).style('height',dot_r*2+size_type).style('top',day_bottom_h-dot_r+1+size_type);
    }
  });


  //fill text to card


 
  console.log(card_model_array);
  d3.select("#card_sec").selectAll("div")
  .data(card_model_array)
  .enter()
  .append("div")
  .style('background-color',d=>"#"+d.style.background_color)
  .style('border',d=>card_border_width+size_type+" #"+d.style.border_color+" solid")
  .style('padding',card_padding_width+size_type)
  .each(function(d,i) {
      d3.select(this)
      .attr('class', d.style.icon).attr('font-weight', 900).text(d=>d.text)
  });
 
 


  let event_sec_h = document.getElementById('event_sec').offsetTop;
  let type_sec_h = document.getElementById('type_sec').offsetTop;
  let type_p_abtract = new  createPanel(type_sec_h+10,5,34);
  let event_p_abtract = new  createPanel(event_sec_h+10,5,34);

  let children = document.getElementById('card_sec').children;

  // let card_l_array=p_array.slice();
  // let card_r_array=[];


  
  let card_h_array=[];
  for (var i = 0; i < children.length; i++) {

    if (card_model_array[i].type==="class_bar_start") {
      card_model_array[i].left_pos=card_model_array[i].center_pos;
      for(let j = i;j < datat.length; j++){
        if(event_pos_array[j].type==="class_bar_end"&&card_model_array[i].bar_id===event_pos_array[j].bar_id){
          card_model_array[i].right_pos=event_pos_array[j].center_pos;
          console.log(card_model_array[i].right_pos);
          break;
        }
        else{
          card_model_array[i].right_pos=9999;
        }
      }

    }else{
      card_model_array[i].left_pos=card_model_array[i].center_pos-(children[i].offsetWidth/2);
      card_model_array[i].right_pos=card_model_array[i].center_pos+(children[i].offsetWidth/2);
    }
    if (card_model_array[i]){
    if (card_model_array[i].type==="class" || card_model_array[i].type==="class_bar_start" || card_model_array[i].type==="class_bar_end") {
      card_h_array.push(type_p_abtract.addCard(card_model_array[i].left_pos, card_model_array[i].right_pos).height);  
    }
 
    else if (card_model_array[i].type==="event")
    {    card_h_array.push(event_p_abtract.addCard(card_model_array[i].left_pos, card_model_array[i].right_pos).height);
    
    }
  }
  }

  d3.select("#card_sec").selectAll("div")
  .data(card_model_array)
  .style('left',d=>{return d.left_pos+size_type;}).style('top',10+size_type).style('top',10+size_type)
  .each(function(d) {

    if (d.type==="class_bar_start") {

      d3.select(this)
      .style('width',d.right_pos-d.left_pos-card_border_width-card_padding_width+size_type);
    }
  });
  d3.select("#card_sec").selectAll("div")
  .data(card_h_array).style('top',d=>d+size_type);


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


};

build_time_panel();




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


  