import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerRegisteredEvent from "../customer-created.event";

export default class FirstCustomerHandler implements EventHandlerInterface<CustomerRegisteredEvent> {
  handle(event: CustomerRegisteredEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
  }
}