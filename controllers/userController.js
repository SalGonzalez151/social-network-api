const { Thought, User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
         res.status(500).json(err.message)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v');

          if (!user) {
            return res.status(404).json({message: 'No user with that ID'})
          }  

          res.json(user);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    async createUser(req, res) {
        try {
            await User.init();
            await User.create(req.body)
           
            res.json(201).end();
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId})

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'})
            }

            await Thought.deleteMany({_id: { $in: user.thoughts}})
            res.json({ message: 'User and thoughts deleted!'})
        } catch (err) {
            res.status(500).json(err.message) 
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body },
                {runValidators: true, new: true}
            )
            res.json(user)
        } catch (err) { 
            res.status(500).json(err.message);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await user.findOneAndUpdate(
                {_id: req.params.userId},
                {$adToSet: { friends: req.body}},
                {runValidators: true, new: true}
            )
            if (!user) {
                return res.status(400).json({ message: 'No User found with that ID'})
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await user.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: { friends: { friendsId: req.params.friendsId}}},
                { runValidators: true, new: true}
            )
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'})
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}