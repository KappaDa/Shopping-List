//<------------------------變數宣告------------------------>

var shoplist = {};

shoplist.name = "MyBuylist 購物清單";
shoplist.time = "2017/02/25";
shoplist.list = [
    {name: "吹風機", price: 300},
    {name: "麥克風", price: 9000},
    {name: "筆記型電腦", price: 29000},
    {name: "IPhone9", price: 28500},
    {name: "神奇海螺", price: 443300},
];

var item_html = "<li id = {{id}} class='buy_item'>{{num}}.{{name}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

var total_html = "<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

var itemurl = "http://www.monoame.com/awi_class/api/command.php?type=get&name=itemdata";


//<------------------------Jquery----------------------->

$("document").ready(function() {

    $.ajax({
        url: itemurl,
        success: function(res) {
            shoplist.list = JSON.parse(res);
            showlist();
        }
    });

    showlist();

    $(".addbtn").click(
        function() {
            shoplist.list.push(
                { 
                    name: $("#input_name").val(),
                    price: $("#input_price").val()
                }
            );

            $("#input_name").val("");
            $("#input_price").val("");

            showlist();
        }
    );
});

//<------------------------FUNCTION----------------------->

function showlist() {
    var total_price = 0;

    $("#items_list").html("");

    for (var i = 0; i < shoplist.list.length; i++) {

        var item = shoplist.list[i];
        var item_id = "buyitem" + i;
        var del_item_id = "del_buyitem" + i;

        var current_item_html = 
            item_html.replace("{{num}}", i + 1)
                     .replace("{{name}}", item.name)
                     .replace("{{id}}", item_id)
                     .replace("{{del_id}}", del_item_id)
                     .replace("{{price}}", item.price)
                     .replace("{{del_item_id}}",i);

        total_price += parseInt(item.price);

        $("#items_list").append(current_item_html);

        $("#" + del_item_id).click(
            function() {
                remove_item(parseInt($(this).attr("data-delid")));
            }
        );
    }

    var current_total_html = total_html.replace("{{price}}", total_price);

    $("#items_list").append(current_total_html);
}

function remove_item(id) {
    shoplist.list.splice(id, 1);
    showlist();
}