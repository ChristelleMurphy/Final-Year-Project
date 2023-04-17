import * as THREE from "three"
import Experience from "../Experience.js"
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    
    setModel(){
        this.actualRoom.position.y = -2;
        this.actualRoom.position.z = 1;
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if(child.name === "fishGlass"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            if(child.name === "star rug.004"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.emissive.set(0x549dd2);
                child.material.opacity = 1;
            }
        });

        //fishtank area light
        const width = 0.5;
        const height = 1;
        const intensity = 2;
        //deer area light
        const width1 = 0.5;
        const height1 = .7;
        const intensity1 = .5;
        //planet area light
        const width2 = 1.5;
        const height2 = 0.5;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity,  width, height );
        const rect1Light = new THREE.RectAreaLight(0xffffff, intensity1,  width1, height1 );
        const rect2Light = new THREE.RectAreaLight(0xffffff, intensity1,  width1, height1 );
        const rect3Light = new THREE.RectAreaLight(0xffffff, intensity1,  width1, height1 );
        const rect4Light = new THREE.RectAreaLight(0xffffff, intensity1,  width1, height1 );
        const rect5Light = new THREE.RectAreaLight(0xffffff, intensity1,  width2, height2 );
        rectLight.position.set( 2.55, 4.9, -2);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 2;
        this.actualRoom.add(rectLight);

        //bottom room area light
        //x, z, y
        rect1Light.position.set( 1.8, 3, 0.5);
        rect1Light.rotation.x = -Math.PI / 2;
        rect1Light.rotation.z = Math.PI / 2;
        this.actualRoom.add(rect1Light);
        //middle room area lights
        rect2Light.position.set( 0.5, 6.05, -0.15);
        rect2Light.rotation.x = -Math.PI / 2;
        rect2Light.rotation.z = -Math.PI / 2;
        this.actualRoom.add(rect2Light);

        rect3Light.position.set( 0.5, 6.05, -1.1);
        rect3Light.rotation.x = -Math.PI / 2;
        rect3Light.rotation.z = -Math.PI / 2;
        this.actualRoom.add(rect3Light);

        rect4Light.position.set( 0.5, 6.05, -1.9);
        rect4Light.rotation.x = -Math.PI / 2;
        rect4Light.rotation.z = -Math.PI / 2;
        this.actualRoom.add(rect4Light);
        //top room frame light
        rect5Light.position.set( -2.25, 9, -0.75);
        rect5Light.rotation.x = -Math.PI / 2;
        rect5Light.rotation.z = Math.PI / 2;

        this.actualRoom.add(rect5Light);

        // const rectLightHelper = new RectAreaLightHelper( rect5Light );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.8, 0.8, 0.8);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[5])
        this.cat = this.mixer.clipAction(this.room.animations[9])
        this.cat2 = this.mixer.clipAction(this.room.animations[10])
        console.log(this.room);
        this.swim.play();
        this.cat.play();
        this.cat2.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e)=>{
            this.rotation = (e.clientX - window.innerWidth / 2) * 2 / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize(){
   
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta*0.0009);
    }
}
