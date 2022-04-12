import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
import { WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';

const DIRECTIONS = [TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT];

export class SmartCreep {
    constructor(creep, world) {
        this.creep = creep;
        this.world = world;
    }

    /**
     * Act
     * @param {}  
     */
    act(){

    }

    /**
     * Follow a target creep.
     * @param {the target creep to follow} leader 
     */
    follow(leader) {
        this.creep.moveTo(leader);
    }
    
    /**
     * Move randomly
     */
    randomMove() {
        let i = Math.floor(Math.random() * 8);
        this.creep.move(DIRECTIONS[i]);
    }
}