import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
import { WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';
import { SmartSpawn } from "./SmartSpawn.mjs";

export function loop() {
    // variables
    // 母巢位置
    var mySpawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);
    var enemySpawn = getObjectsByPrototype(StructureSpawn).find(i => !i.my);

    var myCreeps = getObjectsByPrototype(Creep).filter(object => object.my);
    var enemyCreeps = getObjectsByPrototype(Creep).filter(object => !object.my);

    // var myWorkers = myCreeps.filter(creep => creep.body.some(i => i.type == WORK))
    // console.log(myWorkers);


    // 资源
    var containers = getObjectsByPrototype(StructureContainer);

    // 我方资源点
    var myContainers = containers.filter(container => getRange(container, mySpawn) < 10);
    // 敌方资源点
    var enemyContainers =  containers.filter(container => getRange(container, enemySpawn) < 10);
    // 后期刷新的，中立资源点
    var neutralContainers = containers.filter(container => (getRange(container, mySpawn) > 10) && (getRange(container, enemySpawn) > 10));


    // 创建智能母巢
    var mySmartSpawn = new SmartSpawn(mySpawn, myCreeps, enemyCreeps, containers);
    console.log(mySmartSpawn.spawn)

}


/*
    if(creep.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
        if(creep.harvest(source) == constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    } else {
        if(creep.transfer(spawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }

*/

