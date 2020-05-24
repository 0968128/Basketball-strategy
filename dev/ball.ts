class Ball extends HTMLElement {
    // Constanten
    public readonly gravity:number = 0.1
    public readonly friction:number = 0.9

    // Fields
    public x:number = 0
    public y:number = 0
    public speedX:number = 5
    public speedY:number = -3
    public minWidth:number = 0
    public maxWidth:number = 0
    public maxHeight:number = 0
    private behaviour:Behavior
    
    // Constructor
    constructor(minWidth:number, maxWidth:number, behavior:Behavior, type:string = "ball") {
        super()
        console.log("Constructor van ball")

        // Gedragsparameter wordt gelijkgesteld aan het field binnen het balobject
        this.behaviour = behavior

        // Geef basketballen een aparte class zodat je ze een andere image kunt geven
        if(type == "basketball") {
            console.log("type == basketball check")
            this.classList.add("basketball")
        }

        // Zet ballcomponents in de html
        let content = document.getElementsByTagName("content")[0]
        content.appendChild(this)

        // Maximale wijdte bijstellen, zodat de bal niet uit het scherm gaat 
        maxWidth -= this.clientWidth

        // Bal krijgt random x-locatie in het scherm
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth

        // Y-locatie is fixed, want dan weet je zeker dat hij hoog genoeg is om even lekker heen en weer te stuiteren
        this.y = 100

        // Wijdteparameters worden gelijkgesteld aan de fields binnen het balobject
        this.minWidth = minWidth
        this.maxWidth = maxWidth

        // Maximale hoogte bijstellen, zodat de bal niet uit het scherm gaat 
        this.maxHeight = window.innerHeight - this.clientHeight
    }

    public update():void {
        console.log("Ball wordt geüpdatet.")
        this.behaviour.makeUpdate(this)
    }

    public setBehavior(behavior:Behavior) {
        console.log("Gedrag wordt geset.")
        this.behaviour = behavior
    }

    public draw() {
        console.log("Ball wordt getekend.")
        this.style.transform = "translate("+this.x+"px, "+this.y+"px)"
    }
}

window.customElements.define("ball-component", Ball as any)