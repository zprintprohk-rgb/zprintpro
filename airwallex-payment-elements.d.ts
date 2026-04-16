declare module 'airwallex-payment-elements' {
  export interface AirwallexInstance {
    setPaymentSuccessHandler?(handler: () => void): void;
    setPaymentErrorHandler?(handler: (error: Error) => void): void;
  }

  export interface DropInOptions {
    intent: {
      id: string;
      client_secret: string;
    };
  }

  export interface PaymentElement {
    mount(container: HTMLElement | null): void;
    destroy(): void;
  }

  export function loadAirwallex(): Promise<AirwallexInstance>;
  export function createElement(type: 'dropIn', options: DropInOptions): PaymentElement;
}
