class EventManager
{
    static events = {};

    /**
     * This function adds events to the vent map.
     * @param {string} name - the key of the map
     * @param {function} func - the value is the function that will be called when events are checked.
     */
    static addEvent(name, func)
    {
        if(!(name in EventManager.events))
        {
            EventManager.events[name] = func;
        }
        else
        {
            console.log("event name taken");
        }

    }

    /**
     * This function removes an event from the event map.
     * @param {string} name - the name of the vent to remove.
     */
    static removeEvent(name)
    {
        if(name in EventManager.events)
        {
            delete (EventManager.events[name]);
        }
    }

    /**
     * This function removes all the events in the event dict.
     */
    static clearEvents()
    {
        for (const [name, func] of Object.entries(EventManager.events))
        {
            delete EventManager.events[name];
        }
    }

    /**
     * This function runs all the functions that were inserted in the map the function is called in the game loop.
     */
    static runEvents()
    {
        for (const [name, func] of Object.entries(EventManager.events))
        {
            func.call();
        }
    }

}