
import {Deck, _GlobeView as GlobeView}  from '@deck.gl/core';
import {ScatterplotLayer,IconLayer, GeoJsonLayer} from '@deck.gl/layers';

var isMobile = ($(window).width() < 800)? true : false;

var default_zoom = ( isMobile) ? 0.2 : 1 ; 
export default function () {
const deckgl = new Deck({
    parent: document.getElementById('map-container'),
    views: new GlobeView(),
    initialViewState: {
      latitude: -33.63403845485394,
      longitude: 150.709926339392,
      zoom: default_zoom,
      bearing: 0,
      pitch: 0
    },
    controller: true,
    getTooltip:  ({object}) => object && {
      html: `<div class='photo'><img src='img/${object.photo}.jpg'></div><h2>${object.name}</h2>`,
      style: {
        backgroundColor: '#000',
        fontSize: '0.6em',
        color: '#fff'
      }
    }
});

  
const WORLD =
'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson';
const bbox__ = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_wgs84_bounding_box.geojson";
const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

const ICON_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png';

const ICONDATA = [
    {name: '김셰프의 첫번째 방문지', address: 'USA 캘리포니아주 올라올라 레스토랑', tooltip:'<p>대학에서 경제학을 공부했고, 회계사 시험을 준비했다. 2년 정도 공부하다 보니 ‘20년을 해도 안되겠다’라는 생각이 들더라. 그래서 시험을 제쳐두고 여행을 떠났다.</p>', exits: 4214, coordinates: [-122.466233, 37.684638]},
    {name: '김셰프의 두번째 방문지', address: '프랑스 아비뇽 태국 음식점 포보스', tooltip:'<p>엄마에게 불고기와 비빔밥 만드는 법을 배워 카우치 서핑을 하며 방랑했다. 나는 음식을 해주고 상대는 숙박을 제공하며 친구가 되는 과정이 즐거웠다. 이 과정에서 ‘요리를 업으로 삼고 싶다’는 생각이 들었어.</p>', exits: 4214, coordinates: [28.96,13.66033]},
    {name: '김셰프의 세번째 방문지', address: '멕시코 남부 해변가 레스토랑 낄레일리오', tooltip:'<p>여행 때마다 칼을 챙기고, 유명하거나 맛있는 식당을 찾으면 눌러앉아 머물면서 일을 배웠다. 그렇게 세계 곳곳에서 실전으로 요리를 배웠다. 무급으로 일하며 일을 배웠어.</p> ', exits: 4214, coordinates: [32.41275,20.74575]},
    {name: '김셰프의 네번째 방문지', address: 'USA LA 이태리 레소트랑 딸리오똘레', tooltip:'<p>그렇게 한국에 돌아와 경리단, 연남동 일대에서 쌉(SAAP)이라는 태국 음식점을 운영. 투자금 하나 없이 온전한 자기 브랜드로 시작한 게 용리단길의 쌤쌤쌤.</p>', exits: 4214, coordinates:[73.11528,26.50833]},
    {name: '김셰프의 다섯번째 방문지', address: '스페인 어딘가 레스토랑 클레오', tooltip:'<p>전재산을 모두 빼버려서 전세금도 없어 친구 집에 얹혀 살고 있다. 브랜딩부터 인테리어까지 모두 간절하게 심혈을 기울였다. ‘망하면 나락이다’라는 생각으로. 지금도 손님이 없어지는 꿈을 꿀 정도로 불안하다.</p>', exits: 4214, coordinates: [-11.34133,17.17493]},
    {name: '김셰프의 여섯번째 방문지', address: '캐나다 토론토 브런치 카페 할리오페', tooltip:'<p>서울에 공간이 무지막지하게 팽창하고 있지만, 정작 재미있는 공간은 적다고 본다. 자신의 색깔을 녹인 공간이어야 사람들에게 충분한 만족감을 줄 수 있을 거라고 생각해.</p>', exits: 4214, coordinates: [-90.10976,29.94718]},
 ];

 const MAPDATA = [
  {
    "name": "호주 시드니 호텔 큐스테이션(Q station) 근무",
    "nation": "호주",
    "city": "시드니",
    "lat": 151.3754548174736,
    "lon":-33.69635966783825,
    "photo": "insta36"
   },
    {
      "name": "호주 시드니 프렌치 레스토랑 위베르(hubert) 근무",
      "nation": "호주",
      "city": "시드니",
      "lat": 150.709926339392,
      "lon": -33.63403845485394,
      "photo": "insta39"
    },
    {
      "name": "호주 시드니 비건 레스토랑 옐로(yellow) 근무",
      "nation": "호주",
      "city": "시드니",
      "lat": 151.171844532888,
      "lon": -34.086655873807125,
      "photo": "insta40"
    },
    {
    "name": "미국 샌프란시스코 미쉐린 3스타 레스토랑 퀸즈(quince) 근무",
    "nation": "미국",
    "city": "샌프란시스코",
    "lat":-122.38170472115692,
    "lon": 37.50842898341303,
    "photo": "quince01"
   },
   {
    "name": "미국 샌프란시스코 펑키앨리펀트(Funky Elephant) 근무",
    "nation": "미국",
    "city": "샌프란시스코",
    "lat": -122.02210191569372,
    "lon": 38.23695967088356,
    "photo": "insta38"
   },
  {
   "name": "미국 뉴욕 카우치서핑",
   "nation": "미국",
   "city": "뉴욕",
   "lat": -73.9913624319862,
   "lon": 40.7083024327789,
   "photo": "insta1"
  },
  {
   "name": "미국 뉴올리어스 여행",
   "nation": "미국",
   "city": "뉴올리언스",
   "lat": -90.074826573241,
   "lon": 29.9491172328447,
   "photo": "insta3"
  },
  {
   "name": "미국 포틀랜드 여행",
   "nation": "미국",
   "city": "포틀랜드",
   "lat": -122.683928836897,
   "lon": 45.5183930714586,
   "photo": "insta4"
  },
  {
   "name": "미국 라스베가스 여행",
   "nation": "미국",
   "city": "라스베가스",
   "lat": -115.140949598037,
   "lon": 36.1771298919831,
   "photo": "insta6"
  },
  {
   "name": "홍콩 여행",
   "nation": "홍콩",
   "lat": 114.17147132774,
   "lon": 22.3178811552853,
   "photo": "insta7"
  },
  {
   "name": "캐나다 밴프 여행",
   "nation": "캐나다",
   "city": "밴프",
   "lat": -115.570327283978,
   "lon": 51.1793288645775,
   "photo": "insta9"
  },
  {
   "name": "미국 LA 여행",
   "nation": "미국",
   "city": "LA",
   "lat": -118.259356652023,
   "lon": 34.0667406683033,
   "photo": "insta10"
  },
  {
   "name": "미국 뉴욕 여행",
   "nation": "미국",
   "city": "뉴욕",
   "lat": -73.9895475894754,
   "lon": 40.7034253338202,
   "photo": "insta11"
  },
  {
   "name": "요르단 여행",
   "nation": "요르단",
   "lat": 36.7437249051064,
   "lon": 31.4475948984539,
   "photo": "insta12"
  },
  {
   "name": "나미비아 공화국 여행",
   "nation": "나미비아 공화국",
   "lat": 17.0994345830696,
   "lon": -22.0316459559865,
   "photo": "insta13"
  },
  {
   "name": "중국 리장시 여행",
   "nation": "중국",
   "city": "리장",
   "lat": 100.213654391147,
   "lon": 26.8584723000797,
   "photo": "insta14"
  },
  {
   "name": "파키스탄 여행",
   "nation": "파키스탄",
   "lat": 69.8201570416978,
   "lon": 30.0439782648293,
   "photo": "insta15"
  },
  {
   "name": "멕시코 칸쿤 여행",
   "nation": "멕시코",
   "city": "칸쿤",
   "lat": -86.8512939162859,
   "lon": 21.1634458828014,
   "photo": "insta16"
  },
  {
   "name": "노르웨이 여행",
   "nation": "노르웨이",
   "lat": 10.1706240701872,
   "lon": 61.9959159558337,
   "photo": "insta17"
  },
  {
   "name": "아이슬란드 여행",
   "nation": "아이슬란드",
   "lat": -18.3691454856816,
   "lon": 64.9853060625846,
   "photo": "insta18"
  },
  {
   "name": "런던 여행",
   "nation": "런던",
   "lat": -0.130413827846196,
   "lon": 51.5094024648956,
   "photo": "insta19"
  },
  {
   "name": "인도 여행",
   "nation": "인도",
   "lat": 79.8607413502454,
   "lon": 22.8599607635492,
   "photo": "insta20"
  },
  {
   "name": "호주 퍼스 여행",
   "nation": "호주",
   "city": "퍼스",
   "lat": 115.859878689629,
   "lon": -31.9464611084642,
   "photo": "insta21"
  },
  {
   "name": "호주 케언즈 여행",
   "nation": "호주",
   "city": "케언즈",
   "lat": 145.769862304772,
   "lon": -16.9196895504396,
   "photo": "insta22"
  },
  {
   "name": "에티오피아 여행",
   "nation": "에티오피아",
   "lat": 39.3203213198267,
   "lon": 8.68377838127392,
   "photo": "insta23"
  },
  {
   "name": "칠레 여행",
   "nation": "칠레",
   "lat": -70.1139623015346,
   "lon": -26.7426030176501,
   "photo": "insta24"
  },
  {
   "name": "에콰도르 여행",
   "nation": "에콰도르",
   "lat": -78.4718200675073,
   "lon": -1.31494623073189,
   "photo": "insta26"
  },
  {
   "name": "탄자니아 여행",
   "nation": "탄자니아",
   "lat": 35.0522958958347,
   "lon": -6.31151466620592,
   "photo": "insta27"
  },
  {
   "name": "짐바브웨 여행",
   "nation": "짐바브웨",
   "lat": 29.7869339004785,
   "lon": -18.8825719373827,
   "photo": "insta28"
  },
  {
   "name": "튀르키예 여행",
   "nation": "튀르키예",
   "lat": 35.4458842263486,
   "lon": 38.9383697801485,
   "photo": "insta29"
  },
  {
   "name": "네팔 여행",
   "nation": "네팔",
   "lat": 83.9786779830435,
   "lon": 28.2557993178177,
   "photo": "insta30"
  },
  {
   "name": "아르헨티나 여행",
   "nation": "아르헨티나",
   "lat": -65.2029372257343,
   "lon": -34.9360011241414,
   "photo": "insta31"
  },
  {
   "name": "갈라파고스 제도 여행",
   "nation": "갈라파고스 제도",
   "lat": -90.3396929422468,
   "lon": -0.596810473517961,
   "photo": "insta32"
  },
  {
   "name": "베네수엘라 여행",
   "nation": "베네수엘라",
   "lat": -66.2007649850733,
   "lon": 7.09731591559338,
   "photo": "insta33"
  },
  {
   "name": "러시아 모스크바시 여행",
   "nation": "러시아",
   "city": "모스크바",
   "lat": 37.6804786859473,
   "lon": 55.9015810811737,
   "photo": "insta34"
  },
  {
   "name": "스위스 여행",
   "nation": "스위스",
   "lat": 7.94475289308932,
   "lon": 46.7915528778018,
   "photo": "insta35"
  }
 ]
 
 MAPDATA.forEach(function(v,i,a){
  var cor = new Array;
  cor[0] = a[i].lat;
  cor[1] = a[i].lon;
  a[i].coordinates = cor; 
 })


var $popup = $(".popup-layer");
function renderTooltip(info) {
  if(isMobile){
    var _data = info ? info.object : "not found";
    //this.toolTipText = info;
    //console.log(_data);  
    var addressfull = _data.nation;
    if(_data.city !== undefined ){
      addressfull = addressfull + " "+_data.city
    }
  
    $popup.find(".travel-name").html(_data.name);
    $popup.find(".address-name").html(addressfull);
    $popup.find(".photo").find("img").attr("src", "img/"+_data.photo +".jpg")
   // $popup.find(".text-holder").html(_data.tooltip);
    showTooltip();
  }
 
}

$popup.find(".close-btn").on("click",function(){
  closeTooltip();
});

function showTooltip(){
  $(".button-controls").animate({"right":"-100%", "opacity":"0"}, 700, "swing");
  $popup.show();
  $popup.stop().animate({"right":"0px"}, 500, "swing");
  $("#map-container").addClass("pause");
}
function closeTooltip(){
  $popup.hide();
  $popup.css({"right":"-100%"});
  $(".button-controls").css({"right":"0", "opacity":"1"});
  $("#map-container").removeClass("pause");
}



function makemapList(){
  MAPDATA.forEach(function(v,i,a){
     var temp = '<li data-idx='+i+'>'+v.name+'</li>'
     $(".button-controls ul").append(temp); 
  
  })
}
makemapList();
$(".button-controls ul").delegate("li", "click", function(){
  var _idx = $(this).attr("data-idx");
  var lat = MAPDATA[_idx].lat;
  var lon = MAPDATA[_idx].lon;

  if(isMobile){
    listOpen = false;
    $(".button-controls").stop().animate({"top":-1*maplistHeight+"px"}, 200, "swing");
    deckgl.setProps({
      initialViewState: {
        longitude: lat,
        latitude: lon,
        zoom: 2,
        transitionDuration: 700
      }
    });
  }else {
    deckgl.setProps({
      initialViewState: {
        longitude: lat,
        latitude: lon,
        zoom: 2,
        transitionDuration: 700
      }
    });
  }


  

});

var maplistHeight = $(".button-controls").outerHeight();
var listOpen;
if(isMobile){
  $(".button-controls").css({"top":-1*maplistHeight+"px"});
  var listOpen = false;
}else{
  var listOpen = true;
}

$(".list-toggle-btn").on("click", function(){
  if(listOpen){
    listOpen = false;
    if(isMobile){
      $(".button-controls").stop().animate({"top":-1*maplistHeight+"px"}, 200, "swing");
    }else{
      $(".button-controls").stop().animate({"left":"-300px"}, 200, "swing");
    }
  }else{
    listOpen = true;
    if(isMobile){
      $(".button-controls").stop().animate({"top":"0px"}, 500, "swing");
    }else{
      $(".button-controls").stop().animate({"left":"0px"}, 500, "swing");
    }
  }
});

 
const update = () => {
 
    const layers =  [
      new GeoJsonLayer({
        id: 'bbox',
        data: bbox__,
        // Styles
        stroked: false,
        filled: true,
        // lineWidthMinPixels: 2,
        // getLineColor: [5, 10, 40],
        getFillColor: [235, 228, 206]
      }),
  
      new GeoJsonLayer({
        id: 'base-world',
        data: WORLD,
        // Styles
        stroked: true,
        filled: true,
        lineWidthMinPixels: 1,
        getLineColor: [105, 81, 37],
        getFillColor: [175, 137, 68]
      }),
      // new IconLayer({
      //   id: 'icon-layer',
      //   data: ICONDATA,
      //   pickable: true,
      //   iconAtlas: ICON_URL,
      //   iconMapping: ICON_MAPPING,
      //   getIcon: d => 'marker',
      //   sizeScale: 10,
      //   getPosition: d => d.coordinates,
      //   getSize: d => 5,
      // //  getColor: d => [Math.sqrt(d.exits), 140, 0]
      //   getColor: d => [255, 96,26],
      //   onClick: info => renderTooltip(info)
     
      // }),
      new ScatterplotLayer({
        id: 'travelPoint',
        data: MAPDATA,
        filled: true,
       // billboard: true,
        stroked: true,
        strokeWidth: 1000,
       // radiusMinPixels: 10,
        //radiusMaxPixels: 300,
        radiusScale: 150,
        getPosition: d=> d.coordinates,
        getRadius: function(d){
          if(d.city =="샌프란시스코"){
            return 350;
          }else if(d.city =="시드니"){
            return 250;
          }
          return 1000;
        },
        opacity: 0.7,
        getFillColor: function(d){
          if(d.city =="샌프란시스코"){
            return [255, 79,133];
          }else if(d.city =="시드니"){
            return [79, 255,195];
          }
          return [255, 96,26];
        },
        getLineColor: d => [0, 0, 0],
        highlightColor: [255,198,0],
        pickable: true,
       // onClick: info => renderTooltip(info),
        // onHover: (e)=>{
        //   if(e){
        //     console.log(e)
        //   }
        // },
        autoHighlight: true
    
      }),
      

    ];
    deckgl.setProps({layers});
  
  
  };
   
  update();

}