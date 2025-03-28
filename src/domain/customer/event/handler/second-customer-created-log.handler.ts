import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerRegisteredEvent from "../customer-created.event";

export default class SecondCustomerHandler implements EventHandlerInterface<CustomerRegisteredEvent> {  
  handle(event: CustomerRegisteredEvent): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
  }
}