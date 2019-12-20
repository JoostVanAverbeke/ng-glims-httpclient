import {DataSetHandle} from './data-set-handle';
import {Deserializable} from './deserializable.model';

export class GRAPIResponse implements Deserializable {
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
