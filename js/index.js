class Juego {
  static ULTIMO_NIVEL = 10
  static COLORS = ['celeste', 'violeta', 'naranja', 'verde']

  constructor({
    botonCeleste, // DOMElement
    botonVioleta, // DOMElement
    botonNaranja, // ...
    botonVerde,
    botonComenzar,
  }) {
    this.elegirColor = this.elegirColor.bind(this)
    this.avanzarNivel = this.avanzarNivel.bind(this)
    this.botonComenzar = botonComenzar
    this.botonesPorColor = {
      celeste: botonCeleste,
      violeta: botonVioleta,
      naranja: botonNaranja,
      verde: botonVerde,
    }
  }

  comenzar() {
    this.nivel = 1
    this.generarSecuencia()
    setTimeout(this.avanzarNivel, 500)
    this.toggleBotonComenzar()
  }

  toggleBotonComenzar() {
    if (this.botonComenzar.classList.contains('hide')) {
      this.botonComenzar.classList.remove('hide')
    } else {
      this.botonComenzar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(Juego.ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  avanzarNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    return Juego.COLORS[numero]
  }

  transformarColorANumero(color) {
    return Juego.COLORS.indexOf(color)
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.botonesPorColor[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.botonesPorColor[color].classList.remove('light')
  }

  agregarEventosClick() {
    Object.values(this.botonesPorColor)
      .forEach(botonColor => botonColor.addEventListener('click', this.elegirColor))
  }

  eliminarEventosClick() {
    Object.values(this.botonesPorColor)
      .forEach(botonColor => botonColor.removeEventListener('click', this.elegirColor))
  }

  elegirColor(event) {
    // manejo click, ilumino el boton
    const nombreColor = event.target.dataset.color
    this.iluminarColor(nombreColor)

    // en base al boton actual
    const numeroColor = this.transformarColorANumero(nombreColor)
    // si es correcto
    if (numeroColor === this.secuencia[this.subnivel]) {
      // avanza
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (Juego.ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.avanzarNivel, 1500)
        }
      }
    } else {
      // si no es correcto
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Simon Says', 'Felicitaciones, ganaste el juego!', 'success')
      .then(() => this.comenzar())
  }

  perdioElJuego() {
    swal('Simon Says', 'Lo lamentamos, perdiste :(', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.comenzar()
      })

  }
}

window.juego1 = new Juego({
  botonCeleste: document.getElementById('botonCeleste1'),
  botonVioleta: document.getElementById('botonVioleta1'),
  botonNaranja: document.getElementById('botonNaranja1'),
  botonVerde: document.getElementById('botonVerde1'),
  botonComenzar: document.getElementById('botonComenzar1'),
})

window.juego2 = new Juego({
  botonCeleste: document.getElementById('botonCeleste2'),
  botonVioleta: document.getElementById('botonVioleta2'),
  botonNaranja: document.getElementById('botonNaranja2'),
  botonVerde: document.getElementById('botonVerde2'),
  botonComenzar: document.getElementById('botonComenzar2'),
})