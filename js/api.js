export async function fetchAllCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=cca3,name,flags,capital,region,subregion,population,languages,area");
    if (!response.ok) {
        throw new Error("Erro ao carregar dados dos países");
    }
    return await response.json();
}

export async function fetchCountryByCode(code) {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,region,subregion,population,languages,area`);
    if (!response.ok) {
        throw new Error("Não foi possível buscar os dados do país.");
    }
    const dados = await response.json();
    return Array.isArray(dados) ? dados[0] : dados;
}
