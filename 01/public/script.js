const url = 'https://cors-anywhere.herokuapp.com/https://currate.ru/api/?get=rates&pairs=';
const key = '&key=763cfb0fa49f7c16319810bbf106680d';
let pairs = ['ZECUSD', 'XRPUSD', 'RSDUSD', 'MMKUSD', 'MDLUSD', 'LKRUSD', 'IDRUSD', 'GELUSD', 'EURUSD', 'ETHUSD', 'CNYUSD', 'BTGUSD', 'BTCUSD', 'BCHUSD'];
let currency = [], from, to;

$("#convert-from .amount").on("input", function(){
  $("#convert-to .amount").val($(this).val() * $("#convert-from .counter-currensy-to").text());
});

$(".calc__reverse").on("click", function(){
  var tmp;
  let currentFrom, currentTo;
  currentFrom = $("#convert-from .active").attr("data");
  currentTo = $("#convert-to .active").attr("data");
  counterChange(currentTo, currentFrom, "convert-to", "convert-from");
  reverse(currentFrom, currentTo);
});

$(".items").on("click", ".calc_switcher_item", function(){
    $("[id=" + $(this).parent().parent().attr("id") + "] .active").removeClass("active");
    $(this).addClass("active");
    from = $("#convert-from .active").text();
    to = $("#convert-to .active").text();
    counterChange(from, to, "convert-from", "convert-to");
});

function counterChange(from, to, convertFrom, convertTo){
  if(from == to){
    $("#convert-from .counter-currensy-to").text(1);
    $("#convert-to .counter-currensy-to").text(1);
    $("#convert-to .amount").val($("#convert-from .amount").val() * 1);
  }else{
    axios
      .get(url + from + to + "," + to + from + "," + from + "USD" + "," + "USD" + to + "," + to + "USD" + "," + "USD" + from  + key)
      .then(response => (calculatingPrice(response.data, from, to)))
      .then(function(){
        $("#convert-to .amount").val($("#convert-from .amount").val() * $("#convert-from .counter-currensy-to").text());
      });
  }
  changeCurrency(convertFrom, convertTo);
}

function calculatingPrice(res, from, to){
  if(res.data[from + to]){
    $("#convert-from .counter-currensy-to").text((res.data[from + to]).toFixed(3));
    $("#convert-to .counter-currensy-to").text((res.data[to + from]).toFixed(3));
  }else{
    $("#convert-from .counter-currensy-to").text((res.data[from + "USD"] * res.data["USD" + to]).toFixed(8));
    $("#convert-to .counter-currensy-to").text((res.data[to + "USD"] * res.data["USD" + from]).toFixed(8));
  }
}

$(".list").on("change", function(){
  $("[id=" + $(this).parent().parent().attr("id") + "] .active").removeClass("active");
  if($("[id=" + $(this).parent().parent().attr("id") + "] [data='"+ $(this).val() +"']").html()){
    $("[id=" + $(this).parent().parent().attr("id") + "] [data='"+ $(this).val() +"']").addClass("active");
  }else{
    $("[id=" + $(this).parent().parent().attr("id") + "] .items :last-child").addClass("active");
    $("[id=" + $(this).parent().parent().attr("id") + "] .items :last-child").attr("data", $(this).val());
    $("[id=" + $(this).parent().parent().attr("id") + "] .items :last-child").html($(this).val());
  }
  from = $("#convert-from .active").text();
  to = $("#convert-to .active").text();
  counterChange(from, to, "convert-from", "convert-to");
});

$(document).ready(function(){
  filling(pairs);
  $(".items").find(':first-child').addClass("active");
  changeCurrency("convert-from", "convert-to");
  $("#convert-from .counter-currensy-to").text(1);
  $("#convert-to .counter-currensy-to").text(1);
});

function reverse(currentFrom, currentTo){
  tmp = $("#convert-from .items :last-child").html();
  $("#convert-from .items :last-child").html($("#convert-to :last-child").html());
  $("#convert-to .items :last-child").html(tmp);
  tmp = $("#convert-from .items :last-child").attr("data");
  $("#convert-from .items :last-child").attr("data", $("#convert-to :last-child").attr("data"));
  $("#convert-to .items :last-child").attr("data", tmp);
  $("#convert-from .active").removeClass("active");
  $("#convert-to .active").removeClass("active");
  $("#convert-from [data="+ currentTo +"]").addClass("active");
  $("#convert-to [data="+ currentFrom +"]").addClass("active");
}

function changeCurrency(currencyFrom, currencyTo){
  $("#convert-from .currensy-from").text($("#"+ currencyFrom +" .active").text());
  $("#convert-to .currensy-from").text($("#"+ currencyTo +" .active").text());
  $("#convert-from .currensy-to").text($("#"+ currencyTo +" .active").text());
  $("#convert-to .currensy-to").text($("#"+ currencyFrom +" .active").text());
}

function filling(arr){
  let i = 0, elementClassic, elementClassicForSelect;
  for(const [key, value] of Object.entries(arr)){
    if(currency.indexOf( separation(arr[key]) ) == -1 || currency[0] == null){
      if(i < 4){
        elementClassic = '<div class="calc_switcher_item" data="'+ separation(arr[key]) +'">'+ separation(arr[key]) +'</div>';
        $('.items').append(elementClassic);
      }
      currency.push(separation(arr[key]));
      elementClassicForSelect = '<option value="'+ separation(arr[key]) +'">'+ separation(arr[key]) +'</option>';
      $('.list').append(elementClassicForSelect);
      i++;
    }
  }
}

function separation(string){
  return string[0] + string[1] + string[2];
}
