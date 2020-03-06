const index = (req, res) => {
    res.send('ok');
};

const pero = (req, res) => {
    res.send('Hi Pero!');
};

const name = (req, res) => {
    res.send(req.params.name);
};

const calc = (req, res) => {
    const operation = req.params.op;
    const a = Number(req.params.a);
    const b = Number(req.params.b);

    let result;

    switch(operation) {
        case "add":
            result = a + b;
            break;
        case "sub":
            result = a - b;
            break;
        case "mul":
            result = a * b;
            break;
        case "div":
            result = a / b;
            break;
        default:
            result = "Non-existant operation.";
            break;
    }

    if (Number.isNaN(a)) {
        res.send("a needs to be a number");
        return;
    }

    if (Number.isNaN(b)) {
        res.send("b needs to be a number");
        return;
    }

    res.send('' + result);
}

const post = (req, res) => {
    let greeting = `Hello ${req.body.name} ${req.body.lastName}`
    res.send(greeting);
}

module.exports = {
    index,
    pero,
    name,
    calc,
    post
};