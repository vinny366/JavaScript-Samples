columnize=function(column_count,src_elmnt,ulEl_Style,mainEl_Style){
value=new Array();columns=column_count
count=$(src_elmnt).children().length
for(var i=0;i<count;i++){
value.push({key:i,val:$(src_elmnt+" li:eq("+i+")")[0].clientHeight})
}
value.sort(function(a,b) {
    return a.val - b.val;
});
j=0;flag=true;
column=[]
for(var i=0;i<columns;i++)
column[i]=[]

for(var i=0;i<count;i++){
if(flag)
column[j++].push(i)
else
column[--j].push(i)
if(j==columns)
flag=false;
if(j==0)
flag=true;
}

ulElStyles=[]
ulElStyles=ulEl_Style.split(",")
for(var i=0;i<ulElStyles.length;i++)
mainElStyles=[]
mainElStyles=mainEl_Style.split(",")


var mainDivEl=$("<div>")
for(var i=0;i<columns;i++){
var ulEl=$("<ul>"),divEl=$("<div>");
for(var j=0;j<column[i].length;j++){
var el=$("<li>").append($(src_elmnt+" li:eq("+value[column[i][j]].key+")").html())
ulEl.append(el)}
//if()
for(var k=0;k<ulElStyles.length;k++){
if(typeof ulElStyles[k]!="undefined")
ulEl.css(ulElStyles[k].split(":")[0],ulElStyles[k].split(":")[1])}
divEl.append(ulEl)
divEl.css({"width":100/columns+"%","float":"left"})
mainDivEl.append(divEl)
}
for(var i=0;i<mainElStyles.length;i++)
mainDivEl.css(mainElStyles[i].split(":")[0],mainElStyles[i].split(":")[1])
$(src_elmnt).css("display","none")
$(src_elmnt).parent().append(mainDivEl)
}