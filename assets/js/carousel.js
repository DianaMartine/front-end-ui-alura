export class Carousel {
  constructor(anterior, proximo, listaProdutos, navegacao) {
    this.anterior = document.querySelector(anterior);
    this.proximo = document.querySelector(proximo);
    this.listaProdutos = document.querySelector(listaProdutos);
    this.navegacao = document.querySelector(navegacao);

    this.slides = this.getListaSlides();
    this.indicadores = this.getListaIndicadores();
    this.tamanhoSlide = this.getTamanhoSlide();

    console.log(this.slides, this.indicadores, this.tamanhoSlide);

    this.indiceAtual = 0;

    this.anterior.addEventListener("click", this.anteriorSlide.bind(this));

    this.proximo.addEventListener("click", this.proximoSlide.bind(this));

    this.navegacao.addEventListener("click", this.pularParaSlide.bind(this));

    this.preparaSlides();
  }

  getListaSlides() {
    return Array.from(this.listaProdutos.children);
  }

  getListaIndicadores() {
    return Array.from(this.navegacao.children);
  }

  getTamanhoSlide() {
    return this.slides[0].getBoundingClientRect().width;
  }

  getSlideAtual() {
    return this.slides[this.indiceAtual];
  }

  getIndiceAtual() {
    return this.indicadores[this.indiceAtual];
  }

  proximoSlide() {
    let proximo = this.indiceAtual + 1;

    if (proximo > this.slides.length - 1) {
      proximo = 0;
    }
    this.atualizaSlide(proximo);
  }

  anteriorSlide() {
    let anterior = this.indiceAtual - 1;

    if (anterior < 0) {
      anterior = this.slides.length - 1;
    }
    this.atualizaSlide(anterior);
  }

  atualizaSlide(posicao) {
    const indicadorAtual = this.getIndiceAtual();
    this.indiceAtual = posicao;
    const indicadorSelecionado = this.getIndiceAtual();

    this.scrollSlide(this.getSlideAtual());
    this.atualizaIndicador(indicadorAtual, indicadorSelecionado);
  }

  scrollSlide(slide) {
    this.listaProdutos.style.transform = `translateX(-${slide.style.left})`;
  }

  atualizaIndicador(indicadorAtual, indicadorSelecionado) {
    indicadorAtual.classList.remove("carousel__indicador--ativo");
    indicadorSelecionado.classList.add("carousel__indicador--ativo");
  }

  pularParaSlide(evento) {
    if (evento.target === evento.currentTarget) return;
    const indicadorSelecionado = evento.target.getAttribute("data-indicador");
    this.atualizaSlide(parseInt(indicadorSelecionado));
  }

  preparaSlides() {
    this.slides.forEach((slide, index) => {
      slide.style.left = `${this.tamanhoSlide * index}px`;
    });
  }
}
