import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from "/game/constants";

export class Worker {
    /**
     * Creates a new smart worker creep
     * 
     * @param creep     The worker creep 
     * @param world     The word information
     * @param mySpawn
     */

    constructor(creep, world) {
        this.creep = creep;
        this.world = world;
    }

    /**
     * Harvests the source
     */
    smartTransfer() {
        console.log("准备运输...")
        if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let container = this.creep.findClosestByRange(this.world.myContainers);
            console.log(container);
            if(container){
                console.log("开始运输...")
                if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    console.log("前往采集地点...")
                    this.creep.moveTo(container);
                }
            } else {
                console.log(this.creep.withdraw(container, RESOURCE_ENERGY))
            }
        } else {
            console.log("装载资源已满，准备存储...")
            if(this.creep.transfer(this.world.mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                console.log("基地距离过远，前往基地...")
                this.creep.moveTo(this.world.mySpawn);
            }
        }
    }
} 