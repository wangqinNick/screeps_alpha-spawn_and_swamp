import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
import { RESOURCE_ENERGY, WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';
import { SmartSpawn } from "./SmartSpawn.mjs";
import { World } from "./World.mjs";
import { Worker } from "./Worker.mjs";
import { Ranger } from "./Ranger.mjs";
import { CommandCenter } from './CommandCenter.mjs';

export function loop() {
    // variables
    // 母巢位置
    var mySpawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);
    var enemySpawn = getObjectsByPrototype(StructureSpawn).find(i => !i.my);

    var myCreeps = getObjectsByPrototype(Creep).filter(object => object.my);
    var enemyCreeps = getObjectsByPrototype(Creep).filter(object => !object.my);

    var myWorkers = myCreeps.filter(creep => creep.body.some(i => i.type == WORK));
    var myRangers = myCreeps.filter(creep => creep.body.some(i => i.type == RANGED_ATTACK));

    // 资源
    var containers = getObjectsByPrototype(StructureContainer).filter(container => container.store[RESOURCE_ENERGY] > 0); //TODO: filter out empty containers

    // 我方资源点
    var myContainers = containers.filter(container => getRange(container, mySpawn) < 10);
    // 敌方资源点
    var enemyContainers =  containers.filter(container => getRange(container, enemySpawn) < 10);
    // 后期刷新的，中立资源点
    var neutralContainers = containers.filter(container => (getRange(container, mySpawn) > 10) && (getRange(container, enemySpawn) > 10));

    // Todo: 将传递给World的参数更加具体化
    var world = new World(mySpawn, enemySpawn, myCreeps, enemyCreeps, myContainers, enemyContainers, neutralContainers);

    // 创建智能母巢
    var mySmartSpawn = new SmartSpawn(world);
    var commandCenter = new CommandCenter(world);

    mySmartSpawn.createCreeps();                            // 开始征兵
    
    if (myWorkers) {
        for (var myWorker of myWorkers) {
            var mySmartWorker = new Worker(myWorker, world);
            mySmartWorker.smartTransfer();
        }
    }

    if (myRangers) {
        for (var myRanger of myRangers) {
            var mySmartRanger = new Ranger(myRanger, world);
            if (commandCenter.allowGroupAttack()) {
                // console.log("开始集团攻击...");
                mySmartRanger.attackNearestEnemy();
            }
        }
    }
}