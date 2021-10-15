const { default: Swal } = require("sweetalert2")

//variable definition
let player = {
    totalClicks: 0,
    totalSpent: 0,
    totalOwned: 0,
    careerTotal: 0,
    Multiplier: 1,
    automaticMultiplyer: 0,
    upgrades: [
        {
            id: 1,
            name: 'upgrade1',
            price: 5,
            desc: 'Increases the number gained by clicking by 1',
            multiplyerIncrement: 1,
            automatic: false,
            qty: 0
        },
        {
            id: 2,
            name: 'upgrade2',
            price: 10,
            desc: 'Increases the number gained by clicking by 2',
            multiplyerIncrement: 2,
            automatic: false,
            qty: 0
        },
        {
            id: 3,
            name: 'upgrade3',
            price: 20,
            desc: 'automatically adds one every second',
            multiplyerIncrement: 1,
            automatic: true,
            qty: 0
        },
        {
            id: 4,
            name: 'upgrade4',
            price: 30,
            desc: 'automatically adds ten every second',
            multiplyerIncrement: 10,
            qty: 0
        }
    ],
    acheivements: [
        {
            title: 'Clicker',
            desc: 'click 20 times',
            condition: player.totalClicks >= 20
        }

    ]
}
let cooldown = false
const cooldownPeriod = 75




let autoInterval
let acheiveInterval

//increment functions
function mine() {
    if (!cooldown) {
        startCooldown()
        player.totalClicks++
        player.totalOwned += 1 * player.Multiplier
        player.careerTotal += 1 * player.Multiplier
        updateTotal()
    }
}
function auto() {
    player.totalOwned += player.automaticMultiplyer
    player.careerTotal += player.automaticMultiplyer
    updateTotal()
}

//update functions
function updateTotal() {
    document.getElementById('mine-total').innerText = player.totalOwned
}
function buyUpgrade(id) {
    let upgrade = findUpgrade(id)
    if (player.totalOwned >= upgrade.price) {
        player.totalSpent += upgrade.price
        player.totalOwned -= upgrade.price
        upgrade.qty++
        updatePrice(id)
        if (upgrade.automatic) {
            player.automaticMultiplyer += upgrade.multiplyerIncrement
            updateAuto()
        } else {
            player.Multiplier += upgrade.multiplyerIncrement
        }
        console.log(player.totalOwned, upgrade)
        updateTotal()
        drawUpgrades()
        drawMultiplyers()
    } else {
        window.alert('You cannot afford this')
    }
}
function updatePrice(id) {
    let upgrade = findUpgrade(id)
    upgrade.price += Math.floor(upgrade.price * .25)
}
function updateAuto() {
    autoInterval = setInterval(auto, 3000)
}


//draw functions
function drawMultiplyers() {
    document.getElementById('click-multi').innerText = player.Multiplier
    document.getElementById('auto-multi').innerText = player.automaticMultiplyer
}
function drawUpgrades() {
    let template = ``
    player.upgrades.forEach(u => {
        template += `
        <button class="btn btn-primary" onclick="buyUpgrade(${u.id})">${u.name} - ${u.qty} - $${u.price} </button>
        `
    })

    document.getElementById('store-menu').innerHTML = template
}
function drawStats() {
    document.getElementById('total-earned').innerText = player.careerTotal
    document.getElementById('total-spent').innerText = player.totalSpent
    document.getElementById('total-clicks').innerText = player.totalClicks
}

//find functions
function findUpgrade(id) {
    return player.upgrades.find(u => u.id === id)
}


//uncatagorized
function startCooldown() {
    cooldown = true
    setTimeout(function () { cooldown = false }, cooldownPeriod)
}

//default function calls
updateAuto()
drawMultiplyers()
Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
})

