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
        if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let container = this.creep.findClosestByRange(this.world.myContainers);
            if(container){
                if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(container);
                }
            }
        } else {
            if(this.creep.transfer(this.world.mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.world.mySpawn);
            }
        }
    }
} 