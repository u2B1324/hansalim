$(document).ready(function () {

    // modal 기능
    let modal = $('.modal');
    let modalCon = $('.modal-content');
    let modalClose = $('.modal-close');

    modal.click(function(){
        modal.stop().fadeOut();
        $('html').css('overflow', 'auto');
    });

    modalCon.click(function(e){
        e.stopPropagation();
    });

    modalClose.click(function(){
        modal.stop().fadeOut();
        $('html').css('overflow', 'auto');
    });

    // niceScroll ---------------------------------------
    $(function () {
        $(".recipe-choice-list").niceScroll({
            cursoropacitymax: 0.4
        });
    });

    $(function () {
        $(".cate-all").niceScroll({
            cursoropacitymax: 0.4
        });
    })

    // 카테고리 기능
    var btAll = $(".bt-all");
    var cateAllWrap = $(".cate-all-wrap");
    var cateListA = $(".cate-list a");
    var dep2 = $(".dep2");
    var cateSubAll = $(".cate-sub-all");

    cateSubAll.mouseenter(function () {
        cateAllWrap.addClass("cate-all-wrap-active");
    });

    cateSubAll.mouseleave(function () {
        cateAllWrap.removeClass("cate-all-wrap-active");
    });

    $.each(cateListA, function (index, item) {
        $(this).mouseenter(function () {
            cateAllWrap.addClass("cate-all-wrap-active");
            // .hide() = { display = none; }
            dep2.hide();
            dep2.eq(index).show();
        });
        $(this).mouseleave(function () {
            cateAllWrap.removeClass("cate-all-wrap-active");

        });
    })

    // hover
    var btAllTimer;

    btAll.mouseenter(function () {
        clearTimeout(btAllTimer);
        // cateAllWrap.show();
        cateAllWrap.addClass("cate-all-wrap-active");
    });
    btAll.mouseleave(function () {
        btAllTimer = setTimeout(function () {
            cateAllWrap.removeClass("cate-all-wrap-active");
        }, 300);
    });

    cateAllWrap.mouseenter(function () {
        clearInterval(btAllTimer);
        cateAllWrap.addClass("cate-all-wrap-active");
    });
    cateAllWrap.mouseleave(function () {
        btAllTimer = setTimeout(function () {
            cateAllWrap.removeClass("cate-all-wrap-active");
        }, 300);
    })

    // 레시피 계산기 ---------------------------------------
    // 정보 div
    var recipeGood = $(".recipe-good");

    // 레시피 갯수
    var recipeCnt = recipeGood.length;

    // 전체 갯수 출력자리
    var recipeTotalTag = $(".recipe-good-total-count em");

    // 전체 총 금액 출력자리
    var recipeTotalPriceTag = $(".recipe-cart-btn em");

    // 금액 출력 태그
    var recipeGoodPrice = $('.recipe-good-price b');

    // 금액만 별도로 뽑아서 관리하는 묶음(Array)
    // 숫자들을 만들어서 index에 배치
    var recipePriceArr = [];
    $.each(recipeGoodPrice, function (index) {
        var price = $(this).html();
        // 글자를 숫자로 변환하는 작업 필요.
        price = price.replace(/\,/, "");
        price = parseInt(price);

        recipePriceArr[index] = price;
    });

    // 목록 체크박스 클릭 처리
    var goodCheck = $(".recipe-good-label");
    $.each(goodCheck, function (index, item) {
        // 미리 체크가 되어 있어야 한다.
        $(this).addClass("recipe-good-label-active");

        $(this).click(function () {
            $(this).toggleClass("recipe-good-label-active");
            showPriceTotal();
        })
    });

    // 전체 레시피 체크 박스
    var goodCheckAll = $(".recipe-good-total-label");
    goodCheckAll.addClass("recipe-good-total-label-active");
    goodCheckAll.click(function () {
        if (goodCheckAll.hasClass("recipe-good-total-label-active")) {
            // 목록 전체 선택 해제
            goodCheck.removeClass("recipe-good-label-active");
        } else {
            // 목록 전체 선택 적용
            goodCheck.addClass("recipe-good-label-active");
        }
        goodCheckAll.toggleClass("recipe-good-total-label-active");

        showPriceTotal();
    });

    // ',' 출력하기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 금액 출력 기능
    function showPriceTotal() {
        // 전체 선택 개수 cnt
        var cnt = 0;
        // 전체 선택 금액 money
        var money = 0;
        $.each(goodCheck, function (index, item) {
            // hasClass("이름") 클래스 가지고 있는지 파악
            // 있으면 true, 없으면 false
            if ($(this).hasClass("recipe-good-label-active")) {
                // 선택된 상품 갯수 파악
                cnt += 1;
                // 선택된 상품 가격 파악
                money += recipePriceArr[index];
            }
        });

        // 전체 개수 출력 실행
        recipeTotalTag.html(cnt);
        // 금액에 ',' 붙이기
        money = numberWithCommas(money);
        // 전체 금액 출력 실행
        recipeTotalPriceTag.html(money);

        // 선택된 개수를 출력시키고 난 후, 전체 갯수보다 적으면
        // 전체 체크박스 해제
        if (cnt < recipeCnt) {
            goodCheckAll.removeClass("recipe-good-total-label-active");
        } else {
            goodCheckAll.addClass("recipe-good-total-label-active");
        };
    };

    showPriceTotal();

    // 상단 스크롤 처리
    var scY = $(window).scrollTop();
    var header = $(".header");
    var visual = $(".visual");
    $(window).scroll(function () {
        // 스크롤바의 이동 픽셀
        var scY = $(window).scrollTop();
        if (scY >= 80) {
            header.addClass("header-active");
            visual.addClass("visual-active");
        } else {
            header.removeClass("header-active");
            visual.removeClass("visual-active");
        }
    });

    // 모든 펼침메뉴 닫기 ---------------------------------------
    $('body').click(function () {
        centerMore.removeClass("center-more-active")
        centerMoreList.removeClass("center-more-list-active");
        gnbMoreList.removeClass("gnb-more-list-active");
        gnbMore.removeClass("gnb-more-active");
        gnbMore.find(">span").html("더보기");
        eventList.removeClass("event-list-active");
        iconArrow.removeClass("icon-arrow-active");
    });

    // 조합원 센터 토글 메뉴
    var centerMore = $('.center-more');
    var centerMoreList = $('.center-more-list');
    centerMore.click(function (e) {
        // body까지 신호를 보내지 않기위함.
        e.stopPropagation();
        // a태그의 href를 작동하지 못하게 함
        e.preventDefault();
        centerMore.toggleClass("center-more-active")
        centerMoreList.toggleClass("center-more-list-active");
        // 나머지를 닫는다.
        gnbMoreList.removeClass("gnb-more-list-active");
        gnbMore.removeClass("gnb-more-active");
        gnbMore.find(">span").html("더보기");
        eventList.removeClass("event-list-active");
        iconArrow.removeClass("icon-arrow-active")
    });

    // 주메뉴 더보기 토글
    var gnbMore = $(".gnb-more");
    var gnbMoreList = $(".gnb-more-list");
    gnbMore.click(function (e) {
        e.stopPropagation();
        gnbMoreList.toggleClass("gnb-more-list-active");
        gnbMore.toggleClass("gnb-more-active");
        var tt = gnbMore.find(">span").html();
        if (tt === "더보기") {
            gnbMore.find(">span").html("접기");
        } else {
            gnbMore.find(">span").html("더보기");
        }

        centerMore.removeClass("center-more-active")
        centerMoreList.removeClass("center-more-list-active");
        eventList.removeClass("event-list-active");
        iconArrow.removeClass("icon-arrow-active")
    });

    // 주메뉴 참여 토글
    var iconArrow = $(".icon-arrow");
    var eventList = $(".event-list");
    iconArrow.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        iconArrow.toggleClass("icon-arrow-active")
        eventList.toggleClass("event-list-active");

        centerMore.removeClass("center-more-active")
        centerMoreList.removeClass("center-more-list-active");
        gnbMoreList.removeClass("gnb-more-list-active");
        gnbMore.removeClass("gnb-more-active");
        gnbMore.find(">span").html("더보기");
    });

    // family 기능 토글 
    var footerHelp = $(".footer-help");
    var family = $(".family");
    footerHelp.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        family.toggleClass("family-active");
    });

    $("body").click(function () {
        family.removeClass("family-active");
    });

    // 위로 부드럽게 이동하기
    var goTop = $(".go-top");

    goTop.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $("html").animate({
            scrollTop: 0
        }, 300);
    });


    // 데이터값을 받는다.
    // eq를 이용해서 index를 찾는다.
    // 데이터를 배치한다.
    // : 'html 글자'를 완성시킨다.
    // : purposeDiv_1.html('html 글자')를 실행하여 완성.

    // 추천물품 데이터값(윗줄)
    var purposeData_1 = [{
            pic: "./images/good_1.jpg",
            title: "전복죽",
            unit: "220g",
            price: "6,500",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_2.jpg",
            title: "해물동그랑땡",
            unit: "300g",
            price: "5,800",
            opt: "알뜰",
            link: "#"
        },
        {
            pic: "./images/good_3.jpg",
            title: "쌈양상추",
            unit: "200g",
            price: "1,750",
            opt: "",
            link: "#"
        },
        {
            pic: "./images/good_4.jpg",
            title: "유기한우사골곰국",
            unit: "350g",
            price: "5,500",
            opt: "새상품",
            link: "#"
        }
    ];

    // 상품 내용 배치
    var purposeDiv_1 = $(".purpose .good-list-wrap").eq(0);
    var purposeHtml_1 = ""

    for (var i = 0; i < purposeData_1.length; i++) {
        purposeHtml_1 += `<div class="good-box good-box-mr">
            <a href="${purposeData_1[i].link}" class="good-img">
                <img src="${purposeData_1[i].pic}" alt="${purposeData_1[i].title}">
        `;

        if (purposeData_1[i].opt !== "") {
            purposeHtml_1 += `<span class="good-event" style="${ (purposeData_1[i].opt === "알뜰") ? "background:#e14949;" : "background:#76bd40"}">
            <em>${purposeData_1[i].opt}</em>
        </span>`;
        };

        purposeHtml_1 += `</a>
            <a href="${purposeData_1[i].link}" class="good-info">
                <span>
                    ${purposeData_1[i].title}<em>(${purposeData_1[i].unit})</em>
                </span>
            </a>
            <a href="${purposeData_1[i].link}" class="good-price">
                <span>
                    ${purposeData_1[i].price}&nbsp;<em>원</em>
                </span>
            </a>
            <a href="${purposeData_1[i].link}" class="good-cart">
                장바구니 버튼
            </a>
        </div>`
    };

    // 데이터 전송
    purposeDiv_1.html(purposeHtml_1);

    // removeClass 처리 준비
    var purposeDiv_1_good_box = purposeDiv_1.find(".good-box");
    var purposeDiv_1_good_event = purposeDiv_1.find(".good-event");

    // 4,8번째 margin-right 삭제
    purposeDiv_1_good_box.eq(3).removeClass("good-box-mr");

    // 추천물품 데이터값 (아랫줄)
    var purposeData_2 = [{
            pic: "./images/good_5.jpg",
            title: "얼갈이",
            unit: "500g",
            price: "1,600",
            opt: "인기",
            link: "#",
        },
        {
            pic: "./images/good_6.jpg",
            title: "깻잎",
            unit: "30장",
            price: "1,150",
            opt: "인기",
            link: "#",
        },
        {
            pic: "./images/good_7.jpg",
            title: "생협함께유기농찹쌀현미밥",
            unit: "200g*3개입",
            price: "5,200",
            opt: "인기",
            link: "#",
        },
        {
            pic: "./images/good_8.jpg",
            title: "반계탕",
            unit: "700g",
            price: "9,900",
            opt: "인기",
            link: "#",
        }
    ];

    //상품 내용 배치
    var purposeDiv_2 = $(".purpose .good-list-wrap").eq(1);
    var purposeHtml_2 = "";

    for (var i = 0; i < purposeData_2.length; i++) {
        purposeHtml_2 += `<div class="good-box good-box-mr">
            <a href="${purposeData_2[i].link}" class="good-img">
                <img src="${purposeData_2[i].pic}" alt="${purposeData_2[i].title}">
        `;

        if (purposeData_2[i].opt !== "") {
            purposeHtml_2 += `<span class="good-event" style="${ (purposeData_2[i].opt === "알뜰") ? "background:#e14949;" : "background:#76bd40"}">
            <em>${purposeData_2[i].opt}</em>
        </span>`;
        };

        purposeHtml_2 += `</a>
            <a href="${purposeData_2[i].link}" class="good-info">
                <span>
                    ${purposeData_2[i].title}<em>(${purposeData_2[i].unit})</em>
                </span>
            </a>
            <a href="${purposeData_2[i].link}" class="good-price">
                <span>
                    ${purposeData_2[i].price}&nbsp;<em>원</em>
                </span>
            </a>
            <a href="${purposeData_2[i].link}" class="good-cart">
                장바구니 버튼
            </a>
        </div>`
    };

    purposeDiv_2.html(purposeHtml_2);

    var purposeDiv_2_good_box = purposeDiv_2.find(".good-box");
    var purposeDiv_2_good_event = purposeDiv_2.find(".good-event");

    purposeDiv_2_good_box.eq(3).removeClass("good-box-mr");

    // 알뜰 상품 관련
    var saleData = [{
            pic: "./images/good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }, {
            pic: "./images/good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }
    ];


    var saleDiv = $('.sw-sale .swiper-wrapper');

    var saleHtml = "";

    for (var i = 0; i < saleData.length; i++) {
        saleHtml +=
            `<div class="swiper-slide">
        <!-- 슬라이드 내용 -->
        <div class="good-box">
            <a href="${saleData[i].link}" class="good-img">
                <img src="${saleData[i].pic}" alt="${saleData[i].title}">
                <span class="good-event"><em>${saleData[i].opt}</em></span>
            </a>
            <a href="${saleData[i].link}" class="good-info">
                <span>
                ${saleData[i].title}<em>(${saleData[i].unit})</em>
                </span>
            </a>
            <a href="${saleData[i].link}" class="good-price">
                <span>
                ${saleData[i].price}&nbsp;<em>원</em>
                </span>
            </a>
            <a href="${saleData[i].link}" class="good-cart">
                장바구니 버튼
            </a>
        </div>
        <!--// 슬라이드 내용 -->
    </div>`
    }

    saleDiv.html(saleHtml);

    // 추천 물품 관련
    var choiceData = [{
            pic: "./images/good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "./images/good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }, {
            pic: "./images/good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }, {
            pic: "./images/good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];

    var choiceDiv = $(".choice .swiper-wrapper");
    var choiceHtml = "";

    for (var i = 0; i < choiceData.length; i++) {
        choiceHtml +=
            `<div class="swiper-slide">
            <!-- 슬라이드 내용 -->
            <div class="good-box">
                <a href="${choiceData[i].link}" class="good-img">
                    <img src="${choiceData[i].pic}" alt="${choiceData[i].title}">
                    <span class="good-event"><em>${choiceData[i].opt}</em></span>
                </a>
                <a href="${choiceData[i].link}" class="good-info">
                    <span>
                    ${choiceData[i].title}<em>(${choiceData[i].unit})</em>
                    </span>
                </a>
                <a href="${choiceData[i].link}" class="good-price">
                    <span>
                    ${choiceData[i].price}&nbsp;<em>원</em>
                    </span>
                </a>
                <a href="${choiceData[i].link}" class="good-cart">
                    장바구니 버튼
                </a>
            </div>
            <!--// 슬라이드 내용 -->
        </div>`
    }

    choiceDiv.html(choiceHtml);

    // 인기물품 데이터
    var popularData_1 = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        }

    ];
    var popularData_2 = [{
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_2.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_3 = [{
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },

        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },

        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_4 = [{
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_4.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_5 = [{
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_5.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_6 = [{
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_7 = [{
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_7.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_8 = [{
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_9 = [{
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_10 = [{
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_cate12_01.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_11 = [{
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_6.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_12 = [{
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_3.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_13 = [{
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_8.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];
    var popularData_14 = [{
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
        {
            pic: "good_1.jpg",
            title: "애호박",
            unit: "1개",
            price: "1,850",
            opt: "인기",
            link: "#"
        },
    ];

    // 인기 상품이 출력될 장소
    var popularDiv = $(".popular .good-list-wrap");

    // 여러번 데이터가 다를 때 마다 실행되므로 함수로 만들어야 함
    function popularChange(_data) {
        // 데이터 쌓임 방지 (초기화)
        var popularHtml = "";
        // 데이터 출력 준비
        for (var i = 0; i < _data.length; i++) {
            popularHtml +=
                `<div class="good-box good-box-mr">
            <a href="${_data[0].link}" class="good-img">
                <img src="./images/${_data[0].pic}" alt="${_data[0].title}">
                <span class="good-event"><em>${_data[0].opt}</em></span>
            </a>
            <a href="${_data[0].link}" class="good-info">
                <span>
                ${_data[0].title}<em>(${_data[0].unit})</em>
                </span>
            </a>
            <a href="${_data[0].link}" class="good-price">
                <span>
                ${_data[0].price}&nbsp;<em>원</em>
                </span>
            </a>
            <a href="${_data[0].link}" class="good-cart">
                장바구니 버튼
            </a>
        </div>`
        }
        popularDiv.html(popularHtml);
        popularDiv.find(".good-box").eq(3).removeClass("good-box-mr");
    }


    // 인기 상품 리스트 클릭시 데이터 변경 실행
    // 버튼을 찾아서 저장한다.

    var popularBts = $(".sw-cate a");
    var popularBtn = $(".popular .btn");
    var popularDataArr = [
        popularData_1,
        popularData_2,
        popularData_3,
        popularData_4,
        popularData_5,
        popularData_6,
        popularData_7,
        popularData_8,
        popularData_9,
        popularData_10,
        popularData_11,
        popularData_12,
        popularData_13,
        popularData_14
    ];

    // 이 코드는 click 을 처리할 수 있다.
    // 그리고, href 의 기능도 막을 수 있다.
    // 하지만, a 태그 14개 중 몇번째가 클릭되었는지 알 수 없다.
    // 몇번째가 클릭이 되었는지 알아야 관련된 데이터를 보여줄 수 있다.


    // 각각(each)의 버튼을 클릭을 하면 몇번째 버튼이 클릭이 되었는지
    // 순서를 파악할 수 있다.
    // $.each()
    // ----------------------------
    // $.each($(".class")); >  같
    // $.each( 변수명 );     > 음
    // ----------------------------
    // $.each($(".class"), function () {})
    // $.each($(".class"), function (index, item) {})

    popularChange(popularDataArr[0]);

    $.each(popularBts, function (index) {
        $(this).click(function (event) {
            event.preventDefault();
            var cate = $(this).find(".cate-name").html();
            popularBtn.html(cate);

            popularChange(popularDataArr[index]);
        });
    });

    // .html() = 값을 불러옴
    // .html(내용) = 값을 집어넣음
});

window.onload = function () {
    
    let swVisualPause = $('.sw-visual-pause');
    let swVisual = new Swiper('.sw-visual', {
        loop: true,
        autoplay: {
            delay: 500,
            disableOnInteraction: false,
        },
        speed: 300,
        navigation: {
            prevEl: '.sw-visual-prev',
            nextEl: '.sw-visual-next'
        },
        // 슬라이드 목록
        pagination: {
            el: '.sw-visual-pg',
            type: 'fraction',
        }
    });
    
    swVisualPause.click(function(){
        $(this).toggleClass("sw-visual-pause-active");
        let state = $(this).hasClass("sw-visual-pause-active");
        if (state == true) {
            swVisual.autoplay.stop();
        } else {
            swVisual.autoplay.start();
        }
    });
    
    // 마우스 오버시에 슬라이드 멈추기
    $('.sw-visual').mouseenter(function(){
        swVisual.autoplay.stop();
    });
    // 마우스 아웃시에 슬라이드 재실행
    $('.sw-visual').mouseleave(function(){
        swVisual.autoplay.start();
    });
    
    new Swiper('.sw-sale', {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        pagination: {
            el: '.sw-sale-menu .sw-good-pg',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.sw-sale-menu .sw-good-prev',
            nextEl: '.sw-sale-menu .sw-good-next'
        }
    });
    
    new Swiper('.sw-choice', {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        pagination: {
            el: '.sw-choice-menu .sw-good-pg',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.sw-choice-menu .sw-good-prev',
            nextEl: '.sw-choice-menu .sw-good-next'
        }
    });
    
    new Swiper('.sw-brand', {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
            el: '.sw-brand-menu .sw-good-pg',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.sw-brand-menu .sw-good-prev',
            nextEl: '.sw-brand-menu .sw-good-next'
        }
    });

    new Swiper('.sw-cate', {
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 10,
        navigation: {
            prevEl: '.sw-cate-prev',
            nextEl: '.sw-cate-next'
        }
    });
    
    new Swiper('.sw-review', {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 3,
        pagination: {
            el: '.sw-review-menu .sw-good-pg',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.sw-review-menu .sw-good-prev',
            nextEl: '.sw-review-menu .sw-good-next'
        }
    });
    
    new Swiper('.sw-banner', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 500,
        slidesPerView: 2,
        navigation: {
            prevEl: '.sw-banner-prev',
            nextEl: '.sw-banner-next'
        }
    });
};