import initGeoData from './geoData';
import KorData from './korGeo';
import geoPopData from './pop_v2';
import visaData from './geoVisa';
import {Deck, _GlobeView as GlobeView}  from '@deck.gl/core';
import {TextLayer,GeoJsonLayer} from '@deck.gl/layers';
let geoData = initGeoData;

/**인트로 애니메이션**/
function animateStoryHeader(){
  $(".story-header .deem").animate({"opacity":"1"}, 1000, function(){
    $(".title-animate .border").animate({"width":"100%"}, 1500, "easeInOutCubic", function(){
      $(".title-animate .top img").animate({"top":"10px", "opacity":"1"}, 1500, "easeInOutCubic");
      decoImageAnimate();
      $(".title-animate .bottom img").delay(800).animate({"top":"0px", "opacity":"1"}, 1500, "easeInOutCubic", function(){
        $(".deco .line").animate({"height":"100%"}, 1500, "easeInOutCubic", function(){
          subtitleAnimate();
        });
      });
  
    })
  });


}
  function subtitleAnimate() {
    var $subtitle = $(".sub-title p")
    for(var o=0; o<$subtitle.length;o++){
        $subtitle.eq(o).delay(o*1100).animate({"opacity":"1", "top":"0px"}, 1000, "easeOutSine");
        if(o == $subtitle.length-1){
          setTimeout(function(){
            animateIntroEl();
          }, 2000 );
        }
    };
  }
  function decoImageAnimate() {
    var $deco = $(".deco-img")
    for(var o=0; o<$deco.length;o++){
        $deco.eq(o).delay(o*1500).animate({"opacity":"1"}, 2000, "easeOutSine");
    };
  }

  function animateIntroEl(){
    $(".story-header .art-date, .story-header .collabo-logo, .story-header .byline, .story-header .button").animate({"opacity":"0.8"}, 1000, "swing", function(){
      $("body").removeClass("fixed");
      $(".mouse").fadeIn();
    });
  }
/**인트로 애니메이션**/


/**검색기**/
var geoSearcher = {};
	geoSearcher.selectGeoWide;
	geoSearcher.selectBase;
  
  // 결과 만들기
  geoSearcher.fillResult = function (geo1, geo2){
    console.log(geo1, geo2, "를 선택하셨습니다");
    
    let userSelectGeoData;
    for(var i=0 ; i< geoData.length; i++) { 
      
      if(geoData[i].geo_sido==geo1&&geoData[i].geo_city==geo2){
        userSelectGeoData=geoData[i];
      }      
    }
    console.log(userSelectGeoData)

    var userZoom; //지역별로 디폴트 확대 정도 다르게
    if(userSelectGeoData.geo_sido == "서울특별시"){
      userZoom = 12;
    }else if(userSelectGeoData.geo_sido == "부산광역시"||userSelectGeoData.geo_sido == "대구광역시"||userSelectGeoData.geo_sido == "인천광역시"||userSelectGeoData.geo_sido == "광주광역시"||userSelectGeoData.geo_sido == "대전광역시"||userSelectGeoData.geo_sido == "울산광역시"){ 
      userZoom = 11;
    }else{
      userZoom = 10;
    }

    deckgl.setProps({
      controller: true
    });
    deckgl.setProps({
      initialViewState: {
        longitude: userSelectGeoData.lon,
        latitude: userSelectGeoData.lat,
        zoom: userZoom,
        transitionDuration: 700,
        maxZoom: 12,
        minZoom:6,
      }
    });

    $(".result-before").hide();  

    //top
    $("#SELECT_SIDO_NAME").html(userSelectGeoData.geo_sido);
    $("#SELECT_CITY_NAME").html(userSelectGeoData.geo_city);
    $("#TOTAL_FORE_2022").html(userSelectGeoData["2022_total"].toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
    $("#TOTAL_FORE_2010").html(userSelectGeoData["2010_total"].toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");

    var to_fo_ch_sentence;
    var totalChange = (userSelectGeoData["2022_total"]-userSelectGeoData["2010_total"]);
    if(totalChange>0){
      to_fo_ch_sentence = (totalChange.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))+"명"+" 증가했습니다."; 
    }else if(totalChange==0){
      to_fo_ch_sentence = "변화가 없습니다."; 
    }else if(totalChange<0){
      to_fo_ch_sentence = (totalChange*-1).toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명"+" 감소했습니다."; 
    }
    $("#TOTAL_FORE_CHANGE").html(to_fo_ch_sentence);
    
    var to_fo_ratio = userSelectGeoData["forRatio"].toFixed(3);
    to_fo_ratio = (to_fo_ratio*100).toFixed(1);
    $("#TOTAL_FORE_RATIO_2022").html(to_fo_ratio+"%");
    
    $("#TOTAL_RANK").html(userSelectGeoData["rankByCh"]);

    //국적


    var eastAsiaChange = userSelectGeoData["2022_eastAsia"] - userSelectGeoData["2010_eastAsia"];
    var southEastAsiaChange = userSelectGeoData["2022_southEastAsia"] - userSelectGeoData["2010_southEastAsia"];
    var westernMidAsiaChange = userSelectGeoData["2022_westernMidAsia"] - userSelectGeoData["2010_westernMidAsia"];
    var americaChange = userSelectGeoData["2022_america"] - userSelectGeoData["2010_america"];
    var europeChange = userSelectGeoData["2022_europe"] - userSelectGeoData["2010_europe"];
    var oceaniaChange = userSelectGeoData["2022_oceania"] - userSelectGeoData["2010_oceania"];
    var africaChange = userSelectGeoData["2022_africa"] - userSelectGeoData["2010_africa"];

    console.log(eastAsiaChange, southEastAsiaChange, westernMidAsiaChange, americaChange, europeChange,oceaniaChange, africaChange);

    var changeArr = [eastAsiaChange, southEastAsiaChange, westernMidAsiaChange, americaChange, europeChange,oceaniaChange, africaChange];
    
    var countryChange = new Object;
    countryChange.eac = eastAsiaChange;
    countryChange.seac = southEastAsiaChange;
    countryChange.wmac = westernMidAsiaChange;
    countryChange.amc = americaChange;
    countryChange.ec = europeChange;
    countryChange.oc = oceaniaChange;
    countryChange.afc = africaChange;

    if(changeArr.includes(NaN) ){ // 계산이 안되는 값이 있는 경우
      console.log("계산이 안되는 값이 있음. * 포함인 경우")
      if(userSelectGeoData["2022_eastAsia"]=="*"){
        eastAsiaChange = -99999;
      }else if(userSelectGeoData["2022_southEastAsia"]=="*"){
        southEastAsiaChange= -99999;
      }else if(userSelectGeoData["2022_westernMidAsia"]=="*"){
        westernMidAsiaChange = -99999;
      }else if(userSelectGeoData["2022_america"]=="*"){
        americaChange = -99999;
      }else if(userSelectGeoData["2022_europe"]=="*"){
        europeChange = -99999;
      }else if(userSelectGeoData["2022_oceania"]=="*"){
        oceaniaChange = -99999;
      }else if(userSelectGeoData["2022_africa"]=="*"){
        africaChange = -99999;
      }
    }

    var changeMax = Math.max(eastAsiaChange, southEastAsiaChange, westernMidAsiaChange, americaChange, europeChange,oceaniaChange, africaChange);
    var changeMaxCountry = null;
    var changeMaxCountryKor = null;

    var keys = Object.keys(countryChange);
    for (i = 0; i < keys.length; i++) {
      var key = keys[i]
      var value = countryChange[key]
      if(value == changeMax){
        changeMaxCountry = key;
      }
    }
    
  

    //동아시아
    $("#GRAPH_EA .numb-box .past .numb").html(userSelectGeoData["2010_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(eastAsiaChange>0){      
      $("#GRAPH_EA .numb-box .now .numb").html( userSelectGeoData["2022_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+eastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(eastAsiaChange==0){
      $("#GRAPH_EA .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
    }else if(eastAsiaChange<0){
      $("#GRAPH_EA .numb-box .now .numb").html( userSelectGeoData["2022_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+eastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }

    //동남아시아
    $("#GRAPH_SEA .numb-box .past .numb").html(userSelectGeoData["2010_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(southEastAsiaChange>0){      
      $("#GRAPH_SEA .numb-box .now .numb").html( userSelectGeoData["2022_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+southEastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(southEastAsiaChange==0){
      $("#GRAPH_SEA .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
    }else if(southEastAsiaChange<0){
      $("#GRAPH_SEA .numb-box .now .numb").html( userSelectGeoData["2022_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+southEastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }

    //서남중앙아시아
    $("#GRAPH_WMA .numb-box .past .numb").html(userSelectGeoData["2010_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(westernMidAsiaChange>0){      
      $("#GRAPH_WMA .numb-box .now .numb").html( userSelectGeoData["2022_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+westernMidAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(westernMidAsiaChange==0){
      $("#GRAPH_WMA .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
    }else if(westernMidAsiaChange<0){
      $("#GRAPH_WMA .numb-box .now .numb").html( userSelectGeoData["2022_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+westernMidAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }

    //북미
    $("#GRAPH_AM .numb-box .past .numb").html(userSelectGeoData["2010_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(americaChange>0){      
      $("#GRAPH_AM .numb-box .now .numb").html( userSelectGeoData["2022_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+americaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(americaChange==0){
      $("#GRAPH_AM .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
    }else if(americaChange<0){
      $("#GRAPH_AM .numb-box .now .numb").html( userSelectGeoData["2022_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+americaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }
    
    //유럽
    $("#GRAPH_EU .numb-box .past .numb").html(userSelectGeoData["2010_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(europeChange>0){      
      $("#GRAPH_EU .numb-box .now .numb").html( userSelectGeoData["2022_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+europeChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(europeChange==0){
      $("#GRAPH_EU .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
    }else if(europeChange<0){
      $("#GRAPH_EU .numb-box .now .numb").html( userSelectGeoData["2022_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+europeChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }

    //오세아니아
    $("#GRAPH_OC .numb-box .past .numb").html(userSelectGeoData["2010_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(oceaniaChange>0){      
      $("#GRAPH_OC .numb-box .now .numb").html( userSelectGeoData["2022_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+oceaniaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(oceaniaChange==0){
      $("#GRAPH_OC .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
    }else if(oceaniaChange<0){
      $("#GRAPH_OC .numb-box .now .numb").html( userSelectGeoData["2022_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+oceaniaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }

    //아프리카
    $("#GRAPH_AF .numb-box .past .numb").html(userSelectGeoData["2010_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    if(africaChange>0){      
      $("#GRAPH_AF .numb-box .now .numb").html( userSelectGeoData["2022_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+africaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
    }else if(africaChange==0){
      $("#GRAPH_AF .numb-box .now .numb").html( userSelectGeoData["2022_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='equl'>(-)</span>");
    }else if(africaChange<0){
      $("#GRAPH_AF .numb-box .now .numb").html( userSelectGeoData["2022_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+africaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
    }


    if(changeArr.includes(NaN)){ 
      if(userSelectGeoData["2022_eastAsia"]=="*"){
        $("#GRAPH_EA .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }else if(userSelectGeoData["2022_southEastAsia"]=="*"){
        $("#GRAPH_SEA .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }else if(userSelectGeoData["2022_westernMidAsia"]=="*"){
        $("#GRAPH_WMA .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }else if(userSelectGeoData["2022_america"]=="*"){
        $("#GRAPH_AM .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }else if(userSelectGeoData["2022_europe"]=="*"){
        $("#GRAPH_EU .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }else if(userSelectGeoData["2022_oceania"]=="*"){
        $("#GRAPH_OC .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }else if(userSelectGeoData["2022_africa"]=="*"){
        $("#GRAPH_AF .numb-box .now .numb").html("<span class='no'>(통계 자료 없음)</span>");
      }
    }


    $(".byCountry .otherCountry .graph-col .graph").show();
    //가장 많이 증가한 나라
    if(changeMaxCountry == "eac"){ //동아시아
      changeMaxCountryKor = "동북아시아"
      $("#MOST_COUNTRY").html("동북아시아");
      $("#MOST_COUNTRY_2").html("동북아시아");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(eastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("동북아시아 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(eastAsiaChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+eastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(eastAsiaChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(eastAsiaChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_eastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+eastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_EA").hide();

    }else if(changeMaxCountry == "seac"){ //동남아시아
      changeMaxCountryKor = "동남아시아"
      $("#MOST_COUNTRY").html("동남아시아");
      $("#MOST_COUNTRY_2").html("동남아시아");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(southEastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("동남아시아 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(southEastAsiaChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+southEastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(southEastAsiaChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(southEastAsiaChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_southEastAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+southEastAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_SEA").hide();
    }else if(changeMaxCountry == "wmac"){//서남·중앙아시아
      changeMaxCountryKor = "서남·중앙아시아"
      $("#MOST_COUNTRY").html("서남·중앙아시아");
      $("#MOST_COUNTRY_2").html("서남·중앙아시아");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(westernMidAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("서남·중앙아시아 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(westernMidAsiaChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+westernMidAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(westernMidAsiaChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(westernMidAsiaChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_westernMidAsia"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+westernMidAsiaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_WMA").hide();
    }else if(changeMaxCountry == "amc"){//북아메리카
      changeMaxCountryKor = "북아메리카"
      $("#MOST_COUNTRY").html("북아메리카");
      $("#MOST_COUNTRY_2").html("북아메리카");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(americaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("북아메리카 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(americaChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+americaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(americaChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(americaChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_america"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+americaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_AM").hide();
    }else if(changeMaxCountry == "ec"){//유럽
      changeMaxCountryKor = "유럽"
      $("#MOST_COUNTRY").html("유럽");
      $("#MOST_COUNTRY_2").html("유럽");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(europeChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("유럽 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(europeChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+europeChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(europeChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(europeChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_europe"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+europeChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_EU").hide();
    }else if(changeMaxCountry == "oc"){//오세아니아
      changeMaxCountryKor = "오세아니아"
      $("#MOST_COUNTRY").html("오세아니아");
      $("#MOST_COUNTRY_2").html("오세아니아");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(oceaniaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("오세아니아 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(oceaniaChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+oceaniaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(oceaniaChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(oceaniaChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_oceania"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+oceaniaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_OC").hide();
    }else if(changeMaxCountry == "afc"){//아프리카
      changeMaxCountryKor = "아프리카"
      $("#MOST_COUNTRY").html("아프리카");
      $("#MOST_COUNTRY_2").html("아프리카");
      $("#MOST_COUNRY_2022").html(userSelectGeoData["2022_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $("#MOST_COUNTRY_CHANGE").html(africaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
      $(".mostNumb .graph-title").html("아프리카 출신 외국인 주민수 동향");
      $(".mostNumb .graph .numb-box .past .numb").html(userSelectGeoData["2010_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      if(africaChange>0){      
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='up'>("+africaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▲)</span>");
      }else if(africaChange==0){
        $(".mostNumb .graph .numb-box .now .numb").html( "0 <span class='equl'>(-)</span>");
      }else if(africaChange<0){
        $(".mostNumb .graph .numb-box .now .numb").html( userSelectGeoData["2022_africa"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"<span class='down'>("+africaChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+ "▼)</span>");
      }
      $("#GRAPH_AF").hide();
    }

    //console.log(changeMax, changeMaxCountryKor)
    
    // 한국 국적 취득
    $("#NATION_2010").html(userSelectGeoData["2010_nan"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
    $("#NATION_2022").html(userSelectGeoData["2022_nan"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
    var nationChange = userSelectGeoData["2022_nan"]-userSelectGeoData["2010_nan"];
    if(nationChange>0){
      $("#NATION_CHANGE").html(nationChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명 증가했습니다.");
    }else if(nationChange==0){
      $("#NATION_CHANGE").html("그대로 입니다.");
    }else if(nationChange<0){
      nationChange=nationChange*-1;
      $("#NATION_CHANGE").html(nationChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명 감소했습니다.");
    }

      
    // 다문화 학생
    $("#CHILD_2010").html(userSelectGeoData["2010_child"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
    $("#CHILD_2022").html(userSelectGeoData["2022_child"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명");
    var childChange = userSelectGeoData["2022_child"]-userSelectGeoData["2010_child"];
    if(childChange>0){
      $("#CHILD_CHANGE").html(childChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명 증가했습니다.");
    }else if(childChange==0){
      $("#CHILD_CHANGE").html("그대로 입니다.");
    }else if(childChange<0){
      childChange=childChange*-1;
      $("#CHILD_CHANGE").html(childChange.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"명 감소했습니다.");
    }


    //비자데이터
    var geoVisaData;
    visaData.forEach(function(v,i,a){
      if(userSelectGeoData.id == a[i].id){
        geoVisaData = a[i];
      }
    });
    console.log(geoVisaData)
    makeDumbelChart(geoVisaData)


    $(".result-wrap").show();
    $(".result-area .user-result").addClass("result-area-after");

  }

  // 지자체 선택지 생성
	geoSearcher.appendOpt = function(geo){
		$("#search-02 option").remove();
		
		var S_sido = geo;	
		for (var i=0; i<geoData.length;i++ ){
			if( geoData[i]["geo_sido"] == S_sido ){
				$("#search-02").append("<option value='" +  geoData[i]["geo_city"] + "'>" +  geoData[i]["geo_city"] + "</option>");
			}					
		}
		$("#search-02").removeClass("search-btn-block");
		var oOptionList2 = $("#search-02").find('option');
		oOptionList2.sort(function(a, b){
			if (a.text > b.text) return 1;
			else if (a.text < b.text) return -1;
			else {
				if (a.value > b.value) return 1;
				else if (a.value < b.value) return -1;
				else return 0;
			}
		});
		$("#search-02").html(oOptionList2);
		$("#search-02").prepend("<option value='선택'> 선택 </option>");
		$("#search-02 option:eq(0)").attr('selected', 'selected');
	}


// 광역 선택시
$("#search-01").on("change", function(){
  geoSearcher.selectBase = null;
  geoSearcher.selectGeoWide = null;
  if ( $(this).children("option:selected").index() == 0 ){ //선택을 다시 클릭한 경우 초기화
    $("#search-02").addClass("search-btn-block");
    $("#search-02 option").remove();
    $("#search-02").append("<option value='선택'> 선택 </option>");
    return;
  }else {
    geoSearcher.appendOpt($(this).val());
    geoSearcher.selectGeoWide = $(this).val(); 
  }		
  console.log(geoSearcher.selectGeoWide, geoSearcher.selectBase);
});


// 기초 선택시
$("#search-02").on("change", function(){
  geoSearcher.selectBase = null;
  if ($(this).children("option:selected").index() == 0){ //선택을 다시 클릭
    return;
  }else {
    geoSearcher.selectBase = $(this).val();
  }			
  console.log(geoSearcher.selectGeoWide, geoSearcher.selectBase);
  geoSearcher.fillResult(geoSearcher.selectGeoWide, geoSearcher.selectBase);
});

$("#RESEARCH_BTN").on("click", function(){
  var scrollPos = $(".searcher-holder").offset().top  - $(window).height()*0.35;
  $(".user-result").removeClass("result-area-after");
  $(".result-before").show();
  $(".result-wrap").hide();
  deckgl.setProps({
    initialViewState: {
      latitude: 36.7696590254203,
      longitude: 127.829588124543, 
      zoom: 7
    }
  });
  deckgl.setProps({
    controller: false
  });

  geoSearcher.selectBase = null;
  geoSearcher.selectGeoWide = null;
  $("#search-02").addClass("search-btn-block");
  $("#search-02 option").remove();
  $("#search-02").append("<option value='선택'> 선택 </option>");
  $("#search-01 option:eq(0)").attr('selected', 'selected');
  $('html, body').stop().animate({scrollTop: scrollPos }, 700, 'easeInSine');

});

/**검색기**/

/**전국지도**/
// function makeKoreaMap(){
//   var width = $(window).width(),
//   height = 1000;
// var svg = d3.select(".map-holder").select("svg")
//         .attr("width", width)
//         .attr("height", height);

// var map = svg.append("g").attr("id", "map"),
//   places = svg.append("g").attr("id", "places");

// var projection = d3.geo.mercator()
//   .center([126.9895, 37.5651])
//   .scale(100000)
//   .translate([width/2, height/2]);

// var path = d3.geo.path().projection(projection);

// d3.json("js/geoTopo.json", function(error, data) {
// var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;

// for(var i=0 ; i< geoData.length; i++) { 
//   for(var g=0 ; g< features.length; g++) { 
//     if( geoData[i]["geo_city"]==features[g].properties.SIG_KOR_NM) { 
//       console.log(features[m].properties.SIG_KOR_NM)
//       break;
//     }			
//   }
// }
// var map_basic_geo = map.append("g").attr("id", "GEO");
// var geoBorder = map_basic_geo.selectAll("path")
//   .data(features)
//   .enter().append("path")
//   .attr("class", function(d) { console.log(); return "geo geo-basic c-" + d.properties.SIG_CD })
//   .attr("d", path)

// });

// } 

/**전국지도**/

var isMobile = ($(window).width() < 800)? true : false;

var default_zoom = ( isMobile) ? 0.2 : 1 ; 

const deckgl = new Deck({
    parent: document.getElementById('map-container'),
    //views: new GlobeView(),
    initialViewState: {
      latitude: 36.7696590254203,
      longitude: 127.829588124543, 
      zoom: 7,
      bearing: 0,
      pitch: 0, 
      maxZoom: 12,
      minZoom:6
    },
    controller: false
});

console.log();

const bbox__ = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_wgs84_bounding_box.geojson";


const KOR_GEOJOSN = KorData;
geoData.forEach(function(v,i,a){
  a[i].coordinates = [];
  a[i].coordinates.push(a[i].lon)
  a[i].coordinates.push(a[i].lat)
});

var features = KOR_GEOJOSN.features;
//console.log(features)
for(var i=0 ; i< geoData.length; i++) { 
  for(var m=0 ; m< features.length; m++) { 
    if(geoData[i]["SIG_CD"]=="noCode"){
      //console.log(geoData[i]["geo_city"]);
      if(geoData[i]["geo_city"]=="고양시"){
        if(features[m].properties.SIG_CD == 41281 || features[m].properties.SIG_CD == 41285 || features[m].properties.SIG_CD == 41287){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="성남시"){
        if(features[m].properties.SIG_CD == 41131 || features[m].properties.SIG_CD == 41133 || features[m].properties.SIG_CD == 41135){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="수원시"){
        if(features[m].properties.SIG_CD == 41111 || features[m].properties.SIG_CD == 41113 || features[m].properties.SIG_CD == 41115|| features[m].properties.SIG_CD == 41117){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="안산시"){
        if(features[m].properties.SIG_CD == 41271 || features[m].properties.SIG_CD == 41273){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="안양시"){
        if(features[m].properties.SIG_CD == 41171 || features[m].properties.SIG_CD == 41173){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="용인시"){
        if(features[m].properties.SIG_CD == 41461 || features[m].properties.SIG_CD == 41463 || features[m].properties.SIG_CD == 41465){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="청주시"){
        if(features[m].properties.SIG_CD == 43111 || features[m].properties.SIG_CD == 43112 || features[m].properties.SIG_CD == 43113 || features[m].properties.SIG_CD == 43114){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="천안시"){
        if(features[m].properties.SIG_CD == 44131 || features[m].properties.SIG_CD == 44133){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="전주시"){
        if(features[m].properties.SIG_CD == 45111 || features[m].properties.SIG_CD == 45113){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="포항시"){
        if(features[m].properties.SIG_CD == 47111 || features[m].properties.SIG_CD == 47113){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }else if(geoData[i]["geo_city"]=="창원시"){
        if(features[m].properties.SIG_CD == 48121 || features[m].properties.SIG_CD == 48123 || features[m].properties.SIG_CD == 48125  || features[m].properties.SIG_CD == 48127  || features[m].properties.SIG_CD == 48129){
          features[m].properties["forRatio"] = geoData[i]["forRatio"];
        }
      }
    }else if( geoData[i]["SIG_CD"]==features[m].properties.SIG_CD) {
      
      features[m].properties["forRatio"] = geoData[i]["forRatio"];
      break;
    }			
  }
}
//console.log(KOR_GEOJOSN.features)

const update = () => {
 
  const layers =  [
    new GeoJsonLayer({
      id: 'bbox',
      data: bbox__,
      stroked: false,
      filled: true,
      lineWidthMinPixels: 2,
      getLineColor: [5, 10, 40],
      //getFillColor: [235, 227, 233]
      getFillColor:[244,239,242]
    }),
    new GeoJsonLayer({
      id: 'base-kor',
      data: KOR_GEOJOSN,
      // Styles
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getLineColor: [172, 152, 168],
      //getLineColor: [237,230,234],
      getFillColor: function(d){
        var ratio = d.properties.forRatio;
        if(ratio <0.02){
          //return [244,239,242];
          return [237,230,234];
        }else if(0.02<=ratio&&ratio<0.04){
          return [220,207,218];
        }else if(0.04<=ratio&&ratio<0.06){
          return [189,163,183];
        }else if(0.06<=ratio&&ratio<0.08){
          return [158,121,149];
        }else if(0.08<=ratio&&ratio<0.10){
          return [134,88,123];
        }else if(0.10<=ratio){
          return [124,79,113];
        }else{
          return [194,74,165]
        }
      },
      //getFillColor: [249, 243, 248],
    }),
    new GeoJsonLayer({
      id: 'byCounry',
      data: KOR_GEOJOSN,
      // Styles
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getLineColor: [172, 152, 168],
      //getLineColor: [237,230,234],
      getFillColor: function(d){
        var ratio = d.properties.forRatio;
        if(ratio <0.02){
          //return [244,239,242];
          return [237,230,234];
        }else if(0.02<=ratio&&ratio<0.04){
          return [220,207,218];
        }else if(0.04<=ratio&&ratio<0.06){
          return [189,163,183];
        }else if(0.06<=ratio&&ratio<0.08){
          return [158,121,149];
        }else if(0.08<=ratio&&ratio<0.10){
          return [134,88,123];
        }else if(0.10<=ratio){
          return [124,79,113];
        }else{
          return [194,74,165]
        }
      },
      //getFillColor: [249, 243, 248],
    }),
    new TextLayer({
      id: 'text-layer',
      data: initGeoData,
      getPosition: d => d.coordinates,
      getText: d => d.geo_city,
      //getColor: [102,90,104],
      getColor: [74,43,67],
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      pickable: true,
      characterSet : 'auto',
      getSize: 500,
      sizeUnits: 'meters',
      fontFamily: "Noto Sans KR",
      fontWeight: 500,
      background: true,
      getBackgroundColor: [255,255,255,70],
      backgroundPadding: [6, 3],
      // fontSettings: {sdf: true},
      // // outlineColor: [255,255,255,1],
      // // outlineWidth: 5,
      // // opacity: 0.7,
      
    })
  ];
  deckgl.setProps({layers});


};
 
update();

/**** 비자 데이터로 덤벨차트 그리기 ***/ 
function makeDumbelChart(data){
  var data = data;
  var dumbelHeight = 30;
  var visa_list = ["D1", "D2", "D3", "D4","D5", "D6", "D7", "D8", "D9", "D0", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E0", "F1", "F2", "F3", "F5", "F6", "G1", "H1", "H2"]; 


  var svgHeight = visa_list.length * dumbelHeight  

  var plot_chart_svg = d3.select("#DUMBEL_CHART_VISA")
  var width = 550,
    height = svgHeight;

  d3.selectAll("#DUMBEL_CHART_VISA").selectAll(".chart-holder").remove()
    

  plot_chart_svg.attr("width", width +"px" )
    .attr("height", height +"px");
  var chart_holder = plot_chart_svg.append("g")
    .attr("class","chart-holder");

  const keys = Object.keys(data);
  var visa_data_values = new Array;
  var visa_data_values_max; 
  var visa_data_values_min; 
  var data_v2 = new Array;

  visa_list.forEach(function(v,i,a){
    var obj = {};
    obj.visa = v;
    obj.index = i;
    obj.value2012 = 0;
    obj.value2024 = 0;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] 
      const value = data[key]
      if(key=="2012_total"||key=="2024_total"||key=="geo_city"||key=="geo_sido"||key=="id"){
      }else {
        if(key.includes(v)){
          if(key.includes("2012")){
            obj.value2012 = value; 
          }else if(key.includes("2024")){
            obj.value2024 = value;
          }
        }
      }    
    }
    data_v2.push(obj);

    // var txt = v.slice(0,1)+"-"+v.slice(1);
    // var label = "<p class='visa-label'>"+txt+" 비자</p>"
    // $(".y-axis").append(label)
  });
  console.log(data_v2 )

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] // 각각의 키
    const value = data[key] // 각각의 키에 해당하는 각각의 값
    if(key=="2012_total"||key=="2024_total"||key=="geo_city"||key=="geo_sido"||key=="id"){
    }else {
      visa_data_values.push(Number(value));
    }    
  }
  visa_data_values_max = d3.max(visa_data_values);
  console.log(visa_data_values_max)

  ////////// X축 설정 //////////// 
  //로그스케일 적용시
  var x = d3.scale.log() 
    .domain([ 0.1 , Number(visa_data_values_max) ]) 
    .range([0, width])
  
  //리니어스케일 적용시
  var x = d3.scale.linear() 
  .domain([ 0 , Number(visa_data_values_max) ]) 
  .range([0, width])

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    //.tickValues(x.domain().filter(function(d, idx) { return d%2==0; }))
    //.tickFormat(function(d, i){ return d/100+"백"; })
    .tickFormat(function(d, i){ return d; })
    .ticks(5)
        
  chart_holder.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+(Number(height)+20)+")")
    .call(xAxis);
  ////////// X축 설정 //////////// 

  var plot_container = chart_holder.append("g")
    .attr("class", "plots-holder");
  var each_plot_g = plot_container //각 덤벨 요소를 담을 그릇 생성
    .selectAll("g").data(data_v2).enter() // plots 객체에 data 연결
    .append("g")
    .attr("class", function (d) { 
      return "plot-g plot-g-"+d["index"]+" plot-g-"+d["visa"];
  })

  var plot_line = each_plot_g.append("line")
    .attr("class", "plot-line")
    .attr("x1", function (d) { 
      if(d["value2012"]==0){
        return 0;
      }else {
        return x(d["value2012"]);
      }
    })
    .attr("y1", function (d) {return d["index"]*dumbelHeight + dumbelHeight/2;  })
    .attr("x2", function (d) {      
      if(d["value2024"]==0){
        return 0;
      }else {
        return x(d["value2024"]);
      }
    })
    .attr("y2", function (d) { return d["index"]*dumbelHeight + dumbelHeight/2;  })
    .attr("stroke-width", function (d) {
      return 7;
    })
    .attr("stroke", function (d) {
      if(d["value2024"]-d["value2012"]>0){
        return "#dfc4c4";
      }else if(d["value2024"]-d["value2012"]<0){
        return "#c4cbdf";
      }else{
        return "#dfc4c4";
      }
    })

  var plot_past = each_plot_g.append("circle")
  .attr("class", function (d) { 
    if(d["value2012"] == 0){
      return "plot plot-past plot-zero"
    }else {
      return "plot plot-past"
    }
  })
  .attr("cx", function (d) {
    if(d["value2012"] == 0){
      return 0;
    }else{
      return x( Number(d["value2012"]) );
    }
  })
  .attr("cy", function (d) { return d["index"]*dumbelHeight + dumbelHeight/2; })
  .attr("r", function (d) {
    if(d["value2012"] == 0){
      return 4;
    }else{
      return 4;
    }
  })
  .attr("fill", function(d){ 
    if(d["value2012"] == 0){
      return "#c1c1c1";
    }else{
     return "#c1c1c1";
    }
  });

  

  var plot_now = each_plot_g.append("circle")
  .attr("class", function (d) { 
    if(d["value2024"] == 0){
      return "plot plot-now plot-zero"
    }else {
      return "plot plot-now"
    }
  })
  .attr("cx", function (d) {
    if(d["value2024"] == 0){
      return 0;
    }else{
      return x( Number(d["value2024"]) );
    }
  })
  .attr("cy", function (d) { return d["index"]*dumbelHeight + dumbelHeight/2; })
  .attr("r", function (d) {
    if(d["value2024"] == 0){
      return 5;
    }else{
      return 5;
    }
  })
  .attr("fill", function(d){ 
    if(d["value2024"] == 0){
      return "#c1bcc3";
    }else {
      //return "#df0034";
      return "#111";
    }
   });

   var label_past = each_plot_g.append("text")
  .attr("class", function (d) { 
    if(Number(d["value2012"])==0){
      if(Number(d["value2024"])-Number(d["value2012"])<=0){
        return "label-past label-name label-zero label-front"
      }else{
        return "label-past label-name label-zero"
      }
    }else{
      if(Number(d["value2024"])-Number(d["value2012"])<=0){
        return "label-past label-name label-front"
      }else{
        return "label-past label-name"
      }
    }
    
  })
  .attr("transform", function (d) {
      var posX, posY; 
      if(Number(d["value2012"]) ==0){
        if(Number(d["value2024"])-Number(d["value2012"])==0){
          posX = 6;
        }else if(Number(d["value2024"])-Number(d["value2012"])<0){
          posX = -6;
        }else{
          posX = -6;
        }

      }else {
        if(Number(d["value2024"])-Number(d["value2012"])<=0){
          posX = x( Number(d["value2012"]) ) + 6;
        }else{
          posX = x( Number(d["value2012"]) ) - 6;
        }
      }
      posY = Number(d["index"]*dumbelHeight) + dumbelHeight/2+4;
      return "translate("+posX+","+posY+")";  
  }).text(function(d) { 
     return ( d["value2012"]);  
  })


  var label_now = each_plot_g.append("text")
  .attr("class", function (d) { 
    if(Number(d["value2024"])==0){
      if(Number(d["value2024"])-Number(d["value2012"])<=0){
        return "label-now label-name label-zero label-back"
      }else{
        return "label-now label-name label-zero"
      }
    }else{
      if(Number(d["value2024"])-Number(d["value2012"])<=0){
        return "label-now label-name label-back"
      }else{
        return "label-now label-name"
      }
    }
    
  })
  .attr("transform", function (d) {
      var posX, posY; 
      if(Number(d["value2024"]) ==0){
        if(Number(d["value2024"])-Number(d["value2012"])<=0){
          posX = - 6;
        }else{
          posX = 6;
        }
        
      }else {
        if(Number(d["value2024"])-Number(d["value2012"])<=0){
          posX = x( Number(d["value2024"]) ) - 6;
        }else{
          posX = x( Number(d["value2024"]) ) + 6;
        }
      }
      posY = Number(d["index"]*dumbelHeight) + dumbelHeight/2+4;
      return "translate("+posX+","+posY+")";  
  }).text(function(d) { 
     return ( d["value2024"]);  
  })

  each_plot_g.on("mouseenter", function(d) {
    var idx = d3.select(this).attr("class").split(" ");
    idx = idx[1].replace("plot-g-","");
    console.log(idx);
    $(".y-axis p.visa-label").eq(idx).addClass("on");
    d3.select(this).selectAll(".label-past")
      .style("opacity", "1");
  }).on("mouseleave", function(d){
    $(".y-axis p.visa-label").removeClass("on");
    d3.selectAll(".label-past")
      .style("opacity", null);
});


};


function makePlotChart(){

  var data = geoPopData; 

  data.map(function(v) { 
      v.ratio10 = (v.ratio10*100).toFixed(2);
      v.ratio22 = (v.ratio22*100).toFixed(2);
      v.yoypercent = (v.yoypercent*100).toFixed(2)
  });

  data.map(function(v,i,a) {
    var c = "#ddd";
    var type;
    if( Number(v["total22"]) > Number(v["total10"]) ){
      c = "#f44336"; 
      type = "up";
    }else if(Number(v["total22"]) ==  Number(v["total10"]) ){
      c = "#777"; 
      type = "same";
    }else if(Number(v["total22"]) <  Number(v["total10"]) ){
      c = "#27a0ff"; 
      type = "down";
    }

    var yoyPer;
    if(v["yoypercent"]<0){
      yoyPer = "p0"
    }else if(v["yoypercent"]<=50){
      yoyPer = "p1"
    }else if(v["yoypercent"]>50&&v["yoypercent"]<=80){
      yoyPer = "p2"
    }else if(v["yoypercent"]>80&&v["yoypercent"]<=110){
      yoyPer = "p3"
    }else if(v["yoypercent"]>110&&v["yoypercent"]<=140){
      yoyPer = "p4"
    }else if(v["yoypercent"]>140&&v["yoypercent"]<=170){
      yoyPer = "p5"
    }else if(v["yoypercent"]>170){
      yoyPer = "p6"
    }

    var geo;
    if(v["geo1"]=="서울특별시"){
      geo = "geo1"
    }else if(v["geo1"]=="부산광역시"){
      geo = "geo2"
    }else if(v["geo1"]=="대구광역시"){
      geo = "geo3"
    }else if(v["geo1"]=="인천광역시"){
      geo = "geo4"
    }else if(v["geo1"]=="광주광역시"){
      geo = "geo5"
    }else if(v["geo1"]=="대전광역시"){
      geo = "geo6"
    }else if(v["geo1"]=="울산광역시"){
      geo = "geo7"
    }else if(v["geo1"]=="세종특별자치시"){
      geo = "geo8"
    }else if(v["geo1"]=="경기도"){
      geo = "geo9"
    }else if(v["geo1"]=="강원도"){
      geo = "geo10"
    }else if(v["geo1"]=="충청북도"){
      geo = "geo11"
    }else if(v["geo1"]=="충청남도"){
      geo = "geo12"
    }else if(v["geo1"]=="전라북도"){
      geo = "geo13"
    }else if(v["geo1"]=="전라남도"){
      geo = "geo14"
    }else if(v["geo1"]=="경상북도"){
      geo = "geo15"
    }else if(v["geo1"]=="경상남도"){
      geo = "geo16"
    }else if(v["geo1"]=="제주도"){
      geo = "geo17"
    }
    
    v.yoyPer = yoyPer;
    v.color = c;
    v.type = type;
    v.geo = geo;
  });

  data.map(function(v,i,a) { 
    v.id = i;
  });

  // svg캔버스 생성
  var plot_chart_svg = d3.select("#DUMBEL_CHART")
  var width = 1000,
    height= 500;

  plot_chart_svg.attr("width", width +"px" )
    .attr("height", height +"px");
      
      var chart_holder = plot_chart_svg.append("g")
    .attr("class","chart-holder");

  ///////// 데이터 정제 ////////////
  //2010년 외국인주민수
  var past_foreign_values = data.map(function(v) {
    return Number(v["total10"]);
  });
  //2021년 외국인주민수
  var now_foreign_values = data.map(function(v) { 
    return Number(v["total22"]);
  });
  //2010 외국인 주민 비중
  var	past_foreign_ratio = data.map(function(v) { 
      return Number(v["ratio10"]);
  });
//2021 외국인 주민 비중
  var	now_foreign_ratio = data.map(function(v) { 
      return Number(v["ratio22"]);
  });

  var pastForeignMaxValue = d3.max(past_foreign_values);
  var nowForeignMaxValue = d3.max(now_foreign_values); 
  var pastForeignMaxRatio = d3.max(past_foreign_ratio); 
  var nowForeignMaxRatio = d3.max(now_foreign_ratio); 

  //console.log("주민수, 비중 최고치는 각각?", pastForeignMaxValue, nowForeignMaxValue, pastForeignMaxRatio,  nowForeignMaxRatio);
  ///////// 데이터 정제 ////////////
      
  ////////// X축과 Y축 설정 //////////// 
  var x = d3.scale.log() // 로그 스케일 적용
    .domain([96, 94941]) //주민수 기준 min 값과 max 값
    .range([0, width])
//	.base(2)
  console.log("테스트", x(1000) );

  var y = d3.scale.linear() // 비중
    .range([height, 0])
    .domain([0.5, 14.7]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
  //	.tickValues(x.domain().filter(function(d, idx) { return d%2==0; }))
    .tickFormat(function(d, i){ return d/1000+"천"; })
    .ticks(5)
           
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left").ticks(5)
    .tickFormat(function(d, i){ return d+"%"; }); //&%로 포맷팅
        
  chart_holder.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,"+(Number(height)+20)+")")
      .call(xAxis);

  chart_holder.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-10,0)")
      .call(yAxis);

  var xAxisTitle = chart_holder.append("text")
    .attr("class", "x-axis-title")
    .attr("x", width/2-25)
    .attr("y", height+60)
    .html("외국인주민 인구수")

  var yAxisTitle = chart_holder.append("text")
    .attr("class", "y-axis-title")
    .attr("x", -65)
    .attr("y",height/2-35)
    .html("외국인주민 인구 비중")

  ////////// X축과 Y축 설정 //////////// 


  ////////// 실제 데이터로 plot 그리기//////////// 
  var plotRadius;
  
  var plot_container = chart_holder.append("g")
    .attr("class", "plots-holder");

  var each_plot_g = plot_container //각 덤벨 요소를 담을 그릇 생성
    .selectAll("g").data(data).enter() // plots 객체에 data 연결
    .append("g")
    .attr("class", function (d) { 
      return "plot-g plot-g-"+d["id"]+" plot-g-"+d["type"]+" plot-"+d["geo"];
    })
  /*
  each_plot_g.attr("transform", function (d) {
          var v = "translate("+ x(d["amount_p2"])+ "," +y(d["comp"]) + ")";
          return v;
        }
      );*/

  
  var plot_past = each_plot_g.append("circle")
    .attr("class", function (d) { return "plot plot-past"})
          .attr("cx", function (d) { return x(d["total10"]); })
    .attr("cy", function (d) { return y(d["ratio10"]); })
    .attr("r", function (d) { 
      return 3;
     })
    .attr("fill", function(d){ 
      if(d["ratio22"] <= 2){
        return "#ede6ea";
      }else if(d["ratio22"] <= 4){
        return "#d8cad3";
      }else if(d["ratio22"] <= 6){
        return "#c7b4c2";
      }else if(d["ratio22"] <= 8){
        return "#b398ab";
      }else if(d["ratio22"] <= 10){
        return "#7c4f71";
      }else if(d["ratio22"] <= 12){
        return "#571145";
      }else{
        return "#672757";
      }
    });

  var plot_now = each_plot_g.append("circle")
    .attr("class", function (d) { return "plot plot-now"; })
          .attr("cx", function (d) { return x(d["total22"]); })
    .attr("cy", function (d) { return y(d["ratio22"]); })
    .attr("r", function (d) { 
      var r;
      /*
      if(d["restrict"]*50> 30){
        r = 30;
      }else if(d["restrict"]*50<7){
        r = 7;
      }else{
        r = d["restrict"]*50;
      }*/
      r = d["total22"]/1500;
      if(r<4){
         r = 4;
      }else if(r>60){
        r=60;
      }
      return r;
    })
    .attr("fill", function(d){ 
     if(d["ratio22"] <= 2){
        return "#ede6ea";
      }else if(d["ratio22"] <= 4){
        return "#d8cad3";
      }else if(d["ratio22"] <= 6){
        return "#c7b4c2";
      }else if(d["ratio22"] <= 8){
        return "#b398ab";
      }else if(d["ratio22"] <= 10){
        return "#7c4f71";
      }else if(d["ratio22"] <= 12){
        return "#571145";
      }else{
        return "#672757";
      }
    })

  var plot_line = each_plot_g.append("line")
      .attr("class", "plot-line")
      .attr("x1", function (d) { return x(d["total10"]); })
      .attr("y1", function (d) { return y(d["ratio10"]); })
      .attr("x2", function (d) { return x(d["total22"]); })
      .attr("y2", function (d) { return y(d["ratio22"]); })
      .attr("stroke-width", function (d) { //return d["color"]; 
        if(d["total22"]>50000){
          return 4;
        }else if(d["total22"]>30000){
          return 3;
        }else if(d["total22"]>10000){
          return 2;
        }else{
          return 1;
        }
      })
      .attr("stroke", function (d) {
        // if(d["type"]=="up"){
        // 	return "url(#Grad1)";
        // }else{
        // 	return "url(#Grad2)";
        // }
        if(d["yoyPer"] == "p0"){
          return "url(#Grad0)";
        }else{
          if(d["ratio22"] <= 2){
            return "url(#Grad6)";
          }else if(d["ratio22"] <= 4){
            return "url(#Grad5)";
          }else if(d["ratio22"] <= 6){
            return "url(#Grad4)";
          }else if(d["ratio22"] <= 8){
            return "url(#Grad3)";
          }else if(d["ratio22"] <= 10){
            return "url(#Grad2)";
          }else if(d["ratio22"] <= 12){
            return "url(#Grad1)";
          }else{
            return "url(#Grad1)";
          }
        } 
      })

  var label = each_plot_g.append("text")
    .attr("class", function (d) { return "label label-name"})
    .attr("transform", function (d) { 
      return "translate("+x(d["total22"])+","+(y(d["ratio22"])-5)+")";  
    }).text(function(d) { 
      //return ( d["geo1"]+" "+d["geo2"]+" "+d["total22"] ); 
      //return ( d["geo2"]+"의 현재 외국인 주민 "+d["total22"]+"명" );  
      return ( d["geo2"]);  
    })

  ////////// 실제 데이터로 plot 그리기//////////// 


  var $tooltip = $(".tooltip");
  each_plot_g.on("mouseenter", function(d) {
    if(nowGeoFilterOn == true){
      var geoIdx = d3.select(this).attr("class").split(" ");
      geoIdx = geoIdx[3].replace("plot-geo","");
      console.log(geoIdx, nowGeoFilterIndex);
      if(nowGeoFilterIndex==geoIdx){
        d3.selectAll(".plot-g").style("opacity", 0.02);
        d3.select(this)
          .style("opacity", "1");
        d3.select(this).selectAll(".label-name")
          .style("opacity", "1");
        d3.select(this).selectAll(".plot-now")
          .style("stroke", "#111");
        $tooltip.css({"display":"block","opacity":"1"})
        $tooltip.find(".name").html(d["geo1"]+" "+ d["geo2"]);
        $tooltip.find(".popPast").html(d["total10"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"명");
        $tooltip.find(".popNow").html(d["total22"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"명");
        $tooltip.find(".popRatioPast").html(d["ratio10"]+"%" );
        $tooltip.find(".popRatioNow").html(d["ratio22"]+"%" );

        if(d["total10"]>d["total22"]){
          $tooltip.find(".popUpDown").html("감소"); 
        }else if(d["total10"]==d["total22"]){
          $tooltip.find(".popUpDown").html("변화하지 않음"); 
        }else if(d["total10"]<d["total22"]){
          $tooltip.find(".popUpDown").html("증가"); 
        }
        
        if(d["ratio10"]>d["ratio22"]){
          $tooltip.find(".popRatioUpDown").html("감소"); 
        }else if(d["ratio10"]==d["ratio22"]){
          $tooltip.find(".popRatioUpDown").html("변화하지 않음"); 
        }else if(d["ratio10"]<d["ratio22"]){
          $tooltip.find(".popRatioUpDown").html("증가"); 
        }

      }
    }else{
      d3.selectAll(".plot-g").style("opacity", 0.05);
      d3.select(this)
        .style("opacity", "1");
      d3.select(this).selectAll(".label-name")
        .style("opacity", "1");
      d3.select(this).selectAll(".plot-now")
        .style("stroke", "#111");
      //console.log(d3.select(this));
      $tooltip.css({"display":"block","opacity":"1"})
      $tooltip.find(".name").html(d["geo1"]+" "+ d["geo2"]);
      $tooltip.find(".popPast").html(d["total10"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"명");
      $tooltip.find(".popNow").html(d["total22"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"명");
      $tooltip.find(".popRatioPast").html(d["ratio10"]+"%" );
      $tooltip.find(".popRatioNow").html(d["ratio22"]+"%" );

      if(d["total10"]>d["total22"]){
        $tooltip.find(".popUpDown").html("감소"); 
      }else if(d["total10"]==d["total22"]){
        $tooltip.find(".popUpDown").html("변화하지 않음"); 
      }else if(d["total10"]<d["total22"]){
        $tooltip.find(".popUpDown").html("증가"); 
      }
      
      if(d["ratio10"]>d["ratio22"]){
        $tooltip.find(".popRatioUpDown").html("감소"); 
      }else if(d["ratio10"]==d["ratio22"]){
        $tooltip.find(".popRatioUpDown").html("변화하지 않음"); 
      }else if(d["ratio10"]<d["ratio22"]){
        $tooltip.find(".popRatioUpDown").html("증가"); 
      }

    }
   
  // $tooltip.css({"left": (Number(d3.select(this).attr("cx"))-5) + "px"});
  // $tooltip.css({"top": (Number(d3.select(this).attr("cy"))+15) +"px"});

  }).on("mouseleave", function(d){
    if(nowGeoFilterOn == true){
      $("#DUMBEL_CHART .plot-g").stop().animate({"opacity":"0.02"}, 100);
      $("#DUMBEL_CHART .plot-geo"+nowGeoFilterIndex).stop().animate({"opacity":"1"},100);
      d3.selectAll(".plot-g").selectAll(".label-name")
      .style("opacity", null);
      d3.selectAll(".plot-g").selectAll(".plot-now")
      .style("stroke", null);
      $tooltip.css({"display":"none","opacity":"0"});

    }else{
      d3.selectAll(".plot-g")
      .style("opacity", null);
      d3.selectAll(".plot-g").selectAll(".label-name")
      .style("opacity", null);
      d3.selectAll(".plot-g").selectAll(".plot-now")
      .style("stroke", null);
      $tooltip.css({"display":"none","opacity":"0"});
    }

  });

  console.log("plot chart를 성공적으로 그렸습니다");    

};

makePlotChart();

/*********도시 덤벨차트 지역별로 *********/


/*********도시 랭킹 테이블 만들기********/
var makeCityRanktable = function(type){
  var type = type;
  var data;
  if(type=="amount"){
    $(".full-ranking #listBody").html("");
    data = geoPopData.sort((a,b) => (b.yoy - a.yoy));
    data.forEach(function(v,i,a){
      $(".full-ranking #listBody").append("<tr><td scope='col'>" + (i+1) + "</td><td scope='col'>" + v["geo_nameFull"]+"</td><td scope='col'>" + v.yoy.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"명" + "</td></tr>");
    });
  }else{
    $(".full-ranking #listBody").html("");
    data = geoPopData.sort((a,b) => (b.yoypercent - a.yoypercent));
    data.forEach(function(v,i,a){
      $(".full-ranking #listBody").append("<tr><td scope='col'>" + (i+1) + "</td><td scope='col'>" + v["geo_nameFull"]+"</td><td scope='col'>" + v.yoypercent.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +"%" + "</td></tr>");
    });
  }
};
makeCityRanktable("amount");

$(".chart-swift .btn-holder .btn").on("click", function(){
  $(".chart-swift .btn-holder .btn").removeClass("on");
  $(this).addClass("on");

  if($(this).attr("id")=="SWIFT_TO_DUMBEL"){
    $(".dumbel-chart-holder").show();
    $(".table-chart-holder").hide();
  }else{
    $(".dumbel-chart-holder").hide();
    $(".table-chart-holder").show();
  }
});


var nowGeoFilterOn = false,
nowGeoFilterIndex = null;

$("#DUMBEL_GEO_BTN > div").on("click", function(){
  nowGeoFilterOn = true;
  $("#DUMBEL_GEO_BTN > div").removeClass("on");
  $(this).addClass("on");

  var idx = $(this).index();
  console.log(idx);
  nowGeoFilterIndex = idx;
  $("#DUMBEL_CHART .plot-g").stop().animate({"opacity":"0.02"}, 100);
  $("#DUMBEL_CHART .plot-g").css({ "user-select": "none", "pointer-events":"none"});
  $("#DUMBEL_CHART .plot-geo"+idx).stop().animate({"opacity":"1"},100);
  $("#DUMBEL_CHART .plot-geo"+idx).css({ "user-select": "inherit", "pointer-events":"inherit"});
});
$("#GEO_DEFAULT").on("click", function(){
  nowGeoFilterOn = false;
  nowGeoFilterIndex = null;
  $("#DUMBEL_GEO_BTN > div").removeClass("on");
  $(this).addClass("on");
  $("#DUMBEL_CHART .plot-g").css({ "user-select": "inherit", "pointer-events":"inherit"});
  $("#DUMBEL_CHART .plot-g").stop().animate({"opacity": "1"},100);
});

$("#CHART_AMOUNT_OR_PER > li").on("click", function(){
  $("#CHART_AMOUNT_OR_PER > li").removeClass("on");
  $(this).addClass("on");
  console.log($(this).index());
  if($(this).index() == 0){
    makeCityRanktable("amount");
  }else{
    makeCityRanktable("per");
  }
});



export default function () {
  const screenWidth = $(window).width();
 
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  animateStoryHeader();

}
