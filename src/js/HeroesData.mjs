function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ProductData {
    constructor() {
        this.path = '/public/json/superheroes.json'; // ensure this matches the deployed path
    }

    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }

    async findProductById(id) {
        const superheroes = await this.getData();
        return superheroes.find((item) => item.id == id);
    }
}
