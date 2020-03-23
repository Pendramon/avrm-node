const students = require('../models/students');

const getAll = (req, res) => {
	students.getAll()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send(err);
		});
};

const getOne = (req, res) => {
	students.getOne(req.params.id)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send(err);
		});
};

const addOne = (req, res) => {
	students.save(req.body)
		.then(() => {
			res.status(200).send('OK');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};

const updateOne = (req, res) => {
	students.updateOne(req.params.id, req.body)
		.then(() => {
			res.status(200).send('OK');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};

const deleteOne = (req, res) => {
	students.deleteOne(req.params.id)
		.then(() => {
			res.status(200).send('OK');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};

module.exports = {
	getAll,
	getOne,
	addOne,
	updateOne,
	deleteOne
};