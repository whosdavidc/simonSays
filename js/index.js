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
    this.manejarClickBotonColor = this.manejarClickBotonColor.bind(this)
    this.comenzarNivel = this.comenzarNivel.bind(this)
    this.botonComenzar = botonComenzar
    this.botonesPorColor = {
      celeste: botonCeleste,
      violeta: botonVioleta,
      naranja: botonNaranja,
      verde: botonVerde,
    }
  }

  comenzarJuego() {
    this.nivel = 1
    this.generarSecuenciaEsperada()
    this.agregarEventosClick()
    setTimeout(this.comenzarNivel, 500)
    this.toggleBotonComenzar()
  }

  terminarJuego(ganoElJuego) {
    this.eliminarEventosClick()

    if (ganoElJuego) {
      return this.ganoElJuego()
    } else {
      return this.perdioElJuego()
    }
  }

  avanzarNivel() {
    // avanza
    this.indiceActual++
    if (this.indiceActual === this.nivel) {
      this.nivel++
      if (this.nivel > Juego.ULTIMO_NIVEL) {
        this.terminarJuego(true)
          // .then(this.terminarJuego.bind(this))
          .then(() => this.comenzarJuego())
      } else {
        setTimeout(this.comenzarNivel, 1500)
      }
    }
  }

  comenzarNivel() {
    this.indiceActual = 0
    this.iluminarSecuencia()
  }

  toggleBotonComenzar() {
    if (this.botonComenzar.classList.contains('hide')) {
      this.botonComenzar.classList.remove('hide')
    } else {
      this.botonComenzar.classList.add('hide')
    }
  }

  generarSecuenciaEsperada() {
    this.secuenciaEsperada = new Array(Juego.ULTIMO_NIVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * Juego.COLORS.length))
  }

  transformarIndiceAColor(indice) {
    return Juego.COLORS[indice]
  }

  transformarColorAIndice(color) {
    return Juego.COLORS.indexOf(color)
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarIndiceAColor(this.secuenciaEsperada[i])
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
      .forEach(botonColor => botonColor.addEventListener('click', this.manejarClickBotonColor))
  }

  eliminarEventosClick() {
    Object.values(this.botonesPorColor)
      .forEach(botonColor => botonColor.removeEventListener('click', this.manejarClickBotonColor))
  }

  manejarClickBotonColor(event) {
    // manejo click, ilumino el boton
    const color = event.target.dataset.color
    this.iluminarColor(color)

    // en base al boton actual
    if (this.esBotonColorCorrecto(color)) {
      this.avanzarNivel()
    } else {
      // si no es correcto
      this.terminarElJuego(false)
        .then(() => this.comenzarJuego())
    }
  }

  esBotonColorCorrecto(color) {
    const indiceColor = this.transformarColorAIndice(color)

    return indiceColor === this.secuenciaEsperada[this.indiceActual]
  }


  ganoElJuego() {
    return swal('Simon Says', 'Felicitaciones, ganaste el juego!', 'success')
  }

  perdioElJuego() {
    return swal('Simon Says', 'Lo lamentamos, perdiste :(', 'error')
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