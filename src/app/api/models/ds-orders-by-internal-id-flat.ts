import {EOrder} from './e-order';
import {Deserializable} from './deserializable.model';
import {FlatDataSetHandle} from './flat-data-set-handle';

export class DsOrdersByInternalIdFlat implements FlatDataSetHandle, Deserializable {
  eOrders: EOrder[];
  deserialize(input: any) {
    let eOrder: EOrder;
    Object.assign(this, input);
    this.eOrders = [];
    if (input.eOrder) {
      for (const eOrderEntry of input.eOrder) {
        eOrder = new EOrder().deserialize(eOrderEntry);
        this.eOrders.push(eOrder);
      }
    }
    return this;
  }

}
