export function formatarNumero(valor) {
    return new Intl.NumberFormat('pt-BR').format(valor);
}

export function obterNomeNativo(pais) {
    const nativeName = pais.name.nativeName;
    if (!nativeName) return "";
    const primeiraChave = Object.keys(nativeName)[0];
    return nativeName[primeiraChave]?.common || "";
}

export function obterCapitais(pais) {
    return pais.capital ? pais.capital.join(', ') : "—";
}

export function obterIdiomas(pais) {
    return pais.languages ? Object.values(pais.languages).join(', ') : "—";
}
