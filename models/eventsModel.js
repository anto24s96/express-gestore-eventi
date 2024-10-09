const { readJSON, writeJSON } = require("../utils.js");

class Event {
    static events = readJSON("eventsDB");

    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    //funzione per leggere tutti gli eventi (con possibilità di filtrare)
    static getAllEvents(filters = {}) {
        let events = this.events;

        //applico i filtri se sono presenti
        if (filters.title) {
            events = events.filter((e) => e.title.toLowerCase().includes(filters.title.toLowerCase()));
        }

        if (filters.date) {
            events = events.filter((e) => e.date === filters.date);
        }
        if (filters.maxSeats) {
            events = events.filter((e) => e.maxSeats === Number(filters.maxSeats));
        }

        return events;
    }

    //funzione per trovare il singolo evento tramite id
    static singleEvent(id) {
        const event = this.events.find((e) => e.id === Number(id));

        if (!event) {
            throw new Error(`Evento con ID ${id} non trovato`);
        }

        return event;
    }

    //funzione per creare un nuovo evento
    static createEvent(title, description, date, maxSeats) {
        const id = this.events.length ? this.events[this.events.length - 1].id + 1 : 1;
        const newEvent = new Event(id, title, description, date, maxSeats);
        //aggiungo il nuovo elemento nell'array
        this.events.push(newEvent);
        writeJSON("eventsDB", this.events);

        return { statusCode: 201, message: "New event added", data: newEvent };
    }

    //funzione per aggiornare un evento
    static updateEvent(id, newData) {
        const index = this.events.findIndex((e) => e.id === Number(id));

        if (index === -1) {
            throw new Error(`Evento con l'id: ${id} non trovato`);
        }

        //aggiorno solo i campi che sono presenti in newData
        const event = this.events[index];
        event.title = newData.title || event.title;
        event.description = newData.description || event.description;
        event.date = newData.date || event.date;
        event.maxSeats = newData.maxSeats || event.maxSeats;

        //aggiorno il json
        writeJSON("eventsDB", this.events);

        return { statusCode: 200, message: "Event updated successfully", data: event };
    }
}

module.exports = Event;
