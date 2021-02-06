import { context, storage, logging } from "near-sdk-as";

export function addLongNumbers(a: string, b: string): string {
  // sends logs to the terminal of the contract placing call and the Near Explorer
  logging.log("-------------------------------------------------------")
  logging.log('Contract Called : ' + context.contractName)
  logging.log('Contract Signer : ' + context.predecessor)
  logging.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - -")
  logging.log("Caculating : " + a + " + " + b)
  // Similar to long addition by hand, we start with the least significant digits first
  const aReversed = a.split("").reverse();
  const bReversed = b.split("").reverse();

  // We initialize our resultant variable to be one more than the largest number's length
  const maxLength = max(a.length, b.length);
  let resultArray = new Array<String | null>(maxLength + 1);
  let result = "";
  let carry = 0;

  // Loop through each digit adding the value to the other number, if it exists
  for (let i = 0; i < maxLength; ++i) {
    let aDigit = (i < a.length) ? U32.parseInt(aReversed[i]) : 0;
    let bDigit = (i < b.length) ? U32.parseInt(bReversed[i]) : 0;
    let digitSum = aDigit + bDigit + carry;

    // Keep track of the carry amount
    if (digitSum >= 10) {
      carry = 1;
      digitSum -= 10;
    } else {
      carry = 0;
    }

    resultArray[i] = digitSum.toString();
  }

  // If the final addition has a carry, add it to the extra slot we initialized for it
  if (carry > 0) {
    resultArray[maxLength] = carry.toString();
  }

  // Reverse again and combine the values for the final result
  let reversedResultArray = resultArray.reverse();

  // More terminal / Near Explorer logs
  logging.log(">>> RESULT : " + reversedResultArray.join(""))
  logging.log("-------------------------------------------------------")
  return reversedResultArray.join("");
}