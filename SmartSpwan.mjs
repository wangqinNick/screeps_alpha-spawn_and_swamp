export class SmartSpawn {
    /**
     * Creates a new SmartSpawn on the top of the spawn
     * 
     * @param spawn     My spawn
     * @param myCreeps    My creeps list.
     * @param enemyCreeps Enemy's creeps list.
     * @param resources The resource's list
     */

     constructor (spawn, myCreeps, enemyCreeps, resources) {
        this.spawn = spawn;
        this.myCreeps = myCreeps;
        this.enemyCreeps = enemyCreeps;
        this.resources = resources;
    }

}