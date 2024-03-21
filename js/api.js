const getApi = async(text, l1, l2) => {
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${l1}|${l2}`
    const teste = await fetch(url)
    const user = await teste.json()
}