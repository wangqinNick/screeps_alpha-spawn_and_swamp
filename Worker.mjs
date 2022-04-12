import { SmartCreep } from "./SmartCreep.mjs";
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from "/game/constants";

export class Worker extends SmartCreep {
    /**
     * Creates a new smart worker creep
     * 
     * @param creep     The worker creep 
     * @param world     The word information
     * @param mySpawn
     */

    constructor(creep, world) {
        super(creep, world);
    }

    act(){
        this.smartTransfer();
    }

    /**
     * Harvests the source
     */
    smartTransfer() {
        if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let container = this.creep.findClosestByRange(this.world.myContainers);
            if(container == null){
                container = this.creep.findClosestByRange(this.world.neutralContainers);             // 开始采集Neutral 
            } 
            if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(container);
            }
        } else {
            if(this.creep.transfer(this.world.mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.world.mySpawn);
            }
        }
    }
} 