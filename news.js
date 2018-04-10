// JavaScript Document
function go() {

    var today = new Date();
    var bday = new Date(2011, 1, 1);

    tf=document.dateform;
    vd=tf.sday.options[tf.sday.selectedIndex].value
    vm=tf.smonth.options[tf.smonth.selectedIndex].value;

    var aday = new Date(today.getYear() ,vm-1, vd);

    // if ((aday>bday) && (aday)<=(today))
    //document.location="/GB/historic/"+vm+vd+"/";


}
function resetselect () {
    document.dateform.smonth.selectedIndex=1
    document.dateform.sday.selectedIndex=5
}