const par_el = document.querySelectorAll(".parallax")
console.log(par_el)
let X = 0,
    Y = 0,
    Z = 0,
    rotate = 0;



function update(){
    par_el.forEach(el=>{
        let speedx  = el.dataset.speex
        let speedy  = el.dataset.speedy
        let speedz = el.dataset.speedz
        let speedrotate = el.dataset.rotate
        let offsetTop = el.dataset.offsetTop
        let Zx = Z - parseFloat(getComputedStyle(el).left)


        let isLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth /2 ? 1 : -1;

        el.style.transform = `translateX(calc(-50% - ${
            X * speedx
        }px)) translateY(calc(-50% + ${
            Y * speedy
        }px)) rotateY(${rotate* speedrotate}deg) perspective(2300px) translateZ(${Zx *isLeft *speedz}px)`;
    });
}
update()


window.addEventListener("mousemove", (e)=>{
    if (timeline.isActive()){return 0;}
    X = e.clientX - window.innerWidth / 2;
    Y = e.clientY - window.innerHeight / 2;
    Z = e.clientX
    rotate = e.clientX / (window.innerWidth / 2) * 20;
    update()
})


let timeline = gsap.timeline();

Array.from(par_el).filter((el)=>!(el.classList.contains("text") || el.classList.contains("planet") || el.classList.contains("bg-space") || el.classList.contains("scene2"))).forEach(el => {
    timeline.from(
        el,
        {
            top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
            duration: 1,
            ease: "power3.in",
        },
        "1"
    );
})
let timeline_arrow = gsap.timeline();

let bgSpace = document.querySelector(".bg-space")
timeline_arrow.from(
    bgSpace,
    {
        top: `${bgSpace.offsetHeight / 2 + bgSpace.dataset.distance}px`,
        duration: 1.13,
        ease: "power3.in",
    },
    "1"

)

timeline_arrow.from(
    ".text h1",
    {delay: 1.3, fontSize: 0, duration: 0.8, ease: "power1.out"},
    "1"

).from(
    ".arrow",
    {delay: 2.5, opacity: 0, duration: 0.5 },
    "1"
)

let arrow1 = document.querySelector(".arrow-1")
let arrow2 = document.querySelector(".arrow-2")
let arrow3 = document.querySelectorAll(".arrow-3")

timeline_arrow.to(
    arrow1,
    {
        opacity: 0,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3,
    },
    "1"
).to(
    arrow2,
    {
        delay:0.3,
        opacity: 0,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3,
    },
    "1"
)
arrow3.forEach(arrow=>{
    timeline_arrow.to(
        arrow,
        {
            delay:0.6,
            opacity: 0,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.3,
        },
        "1"
    )
})


let lights = document.querySelectorAll(".light")

timeline_light = gsap.timeline()


lights.forEach(el=>{
    timeline_light.from(
        el,
        {
            opacity: 0.1,
            duration:1,
            yoyo: true,
            repeat: -1,
            repeatDelay: 2,
        },
        "1",
    )
})



timelineScroll = gsap.timeline()

gsap.registerPlugin(ScrollTrigger) 


timelineScroll.to(".scene-1", {
    scrollTrigger: {
        trigger: ".scene-1",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
    },
    top: 0,
    ease: "none"
});


timelineScroll.to(".scroll-tile", {
    scrollTrigger: {
        trigger: ".scroll-tile",
        start: "70px bottom",
        end: "1px 20px",
        scrub: true,
        // markers: true,
    },
    top: -500,
    ease: "none"
});


timelineScroll.to(".scene-2", {
    scrollTrigger: {
        trigger: ".scene-2",
        start: "-700px bottom",
        end: "top top",
        scrub: true,
        // markers: true,
    },
    top: 0,
    ease: "none"
});