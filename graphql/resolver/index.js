const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const events = async eventsId => {
    try {
        const results = await Event.find({ _id: { $in: eventsId } });
        return results.map(result => {
            return { ...result._doc, _id: result.id, date: new Date(result.date).toISOString(), creator: user.bind(this, result.creator) };
        });
    } catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const result = await User.findById(userId);
        return { ...result._doc, _id: result.id, createdEvents: events.bind(this, result.createdEvents) };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return { ...event._doc, _id: event.id, date: new Date(event.date).toISOString(), creator: user.bind(this, event.creator) };
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c2dfc1dda19b3323ea40dec'
        });

        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = { ...result._doc, _id: result.id, creator: user.bind(this, result.creator) };
            const existingUser = await User.findById('5c2dfc1dda19b3323ea40dec');
            existingUser.createdEvents.push(event);
            await existingUser.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    },
    createUser: async (args) => {
        try {
            const dupUser = await User.findOne({email: args.userInput.email});
            if (dupUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new User({
                email: args.userInput.email,
                password: hashedPassword    
            });
            const result = await newUser.save();
            return { ...result._doc, _id: result.id, createdEvents: events.bind(this, result.createdEvents) };
        } catch (err) {
            throw err;
        }
             
    }
}