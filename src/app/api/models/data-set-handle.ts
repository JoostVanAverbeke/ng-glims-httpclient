import {Deserializable} from './deserializable.model';
import {FlatDataSetHandle} from './flat-data-set-handle';
import {FlatDataSetHandleFactory} from './flat-data-set-handle-factory';

export class DataSetHandle implements Deserializable {
  flatDataSetHandle: FlatDataSetHandle;

  deserialize(input: any) {
    Object.assign(this, input);
    this.flatDataSetHandle = FlatDataSetHandleFactory.createInstance(input);
    return this;
  }
}
