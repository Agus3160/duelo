class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name, cost);
        this.power = power;
        this.res = res;
    }

    attack(target) {
        target.res -= this.power;
    }

    summon(){
        console.log( "Summoning " + this.name + "!" );
    }

    showStatus() {
        console.log( this.name + " Power: " + this.power + " Res: " + this.res );
    }
}

class Effect{
    constructor(name, text, cost, raise=false, res=false, amount) {
        this.name = name;
        this.text = text;
        this.cost = cost;
        this.raise = raise;
        this.res = res;
        this.amount = amount;
    }

    //LOGICA DE play(target)
    //Verificar si es aumento
        //Verificar si es res
        //Si no es res, es aumento de power
    //Si no es aumento, es disminucion
        //Verificar si es res
        //Si no es res, es disminucion de power
    play( target ) {
        if( target instanceof Unit ) {
            if( this.raise ) {
                if( this.res ) {
                    target.res += this.amount;
                } else {
                    target.power += this.amount;
                }
            }   
            else{
                
                if( this.res ) {
                    target.res -= this.amount;
                } else {
                    target.power -= this.amount;
                }
            }
            console.log( "Playing " + this.name + " on " + target.name + "!" );
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }

}

//Tarjetas de unidad
//nombre	            costo	poder	Resiliencia
//Ninja Cinturón Rojo	3	    3	    4 
//Ninja Cinturón Negro	4 	    5 	    4
const ninjaCinturonRojo = new Unit( "Ninja Cinturón Rojo", 3, 3, 4 );
const ninjaCinturonNegro = new Unit( "Ninja Cinturón Negro", 4, 5, 4 );

/*
Cartas de efectos
nombre	                        costo	texto	                                    stat	        magnitud
Algoritmo Difícil	            2	    aumentar la resistencia del objetivo en 3	Resiliencia	    +3
Rechazo de promesa no manejado	1	    reducir la resistencia del objetivo en 2	Resiliencia	    -2
Programación en pareja	        3	    aumentar el poder del objetivo en 2	        poder	        +2
*/
const algoritmoDificil = new Effect( "Algoritmo Dificil", 2, 3, true, true, 3 );
const rechazoPromesaNoManejado = new Effect( "Rechazo de promesa no manejado", 1, 2, false, true, 2 );
const programacionEnPareja = new Effect( "Programacion en pareja", 3, 2, true, false, 2 );

/*
Juega el siguiente escenario
turno	acción
1	    El jugador 1 convoca a "Ninja Cinturón Rojo"
1   	El jugador 1 juega "Algoritmo duro" en "Ninja Cinturón Rojo"
2	    El jugador 2 convoca a "Ninja Cinturón Negro"
2	    El jugador 2 juega "Rechazo de promesa no controlada" en "Ninja Cinturón Rojo"
3	    El jugador 1 juega "Programación en pareja" en "Ninja Cinturón Rojo"
3	    El jugador 1 tiene el ataque "Ninja Cinturón Rojo" "Ninja Cinturón Negro"
*/

console.log("\nTURNO 1")

ninjaCinturonRojo.summon();
algoritmoDificil.play( ninjaCinturonRojo );
ninjaCinturonRojo.showStatus();

console.log("\nTURNO 2")

ninjaCinturonNegro.summon();
rechazoPromesaNoManejado.play( ninjaCinturonRojo );
ninjaCinturonRojo.showStatus();

console.log("\nTURNO 3")

programacionEnPareja.play( ninjaCinturonRojo );
ninjaCinturonRojo.attack( ninjaCinturonNegro );
ninjaCinturonRojo.showStatus();
ninjaCinturonNegro.showStatus();
