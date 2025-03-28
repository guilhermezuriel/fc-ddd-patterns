import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerAddressChangedEvent implements EventInterface { 
  dataTimeOccurred: Date;
  eventData: Customer;
 
  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}