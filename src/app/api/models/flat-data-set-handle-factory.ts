import {DsOrdersByInternalIdFlat} from './ds-orders-by-internal-id-flat';

export class FlatDataSetHandleFactory {
  public static createInstance(input: any) {
    if (input.dsOrdersByInternalIdFlat) {
      return new DsOrdersByInternalIdFlat().deserialize(input.dsOrdersByInternalIdFlat);
    } else {
      return null;
    }
  }
}
