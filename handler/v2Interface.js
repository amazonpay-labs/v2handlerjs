/**
 * V2 handler class
 */
class V2Interface {
    constructor() {
        this._apis = [];
    }
    
    add(...apiArr) {
        this._apis = apiArr;
    }
    
    get(name) {
        return this._apis.find(api => api._name === name);
    }
}

class V2Api {
    constructor(name, handler) {
        this._name = name;
        this._handler = handler;
    }
    
    call(request, header) {
        return this._handler(request, header);
    }
}

module.exports = {
    V2Interface: V2Interface,
    V2Api: V2Api
}