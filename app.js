const App = {
    data() {
        return {
            name: '',
            show: false,
            turnRandom: undefined,
            turnFirst: '',
            obsCard: undefined,
            playCard: undefined,
            turn: false,
            deck: [{
                    card: 0,
                    title: 'Рассказчик',
                    description: 'Писатель необычных историй. Из его пера получаются фантастические вещи, которые могут материализоваться. Но на деле никакой угорзы они не несут',
                    attack: 2,
                    heart: 3,
                    price: 1,
                    image: 'public/0.jpg'

                },

                {
                    card: 1,
                    title: 'Садовод',
                    description: 'Любит цветы, все жизнь прожил на ферме из-за чего научился управлять цветами. Сам по себе ничего не представляет, но его помощники могут нанести урон',
                    attack: 3,
                    heart: 1,
                    price: 1,
                    image: 'public/1.jpg'

                },

                {
                    card: 2,
                    title: 'Крепкие узы',
                    description: 'Эта карта не несет почти урона, но имеет большую защиту.',
                    attack: 1,
                    heart: 5,
                    price: 1,
                    image: 'public/2.jpg'

                },
                {
                    card: 3,
                    title: 'Король жезлов',
                    description: 'Король отдаленной страны, что славится своим оружием. С детства тренируется в фехтовании и командвании, знает как поднять боевой дух',
                    attack: 4,
                    heart: 2,
                    price: 1,
                    image: 'public/3.jpg'

                },
                {
                    card: 4,
                    title: 'Странствующий маг',
                    description: 'Скитающийся маг, одной своей атакой может сколыхныть море, но к сожалению дополнительными талантами обделен',
                    attack: 3,
                    heart: 3,
                    price: 1,
                    image: 'public/4.jpg'
                },

                {
                    card: 5,
                    title: 'Благославление',
                    description: 'Карта поддержки. Сама по себе слабая, но помогающая остальным картам',
                    attack: 1,
                    heart: 1,
                    price: 1,
                    image: 'public/5.jpg'

                },
                {
                    card: 6,
                    title: 'Приговор',
                    description: 'Судьи, которых не устраивает нынешний расклад дел, будут верно служить своему хозяину и добиваться его победы',
                    attack: 4,
                    heart: 2,
                    price: 2,
                    image: 'public/6.jpg'

                },
                {
                    card: 7,
                    title: 'Великий герой',
                    description: 'Призванный на поле боя герой. Имеет хорошую подготовку',
                    attack: 5,
                    heart: 4,
                    price: 2,
                    image: 'public/7.jpg'
                },
            ],


            player: {
                life: 20,
                handCount: 4,
                cardHand: [],
                cardBattle: Array(4).fill(undefined)
            },
            computer: {
                life: 20,
                handCount: 4,
                cardHand: [],
                cardBattle: Array(4).fill(undefined),
                visited: Array(4).fill(false)
            },
        }

    },
    methods: {
        getForms() { //все что происходит при нажатии кнопки начать игру

            let randomCard = undefined
            this.show = true
            while (this.player.handCount > 0) {
                randomCard = Math.floor(Math.random() * 8)
                if (this.deck[randomCard] !== undefined) {
                    this.player.cardHand.push(this.deck[randomCard])
                    this.player.handCount--
                        this.deck[randomCard] = undefined
                }
            }
            for (let i = 0; i < this.deck.length; i++) {
                if (this.deck[i] !== undefined) {
                    this.computer.cardHand.push(this.deck[i])
                    this.computer.handCount--
                }
            }

            if (this.name === '') {
                this.name = "Игрок"
            }

            this.turnRandom = Math.floor(Math.random() * 2) //0-первым ходит компьютер, 1-первым ходит игрок
            if (this.turnRandom === 0) {
                this.turnFirst = 'Компьютер'
                this.turnComputer()


            } else {
                this.turnFirst = this.name
            }
        },

        descriptionCard(index, where) { //проверка карты 
            if (where === 'Hand' && this.player.cardHand[index] !== undefined) {
                this.obsCard = this.player.cardHand[index]
                this.playCard = index
            } else if (where === 'Battle' && this.player.cardBattle[index] !== undefined) {
                this.obsCard = this.player.cardBattle[index]
            } else if (where === 'BattleComp' && this.computer.cardBattle[index] !== undefined) {
                this.obsCard = this.computer.cardBattle[index]
            }

        },
        battle(index) { // заполнение карт поля битвы игрока
            if ((this.player.cardBattle[index] === undefined) && (this.turn !== true)) {
                if (this.player.cardHand[this.playCard].price <= 1) {
                    this.player.cardBattle[index] = this.player.cardHand[this.playCard]
                    this.player.cardHand[this.playCard] = undefined
                }

            }
        },
        turnComputer() {
            let randomHandCard, count = this.computer.cardHand.length,
                j = 0
            while (this.computer.visited.indexOf(false) !== -1) {
                if (this.computer.cardBattle[j] === undefined) {
                    randomHandCard = Math.floor(Math.random() * 4)
                    if ((this.computer.visited[randomHandCard] !== true) && (this.computer.cardHand[randomHandCard].price <= 1)) {
                        this.computer.cardBattle[j] = this.computer.cardHand[randomHandCard]
                        this.computer.cardHand[randomHandCard] = undefined
                        this.computer.visited[randomHandCard] = true
                        j++
                    } else if ((this.computer.visited[randomHandCard] !== true) && (this.computer.cardHand[randomHandCard].price > 1)) {
                        j++
                        this.computer.visited[randomHandCard] = true
                    }
                }

            }
        },


        attackTurnPlayer() {
            for (let j = 0; j < 4; j++) {

                if (this.player.cardBattle[j] !== undefined) {
                    if (this.computer.cardBattle[j] !== undefined) {
                        this.computer.cardBattle[j].heart = this.computer.cardBattle[j].heart - this.player.cardBattle[j].attack
                        if (this.computer.cardBattle[j].heart <= 0) {
                            this.computer.life = this.computer.life + this.computer.cardBattle[j].heart
                            this.computer.cardBattle[j] = undefined
                        }
                    } else if (this.computer.cardBattle[j] === undefined) {
                        this.computer.life = this.computer.life - this.player.cardBattle[j].attack
                    }
                }
            }
        },

        attackTurnComputer() {
            for (let j = 0; j < 4; j++) {

                if (this.computer.cardBattle[j] !== undefined) {
                    if (this.player.cardBattle[j] !== undefined) {
                        this.player.cardBattle[j].heart = this.player.cardBattle[j].heart - this.computer.cardBattle[j].attack
                        if (this.player.cardBattle[j].heart <= 0) {
                            this.player.life = this.player.life + this.player.cardBattle[j].heart
                            this.player.cardBattle[j] = undefined
                        }
                    } else if (this.player.cardBattle[j] === undefined) {
                        this.player.life = this.player.life - this.computer.cardBattle[j].attack
                    }
                }
            }

        },

        endTurn() {
            console.log(this.player)
            if (this.turnRandom === 0) { //ход компьютера
                this.attackTurnComputer()
            } else {
                this.turnComputer()
                    // фаза атаки
                setTimeout(this.attackTurnPlayer, 1000)
            }
            this.turn = true
        }
    }
}
Vue.createApp(App).mount('#app')