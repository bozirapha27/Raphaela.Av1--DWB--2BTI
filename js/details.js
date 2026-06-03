function formatarNumero(valor) {
    return new Intl.NumberFormat('pt-BR').format(valor);
}

async function fetchCountryByCode(code) {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,region,subregion,population,languages,area`);
    if (!response.ok) {
        throw new Error('Não foi possível buscar os dados do país.');
    }
    const dados = await response.json();
    return Array.isArray(dados) ? dados[0] : dados;
}

function obterParametroUrl(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
}

function exibirErro(mensagem) {
    const erro = document.getElementById('erro');
    const carregando = document.getElementById('loading');
    const detalhes = document.getElementById('countryDetails');
    carregando.style.display = 'none';
    detalhes.classList.add('d-none');
    erro.textContent = mensagem;
    erro.classList.remove('d-none');
}

function exibirDetalhes(pais) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('erro').classList.add('d-none');
    document.getElementById('countryDetails').classList.remove('d-none');

    document.getElementById('detailTitle').textContent = pais.name.common;
    document.getElementById('detailSubtitle').textContent = pais.name.official;
    document.getElementById('detailOfficial').textContent = pais.name.official;
    document.getElementById('detailFlag').src = pais.flags.svg || pais.flags.png;
    document.getElementById('detailFlag').alt = `Bandeira de ${pais.name.common}`;

    document.getElementById('detailCapital').textContent = pais.capital ? pais.capital.join(', ') : '—';
    document.getElementById('detailRegion').textContent = pais.region || '—';
    document.getElementById('detailSubregion').textContent = pais.subregion || '—';
    document.getElementById('detailPopulation').textContent = pais.population ? formatarNumero(pais.population) : '—';
    document.getElementById('detailArea').textContent = pais.area ? `${formatarNumero(pais.area)} km²` : '—';
    document.getElementById('detailNative').textContent = pais.name.nativeName ? Object.values(pais.name.nativeName)[0].common : '—';
    document.getElementById('detailLanguages').textContent = pais.languages ? Object.values(pais.languages).join(', ') : '—';
}

async function carregarDetalhesPais() {
    const codigo = obterParametroUrl('code');
    if (!codigo) {
        exibirErro('Código do país não encontrado na URL.');
        return;
    }

    try {
        const pais = await fetchCountryByCode(codigo);
        if (!pais || !pais.name) {
            exibirErro('País não encontrado.');
            return;
        }

        exibirDetalhes(pais);
    } catch (erro) {
        console.error(erro);
        exibirErro('Erro ao carregar os dados do país. Tente novamente.');
    }
}

window.addEventListener('DOMContentLoaded', carregarDetalhesPais);
