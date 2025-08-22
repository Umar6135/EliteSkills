
// LazyLoad config (unchanged)
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
                if (typeof window.jQuery != "undefined" && jQuery.fn.fitVids) {
                    jQuery(element).parent().fitVids();
                }
            }
        }
    }
}];

// MutationObserver for LazyLoad
window.addEventListener('LazyLoad::Initialized', function (e) {
    var lazyLoadInstance = e.detail.instance;
    if (window.MutationObserver) {
        var observer = new MutationObserver(function (mutations) {
            let updateNeeded = mutations.some(mutation => {
                return Array.from(mutation.addedNodes).some(node =>
                    node.tagName === "IMG" || node.tagName === "IFRAME" ||
                    (node.getElementsByClassName && node.getElementsByClassName('rocket-lazyload').length > 0)
                );
            });
            if (updateNeeded) {
                lazyLoadInstance.update();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}, false);

// Touch/Mobile detection
(function () {
    const html = document.documentElement;
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const isMobile = window.innerWidth <= 960;

    if (isTouch) html.classList.add('is-touch');
    if (isMobile) html.classList.add('is-mobile');
})();

// Search filter
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const filter = this.value.toLowerCase();
            document.querySelectorAll(".cards-grid").forEach(card => {
                const title = card.getAttribute("data-title")?.toLowerCase() || "";
                card.style.display = title.includes(filter) ? "flex" : "none";
            });
        });
    }
});

// Main Scroll + GSAP logic
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector("[data-scroll-container]");
    const loco = new LocomotiveScroll({
        el: scroller,
        smooth: true
    });

    // Setup ScrollTrigger proxy once
    ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
            return arguments.length ? loco.scrollTo(value, 0, 0) : loco.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0, left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: scroller.style.transform ? "transform" : "fixed"
    });

    loco.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => loco.update());
    ScrollTrigger.refresh();

    // Animation helper
    function animateIfExists(selector, vars) {
        const targets = gsap.utils.toArray(selector);
        if (targets.length) {
            gsap.from(targets, vars);
        }
    }

    // Banner Animations
    animateIfExists("#subPagesBanner .banner-title span", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#subPagesBanner",
            scroller: scroller,
            start: "top 80%",
        }
    });

    animateIfExists("#subPagesBanner .basketball-img", {
        opacity: 0,
        scale: 0.5,
        rotation: 180,
        duration: 4,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
            trigger: "#subPagesBanner",
            scroller: scroller,
            start: "top 70%",
        }
    });

    animateIfExists("#subPagesBanner .banner-subtitle, #subPagesBanner .banner-para", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#subPagesBanner",
            scroller: scroller,
            start: "top 65%",
        }
    });

    animateIfExists("#fallTrainingBanner .banner-heading, #fallTrainingBanner .bannerSub", {
        y: 40,
        opacity: 0,
        duration: 2,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#fallTrainingBanner",
            scroller: scroller,
            start: "top 65%",
        }
    });

    // Reveal Text by Words
    const programSection = document.querySelector("section.programs[aria-label='Programs list']");
    if (programSection) {
        const texts = programSection.querySelectorAll(".reveal-text");
        texts.forEach((el) => {
            const words = el.innerText.split(" ").map(word => `<span class="word">${word}</span>`).join(" ");
            el.innerHTML = words;

            gsap.fromTo(el.querySelectorAll(".word"), {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: programSection,
                    scroller: scroller,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });
        });
    }

    // Cards animations
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
                scroller: scroller,
                start: "top 78%",
                end: "bottom 40%",
                toggleActions: "play none none reverse",
            }
        });

        cards.forEach(card => {
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
                        scroller: scroller,
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
                    delay: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        scroller: scroller,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });
    }

    // Horizontal Scroll for Facilities
    const hScroller = document.getElementById("hFacilitiesScroller");
    if (hScroller && hScroller.querySelectorAll(".elite-card").length > 2) {
        gsap.to(hScroller, {
            x: () => -(hScroller.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#hFacilitiesSlider",
                scroller: scroller,
                start: "top 80%",
                end: () => "+=" + (hScroller.scrollWidth - window.innerWidth),
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });
    }
});

