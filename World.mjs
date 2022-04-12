export class World {
    /**
     * Creates a world object, with all information
     * 
     * @param mySpawn     My spawn
     * @param enemySpawn Enemy's spawn
     * @param myCreeps    My creeps list.
     * @param enemyCreeps Enemy's creeps list.
     * @param myContainers My containers' list
     * @param enemyContainers Enemy's containers' list
     * @param neutralContainers Neutral containers' list
     */

    constructor(mySpawn, enemySpawn, myCreeps, enemyCreeps, myContainers, enemyContainers, neutralContainers) {
        this.mySpawn = mySpawn;
        this.enemySpawn = enemySpawn;
        this.myCreeps = myCreeps;
        this.enemyCreeps = enemyCreeps;
        this.myContainers = myContainers;
        this.enemyContainers = enemyContainers;
        this.neutralContainers = neutralContainers;
    }
} 