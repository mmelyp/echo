import { Connector } from "./connector";
import { Channel, MercureChannel, PresenceChannel } from "../channel";
import { EventSourcePolyfill } from 'event-source-polyfill';


/**
 * This class creates a mercure connector.
 */
export class MercureConnector extends Connector {

    private eventSources: EventSource[]|EventSourcePolyfill[];

    /**
     * All of the subscribed channel names.
     */
    channels: { [name: string]: MercureChannel } = {};

    channel(channel: string): MercureChannel {
        const url = this.options.host + channel;
        const eventSource = new EventSource(url);
        // eventSource.onmessage = (event) => {
        //     console.log(event.data);
        // }
        eventSource.onerror = (event) => {
            throw new Error('Could not connect to ' + this.options.host);
        }

        if (!this.channels[channel]) {
            this.channels[channel] = new MercureChannel(
                eventSource,
                channel,
                this.options
            );
        }

        console.log(this.channels);

        return this.channels[channel];
    }

    connect(): void {

    }

    disconnect(): void {
    }

    leave(channel: string): void {
    }

    leaveChannel(channel: string): void {
    }

    presenceChannel(channel: string): PresenceChannel {
        return undefined;
    }

    privateChannel(channel: string): Channel {
        return undefined;
    }

    socketId(): string {
        return "";
    }

}
