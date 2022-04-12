import { getObjectsByPrototype, findClosestByRange, findClosestByPath, getTicks, getRange, getDirection } from '/game/utils';
import { Creep, StructureSpawn, Source, Resource, StructureTower, StructureContainer } from '/game/prototypes';
import { WORK, ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, TOWER_RANGE, TOP, BOTTOM, LEFT, RIGHT, TOP_RIGHT, TOP_LEFT, BOTTOM_LEFT, BOTTOM_RIGHT, OK } from '/game/constants';
import { SmartCreep } from './SmartCreep.mjs';


export class Ranger extends SmartCreep{
    /**
     * Creates a new smart ranger creep
     * 
     * @param creep     The worker creep 
     * @param world     The word information
     */

    constructor(creep, world) {
        super(creep, world);
    }


    /**
     * 
     */
    act(){
        this.attackNearestEnemyAttacker();
    }

    /**
     * Attack the nearest enemy
     */
    attackNearestEnemyAttacker() {
        var enemyAttackers = this.world.enemyCreeps.filter(creep => creep.body.some(i => i.type == RANGED_ATTACK || i.type == ATTACK))
        var enemy = findClosestByPath(this.creep, enemyAttackers);
        // console.log(enemy);
        if (enemy) {                                        // 当敌人存在时，优先攻击敌人
            this.sneakyAttack(enemy);
        } else {
            console.log("目标为敌方基地");
            this.attackEnemySpawn();                             // 当敌人不存在时，攻击敌方基地
        }
    }

    attackEnemySpawn() {
        if (this.creep.rangedAttack(this.world.enemySpawn) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.world.enemySpawn);
        }
    }

    /**
     * Sneaky attack the enemy to dodge the melee attack
     * @param {*} enemy The enemy
     */
    sneakyAttack(enemy) {
        let distance = getRange(this.creep, enemy);
        if (distance > 3) {                     // 当敌人过远时应该移动
            this.creep.moveTo(enemy);
        } else if(distance > 2) {               // 距离刚好
            this.creep.rangedAttack(enemy);
        } else {                                // 距离过近，开始撤退
            if (this.creep.move(turnDiretion(getDirection(enemy.x - this.creep.x, enemy.y - this.creep.y))) != OK) {
                this.creep.randomMove();        // 随机逃跑
            }
        }
    }
} 

function turnDiretion(direction) {
    switch (direction) {
        case TOP: return BOTTOM;
        case BOTTOM: return TOP;
        case TOP_LEFT: return BOTTOM_RIGHT;
        case BOTTOM_RIGHT: return TOP_LEFT;
        case TOP_RIGHT: return BOTTOM_LEFT;
        case BOTTOM_LEFT: return TOP_RIGHT;
        case LEFT: return RIGHT;
        case RIGHT: return LEFT;
    }
}