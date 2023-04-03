import * as THREE from "three"
import Experience from "../Experience.js"

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        
        this.setModel();
        this.setAnimation();
    }
    
    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if(child.name ==="fish_glass"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.7, 0.7, 0.7);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[78])
        this.cup = this.mixer.clipAction(this.room.animations[35])
        console.log(this.room);
        this.cup.play();
        this.swim.play();
    }

    resize(){
   
    }

    update(){
        this.mixer.update(this.time.delta*0.0009);
    }
}
