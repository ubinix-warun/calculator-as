import { context, storage, logging, ContractPromise } from "near-sdk-as";
import { AddArgs } from "./model";

const OTHER_CONTRACT = "dev-1612581803817-6385186";

export class CalculatorApi {
  add(a: string, b: string): ContractPromise {
    let args: AddArgs = { a, b };
    let promise = ContractPromise.create(OTHER_CONTRACT, "addLongNumbers", args.encode(), 100000000000000);
    logging.log("OTHER_CONTRACT: " + "(" + OTHER_CONTRACT + ")")
    return promise;
  }
}

export function calculate(a: string , b: string): void {
  let calculator = new CalculatorApi();
  let promise = calculator.add(a, b);
  promise.returnAsResult();
}