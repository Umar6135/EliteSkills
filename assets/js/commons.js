var windowWidth; var windowHeight; var $menuDark = !1; var $videoLoaded = !1; var $imagesLoaded = !1; var $imgGlobalID = 0; var $bookFirstOccurrence = !0; var $scrollPos = 0; var $updateReady = !0; var $lastPosX = 0; var $lastPosY = 0; var $isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1; var $reopening = new Date(2025, 3, 7); var $today = $reopening > new Date() ? $reopening : new Date(); var $dayAfter = new Date($today).setDate($today.getDate() + 2); var $tomorrow = new Date($dayAfter); (function ($) {
    $(function () {
        windowWidth = $(window).width(); windowHeight = $(window).height(); $(document).ready(function () {
            $('.brownieIco').on('click', function () { $('.brownie').addClass('closed'); $(this).parent().parent().parent().removeClass('closed'); if ($(this).parent().parent().parent().attr('id') == "cookieBrownie") { if (getCookie('$cookieExists') == 'true') { readCookiePrefs() } } })
            $('.accept').on('click', function () { $(this).parent().parent().parent().parent().addClass('closed'); $(this).parent().parent().parent().parent().removeClass('opened'); initCookiePrefs(); if (getCookie('$newsletterPrompt') != 'true') { setTimeout(function () { setCookie('$newsletterPrompt', !0, 60); $('#newsLetterBrownie .brownieIco').trigger('click') }, 1000) } }); $('.brownieClose').on('click', function () { $(this).parent().parent().parent().addClass('closed') }); $('.customize').on('click', function () { if (!$('#cookieBrownie').hasClass('opened')) { $('#cookieBrownie').addClass('opened') } else { $('#cookieBrownie').removeClass('opened') } })
            var $scrollDirection; if ($isSafari) { $('html').addClass('is-safari-osx') }
            $('.langsContainer a').attr('data-disabled', !0); if (isTouchEnabled) { $('body, #hImgContainer, #hImgLayer, #hFacilitiesSticky, nav, #hElementsLayer, .overlay, section.galleryContainer, #footerSticky').height(windowHeight); $('.fullPicture, .fullPicture > div:first-child, #footerTarget, footer').height(windowHeight * 2); $('.fullPicture > div:eq(1)').height(windowHeight); $('#hTarget').css('top', windowHeight); if (isMobile) { $('#footerMain').height(windowHeight) } }
            if (isMobile) { $('.hFacilitiesBackground, #hFacilitiesTop ').attr('data-scroll-offset', '0,' + windowHeight); $('#hTestimonialSticky, #footerSticky').removeAttr('data-scroll-sticky').removeAttr('data-scroll-target'); $('#tasteText, #tasteTitle').attr('data-scroll-repeat', ''); $('.fullPictureSticky, #otherSticky').removeAttr('data-scroll-sticky'); $('#fullPictureTarget,#fullPictureTarget2,#fullPictureTarget3,#fullPictureTarget4').attr('data-scroll-offset', '0,60%'); $('#detailTopImgContainer').removeClass('d400'); $('#detailServicesPic').attr('data-scroll-speed', '0.5'); $('.verticalPic, .compositionText').attr('data-scroll-speed', '0.3'); $('.compositionPic img, .menuPic img').attr('data-scroll-speed', '-0.5'); $('.sliderContainer, .galleryContainer > img, .simplePicture img').attr('data-scroll-speed', '-0.25'); $('.langsContainer a').each(function () { $(this).text($(this).text().substr(0, 2)) }); $('.hTestimonialItem.long').addClass('top_translated').addClass('has_transition_3000').attr('data-scroll-class', 'show').attr('data-scroll-offset', '0').attr('data-scroll-repeat', !1); $('#removeTable').attr('data-scroll-offset', '0') }
            scrollMenu = new LocomotiveScroll({ el: document.getElementById('navScroller'), smooth: !0, lerp: !isMobile ? 0.06 : 0.1, class: 'show', scrollbarClass: 'm-scrollbar', touchMultiplier: 2.5, scrollFromAnywhere: !1, smartphone: { smooth: !0 }, tablet: { smooth: !0 } }); $textIndex = 0; $('.text.more p').each(function () {
                if ($(this).html().indexOf('<br') != -1) { $(this).shorten({ showChars: $(this).html().indexOf('<br'), ellipsesText: "", moreText: '<div class="oButton onDark has_transition_1500 show bordered open transparent" data-scroll="" data-scroll-repeat="" data-scroll-class="open"> <div class="oContent"><div class="oLabelContainer no_overflow"><span class="oLabel top_hidden has_transition_1000 block d200 transition_all">' + get_more_text() + '</span></div></div></div>', lessText: '<div class="oButton onDark has_transition_1500 show bordered open transparent" data-scroll="" data-scroll-repeat="" data-scroll-class="open"> <div class="oContent"><div class="oLabelContainer no_overflow"><span class="oLabel top_hidden has_transition_1000 block d200 transition_all">' + get_less_text() + '</span></div></div></div>', onMore: function () { setTimeout(function () { scrollLayer.update() }, 2) }, onLess: function () { setTimeout(function () { scrollLayer.update() }, 2) } }) }
                $textIndex++
            })
            function get_more_text() { if (lang == 'it') { return 'continua' } else { return 'more' } }
            function get_less_text() { if (lang == 'it') { return 'nascondi' } else { return 'less' } }
            if (isMobile) { if ($('#detailText .text .shortcontent').length == 0) { $('#detailText .hBook').css('margin-top', '34px') } } else { if ($('#detailText .text .shortcontent').length == 0) { $('#detailText .hBook').css('margin-top', '5vw') } }
            if (current != "overview" || (current == "overview" && isMobile)) {
                scrollLayer = new LocomotiveScroll({ el: document.querySelector('article'), smooth: !0, getDirection: !0, lerp: !isMobile ? 0.06 : 0.1, scrollFromAnywhere: !1, touchMultiplier: 2.5, class: 'show', smartphone: { smooth: !0 }, tablet: { smooth: !0 }, direction: 'vertical' }); $introTop = !1; $fullPictureScroll = !1; $galleryLocking = !1; $lockTimeout = !1; $pressScrolling = !1; scrollLayer.on('scroll', (args) => {
                    $scrollDirection = args.direction; $scrollPos = args.scroll.y; if (!isTouchEnabled) {
                        $viewElements = Object.entries(args.currentElements); $viewElements.forEach(function ($viewElement) {
                            if ($($viewElement[1].el).attr('data-precision')) {
                                $target = $($viewElement[1].el); $target.offsetY = $target.offset().top; $target.offsetX = $target.offset().left; $target.width = $target.outerWidth(); $target.height = $target.outerHeight(); $delta = {}; $delta.y = $lastPosY - $target.offsetY; $delta.x = $lastPosX - $target.offsetX; if (($delta.y > 0 && $delta.y < $target.height && $delta.x > 0 && $delta.x < $target.width) && !$target.hasClass('target')) { $target.trigger('mouseover') }
                                if (($delta.y < 0 || $delta.y > $target.height || $delta.x < 0 || $delta.x > $target.width) && $target.hasClass('target')) { $target.trigger('mouseout') }
                            }
                        })
                    }
                    if (current == "index" && $scrollPos > windowHeight * 2.75 && !isMobile) {
                        if ($scrollDirection == "down") { $('#mainLogo, #brownies, .mobile, .email, header .ig, header .fb, header .langsContainer').addClass('hidden') }
                        if ($scrollDirection == "up" && !$galleryLocking) { $('#mainLogo, #brownies, .mobile, .email, header .ig, header .fb, header .langsContainer').removeClass('hidden') }
                    } else if (current == "index" && isMobile) {
                        if ($scrollDirection == "down") { $('#brownies, .mobile, .email, header .ig, header .fb, header .langsContainer').addClass('hidden') }
                        if ($scrollDirection == "up" && !$galleryLocking && $scrollPos > windowHeight) { $('#brownies, .mobile, .email, header .ig, header .fb, header .langsContainer').removeClass('hidden') }
                    } else if (current != "index") {
                        if ($scrollDirection == "down") { $('#brownies, .mobile, .email, header .ig, header .fb, header .langsContainer').addClass('hidden') }
                        if ($scrollDirection == "up" && !$galleryLocking && !$pressScrolling) { $('#brownies, .mobile, .email, header .ig, header .fb, header .langsContainer').removeClass('hidden') }
                    }
                    if (typeof args.currentElements.hTarget === 'object') {
                        let progress = args.currentElements.hTarget.progress
                        if (!isMobile) {
                            if ($scrollDirection == "down" && !$introTop && $scrollPos > 5) { $introTop = !0; scrollLayer.scrollTo(windowHeight * 1.75); if (!jQuery('#hImg')[0].muted) { jQuery('#hImg')[0].muted = !0; $('.oAudio .audioLine').show() } }
                            if ($scrollDirection == "up" && $introTop) { $introTop = !1; scrollLayer.scrollTo(0) }
                            $('#hImgLayer').css('transform', 'translateY(' + (progress) * 166 + 'vh) translateX(-' + (progress) * 22 + 'vw)'); $('#hImgCover').css('transform', 'scale(' + (1 / (progress * 4 + 1)) + ')')
                            $('#hImg').css('transform', 'scale(' + (1 * (progress * 1.5 + 1)) + ') translateX(' + progress * 20 + 'vw)'); $('#hElementsLayer').css('opacity', 1 - progress * 5); if ($('#hVideoLayer').hasClass('open')) { $('#hVideoLayer').trigger('click') }
                        } else {
                            if ($scrollDirection == "down" && !$introTop && $scrollPos > 5) { $introTop = !0; scrollLayer.scrollTo(windowHeight * 1.8) }
                            if ($scrollDirection == "up" && $introTop) { $introTop = !1; scrollLayer.scrollTo(0) }
                            $('#hImgLayer').css('transform', 'translateY(' + (progress) * 140 + 'vh) '); $('#hImgCover').css('transform', 'scale(1,' + (1 / (progress * 6 + 1)) + ')')
                            $('#hImg').css('transform', 'scale(1,' + (1 * (progress * 6 + 1)) + ') translateX(' + progress * 45 + 'px) translateY(-' + progress * 3 + 'vh)'); $('#hElementsLayer').css('opacity', 1 - progress * 5); if ($('#hVideoLayer').hasClass('open')) { $('#hVideoLayer').trigger('click') }
                        }
                    }
                    if (typeof args.currentElements.hPayTarget === 'object') {
                        let progress = args.currentElements.hPayTarget.progress; if (!isMobile) {
                            $('#hImgLayer').css('transform', 'translateY(166vh) translateX(-22vw)'); $('#hImgCover').css('transform', 'scale(0.2)')
                            $('#hImg').css('transform', 'scale(2.5) translateX(20vw) translateY(-' + progress * 2 + 'vw)')
                        } else {
                            $('#hImgLayer').css('transform', 'translateY(140vh)'); $('#hImgCover').css('transform', 'scale(1,0.14)')
                            $('#hImg').css('transform', 'scale(1,7) translateX(45px) translateY(-' + (3 + progress * 2) + 'vh)')
                        }
                    }
                    if (typeof args.currentElements.ethosContent === 'object') { let progress = args.currentElements.ethosContent.progress; if (progress > 0.2 && progress < 0.4) { $('#ethosLayer').css('opacity', (progress - 0.2) * 5) } }
                    if (typeof args.currentElements.hTestimonialSticky === 'object' && !isMobile) { let progress = args.currentElements.hTestimonialSticky.progress; $('#hTestimonialScroll').css('transform', 'translateY(calc(-' + progress * 100 + '% + ' + progress * $('.hTestimonialItem').height() + 'px + ' + progress * 16.5 + 'vw))') }
                    if (typeof args.currentElements.hLifeStyleSticky === 'object' || typeof args.currentElements.hLifeStyleSticky2 === 'object' || typeof args.currentElements.hLifeStyleSticky3 === 'object' || typeof args.currentElements.hLifeStyleSticky4 === 'object' || typeof args.currentElements.hLifeStyleSticky5 === 'object' || typeof args.currentElements.hLifeStyleSticky6 === 'object' || typeof args.currentElements.hLifeStyleSticky7 === 'object' || typeof args.currentElements.hLifeStyleSticky8 === 'object') {
                        let progress; if (typeof args.currentElements.hLifeStyleSticky === 'object') { progress = args.currentElements.hLifeStyleSticky.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky2 === 'object') { progress = args.currentElements.hLifeStyleSticky2.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky2.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky3 === 'object') { progress = args.currentElements.hLifeStyleSticky3.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky3.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky4 === 'object') { progress = args.currentElements.hLifeStyleSticky4.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky4.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky5 === 'object') { progress = args.currentElements.hLifeStyleSticky5.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky5.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky6 === 'object') { progress = args.currentElements.hLifeStyleSticky6.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky6.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky7 === 'object') { progress = args.currentElements.hLifeStyleSticky7.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky7.el).parent() }
                        if (typeof args.currentElements.hLifeStyleSticky8 === 'object') { progress = args.currentElements.hLifeStyleSticky8.progress; current = $(scrollLayer.scroll.els.hLifeStyleSticky8.el).parent() }
                        if (!isMobile) { $('.hLSBlockPic img', current.next()).css('transform', 'translateY(' + (-100 + (progress * 100)) + '%)') } else { $('.hLSBlockPic img', current.next()).css('transform', 'translateY(' + (-100 + (progress * 100)) + '%)') }
                    }
                    if (typeof args.currentElements.hFacilitiesSticky === 'object') { let progress = args.currentElements.hFacilitiesSticky.progress; if (!isMobile) { $('#hFacilitiesScroller').css('transform', 'translateX(-' + (progress * 56) + '%)') } else { $('#hFacilitiesScroller').css('transform', 'translateX(-' + (progress * 79) + '%)') } }
                    if (typeof args.currentElements.footerSticky === 'object' && !isMobile) { let progress = args.currentElements.footerSticky.progress; $('#footerMain, #footerData').css('transform', 'translateX(-' + (progress * 50) + 'vw)'); $('#footerLeft').css('transform', 'translateX(' + (progress * 50) + 'vw)') }
                    if (typeof args.currentElements.detailTopTarget === 'object') {
                        let progress = args.currentElements.detailTopTarget.progress; if (progress < 0.4) { $('#detailTopLayer').css('opacity', progress * 2.5) }
                        if (progress < 0.5) { $('#detailTopImg').css('transform', 'scale(' + (0.8 * (1 + (progress * 2) * 0.25)) + ')'); $('#detailImgBlock').css('transform', 'scale(' + (1.25 / (1 + (progress * 2) * 0.25)) + ')') }
                        if (progress > 0.5) { $('#detailTopImg, #detailImgBlock').css('transform', 'scale(1)') }
                    }
                    if (typeof args.currentElements.fullPictureTarget === 'object' || typeof args.currentElements.fullPictureTarget2 === 'object' || typeof args.currentElements.fullPictureTarget3 === 'object' || typeof args.currentElements.fullPictureTarget4 === 'object') {
                        let progress; if (typeof args.currentElements.fullPictureTarget === 'object') { progress = args.currentElements.fullPictureTarget.progress; parent = $(scrollLayer.scroll.els.fullPictureTarget.el).parent(); current = scrollLayer.scroll.els.fullPictureTarget }
                        if (typeof args.currentElements.fullPictureTarget2 === 'object') { progress = args.currentElements.fullPictureTarget2.progress; parent = $(scrollLayer.scroll.els.fullPictureTarget2.el).parent(); current = scrollLayer.scroll.els.fullPictureTarget2 }
                        if (typeof args.currentElements.fullPictureTarget3 === 'object') { progress = args.currentElements.fullPictureTarget3.progress; parent = $(scrollLayer.scroll.els.fullPictureTarget3.el).parent(); current = scrollLayer.scroll.els.fullPictureTarget3 }
                        if (typeof args.currentElements.fullPictureTarget4 === 'object') { progress = args.currentElements.fullPictureTarget4.progress; parent = $(scrollLayer.scroll.els.fullPictureTarget4.el).parent(); current = scrollLayer.scroll.els.fullPictureTarget4 }
                        if (!isMobile) {
                            if (progress <= 0.3333) {
                                $fullPictureScroll = !1; $('.fullPictureBlock', parent).css('transform', 'scale(0.8)')
                                $('.fullPictureContainer', parent).css('transform', 'scale(1.25)')
                            }
                            if (progress > 0.334 && progress < 0.665) {
                                if (!$fullPictureScroll && $scrollDirection == "down") { $fullPictureScroll = !0; scrollLayer.scrollTo(current.top + windowHeight + 1, { duration: 500 }) }
                                if (!$fullPictureScroll && $scrollDirection == "up") { $fullPictureScroll = !0; scrollLayer.scrollTo(current.top, { duration: 500 }) }
                                $('.fullPictureBlock', parent).css('transform', 'scale(' + (0.8 * (1 + ((progress - 0.333) * 3) * 0.25)) + ')')
                                $('.fullPictureContainer', parent).css('transform', 'scale(' + (1.25 / (1 + ((progress - 0.333) * 3) * 0.25)) + ')')
                            }
                            if (progress >= 0.666) { $('.fullPictureBlock, .fullPictureContainer', parent).css('transform', 'scale(1)'); $fullPictureScroll = !1 }
                        } else {
                            $('.fullPictureBlock', parent).css('transform', 'scale(' + (0.8 * (1 + ((progress - 0.333) * 3) * 0.25)) + ')')
                            $('.fullPictureContainer', parent).css('transform', 'scale(' + (1.25 / (1 + ((progress - 0.333) * 3) * 0.25)) + ')')
                        }
                    }
                    if (typeof args.currentElements.otherSticky === 'object' && !isMobile) { let progress = args.currentElements.otherSticky.progress; $('#otherItems').css('transform', 'translateY(calc(-' + progress * 100 + '% + ' + progress * ((windowHeight - $('.otherItem:first').height() - 25) - ($('#otherFixed .blockTitle').height() + ($('.otherItem').height() - $('.otherItemPic').height()))) + 'px)') }
                    if ((typeof args.currentElements.galleryLock === 'object' || typeof args.currentElements.galleryLock2 === 'object') && !isMobile) {
                        if (typeof args.currentElements.galleryLock === 'object') { current = scrollLayer.scroll.els.galleryLock }
                        if (typeof args.currentElements.galleryLock2 === 'object') { current = scrollLayer.scroll.els.galleryLock2 }
                        if (($scrollPos > current.top && $scrollPos < current.top + 350 && !$galleryLocking) || ($scrollPos > current.top - 350 && $scrollPos < current.top && !$galleryLocking)) {
                            $galleryLocking = !0; $('#mainLogo, #brownies, .mobile, .email').addClass('hidden')
                            scrollLayer.scrollTo(current.el, { duration: 500 })
                        }
                        if ($scrollPos > current.top + 350 || $scrollPos < current.top - 350) { $galleryLocking = !1 }
                    }
                });
                scrollLayer.on('scroll', (obj) => {
                    let scrollY = obj.scroll.y; // current scroll position in px

                    if (scrollY > window.innerHeight * 2) {
                        $('header').addClass('scrolled-down');
                    } else {
                        $('header').removeClass('scrolled-down');
                    }
                }); scrollLayer.on('call', func => {
                    if (func == 'load' && !$imagesLoaded) { $imagesLoaded = !0; imgGlobalLoad() }
                    if (func == 'showHeader') {

                        if ($scrollDirection == "down" && !$('#mainMenuController').hasClass('dark') && $scrollPos < 150) { $('#mainLogo').removeClass('hidden'); $('#mainMenuController .line').removeClass('quickColor'); $('#bookNow').removeClass('open').addClass('dark'); $('#mainMenuController').removeClass('show'); $('#mainMenuController .line').addClass('no_transition'); $('#mainMenuController, .headerButton, #brownies, header .langsContainer, #textSwitch').addClass('dark'); $('#hLogo').removeClass('show'); setTimeout(function () { $('#mainMenuController .line').removeClass('no_transition'); $('#mainMenuController').addClass('show') }, 1); setTimeout(function () { $('#bookNow').addClass('open') }, 360); $('#navigationTrack').removeClass('show').removeClass('open') }
                        if ($scrollDirection == "up" && $('#mainMenuController').hasClass('dark') && $scrollPos < 150) {
                            $('#bookNow').removeClass('open').removeClass('dark'); $('#hLogo').addClass('show'); $('#mainMenuController .line').addClass('quickColor')
                            $('#mainMenuController, .headerButton, #brownies, #textSwitch, header .langsContainer').removeClass('dark'); setTimeout(function () { $('#bookNow').addClass('open') }, 360)
                        }
                    }
                    if (func == 'hideHeader') { if ($scrollDirection == "up" && $('#mainMenuController').hasClass('dark') && $scrollPos < 150) { $('#mainLogo').addClass('hidden') } }
                    if (func == 'layerUpdate') { if ($updateReady) { $updateReady = !1; commonOffsets(); scrollLayer.update(); setTimeout(function () { $updateReady = !0 }, 1000) } }
                    if (func == 'weatherManage') {
                        if ($scrollDirection == "up" && $scrollPos < scrollLayer.scroll.els.weatherIn.top) { weatherOut(); setTimeout(function () { $('#weather .animating').addClass('no_transition').addClass('top_low').removeClass('no_opacity') }, 480) }
                        if ($scrollDirection == "down") { $('#weather .animating').removeClass('no_transition'); weatherIn() }
                    }
                    if (func == 'headerToWhite') {
                        if ($scrollDirection == "down" && $('#bookNow').hasClass('dark')) {
                            $('#bookNow').removeClass('open').removeClass('dark'); $('#mainMenuController .line').addClass('quickColor')
                            $('#mainMenuController, .headerButton, #brownies, #textSwitch, #mainLogo, header .langsContainer').removeClass('dark'); setTimeout(function () { $('#bookNow').addClass('open') }, 360)
                        } else if ($scrollDirection == "up" && !$('#bookNow').hasClass('dark')) { $('#bookNow').removeClass('open').addClass('dark'); $('#mainMenuController, .headerButton, #brownies,  #mainLogo, header .langsContainer, #textSwitch').addClass('dark'); setTimeout(function () { $('#bookNow').addClass('open') }, 360) }
                    }
                    if (func == 'headerToDark') {
                        if ($scrollDirection == "down" && !$('#bookNow').hasClass('dark')) { $('#bookNow').removeClass('open').addClass('dark'); $('#mainMenuController, .headerButton, #brownies,  #mainLogo, header .langsContainer, #textSwitch').addClass('dark'); setTimeout(function () { $('#bookNow').addClass('open') }, 360) } else if ($scrollDirection == "up" && $('#bookNow').hasClass('dark')) {
                            $('#bookNow').removeClass('open').removeClass('dark'); $('#mainMenuController .line').addClass('quickColor')
                            $('#mainMenuController, .headerButton, #brownies, #mainLogo, header .langsContainer, #textSwitch').removeClass('dark'); setTimeout(function () { $('#bookNow').addClass('open') }, 360)
                        }
                    }
                    if (func == "runAccolades" && isMobile) { $('#accoladesScroller').addClass('runAccolades') }
                    if (func == 'removeTable') {
                        if ($scrollDirection == "down") { $('#reserveTable').removeClass('show') }
                        if ($scrollDirection == "up") { $('#reserveTable').addClass('show') }
                    }
                })
            } else {
                scrollOverview = new LocomotiveScroll({ el: document.querySelector('article'), smooth: !0, getDirection: !0, lerp: 0.04, scrollFromAnywhere: !1, touchMultiplier: 2.5, multiplier: 3, class: 'show', smartphone: { smooth: !0 }, tablet: { smooth: !0, direction: 'horizontal', gestureDirection: 'horizontal' }, direction: 'horizontal' }); scrollOverview.on('scroll', (args) => {
                    $scrollDirection = args.direction; $scrollPos = args.scroll.x; if ($scrollDirection == "left") { $('#brownies').removeClass('hidden') }
                    if ($scrollDirection == "right") { $('#brownies').addClass('hidden') }
                    $viewElements = Object.entries(args.currentElements); $viewElements.forEach(function ($viewElement) {
                        if ($($viewElement[1].el).attr('data-precision')) {
                            $target = $($viewElement[1].el); $target.offsetY = $target.offset().top; $target.offsetX = $target.offset().left; $target.width = $target.outerWidth(); $target.height = $target.outerHeight(); $delta = {}; $delta.y = $lastPosY - $target.offsetY; $delta.x = $lastPosX - $target.offsetX; if (($delta.y > 0 && $delta.y < $target.height && $delta.x > 0 && $delta.x < $target.width) && !$target.hasClass('target')) { $target.trigger('mouseover') }
                            if (($delta.y < 0 || $delta.y > $target.height || $delta.x < 0 || $delta.x > $target.width) && $target.hasClass('target')) { $target.trigger('mouseout') }
                        }
                    })
                })
            }
            $dataView = 0; $snapReady = !0; $('#overviewControls .oNavigation').on('click', function () {
                if ($(this).hasClass('left')) {
                    if ($('#overviewItemPicsContainer .itemPic.active').index() > 0) { $('.oNavigation.right').addClass('show').addClass('open'); manageOverview($(this).parent().parent().parent(), '<') }
                    if ($('#overviewItemPicsContainer .itemPic.active').index() == 0) { $('.oNavigation.left').removeClass('show').removeClass('open') }
                } else {
                    if ($('#overviewItemPicsContainer .itemPic.active').index() < $('#overviewItemPicsContainer .itemPic').length - 1) {
                        manageOverview($(this).parent().parent().parent(), '>')
                        $('.oNavigation.left').addClass('show').addClass('open')
                    }
                    if ($('#overviewItemPicsContainer .itemPic.active').index() == $('#overviewItemPicsContainer .itemPic').length - 1) { $('.oNavigation.right').removeClass('show').removeClass('open') }
                }
            })
            if ($('.wpforms-form').length > 0) {
                if ($('.wpforms-datepicker').length > 0) {
                    jQuery('.wpforms-datepicker-wrap')[0]._flatpickr.config.onOpen.push(function () { scrollLayer.stop() })
                    jQuery('.wpforms-datepicker-wrap')[0]._flatpickr.config.onClose.push(function () { scrollLayer.start() })
                }
                if ($('.wpforms-timepicker').length > 0) {
                    jQuery('.wpforms-timepicker').timepicker().on('hideTimepicker', function (e) { scrollLayer.start() })
                    jQuery('.wpforms-timepicker').timepicker().on('showTimepicker', function () { scrollLayer.stop() })
                }
                $('.wpforms-disclaimer-description').on('mouseover touchstart', function () { scrollLayer.stop() }).on('mouseout touchend', function () { scrollLayer.start() })
                window.wpforms.scrollToError = function () { }; window.wpforms.animateScrollTop = function () { }; var waitForFormSuccess; $('.formContainer .wpforms-submit').on('click', function () { clearInterval(waitForFormSuccess); waitForFormSuccess = setInterval(function () { if (!$('.formContainer .wpforms-form').length) { clearInterval(waitForFormSuccess); scrollLayer.update(); scrollLayer.scroll.checkScroll(!0); scrollLayer.scrollTo('#detailForm') } }, 50) })
            }
            $('.menuController, #menuClose').on('click', function () { manageNav() })
            $('.menuController').on('mouseover', function () { if ($('nav').hasClass('active')) { $('nav .overlayClose').addClass('hover') } })
            $('.menuController').on('mouseout', function () { if ($('nav').hasClass('active')) { $('nav .overlayClose').removeClass('hover') } })
            $('#rightHeader .mobile, #footerInfo a').on('click', function () { })
            $('#rightHeader .email, .mailBlock a').on('click', function () { })
            $('.socials a').on('click', function () { })
            $('.galleryContainer .sliderArrow').on('click', function () { if ($(this).hasClass('left')) { manageSlider($(this).parent().parent().parent(), '<') } else { manageSlider($(this).parent().parent().parent(), '>') } })
            $('.urlManager:not(.no_default)').on('click', function (e) { e.preventDefault(); urlManager($(this).attr('href')) })
            run_clocks(); setWeatherData(); $('.brownieIcoContainer').each(function (b) { setTimeout(function () { $('.brownieIcoContainer:eq(' + b + ')').removeClass('hidden') }, 500 + 100 * b) })
            if (current == "index") {
                $('#hImg').imagesLoaded(function () {
                    $('#hImgContainer').addClass('show'); scrollLayer.update(); if (!isTouchEnabled && !isMobile) { $('#hImg').on('click', toggleVideoAudio); $('#actionTrack .oAudio').show(); $('#actionTrack .oArrow').hide() }
                    setTimeout(function () { $('#hLogo').addClass('show'); $('#mainMenuController').addClass('show'); $('.headerButton').addClass('show') }, 800)
                    setTimeout(function () { $('#bookNow').addClass('show'); $('#scrollDown').addClass('show'); $('header .langsContainer').addClass('show') }, 1200)
                    setTimeout(function () { $('#bookNow').addClass('open') }, 1550); if (!isTouchEnabled && !isMobile) { } else { }
                    $('.hExperienceBlock .hExperienceButton').on('click', function (e) { $currentIndex = $('.hExperienceBlock.show').index(); $newIndex = $(this).parent().index(); if ($currentIndex != $newIndex) { $direction = $newIndex > $currentIndex ? $direction = '>' : $direction = '<'; $('.hExperienceBlock').removeClass('show'); $(this).parent().addClass('show'); manageExperienceWidget($(this).parent().parent().parent(), $direction, $newIndex) } })
                })
            } else {
                $('#mainMenuController').addClass('show'); setTimeout(function () { $('#mainLogo').addClass('show') }, 400); setTimeout(function () { $('.headerButton').addClass('show') }, 800)
                setTimeout(function () { $('#bookNow, #reserveTable').addClass('show'); $('header .langsContainer').addClass('show') }, 1200)
                setTimeout(function () { $('#bookNow, #reserveTable').addClass('open') }, 1550); if (current == "overview") { setTimeout(function () { $('#overviewIntroRight .oButton').addClass('open') }, 500); if (!isMobile) { $('#overviewIntroRight .oButton').on('click', function () { scrollOverview.scrollTo('right') }) } else { $('#overviewSnippetContainer').css('height', $('.overviewSnippet:eq(0)').height()) } }
            }
            $firstTrack = !0; $(window).on('mousemove', function (e) { $lastPosX = e.pageX; $lastPosY = e.pageY; $('#tracker').css('transform', 'translate(' + e.pageX + 'px,' + e.pageY + 'px'); if ($firstTrack) { $firstTrack = !1; if (current == "index") { $('#actionTrack').addClass('show') } else { setTimeout(function () { $('#simpleTrack').removeClass('no_opacity') }, 500) } } }); if (current != "overview" || (current == "overview" && isMobile)) { setTimeout(function () { }, 1000) }
            $('.activeLayer, .hFacilitiesItem, .hTestimonialItem, #hVideoLayer, .otherItem, .pressButton, [data-disabled]').on('click', manageTrackAction).on('mouseover', manageTrackHover).on('mouseout', manageTrackOut); if (isMobile) {
                $('.galleryContainer .activeLayerContainer').swipe({
                    threshold: 100, swipe: function (event, direction) { if (direction === 'left') { $('.activeLayer.right', $(this)).trigger('click') } else if (direction === 'right') { $('.activeLayer.left', $(this)).trigger('click') } }, swipeStatus: function (event, phase, direction) {
                        if (phase == "cancel" || phase == "end") { scrollLayer.start() }
                        if (phase == "start" || phase == "move") { if (direction === 'left' || direction === 'right') { scrollLayer.stop() } }
                    }
                })
            }
            $('#bookNow').on('click', function () { openOverlay($('#bookOverlay')) })
            $('.credits').on('click', function () { openOverlay($('#creditsOverlay')) })
            $('.thanks').on('click', function () { openOverlay($('#thanksOverlay')) })
            $('.overlayClose').on('click', function () { closeOverlay($(this).parent()) })
            $('#reserveTable').on('click', function () { openOverlay($('#tableOverlay')) })
            $('.no_default').on('click', function (e) { e.preventDefault() })
            $('.textIndexItem').on('click', function () { scrollLayer.scrollTo($(this).attr('data-href'), { duration: 200 + (200 * $(this).index()) }) })
        });
        $(window).on('resize', function () {
            windowWidth = $(window).width(); windowHeight = $(window).height(); isMobile = (windowWidth <= 960); if (isTouchEnabled) {
                $('body, #hImgContainer, #hImgLayer, #hFacilitiesSticky, nav, #hElementsLayer, .overlay, section.galleryContainer, #footerSticky').height(windowHeight); $('.fullPicture, .fullPicture > div:first-child, #footerTarget, footer').height(windowHeight * 2); $('.fullPicture > div:eq(1)').height(windowHeight); $('#hTarget').css('top', windowHeight); if (isMobile) { $('#footerMain').height(windowHeight) }
                offsetPos = 200; jQuery('#hVideoLayer video').css('clip-path', 'inset(' + (windowHeight / 2 - offsetPos / 2) + 'px ' + (windowWidth / 2 - offsetPos / 2) + 'px round 25px)'); jQuery('#hVideoLayer video').css('-webkit-clip-path', 'inset(' + (windowHeight / 2 - offsetPos / 2) + 'px ' + (windowWidth / 2 - offsetPos / 2) + 'px round 25px)')
            }
            if (isMobile) { $('.hFacilitiesBackground, #hFacilitiesTop ').attr('data-scroll-offset', '0,' + windowHeight) }
            if (current != "overview") { commonOffsets() } else { setTimeout(function () { if (!isMobile && scrollOverview.scroll.instance.scroll.x > windowWidth / 1.5) { scrollOverview.scrollTo('right') } }, 1) }
        })
        function toggleVideoAudio() { if (jQuery('#hImg')[0].muted) { jQuery('#hImg')[0].muted = !1; $('.oAudio .audioLine').hide() } else { jQuery('#hImg')[0].muted = !0; $('.oAudio .audioLine').show() } }
        function manageTrackHover(e) {
            if ($(e.currentTarget).attr('data-icon') == "textArrow") {
                $('#simpleTrack').addClass('no_opacity'); $('#navigationTrack .oLabel').text($(this).attr('data-text'))
                $('#navigationTrack').removeClass().addClass('top_ultralow').addClass('has_transition_1500').addClass('oButton').addClass($(this).attr('data-theme')).addClass('show').addClass('open')
            }
            if ($(e.currentTarget).attr('data-icon') == "arrow") { $('#simpleTrack').addClass('no_opacity'); $('#actionTrack').addClass('show').addClass($(this).attr('data-theme')); $('#actionTrack .oAudio').hide(); $('#actionTrack .oArrow').show() }
            if ($(e.currentTarget).attr('data-icon') == "audio") { $('#simpleTrack').addClass('no_opacity'); $('#actionTrack').addClass('show').addClass($(this).attr('data-theme')); $('#actionTrack .oAudio').show(); $('#actionTrack .oArrow').hide() }
            if ($(e.currentTarget).attr('data-disabled')) { $('#simpleTrack').addClass('no_opacity') }
            $(e.currentTarget).addClass('target')
        }
        function manageTrackOut(e) { $('#simpleTrack').removeClass('no_opacity'); $('#navigationTrack').removeClass('show').removeClass('open'); $('.target').removeClass('target'); $('#actionTrack').removeClass('show').removeClass('dark') }
        function manageTrackAction(e) { $target = $(e.currentTarget); $action = $target.attr('data-action'); $direction = $target.attr('data-direction'); switch ($action) { case 'navigation': urlManager($(this).attr('data-href')); break; case 'runSlider': manageSlider($target.parent().parent(), $direction); break; case 'managePress': managePress($target); break } }
        function openOverlay($overlay) { if (!$overlay.hasClass('active')) { $overlay.addClass('active'); setTimeout(function () { $('.mainBackground', $overlay).removeClass('hidden'); $overlay.addClass('show') }, 1); if ($overlay.attr('id') == "bookOverlay") { setTimeout(function () { $('.oButton', $overlay).addClass('open') }, 960) } } }
        function closeOverlay($overlay) {
            $('.overlayClose circle', $overlay).removeClass('has_transition_1000_inout').addClass('has_transition_1000'); $overlay.removeClass('show'); if ($overlay.attr('id') == "bookOverlay") { $('.oButton', $overlay).removeClass('open') }
            setTimeout(function () { $overlay.addClass('hidden') }, 500)
            setTimeout(function () { $('.mainBackground', $overlay).addClass('hidden'); $overlay.removeClass('active').removeClass('hidden'); $('.overlayClose circle', $overlay).addClass('has_transition_1000_inout').removeClass('has_transition_1000') }, 1000)
        }
        function commonOffsets() {
            if (!isMobile) { $('#otherTarget').height($('#otherItems').height() * 2 - (windowHeight - $('.otherItem:first').height() - 25) + ($('#otherFixed .blockTitle').height() + ($('.otherItem').height() - $('.otherItemPic').height()))).css('top', -(windowHeight - $('.otherItem:first').height() - 25)); $('#hTestimonialTarget').height($('#hTestimonialScroll').height() * 2 - windowWidth / 100 * 15 - $('.hTestimonialItem:first').height()).css('top', windowWidth / 100 * 15) }
            if ($('#hFacilitiesSticky').innerHeight() > windowHeight) { $('#hFacilitiesTarget').css('top', $('#hFacilitiesSticky').innerHeight() - windowHeight) } else { }
            scrollLayer.update()
        }
        function urlManager(href) {
            $url = href; $('body').addClass('has_transition_1500').addClass('exiting'); if ($('nav').hasClass('active')) { manageNav() }
            setTimeout(function () { window.location.href = $url }, 350)
        }
        function imgGlobalLoad() {
            if ($('img:eq(' + $imgGlobalID + ')')[0].hasAttribute("data-src")) {
                $('img:eq(' + $imgGlobalID + ')').attr('src', $('img:eq(' + $imgGlobalID + ')').attr('data-src')).removeAttr('data-src'); $('img:eq(' + $imgGlobalID + ')').imagesLoaded(function (success) {
                    if ($('img:eq(' + $imgGlobalID + ')').attr('data-update') == 'true') { scrollLayer.update() }
                    if ($('img:eq(' + ($imgGlobalID + 1) + ')').length > 0) { $imgGlobalID++; imgGlobalLoad() }
                })
            } else { if ($('img:eq(' + ($imgGlobalID + 1) + ')').length > 0) { $imgGlobalID++; imgGlobalLoad() } }
        }
        function manageNav() {
            if (!$('nav').hasClass('active')) {
                $('nav').addClass('active'); $('#navVideo video')[0].play(); $('#navLogo .logoLine').removeClass('exit'); $('#mainMenuController').removeClass('show'); setTimeout(function () {
                    $('#navBackground').removeClass('hidden'); $('#navVideo').removeClass('no_opacity'); $('#hLogo').removeClass('show'); $('#navLogo, #navSideItems, #navBottom .socials').addClass('show')
                    $('.navSection').removeClass('show'); $('#mainLogo, .headerButton, .langsContainer').addClass('menuForced'); $('header  .langsContainer').addClass('shifted')
                    if (isMobile) { $('nav .langsContainer').addClass('show') }
                }, 1)
                setTimeout(function () {
                    $('#menuClose').addClass('show'); scrollMenu.update(); if ($('.navItem.active').length != 0) {
                        $target = $('.navItem.active').parent(); $('.navSection').removeClass('show'); scrollMenu.scrollTo($target[0], { duration: 1, disableLerp: !0, offset: -(parseInt($('#navTop').css('padding-top')) + (isMobile ? 55 : 70) + parseInt($target.css('margin-top')) + parseInt($target.prev().height())) })
                        scrollMenu.update()
                    }
                }, 500);
            } else {
                if ($('nav').hasClass('active')) { $('nav .overlayClose').removeClass('hover') }
                $('.navSection').removeClass('show'); $('#navLogo .logoLine').addClass('exit'); $('#navLogo, #navSideItems, #navBottom .socials').removeClass('show'); $('#mainLogo, .headerButton, .langsContainer').removeClass('menuForced'); $('#menuClose').removeClass('show'); if (isMobile) { $('nav .langsContainer').removeClass('show') }
                setTimeout(function () { $('nav').addClass('hidden'); $('#mainMenuController').addClass('show'); $('header .langsContainer').removeClass('shifted') }, 500)
                setTimeout(function () { $('#navVideo').addClass('no_opacity'); $('#hLogo').addClass('show'); $('#navBackground').addClass('hidden'); $('nav').removeClass('active').removeClass('hidden') }, 1000)
            }
        }
        function manageSlider($scope, $direction) {
            var $sliderCount = $('.gallery .slideContainer', $scope).length; var $sliderActive = $('.gallery  .slideContainer.active', $scope).index(); if ($direction == ">") {
                if ($('.gallery .slideContainer.active', $scope).index() < $sliderCount - 1) { $sliderActive = $('.gallery .slideContainer.active', $scope).index() + 1 } else { $sliderActive = 0 }
                runSlider($scope, $sliderActive, $sliderCount, $direction)
            }
            if ($direction == "<") {
                if ($('.gallery .slideContainer.active', $scope).index() == 0) { $sliderActive = $sliderCount - 1 } else { $sliderActive = $('.gallery .slideContainer.active', $scope).index() - 1 }
                runSlider($scope, $sliderActive, $sliderCount, $direction)
            }
        }
        var galleryIndex = 0; function runSlider($scope, $sliderActive, $sliderCount, $direction) {
            galleryIndex++; if ($('.gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope)[0].hasAttribute("gallery-src")) {
                $('.gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).attr('srcset', $('.gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).attr('gallery-srcset')).removeAttr('gallery-srcset').attr('src', $('.gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).attr('gallery-src')).removeAttr('gallery-src'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).attr('srcset', $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).attr('gallery-srcset')).removeAttr('gallery-srcset').attr('src', $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).attr('gallery-src')).removeAttr('gallery-src'); $('.loading').removeClass('no_opacity').show(); $('.gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).imagesLoaded(function () {
                    $('.loading').addClass('no_opacity'); setTimeout(function () { $('.loading', $scope).hide() }, 800)
                    $('.gallery .slideContainer', $scope).removeClass('active'); $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide, .gallery .slideContainer:eq(' + ($sliderActive) + ') .t_container, .gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).addClass('no_transition'); $('.gallery .slideContainer:eq(' + ($sliderActive) + ')', $scope).css('z-index', galleryIndex).removeClass('show').addClass('active'); $('.previewContainer .slideContainer', $scope).removeClass('active'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') .t_container, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).addClass('no_transition'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ')', $scope).css('z-index', galleryIndex).removeClass('show').addClass('active'); if ($direction == '>') { $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_left').addClass('mask_right'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_bottom').addClass('mask_top') }
                    if ($direction == '<') { $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_right').addClass('mask_left'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_top').addClass('mask_bottom') }
                    setTimeout(function () { $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide, .gallery .slideContainer:eq(' + ($sliderActive) + ') .t_container, .gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).removeClass('no_transition'); $('.gallery .slideContainer:eq(' + ($sliderActive) + ')', $scope).addClass('show'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') .t_container, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).removeClass('no_transition'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ')', $scope).addClass('show') }, 15); if ($('.sliderCounter', $scope)) { $('.sliderCounter .current', $scope).text(($sliderActive < 9 ? '0' : '') + ($sliderActive + 1)) }
                    if ($('.previewTitle.caption', $scope)) { $('.previewTitle.caption', $scope).text($('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide img', $scope).attr('data-caption')) }
                })
            } else {
                $('.gallery .slideContainer', $scope).removeClass('active'); $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide, .gallery .slideContainer:eq(' + ($sliderActive) + ') .t_container, .gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).addClass('no_transition'); $('.gallery .slideContainer:eq(' + ($sliderActive) + ')', $scope).css('z-index', galleryIndex).removeClass('show').addClass('active'); $('.previewContainer .slideContainer', $scope).removeClass('active'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') .t_container, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).addClass('no_transition'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ')', $scope).css('z-index', galleryIndex).removeClass('show').addClass('active'); if ($direction == '>') { $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_left').addClass('mask_right'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_bottom').addClass('mask_top') }
                if ($direction == '<') { $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_right').addClass('mask_left'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide', $scope).removeClass('mask_top').addClass('mask_bottom') }
                setTimeout(function () { $('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide, .gallery .slideContainer:eq(' + ($sliderActive) + ') .t_container, .gallery .slideContainer:eq(' + ($sliderActive) + ') img', $scope).removeClass('no_transition'); $('.gallery .slideContainer:eq(' + ($sliderActive) + ')', $scope).addClass('show'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ') .slide, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') .t_container, .previewContainer .slideContainer:eq(' + ($sliderActive) + ') img', $scope).removeClass('no_transition'); $('.previewContainer .slideContainer:eq(' + ($sliderActive) + ')', $scope).addClass('show') }, 15); if ($('.sliderCounter', $scope)) { $('.sliderCounter .current', $scope).text(($sliderActive < 9 ? '0' : '') + ($sliderActive + 1)) }
                if ($('.previewTitle.caption', $scope)) { $('.previewTitle.caption', $scope).text($('.gallery .slideContainer:eq(' + ($sliderActive) + ') .slide img', $scope).attr('data-caption')) }
            }
        }
        var $experienceWidgetZIndex = 0; function manageExperienceWidget($scope, $direction, $newIndex) {
            if (!isMobile) {
                $('#hExperiencesPics .hExperiencePic', $scope).removeClass('active'); if ($direction == '>') { $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ') > div').removeClass('mask_top').addClass('mask_bottom') }
                if ($direction == '<') { $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ') > div').removeClass('mask_bottom').addClass('mask_top') }
                $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ') .has_transition_2000', $scope).addClass('no_transition'); $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ')', $scope).addClass('active'); $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ')', $scope).removeClass('show').css('z-index', $experienceWidgetZIndex++); setTimeout(function () { $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ') .has_transition_2000', $scope).removeClass('no_transition'); $('#hExperiencesPics .hExperiencePic:eq(' + $newIndex + ')', $scope).addClass('show') }, 10)
            } else {
                $('.hExperiencePic', $scope).removeClass('active').removeClass('show'); if ($direction == '>') { $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic > div').removeClass('mask_top').addClass('mask_bottom') }
                if ($direction == '<') { $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic > div').removeClass('mask_bottom').addClass('mask_top') }
                $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic .has_transition_2000', $scope).addClass('no_transition'); $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic', $scope).addClass('active'); $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic', $scope).removeClass('show').css('z-index', $experienceWidgetZIndex++); setTimeout(function () { $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic .has_transition_2000', $scope).removeClass('no_transition'); $('.hExperienceBlock:eq(' + $newIndex + ') .hExperiencePic', $scope).addClass('show') }, 250)
            }
            setTimeout(function () { scrollLayer.update() }, 500)
        }
        var $overviewWidgetZIndex = 2; function manageOverview($scope, $direction) {
            $currentIndex = $oldIndex = $('.itemPic.active', $scope).index(); $totalElements = $('.itemPic', $scope).length; $('.overviewSnippet, .detailSubtitle, .detailTitle', $scope).removeClass('show'); $('.itemPic', $scope).removeClass('active'); if ($direction == '>') {
                if ($currentIndex < $totalElements - 1) { $currentIndex++ } else { $currentIndex = 0 }
                $('.itemPic:eq(' + $currentIndex + ') > div').removeClass('mask_left').addClass('mask_right')
            }
            if ($direction == '<') {
                if ($currentIndex > 0) { $currentIndex-- } else { $currentIndex = $totalElements - 1 }
                $('.itemPic:eq(' + $currentIndex + ') > div').removeClass('mask_right').addClass('mask_left')
            }
            $('.itemPic:eq(' + $currentIndex + ') .has_transition_2000', $scope).addClass('no_transition'); $('.itemPic:eq(' + $currentIndex + ')', $scope).addClass('active'); $('.itemPic:eq(' + $currentIndex + ')', $scope).removeClass('show').css('z-index', $overviewWidgetZIndex++); $dataView = $('.itemPic:eq(' + $currentIndex + ')', $scope).index() + 1; setTimeout(function () { $('.itemPic:eq(' + $currentIndex + ') .has_transition_2000', $scope).removeClass('no_transition'); $('.itemPic:eq(' + $currentIndex + ')', $scope).addClass('show') }, 10); setTimeout(function () { $('.overviewSnippet, .detailTitle, .detailSubtitle', $scope).removeClass('active'); $('.overviewSnippet:eq(' + $currentIndex + '), .detailTitle:eq(' + $currentIndex + '), .detailSubtitle:eq(' + $currentIndex + ')', $scope).removeClass('show'); $('.overviewSnippet:eq(' + $currentIndex + '), .detailTitle:eq(' + $currentIndex + '), .detailSubtitle:eq(' + $currentIndex + ')', $scope).addClass('active'); $('#overviewSnippetContainer').css('height', $('.overviewSnippet.active').height()); $('#overviewItems .activeLayer').attr('data-href', $('.detailTitle.active', $scope).attr('data-href')); $('#overviewMobileView').attr('href', $('.detailTitle.active', $scope).attr('data-href')) }, 400)
            setTimeout(function () { if (!isMobile) { scrollOverview.update() } else { scrollLayer.update() } }, 500)
        }
        function managePress($item) {
            $currentSet = $item.attr('data-set'); $('.pressButton').removeClass('active'); $item.addClass('active'); $('.pressContent').removeClass('has_transition_800').addClass('has_transition_400').addClass('no_opacity'); $pressScrolling = !0; $('#mainLogo, #brownies, .mobile, .email').addClass('hidden'); setTimeout(function () {
                $('.pressContent').hide().removeClass('has_transition_400').addClass('has_transition_800'); $('.pressContent:not(:first)').addClass('tripleMargin'); $('.pressContent *').addClass('no_transition').removeClass('show'); if ($currentSet == "all") { $('.pressContent').show() } else { $('#' + $currentSet).removeClass('tripleMargin').show() }
                if ($scrollPos > scrollLayer.scroll.els.pressTarget.top) { scrollLayer.scrollTo('#pressBody', { duration: 1, disableLerp: !0 }) }
            }, 400)
            setTimeout(function () { $('.pressContent *').removeClass('no_transition'); $('.pressContent').removeClass('no_opacity'); scrollLayer.update() }, 401); setTimeout(function () { $pressScrolling = !1 }, 600)
        }

        function launchIntoFullscreen(element) { if (element.requestFullscreen) { element.requestFullscreen() } else if (element.mozRequestFullScreen) { element.mozRequestFullScreen() } else if (element.webkitRequestFullscreen) { element.webkitRequestFullscreen() } else if (element.msRequestFullscreen) { element.msRequestFullscreen() } }
        function exitFullScreen() { if (document.exitFullscreen) { document.exitFullscreen() } else if (document.msExitFullscreen) { document.msExitFullscreen() } else if (document.mozCancelFullScreen) { document.mozCancelFullScreen() } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() } }
        var clocks_running; function run_clocks() {
            var time1; var time2; var time3; var time4; var time5; var time6; var time7; function updateClock() { time1 = dayjs.tz(new Date(), $('.clock:eq(0)').attr('timezone')), second1 = time1.second() * 6, minute1 = time1.minute() * 6 + second1 / 60, hour1 = ((time1.hour() % 12) / 12) * 360 + 90 + minute1 / 12; $('#hour_1').css("transform", "rotate(" + hour1 + "deg)"); $('#minute_1').css("transform", "rotate(" + minute1 + "deg)"); $('#second_1').css("transform", "rotate(" + second1 + "deg)"); time2 = dayjs.tz(new Date(), $('.clock:eq(1)').attr('timezone')), second2 = time2.second() * 6, minute2 = time2.minute() * 6 + second2 / 60, hour2 = ((time2.hour() % 12) / 12) * 360 + 90 + minute2 / 12; $('#hour_2').css("transform", "rotate(" + hour2 + "deg)"); $('#minute_2').css("transform", "rotate(" + minute2 + "deg)"); $('#second_2').css("transform", "rotate(" + second2 + "deg)"); time3 = dayjs.tz(new Date(), $('.clock:eq(2)').attr('timezone')), second3 = time3.second() * 6, minute3 = time3.minute() * 6 + second3 / 60, hour3 = ((time3.hour() % 12) / 12) * 360 + 90 + minute3 / 12; $('#hour_3').css("transform", "rotate(" + hour3 + "deg)"); $('#minute_3').css("transform", "rotate(" + minute3 + "deg)"); $('#second_3').css("transform", "rotate(" + second3 + "deg)"); time4 = dayjs.tz(new Date(), $('.clock:eq(3)').attr('timezone')), second4 = time4.second() * 6, minute4 = time4.minute() * 6 + second4 / 60, hour4 = ((time4.hour() % 12) / 12) * 360 + 90 + minute4 / 12; $('#hour_4').css("transform", "rotate(" + hour4 + "deg)"); $('#minute_4').css("transform", "rotate(" + minute4 + "deg)"); $('#second_4').css("transform", "rotate(" + second4 + "deg)"); time5 = dayjs.tz(new Date(), $('.clock:eq(4)').attr('timezone')), second5 = time5.second() * 6, minute5 = time5.minute() * 6 + second5 / 60, hour5 = ((time5.hour() % 12) / 12) * 360 + 90 + minute5 / 12; $('#hour_5').css("transform", "rotate(" + hour5 + "deg)"); $('#minute_5').css("transform", "rotate(" + minute5 + "deg)"); $('#second_5').css("transform", "rotate(" + second5 + "deg)"); time6 = dayjs.tz(new Date(), $('.clock:eq(5)').attr('timezone')), second6 = time6.second() * 6, minute6 = time6.minute() * 6 + second6 / 60, hour6 = ((time6.hour() % 12) / 12) * 360 + 90 + minute6 / 12; $('#hour_6').css("transform", "rotate(" + hour6 + "deg)"); $('#minute_6').css("transform", "rotate(" + minute6 + "deg)"); $('#second_6').css("transform", "rotate(" + second6 + "deg)"); time7 = dayjs.tz(new Date(), $('.clock:eq(6)').attr('timezone')), second7 = time7.second() * 6, minute7 = time7.minute() * 6 + second7 / 60, hour7 = ((time7.hour() % 12) / 12) * 360 + 90 + minute7 / 12; $('#hour_7').css("transform", "rotate(" + hour7 + "deg)"); $('#minute_7').css("transform", "rotate(" + minute7 + "deg)"); $('#second_7').css("transform", "rotate(" + second7 + "deg)") }
            function timedUpdate() { updateClock(); clocks_running = setTimeout(timedUpdate, 1000) }
            timedUpdate()
        }
        function set_weather(day, data) {
            if ($(data).find('day:eq(' + day + ') hour').length == 8) { if ($nowHour < 3) { now_node = 0; actual_node = now_node } else { now_node = Math.floor($nowHour / 3); actual_node = now_node } } else { now_node = Math.floor($nowHour / 6); actual_node = now_node + 4; $('.hour_box').each(function (h) { if (h < 4) { $(this).addClass('no_opacity') } }) }
            $('.hour_box:eq(' + actual_node + ')').addClass('active'); day_ico_0 = $(data).find('day:eq(' + day + ') hour[value="00:00"] description').text(); day_ico_1 = $(data).find('day:eq(' + day + ') hour[value="03:00"] description').text(); day_ico_2 = $(data).find('day:eq(' + day + ') hour[value="06:00"] description').text(); day_ico_3 = $(data).find('day:eq(' + day + ') hour[value="09:00"] description').text(); day_ico_4 = $(data).find('day:eq(' + day + ') hour[value="12:00"] description').text(); day_ico_5 = $(data).find('day:eq(' + day + ') hour[value="15:00"] description').text(); day_ico_6 = $(data).find('day:eq(' + day + ') hour[value="18:00"] description').text(); day_ico_7 = $(data).find('day:eq(' + day + ') hour[value="21:00"] description').text(); $('.hour_box').each(function (h) { if ((h == 0 || h == 1 || h == 7) && (window['day_ico_' + h] == 1 || window['day_ico_' + h] == 2 || window['day_ico_' + h] == 3)) { $('.hour_box:eq(' + h + ') .hour_ico img').attr('src', '/wp-content/themes/casangelina/assets/images/weather/n' + window['day_ico_' + h] + '.png') } else { $('.hour_box:eq(' + h + ') .hour_ico img').attr('src', '/wp-content/themes/casangelina/assets/images/weather/' + window['day_ico_' + h] + '.png') } }); $('.hour_box .hour_ico img').imagesLoaded(function () { }); $('#weather .weather_ico .meteo_stats').text(get_day_text(window['day_ico_' + actual_node])); $('#weather .weather_ico .meteo_ico_big img').attr('src', '/wp-content/themes/casangelina/assets/images/weather/' + window['day_ico_' + actual_node] + '.png'); if ((actual_node == 0 || actual_node == 1 || actual_node == 7 && window['day_ico_' + actual_node]) && (window['day_ico_' + actual_node] == 1 || window['day_ico_' + actual_node] == 2 || window['day_ico_' + actual_node] == 3)) { $('#weather .weather_ico .meteo_ico_big img').attr('src', '/wp-content/themes/casangelina/assets/images/weather/n' + window['day_ico_' + actual_node] + '.png') }
            $windDirection = $(data).find('day:eq(' + day + ') hour:eq(' + now_node + ') windir').text(); $('#weather .wind_direction p').text(get_wind_dir($windDirection)); $windSpeed = $(data).find('day:eq(' + day + ') hour:eq(' + now_node + ') windvel').text(); $('#weather .wind_ico .meteo_stats').text(get_wind_speed($windSpeed)); $('#weather .wind_ico img').attr('src', '/wp-content/themes/casangelina/assets/images/weather/wind/' + get_wind_ico($windSpeed) + '.png'); $('#weather .wind_speed p').text($windSpeed + ' m/s'); $temp = Math.round(parseInt($(data).find('day:eq(' + day + ') hour:eq(' + now_node + ') temp').text())); $('.temp_text .temp_num').text($temp)
        }; function set_marine(day, data) {
            $nowDate = new Date(); $nowHour = $nowDate.getHours(); if ($(data).find('day:eq(' + day + ') hour').length == 8) { if ($nowHour < 3) { now_node = 0 } else { now_node = Math.floor($nowHour / 3) } }
            $waveHeight = $(data).find("day:eq(" + day + ") hour:eq(" + now_node + ") waveheight").text(); if ($waveHeight == "") { $waveHeight = 0 }
            $('#weather .wave_height p').text($waveHeight + ' M'); $('#weather .sea_ico .meteo_ico_big img').attr('src', '/wp-content/themes/casangelina/assets/images/weather/sea/' + get_wave_pic($waveHeight) + '.png'); $('#weather .sea_ico .meteo_stats').text(get_wave_height($waveHeight))
        }; function setWeatherData() {
            $.get("https://meteo.casangelina.com/get-weather.php", function (data) {
                weatherData = data; $nowDate = new Date(); $nowHour = $nowDate.getHours(); switch (lang) {
                    case "en": days_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; months = month; break; case "it": days_short = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]; days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]; months = mesi; break; case "fr": days_short = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]; days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; months = mois; break
                    case "de": days_short = ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"]; days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]; months = monate; break
                }
                switch (lang) { case "en": break; case "it": break; case "fr": break; case "de": break }
                $('#date .year').text($nowDate.getFullYear()); if (lang == 'en') { $('#date .day').html('<span class="ext-day">' + days[$nowDate.getDay()] + '</span> <span class="ext-date">' + $nowDate.getDate() + '' + nth($nowDate.getDate()) + ' ' + months[($nowDate.getMonth())] + '</span>') } else { $('#date .day').html('<span class="ext-date">' + $nowDate.getDate() + ' ' + months[($nowDate.getMonth())] + ',</span><span class="ext-day">' + days[$nowDate.getDay()] + '</span>') }
                $day0 = new Date(); $day1 = addDays($day0, 1); $day2 = addDays($day0, 2); $day3 = addDays($day0, 3); $day4 = addDays($day0, 4); $day5 = addDays($day0, 5); $day6 = addDays($day0, 6); $('#days .day_name').each(function (d) { if (d > 0) { $('#days .day_name:eq(' + d + ') p').text(days_short[window['$day' + d].getDay()]) } }); $('#days .day_name').on('click', manage_forecast); set_weather(0, weatherData); $.get("https://meteo.casangelina.com/get-sea.php", function (data) { seaData = data; set_marine(0, seaData) })
            })
        }
        function manage_forecast() {
            $dayIndex = $(this).index(); $('#days .day_name').each(function (d) { if (d > 0) { $('#days .day_name:eq(' + d + ') p').text(days_short[window['$day' + d].getDay()]) } }); $('.day_name').removeClass('active'); $(this).addClass('active'); if ($dayIndex > 0) { $(this).find('p').text(days[window['$day' + $dayIndex].getDay()]) }
            weatherOut(); setTimeout(function () { $('#weather .animating').addClass('no_transition').addClass('top_low').removeClass('no_opacity') }, 480); setTimeout(function () { $('#weather .animating').removeClass('no_transition'); set_weather($dayIndex, weatherData); set_marine($dayIndex, seaData); weatherIn() }, 500)
        }
        function weatherIn() { $('#weather .animating').each(function (w) { setTimeout(function () { $('#weather .animating:eq(' + w + ')').removeClass('top_low') }, 50 * w) }) }
        function weatherOut() { $('#weather .animating').each(function (w) { setTimeout(function () { $('#weather .animating:eq(' + w + ')').addClass('no_opacity') }, 20 * w) }) }
        function get_wind_dir(wind_direction) {
            if (wind_direction >= 0 && wind_direction <= 11.25) { return "N" }
            if (wind_direction >= 11.26 && wind_direction <= 33.75) { return "NNE" }
            if (wind_direction >= 33.76 && wind_direction <= 56.25) { return "NE" }
            if (wind_direction >= 56.26 && wind_direction <= 78.75) { return "ENE" }
            if (wind_direction >= 78.76 && wind_direction <= 101.25) { return "E" }
            if (wind_direction >= 101.26 && wind_direction <= 123.75) { return "ESE" }
            if (wind_direction >= 123.76 && wind_direction <= 146.25) { return "SE" }
            if (wind_direction >= 146.26 && wind_direction <= 169.75) { return "SSE" }
            if (wind_direction >= 169.76 && wind_direction <= 191.25) { return "S" }
            if (wind_direction >= 191.26 && wind_direction <= 213.75) { return "SSW" }
            if (wind_direction >= 213.76 && wind_direction <= 236.25) { return "SW" }
            if (wind_direction >= 236.26 && wind_direction <= 258.75) { return "WSW" }
            if (wind_direction >= 258.76 && wind_direction <= 281.25) { return "W" }
            if (wind_direction >= 281.26 && wind_direction <= 303.75) { return "WNW" }
            if (wind_direction >= 303.76 && wind_direction <= 326.25) { return "NW" }
            if (wind_direction >= 326.26 && wind_direction <= 348.75) { return "NNW" }
            if (wind_direction >= 348.76 && wind_direction <= 360) { return "N" }
        }
        function get_wind_speed(wind_speed) {
            if (wind_speed == 0) { switch (lang) { case "en": return "no wind"; break; case "it": return "assente"; break; case "fr": return "pas de vent"; break; case "de": return "kein wind"; break } }
            if (wind_speed >= .1 && wind_speed < 5) { switch (lang) { case "en": return "weak"; break; case "it": return "debole"; break; case "fr": return "faible"; break; case "de": return "leichter"; break } }
            if (wind_speed >= 5 && wind_speed < 10) { switch (lang) { case "en": return "moderate"; break; case "it": return "debole"; break; case "fr": return "modéré"; break; case "de": return "mäßiger"; break } }
            if (wind_speed >= 10 && wind_speed < 17) { switch (lang) { case "en": return "strong"; break; case "it": return "forte"; break; case "fr": return "fort"; break; case "en": return "starker"; break } }
            if (wind_speed >= 17) { switch (lang) { case "en": return "very strong"; break; case "it": return "molto forte"; break; case "fr": return "trés fort"; break; case "de": return "sehr starker"; break } }
        }
        function get_day_text(day_weather) {
            if (day_weather == 1) { switch (lang) { case "en": return "sunny"; break; case "it": return "sereno"; break; case "fr": return "soleil"; break; case "de": return "sonnig"; break } }
            if (day_weather == 2) { switch (lang) { case "en": return "sunny"; break; case "it": return "sereno"; break; case "fr": return "soleil"; break; case "de": return "sonnig"; break } }
            if (day_weather == 3) { switch (lang) { case "en": return "partly cloudy"; break; case "it": return "poco nuvoloso"; break; case "fr": return "partiellement nuageux"; break; case "de": return "teils bewölkt"; break } }
            if (day_weather == 4) { switch (lang) { case "en": return "partly cloudy"; break; case "it": return "nubi sparse"; break; case "fr": return "nuages ​​épars"; break; case "de": return "bewölkt"; break } }
            if (day_weather == 5) { switch (lang) { case "en": return "rain and sunny intervals"; break; case "it": return "pioggia e schiarite"; break; case "fr": return "pluie"; break; case "de": return "bewölkt mit regen"; break } }
            if (day_weather == 6) { switch (lang) { case "en": return "rain / snow and sunny intervals"; break; case "it": return "pioggia mista a neve e schiarite"; break; case "fr": return "pluie et neige"; break; case "de": return "regen mit schnee"; break } }
            if (day_weather == 7) { switch (lang) { case "en": return "snow and sunny intervals"; break; case "it": return "neve e schiarite"; break; case "fr": return "neige"; break; case "de": return "sonnig mit schnee"; break } }
            if (day_weather == 8) { switch (lang) { case "en": return "very cloudy"; break; case "it": return "coperto"; break; case "fr": return "couvert"; break; case "de": return "bedeckt"; break } }
            if (day_weather == 9) { switch (lang) { case "en": return "weak rain"; break; case "it": return "pioggia debole"; break; case "fr": return "faible pluie"; break; case "de": return "leichtem regen"; break } }
            if (day_weather == 10) { switch (lang) { case "en": return "rainy"; break; case "it": return "pioggia"; break; case "fr": return "pluie"; break; case "de": return "regen"; break } }
            if (day_weather == 11) { switch (lang) { case "en": return "snow"; break; case "it": return "neve"; break; case "fr": return "neige"; break; case "de": return "schnee"; break } }
            if (day_weather == 12) { switch (lang) { case "en": return "rain and snow"; break; case "it": return "pioggia mista a neve"; break; case "fr": return "pluie et neige"; break; case "de": return "regen mit schnee"; break } }
            if (day_weather == 13) { switch (lang) { case "en": return "storm"; break; case "it": return "temporale"; break; case "fr": return "orage"; break; case "de": return "sturm"; break } }
            if (day_weather == 14) { switch (lang) { case "en": return "fog"; break; case "it": return "nebbia"; break; case "fr": return "brouillarde"; break; case "de": return "nebel"; break } }
            if (day_weather == 15) { switch (lang) { case "en": return "fog at dawn"; break; case "it": return "nebbia al mattino"; break; case "fr": return "brouillard le matin"; break; case "de": return "nebel am morgen"; break } }
            if (day_weather == 16) { switch (lang) { case "en": return "storm and sunny intervals"; break; case "it": return "temporale e schiarite"; break; case "fr": return "orage"; break; case "de": return "gewitter und blitz"; break } }
            if (day_weather == 17) { switch (lang) { case "en": return "hailstorm"; break; case "it": return "grandine"; break; case "fr": return "averse de grêle"; break; case "de": return "hagel"; break } }
            if (day_weather == 18) { switch (lang) { case "en": return "weak snow"; break; case "it": return "neve debole"; break; case "fr": return "neige légère"; break; case "de": return "schneeregene"; break } }
        }
        function get_wind_ico(wind_speed) {
            if (wind_speed == 0) { return 1 }
            if (wind_speed >= .1 && wind_speed < 5) { return 2 }
            if (wind_speed >= 5 && wind_speed < 10) { return 3 }
            if (wind_speed >= 10 && wind_speed < 17) { return 4 }
            if (wind_speed >= 17) { return 5 }
        }
        function get_wave_pic(waveHeight) {
            if (waveHeight == 0) { return 1 }
            if (waveHeight > 0 && waveHeight <= .099) { return 2 }
            if (waveHeight >= .1 && waveHeight <= .499) { return 3 }
            if (waveHeight >= .5 && waveHeight <= 1.249) { return 4 }
            if (waveHeight >= 1.25 && waveHeight <= 2.499) { return 5 }
            if (waveHeight >= 2.5 && waveHeight <= 3.999) { return 6 }
            if (waveHeight >= 4 && waveHeight <= 5.999) { return 7 }
            if (waveHeight >= 6 && waveHeight <= 8.999) { return 8 }
            if (waveHeight >= 9 && waveHeight <= 13.999) { return 9 }
            if (waveHeight >= 14) { return 10 }
        }
        function get_wave_height(waveHeight) {
            if (waveHeight == 0) { switch (lang) { case "en": return "calm (glassy)"; break; case "fr": return "calme"; break; case "it": return "calmo"; break; case "de": return "ruhig (glasig)"; break } }
            if (waveHeight > 0 && waveHeight <= .099) { switch (lang) { case "en": return "calm (rippled)"; break; case "fr": return "calme (ridée)"; break; case "it": return "quasi calmo"; break; case "de": return "ruhig (wellig)"; break } }
            if (waveHeight >= .1 && waveHeight <= .499) { switch (lang) { case "en": return "smooth"; break; case "fr": return "belle"; break; case "it": return "poco mosso"; break; case "de": return "smooth"; break } }
            if (waveHeight >= .5 && waveHeight <= 1.249) { switch (lang) { case "en": return "slight"; break; case "fr": return "peu agitée"; break; case "it": return "mosso"; break; case "de": return "slight"; break } }
            if (waveHeight >= 1.25 && waveHeight <= 2.499) { switch (lang) { case "en": return "moderate"; break; case "fr": return "agitée"; break; case "it": return "molto mosso"; break; case "de": return "moderate"; break } }
            if (waveHeight >= 2.5 && waveHeight <= 3.999) { switch (lang) { case "en": return "rough"; break; case "fr": return "forte"; break; case "it": return "agitato"; break; case "de": return "rough"; break } }
            if (waveHeight >= 4 && waveHeight <= 5.999) { switch (lang) { case "en": return "very rough"; break; case "fr": return "trés forte"; break; case "it": return "molto agitato"; break; case "de": return "very rough"; break } }
            if (waveHeight >= 6 && waveHeight <= 8.999) { switch (lang) { case "en": return "high"; break; case "fr": return "grosse"; break; case "it": return "grosso"; break; case "de": return "very rough"; break } }
            if (waveHeight >= 9 && waveHeight <= 13.999) { switch (lang) { case "en": return "very high"; break; case "fr": return "trés grosse"; break; case "it": return "molto grosso"; break; case "de": return "very rough"; break } }
            if (waveHeight >= 14) { switch (lang) { case "en": return "phenomenal"; break; case "fr": return "énorme"; break; case "it": return "tempestoso"; break; case "de": return "phenomenal"; break } }
        }
        function nth(d) { if (d > 3 && d < 21) return 'th'; switch (d % 10) { case 1: return "st"; case 2: return "nd"; case 3: return "rd"; default: return "th" } }
        var mesi = new Array(); mesi[0] = "Gennaio"; mesi[1] = "Febbraio"; mesi[2] = "Marzo"; mesi[3] = "Aprile"; mesi[4] = "Maggio"; mesi[5] = "Giugno"; mesi[6] = "Luglio"; mesi[7] = "Agosto"; mesi[8] = "Settembre"; mesi[9] = "Ottobre"; mesi[10] = "Novembre"; mesi[11] = "Dicembre"; var month = new Array(); month[0] = "January"; month[1] = "February"; month[2] = "March"; month[3] = "April"; month[4] = "May"; month[5] = "June"; month[6] = "July"; month[7] = "August"; month[8] = "September"; month[9] = "October"; month[10] = "November"; month[11] = "December"; var mois = new Array(); mois[0] = "Janvier"; mois[1] = "Février"; mois[2] = "Mars"; mois[3] = "Avril"; mois[4] = "Mai"; mois[5] = "Juin"; mois[6] = "Juillet"; mois[7] = "Août"; mois[8] = "Septembre"; mois[9] = "Octobre"; mois[10] = "Novembre"; mois[11] = "Décembre"; var monate = new Array(); monate[0] = "Januar"; monate[1] = "Februar"; monate[2] = "März"; monate[3] = "April"; monate[4] = "Mai"; monate[5] = "Juni"; monate[6] = "Juli"; monate[7] = "August"; monate[8] = "September"; monate[9] = "Oktober"; monate[10] = "November"; monate[11] = "Dezember"; var giorni = new Array(); giorni[1] = "Lun"; giorni[2] = "Mar"; giorni[3] = "Mer"; giorni[4] = "Gio"; giorni[5] = "Ven"; giorni[6] = "Sab"; giorni[0] = "Dom"; var jours = new Array(); jours[1] = "Lun"; jours[2] = "Mar"; jours[3] = "Mer"; jours[4] = "Jeu"; jours[5] = "Ven"; jours[6] = "Sam"; jours[0] = "Dim"; var tage = new Array(); tage[1] = "Mo"; tage[2] = "Di"; tage[3] = "Mi"; tage[4] = "Do"; tage[5] = "Fr"; tage[6] = "Sa"; tage[0] = "So"; function getMonthNames() { if (lang == "it") { return mesi } else if (lang == "fr") { return mois } if (lang == "de") { return monate } else { return month } }
        function getDowNames() { if (lang == "it") { return giorni } else if (lang == "fr") { return jours } else if (lang == "de") { return tage } else { return null } }
        function getDowOffset() { if (lang == "it") { return 1 } else if (lang == "fr") { return 1 } else if (lang == "de") { return 1 } else { return 0 } }
        function addDays(date, days) { var result = new Date(date); result.setDate(result.getDate() + days); return result }
        function get_locale() { if (lang == "it") { return "it-IT" } else if (lang == "en") { return "en-US" } else if (lang == "fr") { return "fr-FR" } else if (lang == "de") { return "de-DE" } }
        function decorateUrl(urlString) {
            var ga = window[window.GoogleAnalyticsObject]; var tracker; if (ga && typeof ga.getAll === 'function') { tracker = ga.getAll()[0]; urlString = (new window.gaplugins.Linker(tracker)).decorate(urlString) }
            return urlString
        }
    })
})(jQuery); (function (a) { if (typeof define === "function" && define.amd && define.amd.jQuery) { define(["jquery"], a) } else { a(jQuery) } }(function (f) { var p = "left", o = "right", e = "up", x = "down", c = "in", z = "out", m = "none", s = "auto", l = "swipe", t = "pinch", A = "tap", j = "doubletap", b = "longtap", y = "hold", D = "horizontal", u = "vertical", i = "all", r = 10, g = "start", k = "move", h = "end", q = "cancel", a = "ontouchstart" in window, v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled, d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, B = "TouchSwipe"; var n = { fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 200, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, hold: null, triggerOnTouchEnd: !0, triggerOnTouchLeave: !1, allowPageScroll: "auto", fallbackToMouseEvents: !0, excludedElements: "label, button, input, select, textarea, a, .noSwipe" }; f.fn.swipe = function (G) { var F = f(this), E = F.data(B); if (E && typeof G === "string") { if (E[G]) { return E[G].apply(this, Array.prototype.slice.call(arguments, 1)) } else { f.error("Method " + G + " does not exist on jQuery.swipe") } } else { if (!E && (typeof G === "object" || !G)) { return w.apply(this, arguments) } } return F }; f.fn.swipe.defaults = n; f.fn.swipe.phases = { PHASE_START: g, PHASE_MOVE: k, PHASE_END: h, PHASE_CANCEL: q }; f.fn.swipe.directions = { LEFT: p, RIGHT: o, UP: e, DOWN: x, IN: c, OUT: z }; f.fn.swipe.pageScroll = { NONE: m, HORIZONTAL: D, VERTICAL: u, AUTO: s }; f.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: i }; function w(E) { if (E && (E.allowPageScroll === undefined && (E.swipe !== undefined || E.swipeStatus !== undefined))) { E.allowPageScroll = m } if (E.click !== undefined && E.tap === undefined) { E.tap = E.click } if (!E) { E = {} } E = f.extend({}, f.fn.swipe.defaults, E); return this.each(function () { var G = f(this); var F = G.data(B); if (!F) { F = new C(this, E); G.data(B, F) } }) } function C(a4, av) { var az = (a || d || !av.fallbackToMouseEvents), J = az ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown", ay = az ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove", U = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup", S = az ? null : "mouseleave", aD = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel"); var ag = 0, aP = null, ab = 0, a1 = 0, aZ = 0, G = 1, aq = 0, aJ = 0, M = null; var aR = f(a4); var Z = "start"; var W = 0; var aQ = null; var T = 0, a2 = 0, a5 = 0, ad = 0, N = 0; var aW = null, af = null; try { aR.bind(J, aN); aR.bind(aD, a9) } catch (ak) { f.error("events not supported " + J + "," + aD + " on jQuery.swipe") } this.enable = function () { aR.bind(J, aN); aR.bind(aD, a9); return aR }; this.disable = function () { aK(); return aR }; this.destroy = function () { aK(); aR.data(B, null); aR = null }; this.option = function (bc, bb) { if (av[bc] !== undefined) { if (bb === undefined) { return av[bc] } else { av[bc] = bb } } else { f.error("Option " + bc + " does not exist on jQuery.swipe.options") } return null }; function aN(bd) { if (aB()) { return } if (f(bd.target).closest(av.excludedElements, aR).length > 0) { return } var be = bd.originalEvent ? bd.originalEvent : bd; var bc, bb = a ? be.touches[0] : be; Z = g; if (a) { W = be.touches.length } else { bd.preventDefault() } ag = 0; aP = null; aJ = null; ab = 0; a1 = 0; aZ = 0; G = 1; aq = 0; aQ = aj(); M = aa(); R(); if (!a || (W === av.fingers || av.fingers === i) || aX()) { ai(0, bb); T = at(); if (W == 2) { ai(1, be.touches[1]); a1 = aZ = au(aQ[0].start, aQ[1].start) } if (av.swipeStatus || av.pinchStatus) { bc = O(be, Z) } } else { bc = !1 } if (bc === !1) { Z = q; O(be, Z); return bc } else { if (av.hold) { af = setTimeout(f.proxy(function () { aR.trigger("hold", [be.target]); if (av.hold) { bc = av.hold.call(aR, be, be.target) } }, this), av.longTapThreshold) } ao(!0) } return null } function a3(be) { var bh = be.originalEvent ? be.originalEvent : be; if (Z === h || Z === q || am()) { return } var bd, bc = a ? bh.touches[0] : bh; var bf = aH(bc); a2 = at(); if (a) { W = bh.touches.length } if (av.hold) { clearTimeout(af) } Z = k; if (W == 2) { if (a1 == 0) { ai(1, bh.touches[1]); a1 = aZ = au(aQ[0].start, aQ[1].start) } else { aH(bh.touches[1]); aZ = au(aQ[0].end, aQ[1].end); aJ = ar(aQ[0].end, aQ[1].end) } G = a7(a1, aZ); aq = Math.abs(a1 - aZ) } if ((W === av.fingers || av.fingers === i) || !a || aX()) { aP = aL(bf.start, bf.end); al(be, aP); ag = aS(bf.start, bf.end); ab = aM(); aI(aP, ag); if (av.swipeStatus || av.pinchStatus) { bd = O(bh, Z) } if (!av.triggerOnTouchEnd || av.triggerOnTouchLeave) { var bb = !0; if (av.triggerOnTouchLeave) { var bg = aY(this); bb = E(bf.end, bg) } if (!av.triggerOnTouchEnd && bb) { Z = aC(k) } else { if (av.triggerOnTouchLeave && !bb) { Z = aC(h) } } if (Z == q || Z == h) { O(bh, Z) } } } else { Z = q; O(bh, Z) } if (bd === !1) { Z = q; O(bh, Z) } } function L(bb) { var bc = bb.originalEvent; if (a) { if (bc.touches.length > 0) { F(); return !0 } } if (am()) { W = ad } a2 = at(); ab = aM(); if (ba() || !an()) { Z = q; O(bc, Z) } else { if (av.triggerOnTouchEnd || (av.triggerOnTouchEnd == !1 && Z === k)) { bb.preventDefault(); Z = h; O(bc, Z) } else { if (!av.triggerOnTouchEnd && a6()) { Z = h; aF(bc, Z, A) } else { if (Z === k) { Z = q; O(bc, Z) } } } } ao(!1); return null } function a9() { W = 0; a2 = 0; T = 0; a1 = 0; aZ = 0; G = 1; R(); ao(!1) } function K(bb) { var bc = bb.originalEvent; if (av.triggerOnTouchLeave) { Z = aC(h); O(bc, Z) } } function aK() { aR.unbind(J, aN); aR.unbind(aD, a9); aR.unbind(ay, a3); aR.unbind(U, L); if (S) { aR.unbind(S, K) } ao(!1) } function aC(bf) { var be = bf; var bd = aA(); var bc = an(); var bb = ba(); if (!bd || bb) { be = q } else { if (bc && bf == k && (!av.triggerOnTouchEnd || av.triggerOnTouchLeave)) { be = h } else { if (!bc && bf == h && av.triggerOnTouchLeave) { be = q } } } return be } function O(bd, bb) { var bc = undefined; if (I() || V()) { bc = aF(bd, bb, l) } else { if ((P() || aX()) && bc !== !1) { bc = aF(bd, bb, t) } } if (aG() && bc !== !1) { bc = aF(bd, bb, j) } else { if (ap() && bc !== !1) { bc = aF(bd, bb, b) } else { if (ah() && bc !== !1) { bc = aF(bd, bb, A) } } } if (bb === q) { a9(bd) } if (bb === h) { if (a) { if (bd.touches.length == 0) { a9(bd) } } else { a9(bd) } } return bc } function aF(be, bb, bd) { var bc = undefined; if (bd == l) { aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]); if (av.swipeStatus) { bc = av.swipeStatus.call(aR, be, bb, aP || null, ag || 0, ab || 0, W, aQ); if (bc === !1) { return !1 } } if (bb == h && aV()) { aR.trigger("swipe", [aP, ag, ab, W, aQ]); if (av.swipe) { bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ); if (bc === !1) { return !1 } } switch (aP) { case p: aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]); if (av.swipeLeft) { bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ) } break; case o: aR.trigger("swipeRight", [aP, ag, ab, W, aQ]); if (av.swipeRight) { bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ) } break; case e: aR.trigger("swipeUp", [aP, ag, ab, W, aQ]); if (av.swipeUp) { bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ) } break; case x: aR.trigger("swipeDown", [aP, ag, ab, W, aQ]); if (av.swipeDown) { bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ) } break } } } if (bd == t) { aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]); if (av.pinchStatus) { bc = av.pinchStatus.call(aR, be, bb, aJ || null, aq || 0, ab || 0, W, G, aQ); if (bc === !1) { return !1 } } if (bb == h && a8()) { switch (aJ) { case c: aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]); if (av.pinchIn) { bc = av.pinchIn.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ) } break; case z: aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]); if (av.pinchOut) { bc = av.pinchOut.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ) } break } } } if (bd == A) { if (bb === q || bb === h) { clearTimeout(aW); clearTimeout(af); if (Y() && !H()) { N = at(); aW = setTimeout(f.proxy(function () { N = null; aR.trigger("tap", [be.target]); if (av.tap) { bc = av.tap.call(aR, be, be.target) } }, this), av.doubleTapThreshold) } else { N = null; aR.trigger("tap", [be.target]); if (av.tap) { bc = av.tap.call(aR, be, be.target) } } } } else { if (bd == j) { if (bb === q || bb === h) { clearTimeout(aW); N = null; aR.trigger("doubletap", [be.target]); if (av.doubleTap) { bc = av.doubleTap.call(aR, be, be.target) } } } else { if (bd == b) { if (bb === q || bb === h) { clearTimeout(aW); N = null; aR.trigger("longtap", [be.target]); if (av.longTap) { bc = av.longTap.call(aR, be, be.target) } } } } } return bc } function an() { var bb = !0; if (av.threshold !== null) { bb = ag >= av.threshold } return bb } function ba() { var bb = !1; if (av.cancelThreshold !== null && aP !== null) { bb = (aT(aP) - ag) >= av.cancelThreshold } return bb } function ae() { if (av.pinchThreshold !== null) { return aq >= av.pinchThreshold } return !0 } function aA() { var bb; if (av.maxTimeThreshold) { if (ab >= av.maxTimeThreshold) { bb = !1 } else { bb = !0 } } else { bb = !0 } return bb } function al(bb, bc) { if (av.allowPageScroll === m || aX()) { bb.preventDefault() } else { var bd = av.allowPageScroll === s; switch (bc) { case p: if ((av.swipeLeft && bd) || (!bd && av.allowPageScroll != D)) { bb.preventDefault() } break; case o: if ((av.swipeRight && bd) || (!bd && av.allowPageScroll != D)) { bb.preventDefault() } break; case e: if ((av.swipeUp && bd) || (!bd && av.allowPageScroll != u)) { bb.preventDefault() } break; case x: if ((av.swipeDown && bd) || (!bd && av.allowPageScroll != u)) { bb.preventDefault() } break } } } function a8() { var bc = aO(); var bb = X(); var bd = ae(); return bc && bb && bd } function aX() { return !!(av.pinchStatus || av.pinchIn || av.pinchOut) } function P() { return !!(a8() && aX()) } function aV() { var be = aA(); var bg = an(); var bd = aO(); var bb = X(); var bc = ba(); var bf = !bc && bb && bd && bg && be; return bf } function V() { return !!(av.swipe || av.swipeStatus || av.swipeLeft || av.swipeRight || av.swipeUp || av.swipeDown) } function I() { return !!(aV() && V()) } function aO() { return ((W === av.fingers || av.fingers === i) || !a) } function X() { return aQ[0].end.x !== 0 } function a6() { return !!(av.tap) } function Y() { return !!(av.doubleTap) } function aU() { return !!(av.longTap) } function Q() { if (N == null) { return !1 } var bb = at(); return (Y() && ((bb - N) <= av.doubleTapThreshold)) } function H() { return Q() } function ax() { return ((W === 1 || !a) && (isNaN(ag) || ag < av.threshold)) } function a0() { return ((ab > av.longTapThreshold) && (ag < r)) } function ah() { return !!(ax() && a6()) } function aG() { return !!(Q() && Y()) } function ap() { return !!(a0() && aU()) } function F() { a5 = at(); ad = event.touches.length + 1 } function R() { a5 = 0; ad = 0 } function am() { var bb = !1; if (a5) { var bc = at() - a5; if (bc <= av.fingerReleaseThreshold) { bb = !0 } } return bb } function aB() { return !!(aR.data(B + "_intouch") === !0) } function ao(bb) { if (bb === !0) { aR.bind(ay, a3); aR.bind(U, L); if (S) { aR.bind(S, K) } } else { aR.unbind(ay, a3, !1); aR.unbind(U, L, !1); if (S) { aR.unbind(S, K, !1) } } aR.data(B + "_intouch", bb === !0) } function ai(bc, bb) { var bd = bb.identifier !== undefined ? bb.identifier : 0; aQ[bc].identifier = bd; aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX; aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY; return aQ[bc] } function aH(bb) { var bd = bb.identifier !== undefined ? bb.identifier : 0; var bc = ac(bd); bc.end.x = bb.pageX || bb.clientX; bc.end.y = bb.pageY || bb.clientY; return bc } function ac(bc) { for (var bb = 0; bb < aQ.length; bb++) { if (aQ[bb].identifier == bc) { return aQ[bb] } } } function aj() { var bb = []; for (var bc = 0; bc <= 5; bc++) { bb.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 }) } return bb } function aI(bb, bc) { bc = Math.max(bc, aT(bb)); M[bb].distance = bc } function aT(bb) { if (M[bb]) { return M[bb].distance } return undefined } function aa() { var bb = {}; bb[p] = aw(p); bb[o] = aw(o); bb[e] = aw(e); bb[x] = aw(x); return bb } function aw(bb) { return { direction: bb, distance: 0 } } function aM() { return a2 - T } function au(be, bd) { var bc = Math.abs(be.x - bd.x); var bb = Math.abs(be.y - bd.y); return Math.round(Math.sqrt(bc * bc + bb * bb)) } function a7(bb, bc) { var bd = (bc / bb) * 1; return bd.toFixed(2) } function ar() { if (G < 1) { return z } else { return c } } function aS(bc, bb) { return Math.round(Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2))) } function aE(be, bc) { var bb = be.x - bc.x; var bg = bc.y - be.y; var bd = Math.atan2(bg, bb); var bf = Math.round(bd * 180 / Math.PI); if (bf < 0) { bf = 360 - Math.abs(bf) } return bf } function aL(bc, bb) { var bd = aE(bc, bb); if ((bd <= 45) && (bd >= 0)) { return p } else { if ((bd <= 360) && (bd >= 315)) { return p } else { if ((bd >= 135) && (bd <= 225)) { return o } else { if ((bd > 45) && (bd < 135)) { return x } else { return e } } } } } function at() { var bb = new Date(); return bb.getTime() } function aY(bb) { bb = f(bb); var bd = bb.offset(); var bc = { left: bd.left, right: bd.left + bb.outerWidth(), top: bd.top, bottom: bd.top + bb.outerHeight() }; return bc } function E(bb, bc) { return (bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom) } } })); (function ($) {
    $.fn.shorten = function (settings) {
        "use strict"; var config = { showChars: 100, minHideChars: 10, ellipsesText: "...", moreText: "more", lessText: "less", onLess: function () { }, onMore: function () { }, errMsg: null, force: !1 }; if (settings) { $.extend(config, settings) }
        if ($(this).data('jquery.shorten') && !config.force) { return !1 }
        $(this).data('jquery.shorten', !0); $(document).off("click", '.morelink'); $(document).on({
            click: function () {
                var $this = $(this); if ($this.hasClass('less')) { $this.removeClass('less'); $this.html(config.moreText); $this.parent().prev().animate({ 'height': '0' + '%' }, 0, 'linear', function () { $this.parent().prev().prev().show() }).hide(0, function () { config.onLess() }) } else { $this.addClass('less'); $this.html(config.lessText); $this.parent().prev().animate({ 'height': '100' + '%' }, 0, 'linear', function () { $this.parent().prev().prev().hide() }).show(0, function () { config.onMore() }) }
                return !1
            }
        }, '.morelink'); return this.each(function () {
            var $this = $(this); var content = $this.html(); var contentlen = $this.text().length; if (contentlen > config.showChars + config.minHideChars) {
                var c = content.substr(0, config.showChars); if (c.indexOf('<') >= 0) {
                    var inTag = !1; var bag = ''; var countChars = 0; var openTags = []; var tagName = null; for (var i = 0, r = 0; r <= config.showChars; i++) {
                        if (content[i] == '<' && !inTag) { inTag = !0; tagName = content.substring(i + 1, content.indexOf('>', i)); if (tagName[0] == '/') { if (tagName != '/' + openTags[0]) { config.errMsg = 'ERROR en HTML: the top of the stack should be the tag that closes' } else { openTags.shift() } } else { if (tagName.toLowerCase() != 'br') { openTags.unshift(tagName) } } }
                        if (inTag && content[i] == '>') { inTag = !1 }
                        if (inTag) { bag += content.charAt(i) } else {
                            r++; if (countChars <= config.showChars) { bag += content.charAt(i); countChars++ } else {
                                if (openTags.length > 0) {
                                    for (j = 0; j < openTags.length; j++) { bag += '</' + openTags[j] + '>' }
                                    break
                                }
                            }
                        }
                    }
                    c = $('<div/>').html(bag + '<span class="ellip">' + config.ellipsesText + '</span>').html()
                } else { c += config.ellipsesText }
                var html = '<div class="shortcontent">' + c + '</div><div class="allcontent">' + content + '</div><span><a href="javascript://nop/" class="morelink">' + config.moreText + '</a></span>'; $this.html(html); $this.find(".allcontent").hide(); $('.shortcontent p:last', $this).css('margin-bottom', 0)
            }
        })
    }
})(jQuery)




 document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const dropdown = btn.nextElementSibling;
      if (dropdown && dropdown.classList.contains("dropdown-container")) {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
      }
    });
  });