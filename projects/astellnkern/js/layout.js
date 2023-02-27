$(document).ready(function() {
    /* // 비디오 로딩 이벤트
    $(window).on("load",function(){
        let mainVideo = $("#yt_player").get(0);
        let barSize = $(window).width();
        let progressbar = document.getElementById("progressbar");
        let updateBar;

        // 윈도우 로드 시 비디오 실행
        if(!mainVideo.paused && !mainVideo.ended){
            $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); });
            window.clearInterval(updateBar);
        }
        else{
            $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*'); });
            updateBar = setInterval(update,50);
        }

        // Progress Bar 비디오에 연결
        function update(){
            if(!mainVideo.ended){
                let size = parseInt(mainVideo.currentTime*barSize/mainVideo.duration);
                progressbar.style.width = size+"px"
            }
            else{
                progressbar.style.width = "0px"
                window.clearInterval(updateBar);
            }
        }
    }); */

    // 프로젝트 데이터 연동
    function DAP_init(sheetId, sheetName, divName) {
        let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        let query = encodeURIComponent('Select A,B,C,D');
        let url = `${base}&sheet=${sheetName}&tq=${query}`;
        let data = [];

        fetch(url)
            .then(res => res.text())
            .then(rep => {
                // JSON만 추출
                let jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                let jsonItem = jsonData.table.rows;
                slideOneAlphaData(divName, jsonItem);
                slideOneBravoData(divName, jsonItem);
                slideOneCharlieData(divName, jsonItem);
            })
            .then(() => { // Slick Slider 실행
                $('.' + divName + ' .content3-a-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    nextArrow:$('.' + divName + ' .content3-btn1-right'),
                    prevArrow:$('.content3-1 .content3-btn1-left'),
                    asNavFor:".content3-1 .content3-b-slide, .content3-1 .content3-b-slide2"
                });
                $('.' + divName + ' .content3-b-slide').slick({
                    slidesToShow:1,
                    slidesToScroll: 1,
                    infinite:true,
                    fade:true,
                    arrows:false,
                    asNavFor:".content3-1 .content3-a-slide, .content3-1 .content3-b-slide2"
                });
                $('.' + divName + ' .content3-b-slide2').slick({
                    slidesToShow:5,
                    slidesToScroll:3,
                    infinite:true,
                    arrows:false,
                    focusOnSelect:true,
                    focusOnChange:true,
                    asNavFor:".content3-1 .content3-a-slide, .content3-1 .content3-b-slide"
                });
            });
    }
    DAP_init('1R2FRUKsRxGSkSE1-AdFxCoWCq8s3v5FHnp687TVy6VQ','DAP', 'content3-1');

    // 슬라이더 1-1
    function slideOneAlphaData(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-a-slide').append(
                '<div><img src="'+item[i].c[3].v+'"/></div>'
            );
        }
    }

    // 슬라이더 1-2
    function slideOneBravoData(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-b-slide').append(
                '<div>'
                    +'<h2>'+item[i].c[1].v+'</h2>'
                    +'<h3>'+item[i].c[2].v+'</h3>'
                    +'<a href="#">'
                        +'<div><img src="./img/i_arrow_black.png"/></div>'
                    +'</a>'
                +'</div>'
            );
            console.log(item[i].c[2].v);
        }
    }

    // 슬라이더 1-3
    function slideOneCharlieData(name, item) {
        for(let i = 0; i < item.length; i++) { // 마지막에서 3번째까지 loop
            $('.' + name + ' .content3-a-slide').append(
                '<div><img src="'+item[i].c[3].v+'"/><h2>'+item[i].c[1].v+'</h2></div>'
            );
        }
    }

    //슬라이더 1 슬라이드 전 이벤트
    $(".content3-1 .content3-a-slide").on('beforeChange',function(event,slick,currentSlide,nextSlide){
        //이동할 슬라이드의 번호 숫자를 전체 슬라이드 -1로 나누고 백을 곱해서 백분율 값을 구한다.
        let calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
        
        //progress bar의 배경 가로 사이즈에 계산한 백분율 값을 넣는다.
        $(".content3-1 .content3-b-slide3>span")
            .css("background-size", calc + '% 100%')
            .attr('aria-valuenow', calc);
        
        //progress bar의 아이콘의 가로 좌표값에 계산한 백분율 값을 넣는다.
        $(".content3-1 .content3-b-slide3>div>svg")
            .css("left", calc + "%");
    });

    /* --------------------------------------------------------------------- */
    /* --------------------------------------------------------------------- */
    /* --------------------------------------------------------------------- */

    //버튼 클릭 시 비디오 제어
    $(".content1-2>div:nth-of-type(1)").on("click",function(){ $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*'); }); });
    $(".content1-2>div:nth-of-type(2)").on("click",function(){ $("#yt_player").each(function(){ this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); }); });

    //헤더 gnb 호버 이벤트
    $(".menu>div>ul:nth-of-type(1)>a").hover(
        function() { $(".menu>div>span:nth-of-type(1)").css("background","black"); },
        function() { $(".menu>div>span:nth-of-type(1)").css("background","white"); }
    );
    $(".menu>div>ul:nth-of-type(2)>a").hover(
        function() { $(".menu>div>span:nth-of-type(2)").css("background","black"); },
        function() { $(".menu>div>span:nth-of-type(2)").css("background","white"); }
    );
    $(".menu>div>ul:nth-of-type(3)>a").hover(
        function() { $(".menu>div>span:nth-of-type(3)").css("background","black"); },
        function() { $(".menu>div>span:nth-of-type(3)").css("background","white"); }
    );
    $(".menu>div>ul:nth-of-type(4)>a").hover(
        function() { $(".menu>div>span:nth-of-type(4)").css("background","black"); },
        function() { $(".menu>div>span:nth-of-type(4)").css("background","white"); }
    );
    $(".menu>div>ul:nth-of-type(5)>a").hover(
        function(){ $(".menu>div>span:nth-of-type(5)").css("background","black"); },
        function(){ $(".menu>div>span:nth-of-type(5)").css("background","white"); }
    );

    //헤더 호버시 이벤트
    $(".gnb-menu>li").hover(
        function(){
            $("header").css({
                "background":"white",
                "border-bottom":"1px solid #ddd"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid white",
                "color":"black"
            }),
            $(".gnb-menu>li:hover .gnb-main").css({
                "color":"#d81334",
                "border-bottom":"2px solid #d81334"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"black"
            }),
            $("#searchbar .cls-1").css({
                "fill":"black"
            }),
            $("#logo .cls-1").css({
                "fill":"black"
            })
        },
        function(){
            $("header").css({
                "background":"black",
                "border-bottom":"1px solid black"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid black",
                "color":"white"
            }),
            $(".gnb-menu>li:hover .gnb-main").css({
                "color":"white",
                "border-bottom":"2px solid black"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"white"
            }),
            $("#searchbar .cls-1").css({
                "fill":"white"
            }),
            $("#logo .cls-1").css({
                "fill":"white"
            })
        }
    );

    //헤더 스크롤 이벤트
    $(window).scroll(function(event){
        let windowTop = $(window).scrollTop();
        let contentTop = $(".content1").scrollTop();

        if(windowTop == contentTop){ //스크롤이 맨위에 있을 때
            $("header").css({
                "background":"black",
                "border-bottom":"1px solid black"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid black",
                "color":"white"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"white"
            }),
            $("input[id='menu']:checked+label span:nth-of-type(3)").css({
                "background":"black"
            }),
            $("#searchbar .cls-1").css({
                "fill":"white"
            }),
            $("#logo .cls-1").css({
                "fill":"white"
            })

            //스크롤이 맨위에 있을 때 헤더 gnb 메뉴 호버 이벤트
            $(".gnb-menu>li").hover(
                function(){
                    $("header").css({
                        "background":"white",
                        "border-bottom":"1px solid #ddd"
                    }),
                    $(".gnb-menu>li>a").css({
                        "border-bottom":"2px solid white",
                        "color":"black"
                    }),
                    $(".gnb-menu>li:hover .gnb-main").css({
                        "color":"#d81334",
                        "border-bottom":"2px solid #d81334"
                    }),
                    $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                        "background":"black"
                    }),
                    $("#searchbar .cls-1").css({
                        "fill":"black"
                    }),
                    $("#logo .cls-1").css({
                        "fill":"black"
                    })
                },
                function(){
                    $("header").css({
                        "background":"black",
                        "border-bottom":"1px solid black"
                    }),
                    $(".gnb-menu>li>a").css({
                        "border-bottom":"2px solid black",
                        "color":"white"
                    }),
                    $(".gnb-menu>li:hover .gnb-main").css({
                        "color":"white",
                        "border-bottom":"2px solid black"
                    }),
                    $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                        "background":"white"
                    }),
                    $("#searchbar .cls-1").css({
                        "fill":"white"
                    }),
                    $("#logo .cls-1").css({
                        "fill":"white"
                    })
                }
            );
        }
        else if(windowTop > contentTop){ //스크롤을 내렸을 때
            $("header").css({
                "background":"white",
                "border-bottom":"1px solid #ddd"
            }),
            $(".gnb-menu>li>a").css({
                "border-bottom":"2px solid white",
                "color":"black"
            }),
            $(".gnb-menu>li:hover .gnb-main").css({
                "color":"#d81334",
                "border-bottom":"2px solid #d81334"
            }),
            $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                "background":"black"
            }),
            $("#searchbar .cls-1").css({
                "fill":"black"
            }),
            $("#logo .cls-1").css({
                "fill":"black"
            })

            //스크롤이 내려왔을 때 헤더 gnb 메뉴 호버 이벤트
            $(".gnb-menu>li").hover(
                function(){
                    $("header").css({
                        "background":"white",
                        "border-bottom":"1px solid #ddd"
                    }),
                    $(".gnb-menu>li>a").css({
                        "border-bottom":"2px solid white",
                        "color":"black"
                    }),
                    $(".gnb-menu>li:hover .gnb-main").css({
                        "color":"#d81334",
                        "border-bottom":"2px solid #d81334"
                    }),
                    $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                        "background":"black"
                    }),
                    $("#searchbar .cls-1").css({
                        "fill":"black"
                    }),
                    $("#logo .cls-1").css({
                        "fill":"black"
                    })
                },
                function(){
                    $("header").css({
                        "background":"white",
                        "border-bottom":"1px solid #ddd"
                    }),
                    $(".gnb-menu>li>a").css({
                        "border-bottom":"2px solid white",
                        "color":"black"
                    }),
                    $(".gnb-menu>li:hover .gnb-main").css({
                        "color":"#d81334",
                        "border-bottom":"2px solid #d81334"
                    }),
                    $("input[id='menu']+label span:nth-of-type(2),input[id='menu']+label span:nth-of-type(3)").css({
                        "background":"black"
                    }),
                    $("#searchbar .cls-1").css({
                        "fill":"black"
                    }),
                    $("#logo .cls-1").css({
                        "fill":"black"
                    })
                }
            );
        }
    });
});