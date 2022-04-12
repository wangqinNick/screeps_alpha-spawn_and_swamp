import { SmartCreep } from "./SmartCreep.mjs";
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from "/game/constants";

export class Healer extends SmartCreep {
    /**
     * Creates a new smart worker creep
     * 
     * @param creep     The worker creep 
     * @param world     The word information
     * @param mySpawn
     */

    constructor(creep, world, leader) {
        super(creep, world);
        this.leader = leader;
    }

    act(){
        this.smartHealSelf();
        this.smartHealOthers();
    }

    follow() {
        this.creep.moveTo(this.leader);
    }

    /**
     * Heal the creep
     */
    smartHealOthers() {
        if (this.leader.hits < this.creep,hitsMax) {
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }

    /**
     * Heal itself
     */
    smartHealSelf() {
        if (this.creep.hits < this.creep.hitsMax) {
            this.creep.heal(this.creep);
        }
    }
}