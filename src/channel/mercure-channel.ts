import { Channel } from "./channel";
import {EventFormatter} from "../util";
import { EventSourcePolyfill } from 'event-source-polyfill';

/**
 * This class represents a Mercure channel.
 */
export class MercureChannel extends Channel {

    /**
     * The name of the channel.
     */
    name: any;

    /**
     * Channel options.
     */
    options: any;

    /**
     * The event formatter.
     */
    eventFormatter: EventFormatter;

    /**
     * The event callbacks applied to the socket.
     */
    events: any = {};

    /**
     * User supplied callbacks for events on this channel.
     */
    private listeners: any = {};

    private eventSource: EventSource|EventSourcePolyfill

    /**
     * Create a new class instance.
     */
    constructor(eventSource: EventSource, name: string, options: any) {
        super();

        this.name = name;
        this.options = options;
        this.eventFormatter = new EventFormatter(this.options.namespace);
        this.eventSource = eventSource;

        // this.subscribe();
    }

    error(callback: Function): Channel {
        return undefined;
    }

    listen(event: string, callback: Function): MercureChannel {
        this.bindChannelToEvent(this.eventFormatter.format(event), callback);

        return this;
    }

    stopListening(event: string, callback?: Function): Channel {
        return undefined;
    }

    subscribed(callback: Function): Channel {
        return undefined;
    }

    bindChannelToEvent(event: string, callback: Function): MercureChannel {
        this.listeners[event] = this.listeners[event] || [];

        if (!this.events[event]) {
            this.events[event] = (channel, data) => {
                if (this.name === channel && this.listeners[event]) {
                    this.listeners[event].forEach((cb) => cb(data));
                }
            };

            //this.socket.on(event, this.events[event]);
        }

        this.listeners[event].push(callback);

        // console.log('listeners', this.listeners);
        // console.log('events', this.events);

        return this;
    }

}
