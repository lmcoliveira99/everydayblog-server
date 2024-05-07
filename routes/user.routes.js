const User = require('../models/User.model');
const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');


router.get("/", async (req, res) => {
    try {
        const allUser = await User.find()
        res.status(200).json(allUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while creating the User list" });
    }
});

// GET /api/users/:id - Retrieves a specific user by id
router.get('/:id', isAuthenticated, (req, res, next) => {
    // Get the user id from the request parameters
    const userId = req.params.id;

    // Find the user by id in the database
    User.findById(userId)
        .then((foundUser) => {
            // If the user is found, return it as the response
            if (foundUser) {
                res.status(200).json({ user: foundUser });
            }
            // If the user is not found, send an error response
            else {
                res.status(404).json({ message: "User not found." });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

/* Update */
router.put("/:id", async (req, res) => {
    try {
        /* Destructure the id via router params */
        const { id } = req.params;
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all mandatory fields!" })
        }
        /* Find the user via the id and send it back to the client */
        const updateUser = await User.findByIdAndUpdate(id, {
            email, password
        }, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ message: "Error while creating the User" });
    }
})


/* Delete */
router.delete("/:id", async (req, res) => {
    try {
        /* Destructure the id via route params */
        const { id } = req.params;
        /* Find the user via the id and send it back to the client */
        await User.findByIdAndDelete(id);
        res.status(200).json("User was deleted");
    } catch (error) {
        res.status(500).json({ message: "Error while deleting the User" });
    }
})



module.exports = router;