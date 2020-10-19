const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([{
            $project : {
                day: true,
                exercises: true,
                totalDuration: { $sum: "$exercises.duration" }
                
            }
        }])
        .then(dbWorkouts => {
            console.log(dbWorkouts);
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
        db.Workout.updateOne({ _id: mongojs.ObjectId(req.params.id) }, { $push: { exercises: req.body }})
        .then(exercise => {
            res.json(exercise);
        }).catch(err => {
            console.log(err);
        })
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
            { $match: { day: { $gt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) } } },
            { $project: {
                day: true,
                exercises: true,
                totalDuration: { $sum: "$exercises.duration" },
                totalWeight: { $sum: "$exercises.weight" }
                }
            }
        ])
        .then(workouts => {
            console.log(workouts);
            res.json(workouts);
        }).catch(err => {
            console.log(err);
        })
    });
};

