const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        })
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
        .then(workout => {
            res.json(workout);
        }).catch(err => {
            console.log(err);
        })
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log(JSON.stringify(req.params.id));
        console.log(req.body);
        db.Workout.updateOne({ _id: mongojs.ObjectId(req.params.id) }, { $push: { exercises: req.body }})
        .then(exercise => {
            res.json(exercise);
        }).catch(err => {
            console.log(err);
        })
    });
};

