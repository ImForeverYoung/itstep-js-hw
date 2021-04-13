const reverseStringRecursive = (string, auxiliary = "") => { 
    let reversedString = auxiliary;
    reversedString += string[string.length - 1];
    string = string.substring(0, string.length - 1);
    if (string.length === 0) { // пока не дойдем до начала строки 
        return reversedString;
    } else {
        return reverseStringRecursive(string, reversedString);
    }
}
