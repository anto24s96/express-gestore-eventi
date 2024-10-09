const eventsModel = require("../models/eventsModel.js");

const index = (req, res) => {
    try {
        const filters = req.query;
        const events = eventsModel.getAllEvents(filters); // Chiamata sincrona
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error in retrieving the events" });
    }
};

const show = (req, res) => {
    const eventId = Number(req.params.event);

    try {
        const event = eventsModel.singleEvent(eventId); // Chiamata sincrona
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error in retrieving the event" });
    }
};

const store = (req, res) => {
    try {
        const { title, description, date, maxSeats } = req.body;

        //controllo per la validazione dei dati
        if (!title || !description || !date || !maxSeats) {
            return res.status(400).json({ error: "Some data are missing" });
        }

        //creo il nuovo evento
        const newEvent = eventsModel.createEvent(title, description, date, maxSeats);

        return res.status(201).json(newEvent);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const update = (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, maxSeats } = req.body;

        //validazione dell'evento se esiste e aggiorno i campi
        const updateEvent = eventsModel.updateEvent(id, { title, description, date, maxSeats });

        return res.status(200).json(updateEvent);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    index,
    show,
    store,
    update,
};
