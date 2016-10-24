$(document).ready(function(){
var count=0;
existCheck=function(count){
if($(".trending_gallery div").children().length==count)
return false
else
return true
}
galleryLoad=function(){
if($(window).width()<400){
if(existCheck(1)){
$(".trending_gallery div").css("display","none")
columnize(1,".trending_gallery ul:eq(0)",":",":")
}
}
else if($(window).width()<650){
if(existCheck(2)){
$(".trending_gallery div").css("display","none")
columnize(2,".trending_gallery ul:eq(0)",":",":")
}}
else if($(window).width()<820){
if(existCheck(3)){
$(".trending_gallery div").css("display","none")
columnize(3,".trending_gallery ul:eq(0)",":",":")
}}
else{
if(existCheck(4)){
$(".trending_gallery div").css("display","none")
columnize(4,".trending_gallery ul:eq(0)",":",":")
}}
}
$(window).resize(function(){
galleryLoad();
if($(window).width()>650){
   $(".user_menu").css("display","inline-block")
   $(".search_categories").css({"display":"inline-block","width":"20%"})
   $(".search_box").css("display","inline-block")
   $(".category_button").css("display","none")
   $(".deals_slider").css("display","block")
   $(".main_gallery").css("display","block")
   $(".quick_menu").css("display","block")
   $(".category_menu ul li").css("display","none")
   $(".quick_menu").css("display","none")
 }
else if($(window).width()<650){
$(".user_menu").css("display","none")
$(".search_categories").css("display","none")
$(".search_box").css("display","inline-block")
$(".category_button").css("display","inline-block")
$(".quick_menu").css("display","block")
}
});

$("#user").click(function(){
$(".user_menu").slideToggle();
})

$(".search figure").click(function(){
$(".deals_slider").toggle("slide",{direction:"left"})
$(".main_gallery").toggle("slide",{direction:"left"})
$(".quick_menu").toggle("slide",{direction:"left"})
$(".category_menu ul li").toggle("slide",{direction:"left"})

})

$(".external_menu_button ").click(function(){
$('.external_menu_list').toggle();
if($(".external_menu_button").css("transform")=="none")
$(".external_menu_button").css("transform","rotate(180deg)",
"-ms-transform","rotate(180deg)", 
"-webkit-transform","rotate(180deg)")
else
$(".external_menu_button").css("transform","none",
"-ms-transform","none", 
"-webkit-transform","none")
return false
})

$(".category_menu ul li").click(function(){
$(".category_menu ul li div").toggle();
return false;
})

$("#gallery ul li").swipe({
  swipe:function(event, direction, distance, duration, fingerCount) {
  $("#gallery ul:eq(1) li button").css({"background":"#2B60DE","color":"#FFF"})
    clearInterval(refreshId)
    var indexVal=$(this).index();
		  $(this).css("display","none")
          if(direction=="left"){
		  if(indexVal==4)
		  indexVal=0;
		  else
		  indexVal++;
		  $("#gallery ul:eq(0) li:eq("+indexVal+")").toggle("slide",{ direction: "right" }) 		  			
		  }
		  else{
		  if(indexVal==0)
		   indexVal=4;
		  else 
            indexVal--;		  
		  $("#gallery ul:eq(0) li:eq("+indexVal+")").toggle("slide",{ direction: "left" }) 		  
			}
    count=indexVal;
	$("#gallery ul:eq(1) li:eq("+count+") button").css({"background":"#CCC","color":"#000"})
	refreshId=setInterval(slider,3000);
  }
});
$(".category_button").click(function(){
$(".search_box").toggle();
$(".category_button").toggle();
$(".search_categories").css("width","50%")
$(".search_categories").toggle();
return false;
})
$(".search_button_image").click(function(){
if($(".search_categories").css("display")!="none"){
$(".search_box").toggle();
$(".category_button").toggle();
$(".search_categories").toggle();}
return false;
})
$("#gallery ul:eq(1) li button").click(function(){
count=parseInt($(this).text())-1
clearInterval(refreshId);
console.log(count)
$("#gallery ul:eq(1) li button").css({"background":"#2B60DE","color":"#FFF"})
$("#gallery ul:eq(1) li:eq("+count+") button").css({"background":"#CCC","color":"#000"})
$("#gallery ul:eq(0) li").css("display","none")
$("#gallery ul:eq(0) li:eq("+count+")").toggle("slide",{ direction: "right" }) 
refreshId=setInterval(slider,3000);
return false;
})

slider=function(){
count++;
if(count==5)
 count=0
 $("#gallery ul:eq(1) li button").css({"background":"#2B60DE","color":"#FFF"})
$("#gallery ul:eq(0) li").css("display","none") 
$("#gallery ul:eq(0) li:eq("+count+")").toggle("slide",{ direction: "right" })
$("#gallery ul:eq(1) li:eq("+count+") button").css({"background":"#CCC","color":"#000"})
}

refreshId=setInterval(slider,3000);

});
$(window).load(function(){
galleryLoad();
//columnize(4,".trending_gallery ul:eq(0)","","")
columnize(3,".external_menu_list ul:eq(1)","width:100%","display:inline-block,width:59%")

});