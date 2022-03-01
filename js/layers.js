addLayer("i", {
    name: "invaders", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#9DFC6A",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "invaders", // Name of prestige currency
    baseResource: "progress", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(10)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for invaders", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The Quest Begins",
            description: "Progress is automatically generated once per second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Getting Down to Business",
            description: "Progress gain increases with current invader count.",
            cost: new Decimal(5),    
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Working Overtime",
            description: "Getting Down to Business has its effect doubled.",
            cost: new Decimal(20),   
        },
        14: {
            title: "Join the Cause",
            description: "Progress now increases invader gain.",
            cost: new Decimal(50),    
            effect() {
                return player.points.add(1).pow(0.0125)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    }
})
