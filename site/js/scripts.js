include('js/jquery.easing.1.3.js');
include('js/jquery.transform-0.9.3.min.js');
include('js/jquery.animate-colors-min.js');
include('js/jquery.backgroundpos.min.js');
include('js/mathUtils.js');
include('js/superfish.js');
include('js/switcher.js');
include('js/jquery.mousewheel.js');
include('js/sprites.js');
include('js/forms.js');
include('js/hoverSprite.js');
include('js/googleMap.js');
include('js/spin.js');
include('js/bgStretch.js');
include('js/sImg.js');
include('js/jquery.jqtransform.js');
//----Include-Function----
function include(url){ 
  document.write('<script src="'+ url + '" type="text/javascript"></script>'); 
}
//--------global-------------
var isSplash = true;
var isAnim = true;

var spinner;
var mapSpinner;
var MSIE = ($.browser.msie) && ($.browser.version <= 8)

var li_W = 506;
//------DocReady-------------
$(document).ready(function(){ 
    if(location.hash.length == 0){
        location.hash="!/"+$('#content > ul > li:first-child').attr('id');
    }
    ///////////////////////////////////////////////////////////////////
        loaderInit();
function loaderInit(){
        var opts = {
              lines: 10,
              length: 0, 
              width: 14, 
              radius: 25, 
              rotate: 0, 
              color: '#fff', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target = $(".page_spinner > span");
        spinner = new Spinner(opts).spin();
        target.append(spinner.el) 
        ///////////////////////////////////////
                var opts2 = {
              lines: 12,
              length: 6, 
              width: 3, 
              radius: 8, 
              rotate: 0, 
              color: '#000', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target2 = $(".google_map > span");
        mapSpinner = new Spinner(opts2).spin();
        target2.append(mapSpinner.el)    
        
} 
///////////////////////////////////////////////////////////////////

     $('ul#menu').superfish({
          delay:       800,
          animation:   {height:'show'},
          speed:       600,
          autoArrows:  false,
         dropShadows: false,
         	onInit: function(){
  				$("#menu > li > a").each(function(index){
  					var conText = $(this).find('.mText').text();
                       $(this).append("<div class='_area'></div><div class='mTextOver'>"+conText+"</div>"); 
                       
  				})
  	 		}
        });
});
  
 //------WinLoad-------------  
$(window).load(function(){  
spinner.stop();
$(".prevBtn").hoverSprite({onLoadWebSite: true});
$(".nextBtn").hoverSprite({onLoadWebSite: true});
$(".pagePrev").hoverSprite({onLoadWebSite: true});
$(".pageNext").hoverSprite({onLoadWebSite: true});


//$('.more').sprites({method:'gStretch',hover:true});
    $('#bgStretch').bgStretch({
    align:'leftTop',
    navs:$('.navGall').navs({autoPlay:5000})
    }).sImg({
            sleep: 1000,
            spinner:$('<div class="spinner_bg"></div>').css({opacity:1}).stop().hide(1000)
        }) 
  
  $('#form1').jqTransform({imgPath:'images/'});     
       
 $('.more').hover(
	function(){
 		$(this).stop().animate({color:"#5a5a5a"},300)
   },
   function(){
   		$(this).stop().animate({color:"#fff"},300)
        }
    )   
    
    $('.splash_menu > li > a').find('.mText2').stop().animate({opacity:0.5}, 1)
    $('.splash_menu > li > a').find('._overPl').stop().animate({height:"0px"}, 1)
    $('.splash_menu > li > a').hover(
	function(){
 		$(this).find('.mText2').stop().animate({opacity:1}, 300,'easeOutCubic')
        $(this).find('._overPl').stop().animate({height:"36px"}, 300,'easeOutCubic')
   },
   function(){
   	    $(this).find('.mText2').stop().animate({opacity:0.5}, 300,'easeOutCubic')
        $(this).find('._overPl').stop().animate({height:"0px"}, 300,'easeOutCubic')
        }
    )    
       
var menuItems = $('#menu >li'); 
var currentIm = 0;
var lastIm = 0;

navInit();
function navInit(){
 var currentIm = 0; 
 var lastIm = 0;
 var img=0; 
 
var gall_length=$('.navGall > ul > li').length;
 // $('.prevList > li').css({'display':'none'})
 // $('.nextList > li').css({'display':'none'})
  
    $('.prevBtn').click(function(){
      img = currentIm;
      img=img-1;
        if (img<0){img=gall_length-1}
        lastIm = currentIm;
        currentIm = img;
    
       $('.navGall li a').eq(currentIm).click();
            spinCreate();
        return false
     });
     
     $('.nextBtn').click(function(){
        img = currentIm;
        img=img+1;
            if (img>gall_length-1){img=0;}
            lastIm = currentIm;
            currentIm = img;

       $('.navGall li a').eq(currentIm).click();
            spinCreate();
       return false
     });
    ////////////////////////

    
    var isFirst = true;
    function spinCreate(){
      if(isFirst == true){
                isFirst = false;
                    var opts3 = {
                          lines: 8,
                          length: 0, 
                          width: 10, 
                          radius: 16, 
                          rotate: 0, 
                          color: '#000', 
                          speed: 1.3, 
                          trail: 60, 
                          shadow: false,
                          hwaccel: false, 
                          className: 'spinner', 
                          zIndex: 2e9, 
                          top: 'auto', 
                          left: 'auto' 
                    };
                    var target3 = $(".spinner_bg");
                    bgSpinner = new Spinner(opts3).spin();
                    target3.append(bgSpinner.el);  
               } 
      }  
      
      
      var val = $('#form1 ._inp1').attr('value');
    $('#form1 ._inp1').focusin(function (){
       $('#form1 ._inp1').attr('value',''); 
    });
    $('#form1 ._inp1').focusout(function (){
        if ($(this).attr('value') == '') {
            $('#form1 ._inp1').attr('value',val); 
        }
    });
    ////////////////////////////
    var val2 = $('#form1 ._inp2').attr('value');
    $('#form1 ._inp2').focusin(function (){
       $('#form1 ._inp2').attr('value',''); 
    });
    $('#form1 ._inp2').focusout(function (){
        if ($(this).attr('value') == '') {
            $('#form1 ._inp2').attr('value',val2); 
        }
    });
    ////////////////////////////
    var val3 = $('#form1 ._inp3').attr('value');
    $('#form1 ._inp3').focusin(function (){
       $('#form1 ._inp3').attr('value',''); 
    });
    $('#form1 ._inp3').focusout(function (){
        if ($(this).attr('value') == '') {
            $('#form1 ._inp3').attr('value',val3); 
        }
    });

}

///////////////////////////////////////////////
    var navItems = $('.menu > ul >li');
    
    $('.menu > ul >li').eq(0).css({'display':'none'});
    
	var content=$('#content'),
		nav=$('.menu');

    	$('#content').tabs({
		preFu:function(_){
			_.li.css({top:"-1500px",'display':'none'});
		}
		,actFu:function(_){			
			if(_.curr){
				_.curr.css({'display':'block', top:"-1500px",}).stop().delay(300).animate({top:"0px"},700,'easeOutCubic');
                cont_resize(_.n);
                if ((_.n == 0) && ((_.pren>0) || (_.pren==undefined))){splashMode();}
                if (((_.pren == 0) || (_.pren == undefined)) && (_.n>0) ){contentMode(); }
            }
			if(_.prev){
			     _.prev.stop().animate({top:"1500px"},500,'easeInCubic',function(){_.prev.css({'display':'none'});} );
             }
		}
	})
    
    $(".pageBtns").slideUp(1);
    $(".contentBg").slideUp(1);
    function splashMode(){
        isSplash = true;
            $(".menu").fadeTo(300, 0, function(){$(this).css({'display':'none'})} );
            $(".pageBtns").slideUp();
            $(".contentBg").delay(250).slideUp(400);
            $(".splash_menu").delay(600).slideDown(400);
            $("._splash").css({'z-index':3})
    }
    
    function contentMode(){  
        isSplash = false;
            $(".menu").css({'display':'block'}).delay(400).fadeTo(300, 1);
            $(".pageBtns").delay(300).slideDown();
            $(".contentBg").delay(300).slideDown(400);
            $(".splash_menu").slideUp(400);
            $("._splash").css({'z-index':2})
    }
    
      function cont_resize(_page){
        
        li_W = $('#content > ul > li').eq(_page).height();
        
        if(li_W < 390){li_W = 390;}
        
        $('#content').stop().animate({height:li_W+"px"}, 600, 'easeInOutCubic', function(){centrRepos();} ).css({'overflow':'visible'})
    }
    		
	nav.navs({
			useHash:true,
             hoverIn:function(li){
                    $(".mText", li).stop(true).animate({top:"60px", opacity:0.5}, 600, 'easeOutCubic');
                    $(".mTextOver", li).stop(true).animate({top:"0px"}, 600, 'easeOutBack');
                   // if(($.browser.msie) && ($.browser.version <= 8)){}else{}
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                        $(".mText", li).stop(true).animate({top:"0px", opacity:0.5}, 500, 'easeOutCubic');
                        $(".mTextOver", li).stop(true).animate({top:"-60px"}, 300, 'easeOutCubic');
                    } 
                } 
		}).navs(function(n){			
			$('#content').tabs(n);
		})

$('.pagePrev')
	.click(function(){
                isAnim = true; 
                nav.navs('prev');
        return false
	})
$('.pageNext')
	.click(function(){
                isAnim = true; 
                nav.navs('next');
        return false
	}) 

//////////////////////////////////////////
    var h_cont;
   
	function centrRepos() {
	      h_cont = $('.center').height()+100;
          //$('body').css({'min-height':h_cont+200+'px'})
          	$('body').stop().animate({'min-height':h_cont+80+'px'},800,'easeOutCirc');
		var h=$(window).height();
		if (h>(h_cont+30)) {
			m_top=~~(h-h_cont)/2;
			h_new=h;
		} else {
			m_top=20;
			h_new=h_cont+30;
		}
		$('.center').stop().animate({paddingTop:m_top},800,'easeOutExpo');
		$('._splash').stop().animate({top:m_top+196},800,'easeOutExpo');
	}
	centrRepos();
    ///////////Window resize///////
    
    function windowW() {
 return (($(window).width()>=parseInt($('body').css('minWidth')))?$(window).width():parseInt($('body').css('minWidth')));
}

	$(window).resize(function(){
        centrRepos();
        }
    );

    } //window function
) //window load