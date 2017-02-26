import {Address} from "../interface/user.interface";
/**
 * Created by daljit on 26-Feb-17.
 */
export class AddressRenderer {

  toString(address: Address) {
    return "Street : " + address.street + "\n" +
      "Street : " + address.city + "\n" +
      "Street : " + address.suite + "\n";
  }
}
