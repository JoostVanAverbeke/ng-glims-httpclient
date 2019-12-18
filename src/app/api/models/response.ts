import {DataSetHandle} from './data-set-handle';
import {DsOrdersByInternalIdFlat} from './ds-orders-by-internal-id-flat';
import {Deserializable} from './deserializable.model';

export class Response implements Deserializable {
  PrevContext: number;
  NextContext: number;
  DataSetHandle: DataSetHandle;

  deserialize(input: any) {
    Object.assign(this, input);
    if (input.DataSetHandle) {
      this.DataSetHandle = new DataSetHandle().deserialize(input.DataSetHandle);
    }
    return this;
  }
}
