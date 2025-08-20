/* Images js start */

window.lazyLoadOptions = [{
    elements_selector: "img[data-lazy-src],.rocket-lazyload,iframe[data-lazy-src]",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 3000,
    callback_loaded: function (element) {
        if (element.tagName === "IFRAME" && element.dataset.rocketLazyload === "fitvidscompatible") {
            if (element.classList.contains("lazyloaded")) {
                if (typeof window.jQuery != "undefined") {
                    if (jQuery.fn.fitVids) {
                        jQuery(element).parent().fitVids();
                    }
                }
            }
        }
    }
}, {
    elements_selector: ".rocket-lazyload",
    data_src: "lazy-src",
    data_srcset: "lazy-srcset",
    data_sizes: "lazy-sizes",
    class_loading: "lazyloading",
    class_loaded: "lazyloaded",
    threshold: 3000,
}];

window.addEventListener('LazyLoad::Initialized', function (e) {
    var lazyLoadInstance = e.detail.instance;
    if (window.MutationObserver) {
        var observer = new MutationObserver(function (mutations) {
            var image_count = 0;
            var iframe_count = 0;
            var rocketlazy_count = 0;
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if (typeof mutation.addedNodes[i].getElementsByTagName !== 'function') { continue }
                    if (typeof mutation.addedNodes[i].getElementsByClassName !== 'function') { continue }

                    let images = mutation.addedNodes[i].getElementsByTagName('img');
                    let is_image = mutation.addedNodes[i].tagName === "IMG";
                    let iframes = mutation.addedNodes[i].getElementsByTagName('iframe');
                    let is_iframe = mutation.addedNodes[i].tagName === "IFRAME";
                    let rocket_lazy = mutation.addedNodes[i].getElementsByClassName('rocket-lazyload');

                    image_count += images.length;
                    iframe_count += iframes.length;
                    rocketlazy_count += rocket_lazy.length;

                    if (is_image) { image_count += 1 }
                    if (is_iframe) { iframe_count += 1 }
                }
            });
            if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) {
                lazyLoadInstance.update();
            }
        });
        var b = document.getElementsByTagName("body")[0];
        var config = { childList: true, subtree: true };
        observer.observe(b, config);
    }
}, false);

/* Images js end */


/* */
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};

function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

var scrollLayer;
var current = 'index';
var lang = 'en';
var isMobile = window.innerWidth <= 960;
var isTouchEnabled = is_touch_enabled();

if (isTouchEnabled) {
    window.document.getElementsByTagName('html')[0].classList.add('is-touch');
}

if (isMobile) {
    window.document.getElementsByTagName('html')[0].classList.add('is-mobile');
}
/* */


const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        let cards = document.querySelectorAll(".cards-grid");

        cards.forEach(card => {
            let title = card.getAttribute("data-title")?.toLowerCase() || "";
            card.style.display = title.includes(filter) ? "flex" : "none";
        });
    });

}


/* gsap animation start here */
gsap.registerPlugin(ScrollTrigger);

// Safe GSAP animation helper
function animateIfExists(selector, vars) {
    const targets = gsap.utils.toArray(selector);
    if (targets.length) {
        gsap.from(targets, vars);
    }
}

// Banner Title Stagger

animateIfExists("#subPagesBanner .banner-title span", {
    y: 80,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#subPagesBanner",
        scroller: "[data-scroll-container]",
        start: "top 80%",
    },
});

// Basketball Image
animateIfExists("#subPagesBanner .basketball-img", {
    opacity: 0,
    scale: 0.5,
    rotation: 180,
    duration: 4,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
        trigger: "#subPagesBanner",
        scroller: "[data-scroll-container]",
        start: "top 70%",
    },
});

// Subtitle
animateIfExists("#subPagesBanner .banner-subtitle", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#subPagesBanner",
        scroller: "[data-scroll-container]",
        start: "top 65%",
    },
});

// Banner para
animateIfExists("#subPagesBanner .banner-para", {
    y: 40,
    opacity: 0,
    duration: 2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#subPagesBanner",
        scroller: "[data-scroll-container]",
        start: "top 65%",
    },
});

// Fall Training Banner
animateIfExists("#fallTrainingBanner .banner-heading", {
    y: 40,
    opacity: 0,
    duration: 2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#fallTrainingBanner",
        scroller: "[data-scroll-container]",
        start: "top 65%",
    },
});
animateIfExists("#fallTrainingBanner .bannerSub", {
    y: 40,
    opacity: 0,
    duration: 2.5,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#fallTrainingBanner",
        scroller: "[data-scroll-container]",
        start: "top 65%",
    },
});



// gsap.utils.toArray(".reveal-text").forEach((el) => {
//     gsap.to(el, {
//         backgroundPosition: "0% 0", // slide gradient left → right
//         ease: "none",
//         scrollTrigger: {
//             trigger: el,         // each element triggers its own animation
//             start: "top 80%",    // when top of element hits 80% of viewport
//             end: "top 20%",      // until it reaches 20%
//             scrub: true,         // sync with scroll
//             markers: true,    // uncomment to debug
//         },
//     });
// });

(function () {
    // Locomotive integration
    const scroller = document.querySelector('[data-scroll-container]') || window;
    let loco = null;

    if (window.LocomotiveScroll && scroller !== window) {
        loco = window.locoScroll || new LocomotiveScroll({
            el: scroller,
            smooth: true
        });

        ScrollTrigger.scrollerProxy(scroller, {
            scrollTop(value) {
                return arguments.length
                    ? loco.scrollTo(value, { duration: 0, disableLerp: true })
                    : (loco.scroll && loco.scroll.instance ? loco.scroll.instance.scroll.y : 0);
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: scroller.style.transform ? "transform" : "fixed"
        });

        loco.on("scroll", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => loco.update());
    }

    // Fancy card animation
    const cards = gsap.utils.toArray(".detail-cards .cards-grid");
    if (cards.length) {
        gsap.from(cards, {
            opacity: 0,
            y: 80,
            x: i => (i % 2 === 0 ? -60 : 60),
            rotateY: i => (i % 2 === 0 ? -12 : 12),
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.18,
            scrollTrigger: {
                trigger: ".detail-cards",
                scroller: scroller === window ? undefined : scroller,
                start: "top 78%",
                end: "bottom 40%",
                toggleActions: "play none none reverse",
                once: false
            }
        });

        // Image + text reveal inside each card
        cards.forEach((card) => {
            const img = card.querySelector(".thumbnail img");
            const text = card.querySelector(".card-content");

            if (img) {
                gsap.from(img, {
                    scale: 1.08,
                    y: 25,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        scroller: scroller === window ? undefined : scroller,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
            if (text) {
                gsap.from(text, {
                    y: 20,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: card,
                        scroller: scroller === window ? undefined : scroller,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });
    }

    ScrollTrigger.refresh();
})();

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // init Locomotive
    const scroller = document.querySelector("[data-scroll-container]");
    const loco = new LocomotiveScroll({
        el: scroller,
        smooth: true
    });

    // tell ScrollTrigger to use Locomotive as scroller
    ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
            return arguments.length
                ? loco.scrollTo(value, 0, 0)
                : loco.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0, left: 0, width: window.innerWidth, height: window.innerHeight
            };
        },
        pinType: scroller.style.transform ? "transform" : "fixed"
    });

    loco.on("scroll", ScrollTrigger.update);

    // refresh after Locomotive is ready
    ScrollTrigger.addEventListener("refresh", () => loco.update());
    ScrollTrigger.refresh();

    // helper: split text into words
    function splitWords(el) {
        const words = el.innerText.split(" ");
        el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
        return el.querySelectorAll(".word");
    }

    // target program section
    const programSection = document.querySelector("section.programs[aria-label='Programs list']");
    const texts = programSection.querySelectorAll(".reveal-text");

    texts.forEach((el) => {
        const words = splitWords(el);

        gsap.to(words, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
                trigger: programSection,
                scroller: scroller,
                start: "top 80%",
                end: "bottom 20%",
                scrub: false,
                toggleActions: "play none none reverse",
                // markers: true,
            }
        });
    });
});


// function splitWords(el) {
//     const words = el.innerText.split(" ");
//     el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
//     return el.querySelectorAll(".word");
// }

// document.addEventListener("DOMContentLoaded", () => {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.utils.toArray(".reveal-text").forEach((el) => {
//         const words = splitWords(el);
//         gsap.set(words, { opacity: 0, y: 20 });

//         gsap.to(words, {
//             opacity: 1,
//             y: 0,
//             stagger: 0.05,
//             ease: "power2.out",
//             scrollTrigger: {
//                 trigger: ".programs",
//                 start: "top 20%",
//                 end: "bottom 80%",
//                 toggleActions: "play none none reverse",
//                 markers: true,
//             },
//         });
//     });
// });

/* gsap animation end here */


// /* gsap animation start here */
// gsap.registerPlugin(ScrollTrigger);

// // Banner Title Stagger
// gsap.from("#subPagesBanner .banner-title span", {
//     y: 80,
//     opacity: 0,
//     duration: 1.5,
//     ease: "power4.out",
//     stagger: 0.2,
//     scrollTrigger: {
//         trigger: "#subPagesBanner",
//         scroller: "[data-scroll-container]", // <-- Locomotive container
//         start: "top 80%",
//     },
// });

// // Basketball Image
// gsap.from("#subPagesBanner .basketball-img", {
//     opacity: 0,
//     scale: 0.5,
//     rotation: 180,
//     duration: 4,
//     ease: "elastic.out(1, 0.5)",
//     scrollTrigger: {
//         trigger: "#subPagesBanner",
//         scroller: "[data-scroll-container]",
//         start: "top 70%",
//     },
// });

// // Subtitle
// gsap.from("#subPagesBanner .banner-subtitle", {
//     y: 40,
//     opacity: 0,
//     duration: 1,
//     delay: 0.3,
//     ease: "power3.out",
//     scrollTrigger: {
//         trigger: "#subPagesBanner",
//         scroller: "[data-scroll-container]",
//         start: "top 65%",
//     },
// });

// // Banner para
// gsap.from("#subPagesBanner .banner-para", {
//     y: 40,
//     opacity: 0,
//     duration: 2,
//     delay: 0.3,
//     ease: "power3.out",
//     scrollTrigger: {
//         trigger: "#subPagesBanner",
//         scroller: "[data-scroll-container]",
//         start: "top 65%",
//     },
// });

// gsap.from("#fallTrainingBanner .banner-heading", {
//     y: 40,
//     opacity: 0,
//     duration: 2,
//     delay: 0.3,
//     ease: "power3.out",
//     scrollTrigger: {
//         trigger: "#fallTrainingBanner",
//         scroller: "[data-scroll-container]",
//         start: "top 65%",
//     },
// });

// (function () {
//     // Locomotive integration
//     const scroller = document.querySelector('[data-scroll-container]') || window;
//     let loco = null;

//     if (window.LocomotiveScroll && scroller !== window) {
//         loco = window.locoScroll || new LocomotiveScroll({
//             el: scroller,
//             smooth: true
//         });

//         ScrollTrigger.scrollerProxy(scroller, {
//             scrollTop(value) {
//                 return arguments.length
//                     ? loco.scrollTo(value, { duration: 0, disableLerp: true })
//                     : (loco.scroll && loco.scroll.instance ? loco.scroll.instance.scroll.y : 0);
//             },
//             getBoundingClientRect() {
//                 return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//             },
//             pinType: scroller.style.transform ? "transform" : "fixed"
//         });

//         loco.on("scroll", ScrollTrigger.update);
//         ScrollTrigger.addEventListener("refresh", () => loco.update());
//     }

//     // Fancy card animation
//     const cards = gsap.utils.toArray(".detail-cards .cards-grid");

//     gsap.from(cards, {
//         opacity: 0,
//         y: 80,
//         x: i => (i % 2 === 0 ? -60 : 60),
//         rotateY: i => (i % 2 === 0 ? -12 : 12),
//         duration: 1.1,
//         ease: "power3.out",
//         stagger: 0.18,
//         scrollTrigger: {
//             trigger: ".detail-cards",
//             scroller: scroller === window ? undefined : scroller,
//             start: "top 78%",
//             end: "bottom 40%",
//             toggleActions: "play none none reverse",
//             once: false
//         }
//     });

//     // Image + text reveal inside each card
//     cards.forEach((card) => {
//         const img = card.querySelector(".thumbnail img");
//         const text = card.querySelector(".card-content");

//         if (img) {
//             gsap.from(img, {
//                 scale: 1.08,
//                 y: 25,
//                 opacity: 0,
//                 duration: 0.9,
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: card,
//                     scroller: scroller === window ? undefined : scroller,
//                     start: "top 85%",
//                     toggleActions: "play none none reverse"
//                 }
//             });
//         }
//         if (text) {
//             gsap.from(text, {
//                 y: 20,
//                 opacity: 0,
//                 duration: 0.7,
//                 ease: "power2.out",
//                 delay: 0.1,
//                 scrollTrigger: {
//                     trigger: card,
//                     scroller: scroller === window ? undefined : scroller,
//                     start: "top 85%",
//                     toggleActions: "play none none reverse"
//                 }
//             });
//         }
//     });

//     ScrollTrigger.refresh();
// })();

// /* gsap animation end here */


