import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
import { TOUGH, MOVE, CARRY, WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';

const WORKER_BODY = [WORK, CARRY, CARRY, CARRY, MOVE];
const RANGER_BODY = [TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE];
const WORKER_LIMIT = 3;
const RANGER_LIMIT = 50;
var ALLOW_CREATE_WORKER = false;
var ALLOW_CREATE_RANGER = false;
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

    createCreeps() {
        let myWorkerCount = this.world.myCreeps.filter(creep => creep.body.some(i => i.type == WORK)).length;
        let myRangerCount = this.world.myCreeps.filter(creep => creep.body.some(i => i.type == RANGED_ATTACK)).length;

        if (myWorkerCount < WORKER_LIMIT) {
            this.createWorker();
            return;
        } 

        if (myRangerCount < RANGER_LIMIT) {
            this.createRanger();
            return;
        }

        this.createRanger();
    }

    /**
     * Creates a new Worker creep
     */
    createWorker() {
        for (let i = this.world.myCreeps.filter(creep => creep.body.some(i => i.type == WORK)).length; i < WORKER_LIMIT; i++) {
            this.spawn.spawnCreep(WORKER_BODY).object;
        }
    }

    /**
     * Creates a new Attacker creep
     */
    createAttacker() {
        for (let i = this.world.myCreeps.filter(creep => creep.body.some(i => i.type == ATTACK)).length; i < RANGER_LIMIT; i++) {
            this.spawn.spawnCreep(RANGER_BODY).object;
        }
    } 

    /**
     * Creates a new Ranger creep
     */
    createRanger() {
        for (let i = this.world.myCreeps.filter(creep => creep.body.some(i => i.type == RANGED_ATTACK)).length; i < RANGER_LIMIT; i++) {
            this.spawn.spawnCreep(RANGER_BODY).object;
        }
    }
}