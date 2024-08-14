module.exports = class Compras {
    #preco
    #qtd
    #dsc
    #nome

    constructor() {
        this.#preco = 0.0
        this.#qtd = 0
        this.#dsc = ""
        this.#nome = ""
    }

    set preco(p) {
        this.#preco = p
    }
    get preco() {
        return this.#preco
    }

    set qtd(q) {
        this.#qtd = q
    }
    get qtd() {
        return this.#qtd
    }

    set dsc(d) {
        this.#dsc = d
    }
    get dsc() {
        return this.#dsc
    }

    set nome(n) {
        this.#nome = n
    }
    get nome() {
        return this.#nome
    }
}