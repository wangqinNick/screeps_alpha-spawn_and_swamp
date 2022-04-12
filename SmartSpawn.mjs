import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
import { MOVE, WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';

const WORKER_BODY = [WORK, MOVE];
export class SmartSpawn {

    /**
     * Creates a new SmartSpawn on the top of the spawn
     * 
     * @param world     The word information
     */

     constructor(world) {
        this.world = world;
        this.spawn = world.mySpawn;
    }

    /**
     * Creates a new Worker creep
     */
    createWorker() {
        this.spawn.spawnCreep(WORKER_BODY).object;
    }

    /**
     * Creates a new Attacker creep
     */
    createAttacker() {

    } 

    /**
     * Creates a new Ranger creep
     */
    createRanger() {

    }
}