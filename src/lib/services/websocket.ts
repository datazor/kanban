import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from '../constants';

export class WebSocketService {
  private client: Client;
  private subscriptions: Map<string, () => void>;

  constructor(private username: string, private onMessage: (data: any) => void) {
    this.subscriptions = new Map();
    
    this.client = new Client({
      brokerURL: `ws://${API_BASE_URL.replace('http://', '')}/ws`,
      onConnect: () => {
        this.subscribe();
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      }
    });
  }

  private subscribe() {
    const subscription = this.client.subscribe(
      `/user/${this.username}/notification`,
      (message) => {
        try {
          const data = JSON.parse(message.body);
          this.onMessage(data);
        } catch (error) {
          console.error('Failed to parse notification:', error);
        }
      }
    );

    this.subscriptions.set('notifications', () => subscription.unsubscribe());
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions.clear();
    this.client.deactivate();
  }
}