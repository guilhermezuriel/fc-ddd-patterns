import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";

import ChangedAddressHandler from "./handler/changed-address.handler";
import FirstCustomerHandler from "./handler/first-customer-created-log.handler";
import SecondCustomerHandler from "./handler/second-customer-created-log.handler";

describe('Customer events', () => {
  it('should execute all handlers when created a new customer', () => {
    const eventDispatcher = new EventDispatcher();
    const customer = new Customer('1', 'John Doe');

    const eventHandlerList: EventHandlerInterface[] = [ new FirstCustomerHandler(), new SecondCustomerHandler()];
    const spyEventHandler1 = jest.spyOn(eventHandlerList[0], "handle");
    const spyEventHandler2 = jest.spyOn(eventHandlerList[1], "handle");
 
    eventHandlerList.forEach(eventHandler => {
      eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    });

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toContain(eventHandlerList[0]);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toContain(eventHandlerList[1]);

    eventDispatcher.notify(new CustomerCreatedEvent(customer));
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });

  it('should notify change customer address', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new ChangedAddressHandler();
      const customer = new Customer('1', 'John Doe');
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      customer.changeAddress(new Address('Street', 132, 'City', 'ZipCode'));
      eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

      expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toContain(eventHandler)
      
      eventDispatcher.notify(new CustomerAddressChangedEvent(customer));
      expect(spyEventHandler).toHaveBeenCalled();
      
  });

});