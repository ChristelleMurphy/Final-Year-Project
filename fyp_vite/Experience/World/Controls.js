import * as THREE from "three"
import Experience from "../Experience.js"
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.floor = this.experience.world.floor.plane;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if (child.type === "RectAreaLight"){
                this.rectLight = child;
                this.rect1Light = child;
                this.rect2Light = child;
                this.rect3Light = child;
                this.rect4Light = child;
                this.rect5Light = child;
            }
        });
        GSAP.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            disableRaf: true
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }
    setSmoothScroll(){
        this.asscrol = this.setupASScroll();

    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop
            "(min-width: 969px)": () => {
            //console.log("fired desktop");
            //resets
            this.room.scale.set(0.8, 0.8, 0.8);
            //First section----------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position,{
                    x: () => {
                        return this.sizes.width * 0.0040;
                    },
                });

             //Second section----------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return this.sizes.width * 0.0040;
                    },
                    y: () => {
                        return 1;
                    }
                },
                //moves and scales at same time 
                "same"
                ).to(this.room.scale,{
                    x: 1.8,
                    y: 1.8,
                    z: 1.8,
                }, 
                "same"
                ).to(
                this.rect1Light,
                {
                    width: 0.5 * 3,
                    height: 0.7 * 3,
                }, 
                "same"
                );
                //Third section----------------------------------
                  this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x: () => {
                        return this.sizes.width * 0.0041;
                    },
                    z: () => {
                        return 7;
                    },
                    y: () => {
                        return -5;
                    },
                }).to(this.floor.position,{
                    y: -5,
                });
                 //Fourth section----------------------------------
                 this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return this.sizes.width * 0.0044;
                    },
                    y: () => {
                        return -13;
                    },
                });
            },

            //mobile
            "(max-width: 968px)": () => {

            //resets
            this.room.scale.set(0.5, 0.5, 0.5);
            this.room.position.set(0, -2, 0);
            this.rectLight.width = 0.5;
            this.rectLight.height = 1;

            
            //First section----------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                });
            //Second section----------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x:2,
                    y:2,
                    z:2,
                });
            //Third section----------------------------------
                  this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    } 
                
                }).to(this.room.position,{
                    x: () => {
                        return -5;
                    },
                    y: () => {
                        return -10;
                    },
                },
                "same"
                ).to(this.floor.position,{
                    y: -8,
                },
                "same"
                );
        //Fourth section----------------------------------
                 this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x: () => {
                        return 1;
                    },
                    y: () => {
                        return -15;
                    },
                })
            },
            "all": ()=> {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper = 
                        section.querySelector(".progress-wrapper");
                    this.progressBar = 
                        section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
                });
            },
              
          }); 
    }



    resize(){
   
    }

    update(){
        
    }
}
