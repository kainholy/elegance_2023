window.addEventListener("load", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    let mm = gsap.matchMedia();
    const aniOpt = {
        ease: 'power3.out',
        easeIn: 'power3.in',
        easeInOut: 'power4.inOut',
    }

    /* ----------------------------------
    ホバーボタン
    ---------------------------------- */
    const hoverBtns = document.querySelectorAll('.--hover-btn');
    hoverBtns.forEach((btn) => {
        btn.addEventListener('mouseover', () => {
            gsap.to(btn, {'--scale': 1, '--opacity': 1,duration: .7, ease:aniOpt.ease})
        })
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {'--scale': 0,'--opacity': 0, duration: .7, ease:aniOpt.ease})
        })
    })

    /* ----------------------------------
    オープニングアニメーション
    ---------------------------------- */
    const openingTl = gsap.timeline();
    const opening = document.getElementById('opening');
    const openingLogo = document.getElementById('opening-logo');
    const fvTitle = document.getElementById('fv-title-up');
    const fvTitleWords = fvTitle.getElementsByClassName('word');
    const fvTitleNumber = document.getElementById('fv-title-number');
    const fvImgScaleClip = document.getElementById('fv-img-scale-clip');
    openingTl
    .to(openingLogo, {delay:.8, duration: .5, ease:aniOpt.ease})
    .to(opening, {autoAlpha: 0, duration: 1, ease:aniOpt.ease}, '-=.2')
    .to(fvImgScaleClip, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, duration: 2, ease:aniOpt.easeInOut}, '-=.7')
    .add(() => {
        if(body.id == 'vn') {
            gsap.to(fvTitleWords, {y: "-7%", duration: 1.5,stagger: .03, ease:aniOpt.ease});
        } else if (body.id == 'hk') {
            gsap.to(fvTitleWords, {y: "0%", duration: 1.5,stagger: .03, ease:aniOpt.ease});
        } else {
            gsap.to(fvTitleWords, {y: "8%", duration: 1.5,stagger: .03, ease:aniOpt.ease});
        }
    }, '-=1.5')
    .add(() => {
        if(body.id == 'vn') {
            gsap.to(fvTitleNumber, {y: "-18%", duration: 1.5, ease:aniOpt.ease});
        } else if (body.id == 'hk') {
            gsap.to(fvTitleNumber, {y: "-15%", duration: 1.5, ease:aniOpt.ease});
        } else {
            gsap.to(fvTitleNumber, {y: "0%", duration: 1.5, ease:aniOpt.ease});
        }
    },  '<')

    /* ----------------------------------
    headerLogo縮小
    ---------------------------------- */
    let headerScroll = 0;
    const headerLogo = document.getElementById('header-logo');
    window.addEventListener('scroll', () => {
        // スクロール位置を取得
        headerScroll = window.pageYOffset;
        if (headerScroll > 0) {
            headerLogo.classList.add('is_active');
        } else {
            headerLogo.classList.remove('is_active');
        }
    })

    /* ----------------------------------
    追従ボタン
    ---------------------------------- */
    // windowの高さを取得
    const fixedBtn = document.getElementById('fixed-btn');
    const mvSectionHeight = document.getElementsByClassName('p-base-uv_mv')[0].clientHeight;
    let scroll = 0;
    // pc
    mm.add("(min-width: 769px)", () => {
        window.addEventListener('scroll', () => {
            scroll = window.pageYOffset;
            if (scroll > mvSectionHeight && scroll <= 7000) {
                fixedBtn.classList.add('is_active');
            } else {
                fixedBtn.classList.remove('is_active');
            }
        })
    })
    // sp
    mm.add("(max-width: 768px)", () => {
        window.addEventListener('scroll', () => {
            scroll = window.pageYOffset;
            if (scroll > mvSectionHeight && scroll <= 6100) {
                fixedBtn.classList.add('is_active');
            } else {
                fixedBtn.classList.remove('is_active');
            }
        })
    })

        

    
    /* ----------------------------------
    カードセクション
    ---------------------------------- */
    // product
    const productCardTrigger = document.getElementById('product-card-trigger');
    const productCards = document.querySelectorAll('.js-product-card');
    const productCardsWidth = productCards[0].clientWidth;
    const productCardsHeight = productCards[0].clientHeight;
    const productCardProduct = document.querySelectorAll('.js-product-card-product');
    const productCardText = document.querySelectorAll('.js-product-card-text');
    const pink = 0;
    const orange = 1;
    const green = 2;
    const lavender = 3;
    const beige = 4;
    // pc
    mm.add("(min-width: 769px)", () => {

        const productCardTl = gsap.timeline({
            scrollTrigger: {
                trigger: productCardTrigger,
                start: 'center center',
                end: '1700px',
                pin: true,
                scrub: .3,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });
        productCardTl
        .to(productCards[pink], {rotate: "-14deg", translateX: productCardsWidth * -2, translateY: productCardsHeight * 0.12, 
            onUpdate: () => {
                if(productCardTl.progress() > .1456) {
                    gsap.to([
                        productCardProduct[pink],
                        productCardProduct[orange],
                        productCardProduct[lavender],
                        productCardProduct[beige],
                    ], {autoAlpha: 1, duration: .5, ease:aniOpt.ease})
                } else {
                    gsap.to([
                        productCardProduct[pink],
                        productCardProduct[orange],
                        productCardProduct[lavender],
                        productCardProduct[beige],
                    ], {autoAlpha: 0, duration: .5, ease:aniOpt.ease})
                }

                if(productCardTl.progress() <= .80) {
                    gsap.to([
                        productCardText[pink],
                        productCardText[orange],
                        productCardText[green],
                        productCardText[lavender],
                        productCardText[beige],
                    ], {autoAlpha: 0, duration: .2, ease:aniOpt.ease})
                } else {
                    gsap.to([
                        productCardText[pink],
                        productCardText[orange],
                        productCardText[green],
                        productCardText[lavender],
                        productCardText[beige],
                    ], {autoAlpha: 1, duration: .5, ease:aniOpt.ease})
                }
            }
        })
        .to(productCards[orange], {rotate: "-7deg", translateX: productCardsWidth * -1, translateY: productCardsHeight * 0.03}, '<')
        .to(productCards[lavender], {rotate: "7deg", translateX: productCardsWidth * 1, translateY: productCardsHeight * 0.03}, '<')
        .to(productCards[beige], {rotate: "14deg", translateX: productCardsWidth * 2, translateY: productCardsHeight * 0.12}, '<')

    })
    // sp
    mm.add("(max-width: 768px)", () => {
        const testTl = gsap.timeline();
        const productCardTl = gsap.timeline({
            scrollTrigger: {
                trigger: productCardTrigger,
                start: 'center center',
                end: '3000px',
                pin: true,
                scrub: .6,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });
        productCardTl
        .to(productCards[pink], {rotate: "0deg"})
        .to(productCards[pink], {rotate: "-7deg", autoAlpha: 0})
        .to(productCards[orange], {rotate: 7 * orange - 7 +"deg"}, '<')
        .to(productCards[green], {rotate: 7 * green - 7 +"deg"}, '<')
        .to(productCards[lavender], {rotate: 7 * lavender - 7 +"deg"}, '<')
        .to(productCards[beige], {rotate: 7 * beige - 7 +"deg"}, '<')
        .to([productCardProduct[orange], productCardText[orange]], {autoAlpha: 1})

        .to(productCards[orange], {rotate: "0deg"})
        .to(productCards[orange], {rotate: "0deg"})
        .to(productCards[orange], {rotate: "-7deg", autoAlpha: 0})
        .to(productCards[green], {rotate: 7 * green - 14 +"deg"}, '<')
        .to(productCards[lavender], {rotate: 7 * lavender - 14 +"deg"}, '<')
        .to(productCards[beige], {rotate: 7 * beige - 14 +"deg"}, '<')
        .to([productCardProduct[green], productCardText[green]], {autoAlpha: 1})

        .to(productCards[green], {rotate: "0deg"})
        .to(productCards[green], {rotate: "0deg"})
        .to(productCards[green], {rotate: "-7deg", autoAlpha: 0})
        .to(productCards[lavender], {rotate: 7 * lavender - 21 +"deg"}, '<')
        .to(productCards[beige], {rotate: 7 * beige - 21 +"deg"}, '<')
        .to([productCardProduct[lavender], productCardText[lavender]], {autoAlpha: 1})

        .to(productCards[lavender], {rotate: "0deg"})
        .to(productCards[lavender], {rotate: "0deg"})
        .to(productCards[lavender], {rotate: "-7deg", autoAlpha: 0})
        .to(productCards[beige], {rotate: 7 * beige - 21 +"deg"}, '<')
        .to(productCards[beige], {rotate: "0deg"}, '<')

        .to(productCardProduct[beige], {autoAlpha: 1})
        .to([productCardText[beige],productCards[beige]], {autoAlpha: 1}, '<')

        .to(productCards[beige], {rotate: "0deg"})
    })
    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });

    // recommendation
    const recommendationCardTrigger = document.getElementById('recommendation-card-trigger');
    const recommendationCardItem1 = document.getElementById('recommendation-card-item1');
    const recommendationCardItem2 = document.getElementById('recommendation-card-item2');
    
    mm.add("(min-width: 769px)", () => {
        const recommendationCardTranslateX = 37
        const recommendationCardTranslateXInit = 30
        const recommendationCardTranslateY = 12
        const recommendationCardRotate = 3
        const recommendationCardOpacity = .4;
        const recommendationCardTl = gsap.timeline({
            scrollTrigger: {
                trigger: recommendationCardTrigger,
                start: 'center 42%',
                end: '1700px',
                pin: true,
                scrub: .6,
                anticipatePin: 1,
                invalidateOnRefresh: true
            },
        });
        recommendationCardTl
        .to(recommendationCardItem1, {translateX: -recommendationCardTranslateXInit, translateY:0, rotate: '-'+recommendationCardRotate+'deg',
            onUpdate: () => {
                if(recommendationCardTl.progress() > .5) {
                    recommendationCardItem1.style.zIndex = 0;
                    recommendationCardItem2.style.zIndex = 1;
                } else {
                    recommendationCardItem1.style.zIndex = 1;
                    recommendationCardItem2.style.zIndex = 0;
                }
            },
        })
        .to(recommendationCardItem2, {translateX: recommendationCardTranslateXInit, translateY:0, rotate: recommendationCardRotate+'deg', opacity: 1}, '<')
        .to(recommendationCardItem1, {translateX: recommendationCardTranslateX,translateY: -recommendationCardTranslateY, rotate: '0deg', opacity: recommendationCardOpacity, })
        .to(recommendationCardItem2, {translateX: -recommendationCardTranslateX,translateY: recommendationCardTranslateY, rotate: '0deg'}, '<')
    })
    // sp
    mm.add("(max-width: 768px)", () => {
        const recommendationCardTranslateX = 5
        const recommendationCardTranslateXInit = 90
        const recommendationCardTranslateY = 8
        const recommendationCardRotate = 3
        const recommendationCardOpacity = .6;
        const recommendationCardTl = gsap.timeline({
            scrollTrigger: {
                trigger: recommendationCardTrigger,
                start: 'center center',
                end: '1000px',
                pin: true,
                scrub: .6,
                anticipatePin: 1,
                invalidateOnRefresh: true
            },
        });
        recommendationCardTl
        .to(recommendationCardItem1, {translateX: -recommendationCardTranslateX+'%', translateY:0, rotate: '-'+recommendationCardRotate+'deg',
            onUpdate: () => {
                if(recommendationCardTl.progress() > .5) {
                    recommendationCardItem1.style.zIndex = 0;
                    recommendationCardItem2.style.zIndex = 1;
                } else {
                    recommendationCardItem1.style.zIndex = 1;
                    recommendationCardItem2.style.zIndex = 0;
                }
            },
        })
        .to(recommendationCardItem2, {translateX: -recommendationCardTranslateXInit+recommendationCardTranslateX+'%', translateY:0, rotate: recommendationCardRotate+'deg', opacity: 1}, '<')
        .to(recommendationCardItem1, {translateX: -recommendationCardTranslateX*2+'%',translateY: -recommendationCardTranslateY, rotate: '0deg', opacity: recommendationCardOpacity, })
        .to(recommendationCardItem2, {translateX: -100+'%',translateY: recommendationCardTranslateY, rotate: '0deg'}, '<')
    })
    

    /* ----------------------------------
    スライダー
    ---------------------------------- */
    // foundation
    const foundationSelects = document.querySelectorAll('.js-foundation-select');
    const foundationSlideItem = document.querySelectorAll('.js-foundation-slide-item');
    const foundationSlideImg = document.querySelectorAll('.js-foundation-slide-img');
    const foundationSlideImgWidth = foundationSlideImg[0].clientWidth;
    const foundationPreArrow = document.getElementById('foundation-pre-arrow');
    const foundationNextArrow = document.getElementById('foundation-next-arrow');
    const foundationSlideNumber = document.getElementById('foundation-slide-number');
    const foundationDuration = .7;
    const appearAnimation = {autoAlpha: 1, duration: foundationDuration, ease:aniOpt.ease}
    const appearAnimationImgGoNow = {translateX: 0, duration: foundationDuration, ease:aniOpt.ease}
    const appearAnimationImgGoPre = {translateX: -foundationSlideImgWidth, duration: foundationDuration, ease:aniOpt.ease}
    const appearAnimationImgGoNext = {translateX: foundationSlideImgWidth, duration: foundationDuration, ease:aniOpt.ease}
    const appearAnimationImgFromPre = {translateX: -foundationSlideImgWidth}
    const appearAnimationImgFromNext = {translateX: foundationSlideImgWidth}
    const appearAnimationImgFromNow = {translateX: 0}
    const foundationNowGoPre = (target) => {
        gsap.fromTo(foundationSlideImg[target], appearAnimationImgFromNow, appearAnimationImgGoPre);
    }
    const foundationNextGoNow = (target) => {
        gsap.fromTo(foundationSlideImg[target], appearAnimationImgFromNext, appearAnimationImgGoNow);
    }
    const foundationNowGoNext = (target) => {
        gsap.fromTo(foundationSlideImg[target], appearAnimationImgFromNow, appearAnimationImgGoNext);
    }
    const foundationPreGoNow = (target) => {
        gsap.fromTo(foundationSlideImg[target], appearAnimationImgFromPre, appearAnimationImgGoNow);
    }
    const foundationInit = () => {
        foundationSelects.forEach((select,i) => {
            select.classList.remove('is_active');
            gsap.to(foundationSlideItem[i], {autoAlpha: 0, duration: foundationDuration, ease:aniOpt.easeIn})
        })
    }
    const foundationContainIsActive = () => {
        let number = 0;
        foundationSelects.forEach((select, index) => {
            if (select.classList.contains('is_active')) {
                number = index;
            }
        })
        return number;
    }
    const foundationPostNumber = (number) => {
        foundationSlideNumber.textContent = number+1 + " / " + foundationSelects.length;
    }
    foundationPostNumber(0);
    
    foundationSelects.forEach((select, i) => {
        select.addEventListener('click', () => {
            let number = 0;
            number = foundationContainIsActive();
            if (i != number) {
                foundationInit();
                select.classList.add('is_active');
                gsap.to(foundationSlideItem[i], appearAnimation);
                foundationNowGoPre(number);
                foundationNextGoNow(i);
                foundationPostNumber(i);
            } else {
                return;
            }
        })
    })

    foundationPreArrow.addEventListener('click', () => {
        let i = 0;
        i = foundationContainIsActive();
        let pre = 0;
        if (i == 0) {
            pre = foundationSelects.length - 1;
        } else {
            pre = i - 1;
        }
        foundationInit();
        foundationSelects[pre].classList.add('is_active');
        gsap.to(foundationSlideItem[pre], appearAnimation);
        foundationNowGoNext(i);
        foundationPreGoNow(pre);
        foundationPostNumber(pre);
    })
    foundationNextArrow.addEventListener('click', () => {
        let i = 0;
        i = foundationContainIsActive();
        let next = 0;
        if (i == foundationSelects.length-1) {
            next = 0;
        } else {
            next = i + 1;
        }
        foundationInit();
        foundationSelects[next].classList.add('is_active');
        gsap.to(foundationSlideItem[next], appearAnimation);
        foundationNextGoNow(next);
        foundationNowGoPre(i);
        foundationPostNumber(next);
    })
    // rouge
    const rougeSelects = document.querySelectorAll('.js-rouge-select');
    const rougeSlideItem = document.querySelectorAll('.js-rouge-slide-item');
    const rougeSlideImg = document.querySelectorAll('.js-rouge-slide-img');
    const rougeSlideImgWidth = rougeSlideImg[0].clientWidth;
    const rougePreArrow = document.getElementById('rouge-pre-arrow');
    const rougeNextArrow = document.getElementById('rouge-next-arrow');
    const rougeSlideNumber = document.getElementById('rouge-slide-number');
    const rougeDuration = .7;
    const rougeImgGoNow = {translateX: 0, duration: rougeDuration, ease:aniOpt.ease}
    const rougeImgGoPre = {translateX: -rougeSlideImgWidth, duration: rougeDuration, ease:aniOpt.ease}
    const rougeImgGoNext = {translateX: rougeSlideImgWidth, duration: rougeDuration, ease:aniOpt.ease}
    const rougeImgFromPre = {translateX: -rougeSlideImgWidth}
    const rougeImgFromNext = {translateX: rougeSlideImgWidth}
    const rougeImgFromNow = {translateX: 0}
    const rougeNowGoPre = (target) => {
        gsap.fromTo(rougeSlideImg[target], rougeImgFromNow, rougeImgGoPre);
    }
    const rougeNextGoNow = (target) => {
        gsap.fromTo(rougeSlideImg[target], rougeImgFromNext, rougeImgGoNow);
    }
    const rougeNowGoNext = (target) => {
        gsap.fromTo(rougeSlideImg[target], rougeImgFromNow, rougeImgGoNext);
    }
    const rougePreGoNow = (target) => {
        gsap.fromTo(rougeSlideImg[target], rougeImgFromPre, rougeImgGoNow);
    }
    const rougeInit = () => {
        rougeSelects.forEach((select,i) => {
            select.classList.remove('is_active');
            gsap.to(rougeSlideItem[i], {autoAlpha: 0, duration: rougeDuration, ease:aniOpt.easeIn})
        })
    }
    const rougeContainIsActive = () => {
        let number = 0;
        rougeSelects.forEach((select, index) => {
            if (select.classList.contains('is_active')) {
                number = index;
            }
        })
        return number;
    }
    const rougePostNumber = (number) => {
        rougeSlideNumber.textContent = number+1 + " / " + rougeSelects.length;
    }
    rougePostNumber(0);
    
    rougeSelects.forEach((select, i) => {
        select.addEventListener('click', () => {
            let number = 0;
            number = rougeContainIsActive();
            if (i != number) {
                rougeInit();
                select.classList.add('is_active');
                gsap.to(rougeSlideItem[i], appearAnimation);
                rougeNowGoPre(number);
                rougeNextGoNow(i);
                rougePostNumber(i);
            } else {
                return;
            }
        })
    })

    rougePreArrow.addEventListener('click', () => {
        let i = 0;
        i = rougeContainIsActive();
        let pre = 0;
        if (i == 0) {
            pre = rougeSelects.length - 1;
        } else {
            pre = i - 1;
        }
        rougeInit();
        rougeSelects[pre].classList.add('is_active');
        gsap.to(rougeSlideItem[pre], appearAnimation);
        rougeNowGoNext(i);
        rougePreGoNow(pre);
        rougePostNumber(pre);
    })
    rougeNextArrow.addEventListener('click', () => {
        let i = 0;
        i = rougeContainIsActive();
        let next = 0;
        if (i == rougeSelects.length-1) {
            next = 0;
        } else {
            next = i + 1;
        }
        rougeInit();
        rougeSelects[next].classList.add('is_active');
        gsap.to(rougeSlideItem[next], appearAnimation);
        rougeNextGoNow(next);
        rougeNowGoPre(i);
        rougePostNumber(next);
    })


    /* ----------------------------------
    モーダル
    ---------------------------------- */
    // 機能
    const clear = 0;
    const flesh = 1;
    const cute = 2;
    const natural = 3;
    const elegant = 4;
    const nude = 5;
    const glam = 6;
    const healthy = 7;
    const soft = 8;
    const cool = 9;
    const modalBgItems = document.querySelectorAll('.js-modal-bg-item');
    const modalMainPink = document.getElementById('modal-main-pink');
    const modalMainOrange = document.getElementById('modal-main-orange');
    const modalMainGreen = document.getElementById('modal-main-green');
    const modalMainLavender = document.getElementById('modal-main-lavender');
    const modalMainBeige = document.getElementById('modal-main-beige');
    const modalSubPink = document.getElementById('modal-sub-pink');
    const modalSubOrange = document.getElementById('modal-sub-orange');
    const modalSubGreen = document.getElementById('modal-sub-green');
    const modalSubLavender = document.getElementById('modal-sub-lavender');
    const modalSubBeige = document.getElementById('modal-sub-beige');
    const modalOtherPink = document.getElementById('modal-other-pink');
    const modalOtherOrange = document.getElementById('modal-other-orange');
    const modalOtherGreen = document.getElementById('modal-other-green');
    const modalOtherLavender = document.getElementById('modal-other-lavender');
    const modalOtherBeige = document.getElementById('modal-other-beige');

    const modalSelectBtn = document.querySelectorAll('.js-modal-select-btn');
    const modalFirstContent = document.getElementById('modal-first-content');
    const modalSecondContent = document.getElementById('modal-second-content');
    const modalTryAgainBtn = document.getElementById('modal-try-again-btn');
    const modalSelectTl = gsap.timeline();

    const reset = () => {
        modalSelectTl
        .to([modalBgItems[0],modalBgItems[1]], {autoAlpha: 0, duration: .2, ease:aniOpt.ease})
        .to(modalSecondContent, {autoAlpha: 0, duration: .2, ease:aniOpt.ease},'<')
        .to(modalSecondContent, {display: 'none'}, '<')
        .to(modalFirstContent, {display: 'flex'}, '<')
        .to(modalFirstContent, {autoAlpha: 1, duration: .5, ease:aniOpt.ease}, '+=.05')
        // リセット
        modalMainPink.classList.remove('is_active');
        modalMainOrange.classList.remove('is_active');
        modalMainGreen.classList.remove('is_active');
        modalMainLavender.classList.remove('is_active');
        modalMainBeige.classList.remove('is_active');
        modalSubPink.classList.remove('is_active');
        modalSubOrange.classList.remove('is_active');
        modalSubGreen.classList.remove('is_active');
        modalSubLavender.classList.remove('is_active');
        modalSubBeige.classList.remove('is_active');
        modalOtherPink.classList.remove('is_active');
        modalOtherOrange.classList.remove('is_active');
        modalOtherGreen.classList.remove('is_active');
        modalOtherLavender.classList.remove('is_active');
        modalOtherBeige.classList.remove('is_active');
    }
    modalSelectBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            modalSelectTl
            .to(modalFirstContent, {autoAlpha: 0, duration: .2, ease:aniOpt.ease})
            .to(modalFirstContent, {display: 'none'}, '+=.05')
            .to(modalSecondContent, {display: 'block'}, '<')
            .to(modalSecondContent, {autoAlpha: 1, duration: .2, ease:aniOpt.ease}, '+=.05')

            if(i == clear || i == cool) {
                modalMainGreen.classList.add('is_active');
                modalSubLavender.classList.add('is_active');
                modalOtherPink.classList.add('is_active');
                modalOtherOrange.classList.add('is_active');
                modalOtherBeige.classList.add('is_active');
            } else if (i == healthy) {
                modalMainOrange.classList.add('is_active');
                modalSubPink.classList.add('is_active');
                modalOtherGreen.classList.add('is_active');
                modalOtherLavender.classList.add('is_active');
                modalOtherBeige.classList.add('is_active');
            } else if (i == cute || i == soft) {
                modalMainPink.classList.add('is_active');
                modalSubBeige.classList.add('is_active');
                modalOtherOrange.classList.add('is_active');
                modalOtherGreen.classList.add('is_active');
                modalOtherLavender.classList.add('is_active');
            } else if (i == natural || i == nude) {
                modalMainBeige.classList.add('is_active');
                modalSubOrange.classList.add('is_active');
                modalOtherPink.classList.add('is_active');
                modalOtherGreen.classList.add('is_active');
                modalOtherLavender.classList.add('is_active');
            } else if (i == glam) {
                modalMainLavender.classList.add('is_active');
                modalSubGreen.classList.add('is_active');
                modalOtherPink.classList.add('is_active');
                modalOtherOrange.classList.add('is_active');
                modalOtherBeige.classList.add('is_active');
            } else if (i == flesh) {
                modalMainOrange.classList.add('is_active');
                modalSubGreen.classList.add('is_active');
                modalOtherPink.classList.add('is_active');
                modalOtherLavender.classList.add('is_active');
                modalOtherBeige.classList.add('is_active');
            } else if (i == elegant) {
                modalMainLavender.classList.add('is_active');
                modalSubPink.classList.add('is_active');
                modalOtherGreen.classList.add('is_active');
                modalOtherOrange.classList.add('is_active');
                modalOtherBeige.classList.add('is_active');
            } else {
                return;
            }
        })
    })
    modalTryAgainBtn.addEventListener('click', () => {
        reset();
        setTimeout(() => {
            gsap.to([modalBgItems[0],modalBgItems[1]], {autoAlpha: 1, duration: .4, ease:aniOpt.ease})
        }, 1000);
    })
    // 開閉
    const modalOpen = document.querySelectorAll('.js-modal-open');
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('modal');
    modalOpen.forEach((open) => {
        open.addEventListener('click', () => {
            // .5秒後に発火
            setTimeout(() => {
                body.style.overflow = 'hidden';
            }, 300);
            gsap.to([modalBgItems[0],modalBgItems[1]], {autoAlpha: 1, duration: .4, ease:aniOpt.ease})
            gsap.to(modal, {autoAlpha: 1, duration: .5, ease:aniOpt.ease})
        })
    })
    modalClose.addEventListener('click', () => {
        reset();
        body.style.overflow = '';
        gsap.to(modal, {autoAlpha: 0, duration: .5, ease:aniOpt.ease})
    })
    
    /* ----------------------------------
    ハンバーガーメニュー
    ---------------------------------- */
    let isHamAnimating = false;
    const hamTl = gsap.timeline();
    const body = document.querySelector('body');
    const hamTrigger = document.querySelector('.js-ham-trigger');
    const hamLinks = document.querySelectorAll('.js-ham-link');
    const headerMenuOpen = () => {
        // 開く時
        gsap.to('.js-ham-line-top', {y:3, rotate:30, rotateY:180, duration:.6, ease:aniOpt.ease})
        gsap.to('.js-ham-line-under', {y:-9, rotate:-30,rotateY:180, width:"100%", duration:.6, ease:aniOpt.ease})
        hamTl
        .to('.js-ham-menu', {autoAlpha:1, duration: .4, ease:aniOpt.ease})
        .to('.js-ham-text-up-ex', {y:"0%", duration: .7,stagger: .04, ease:aniOpt.ease}, '<')
        .to('.js-ham-text-up', {y:"0%", duration: .7,stagger: .04, ease:aniOpt.ease}, '<')
        .to('.js-ham-line', {scaleX:1, duration: .7, ease:aniOpt.ease}, '-=.6')
        body.style.overflow = 'hidden';
        hamTrigger.classList.add('is_active');
    }
    const headerMenuClose = () => {
        // 閉じる時
        gsap.to('.js-ham-line-top', {y:0, rotate:0, rotateY:0, duration:.5, ease:aniOpt.ease})
        gsap.to('.js-ham-line-under', {y:0, rotate:0,rotateY:0, duration:.5, ease:aniOpt.ease})
        hamTl
        .to('.js-ham-text-up', {y:"120%", duration: .5, ease:"none"})
        .to('.js-ham-text-up-ex', {y:"120%", duration: .5, ease:"none"}, '<')
        .to('.js-ham-line', {scaleX:0, duration: .5, ease:aniOpt.ease}, '<')
        .to('.js-ham-menu', {autoAlpha:0, duration: .2, ease: "none"}, '-=.1')
        body.style.overflow = '';
        hamTrigger.classList.remove('is_active');
    }
    hamTrigger.addEventListener('click', () => {
        if (isHamAnimating) return;
        isHamAnimating = true;
        if (hamTrigger.classList.contains('is_active')) {
            headerMenuClose();
        } else {
            headerMenuOpen();
        }
        setTimeout(() => {
            isHamAnimating = false;
        }, 500);
    });

    gsap.set('.p-header-nav', {background: "linear-gradient(108deg, #FBF4E6 4.81%, #FCEDEB 86.19%)"})
    hamLinks.forEach((hamLink, i) => {
        hamLink.addEventListener('click', () => {
            headerMenuClose();
        });
        hamLink.addEventListener('mouseout', () => {
            gsap.to(hamLink,{opacity: .5, duration: .5, ease:aniOpt.ease})
            gsap.to('.p-header-nav', {background: "linear-gradient(108deg, #FBF4E6 4.81%, #FCEDEB 86.19%)", duration: .6, ease:aniOpt.ease})
        })
        hamLink.addEventListener('mouseover', () => {
            gsap.to(hamLink,{opacity: 1, duration: .5, ease:aniOpt.ease})
        })
    });
    const hoverBg = (number, color) => {
        hamLinks[number].addEventListener('mouseover', () => {
            gsap.to('.p-header-nav', {background: color, duration: .6, ease:aniOpt.ease})
        })
    }
    hoverBg(0, "linear-gradient(108deg, #FBF4E6 0%, #FBF4E6 100%)");
    hoverBg(1, "linear-gradient(108deg, #FBF4E6 0%, #FBF4E6 100%)");
    hoverBg(2, "linear-gradient(108deg, #FBF4E6 0%, #FBF4E6 100%)");
    hoverBg(3, "linear-gradient(108deg, #FCEDEB 0%, #FCEDEB 100%)");
    hoverBg(4, "linear-gradient(108deg, #E8E5E6 0%, #E8E5E6 100%)");

    /* ----------------------------------
    文字アニメーション
    ---------------------------------- */
    new SplitType(".js-text");
    gsap.utils.toArray('.js-text-up').forEach((item, i) => {
        const words = item.getElementsByClassName('word');
        gsap.to(words, {y: "0%", duration: 1.5,stagger: .03, ease:aniOpt.ease, scrollTrigger: {
            trigger: item,
            start: 'top 95%',
        }})
    });
    if(body.id == 'vn') {
        gsap.utils.toArray('.js-title-up').forEach((item, i) => {
            const words = item.getElementsByClassName('word');
            gsap.to(words, {y: "-15%", duration: 1.5,stagger: .03, ease:aniOpt.ease, scrollTrigger: {
                trigger: item,
                start: 'top 95%',
            }})
        });
        gsap.utils.toArray('.js-title-number').forEach((item, i) => {
            gsap.to(item, {y: "-10%", duration: 1.5, ease:aniOpt.ease, scrollTrigger: {
                trigger: item,
                start: 'top 95%',
            }})
        })
    } else if (body.id == 'hk') {
        gsap.utils.toArray('.js-title-up').forEach((item, i) => {
            const words = item.getElementsByClassName('word');
            gsap.to(words, {y: "0%", duration: 1.5,stagger: .03, ease:aniOpt.ease, scrollTrigger: {
                trigger: item,
                start: 'top 95%',
            }})
        });
        gsap.utils.toArray('.js-title-number').forEach((item, i) => {
            gsap.to(item, {y: "0%", duration: 1.5, ease:aniOpt.ease, scrollTrigger: {
                trigger: item,
                start: 'top 95%',
            }})
        })
    } else {
        gsap.utils.toArray('.js-title-up').forEach((item, i) => {
            const words = item.getElementsByClassName('word');
            gsap.to(words, {y: "8%", duration: 1.5,stagger: .03, ease:aniOpt.ease, scrollTrigger: {
                trigger: item,
                start: 'top 95%',
            }})
        });
        gsap.utils.toArray('.js-title-number').forEach((item, i) => {
            gsap.to(item, {y: "0%", duration: 1.5, ease:aniOpt.ease, scrollTrigger: {
                trigger: item,
                start: 'top 95%',
            }})
        })
    }
    // gsap.utils.toArray('.js-title-number').forEach((item, i) => {
    //     gsap.to(item, {y: "0%", duration: 1.5, ease:aniOpt.ease, scrollTrigger: {
    //         trigger: item,
    //         start: 'top 95%',
    //     }})
    // })


    gsap.utils.toArray('.js-body-up').forEach((item, i) => {
        const words = item.getElementsByClassName('word');
        gsap.to(words, {y: "0%", duration: 1,stagger: .02, ease:aniOpt.ease, scrollTrigger: {
            trigger: item,
            start: 'top 95%',
        }})
    });

    gsap.utils.toArray('.js-img-clip').forEach((item, i) => {
        gsap.to(item, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", backgroundSize: "110%", duration: 1.5, ease:aniOpt.easeInOut, scrollTrigger: {
            trigger: item,
            start: 'top 95%',
        }})
    });
    gsap.utils.toArray('.js-img-scale-clip').forEach((item, i) => {
        gsap.to(item, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, duration: 2, ease:aniOpt.easeInOut, scrollTrigger: {
            trigger: item,
            start: 'top 105%',
        }})
    });
    // pc
    mm.add("(min-width: 769px)", () => {
        gsap.utils.toArray('.js-ink-scale-up-trigger').forEach((item, i) => {
            const ink = item.getElementsByClassName('js-scale-up');
            ScrollTrigger.create({
                trigger: item,
                start: 'top 70%',
                end: 'top 70%',
                onEnter: () => {
                    gsap.to(ink, {scale: 1, duration: .8, stagger: .03, ease:aniOpt.ease})
                },
                onEnterBack: () => {
                    gsap.to(ink, {scale: .7, duration: .8, stagger: .03, ease:aniOpt.ease})
                }
            })

        });
        gsap.utils.toArray('.js-ink').forEach((item, i) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 70%',
                end: 'top 70%',
                onEnter: () => {
                    gsap.to(item, {scale: 1.1, duration: .7, ease:aniOpt.ease})
                },
                onEnterBack: () => {
                    gsap.to(item, {scale: 1, duration: .7, ease:aniOpt.ease})
                }
            })
        });
    });
    gsap.to('.js-rouge-color-variation-text', {clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease:aniOpt.easeInOut, scrollTrigger: {
        trigger: '.js-rouge-color-variation-text',
        start: 'top 95%',
    }})

    const footerOverflow = document.getElementsByClassName('js-footer-overflow')[0];
    const footerImg = document.querySelectorAll('.js-footer-img');
    const footerText = document.querySelectorAll('.js-footer-text');
    const footerTextWords1 = footerText[0].querySelectorAll('.word');
    const footerTextWords2 = footerText[1].querySelectorAll('.word');
    const footerTextWords3 = footerText[2].querySelectorAll('.word');
    const footerSnsIcon = document.querySelectorAll('.js-footer-sns-icon');
    const footerLogo = document.querySelectorAll('.js-footer-logo');
    const footerCaption = document.querySelectorAll('.js-footer-caption');
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: footerOverflow,
            start: 'top 80%',
        },
    });
    footerTl
    .to(footerOverflow, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", autoAlpha: 1, duration: .5, ease:aniOpt.ease})
    .to([footerTextWords1,footerTextWords2,footerTextWords3], {y: "0%", duration: 1,stagger: .02, ease:aniOpt.ease}, '-=.3')
    .to(footerImg, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", backgroundSize: "110%", duration: .8, ease:aniOpt.easeInOut}, '<')
    .to(footerSnsIcon, {y:0,autoAlpha: 1, duration: 1, stagger: .05, ease:aniOpt.ease}, '<')
    .to(footerLogo, {y:0,autoAlpha: 1, duration: 1, ease:aniOpt.ease}, '<')
    .to(footerCaption, {y:0,autoAlpha: 1, duration: 1, ease:aniOpt.ease}, '<')
    
})