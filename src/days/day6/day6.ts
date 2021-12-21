import { List, Item } from 'linked-list'

export default class Day6 {
    public static calculate(input: number[], days: number) : number {
        const list = new ListOfFish(input);
        for (let i = 0; i < days; i++) {
            list.nextDay();
        }
        return list.size;
    }
}

class ListOfFish {
    private readonly list: List<Fish>;

    constructor(input: number[]) {
        this.list = List.from(input.map(value => new Fish(1, value)));
    }

    get size() : number {
        if (this.list.head === null) {
            throw new Error('List cannot be empty');
        }

        let fish = this.list.head,
            weight = 0;

        do {
            weight += fish.weight;
            fish = fish.next;
        } while (fish !== null);

        return weight;
    }

    public nextDay() : void {
        if (this.list.head === null || this.list.tail === null) {
            throw new Error('List cannot be empty');
        }

        let fish = this.list.head,
            weight = 0;

        do {
            if (fish.nextDay() === FishTimerResult.CreateNewFish) {
                weight += fish.weight;
            }
            fish = fish.next;
        } while (fish !== null);

        this.list.tail.append(new Fish(weight));
    }
}

class Fish extends Item {
    private timer: number;
    private static readonly newFishTimerValue = 8;
    private static readonly resetTimerValue = 6;
    
    constructor(public readonly weight: number, timer?: number) {
        super();
        this.timer = timer ?? Fish.newFishTimerValue;
    }

    public nextDay() : FishTimerResult {
        if (this.timer > 0) {
            this.timer--;
            return FishTimerResult.NoAction;
        } else {
            this.timer = Fish.resetTimerValue;
            return FishTimerResult.CreateNewFish;
        }
    }
}

enum FishTimerResult {
    NoAction,
    CreateNewFish
}