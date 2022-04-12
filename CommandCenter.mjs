/**
 * The command center class.
 * It can access to all world environments.
 * It gives commands to all creeps and buildings.
 */

 import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
 import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
 import { WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';
 import { SmartSpawn } from "./SmartSpawn.mjs";
 import { World } from "./World.mjs";
 import { Worker } from "./Worker.mjs";
 import { Ranger } from "./Ranger.mjs";

const GROUP_ATTACK_SIZE = 5;                   // 集团攻击规模
var AT_WAR = false;                            // 标记是否已经在战争中

export class CommandCenter {
    /**
     * 
     */
    constructor(world) {
        this.world = world;
        this.myCreeps = world.myCreeps;
        this.myWorkers = this.myCreeps.filter(creep => creep.body.some(i => i.type == WORK));
        this.myRangers = this.myCreeps.filter(creep => creep.body.some(i => i.type == RANGED_ATTACK));
    }

    /**
     * Return true if command a group attack, otherwise false.
     */
    allowGroupAttack() {
        if (AT_WAR || this.myRangers.length >= GROUP_ATTACK_SIZE) {
            return true;
        } else {
            return false;
        }
    }
}