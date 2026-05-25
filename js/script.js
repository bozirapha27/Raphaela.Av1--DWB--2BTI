let todosOsPaises = [];

async function carregarPaises() {
    const loading = document.getElementById("loading");
    const erro = document.getElementById("erro");
    const searchSection = document.getElementById("searchSection");

    try {
        const resposta = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,languages,area");
        if (!resposta.ok) {
            throw new Error("Erro ao carregar dados dos países");
        }

        const dados = await resposta.json();
        todosOsPaises = dados
            .filter(pais => {
                const nomeComum = pais.name.common?.toLowerCase() || "";
                const nomeOficial = pais.name.official?.toLowerCase() || "";
                return !nomeComum.includes("afghan") && !nomeOficial.includes("afghan");
            })
            .sort((a, b) => a.name.common.localeCompare(b.name.common));

        loading.style.display = "none";
        searchSection.classList.remove("d-none");
        exibirPaises(todosOsPaises);
    } catch (error) {
        console.error(error);
        loading.style.display = "none";
        erro.classList.remove("d-none");
    }
}

function formatarNumero(valor) {
    return new Intl.NumberFormat('pt-BR').format(valor);
}

function obterNomeNativo(pais) {
    const nativeName = pais.name.nativeName;
    if (!nativeName) return "";
    const primeiraChave = Object.keys(nativeName)[0];
    return nativeName[primeiraChave]?.common || "";
}

function obterCapitais(pais) {
    return pais.capital ? pais.capital.join(', ') : "—";
}

function obterIdiomas(pais) {
    return pais.languages ? Object.values(pais.languages).join(', ') : "—";
}

function gerarCartaoPais(pais) {
    const nomeNativo = obterNomeNativo(pais);
    const capital = obterCapitais(pais);
    const idiomas = obterIdiomas(pais);
    const regiao = pais.region || "—";
    const subregiao = pais.subregion || "—";
    const populacao = pais.population ? formatarNumero(pais.population) : "—";
    const area = pais.area ? `${formatarNumero(pais.area)} km²` : "—";
    const flagSrc = pais.flags.svg || pais.flags.png;
    const flagFallback = pais.flags.png || pais.flags.svg;

    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <article class="card country-card h-100 shadow-sm">
                <div class="flag-frame">
                    <img src="${flagSrc}" alt="Bandeira de ${pais.name.common}" title="Bandeira de ${pais.name.common}" loading="lazy"
                        onerror="this.onerror=null; this.src='${flagFallback}';">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${pais.name.common}</h5>
                    <p class="card-text small text-muted mb-3">${pais.name.official}</p>
                    <div class="country-details mb-3">
                        <p><strong>Capital:</strong> ${capital}</p>
                        <p><strong>Região:</strong> ${regiao}</p>
                        <p><strong>Sub-região:</strong> ${subregiao}</p>
                        <p><strong>População:</strong> ${populacao}</p>
                        <p><strong>Área:</strong> ${area}</p>
                        <p><strong>Idiomas:</strong> ${idiomas}</p>
                    </div>
                    <p class="mt-auto mb-0">
                        <span class="badge bg-secondary">${nomeNativo ? `📌 ${nomeNativo}` : "📌 Nome nativo não disponível"}</span>
                    </p>
                </div>
            </article>
        </div>
    `;
}

function exibirPaises(paises) {
    const countriesContainer = document.getElementById("countries");
    const noResults = document.getElementById("noResults");
    countriesContainer.innerHTML = "";

    if (!paises.length) {
        noResults.classList.remove("d-none");
        return;
    }

    noResults.classList.add("d-none");
    countriesContainer.innerHTML = paises.map(gerarCartaoPais).join("");
}

function filtrarPaises(valor) {
    const texto = valor.trim().toLowerCase();
    if (!texto) return todosOsPaises;

    return todosOsPaises.filter(pais => {
        const nomeComum = pais.name.common.toLowerCase();
        const nomeOficial = pais.name.official.toLowerCase();
        const nomeNativo = obterNomeNativo(pais).toLowerCase();
        const capital = obterCapitais(pais).toLowerCase();
        const idiomas = obterIdiomas(pais).toLowerCase();
        return nomeComum.includes(texto) || nomeOficial.includes(texto) || nomeNativo.includes(texto) || capital.includes(texto) || idiomas.includes(texto);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    carregarPaises();
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        exibirPaises(filtrarPaises(searchInput.value));
    });
});




