$(document).ready(function(){
$(".external_menu_list ul:eq(1)").columnize({columns:3})
if($(window).width()>1000)
$(".trending_gallery").columnize({columns:3});
else if($(window).width()>820)
$(".trending_gallery").columnize({columns:3});
else if($(window).width()>650)
$(".trending_gallery").columnize({columns:2});
else
$(".trending_gallery").columnize({columns:1});

screenChange=function(){
if($(window).width()==1000){
$(".trending_gallery").columnize({columns:4});
location.reload()}
else if($(window).width()==820){
$(".trending_gallery").columnize({columns:3});
location.reload()}
else if($(window).width()==650){
$(".trending_gallery").columnize({columns:2});
location.reload()
}
else if($(window).width()<650){
$(".trending_gallery").columnize({columns:1});
location.reload()
}
}
$(window).resize('screenChange');


});