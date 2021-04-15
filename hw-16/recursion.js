const isPalindromRecursive = string => {
    if (string.length === 0 || string.length === 1) {
      return true;
    } else {
      return string[0] === string[string.length - 1] && isPalindromRecursive(string.slice(1, -1))
    }
  }





  const combinations = string => {
  
    if (string.length === 0) {
      return [];
    } else if (string.length === 1) {
      return [string]; // Один символ
    } else {
      const p = [];
  
      for (let index = 0; index < string.length; index++) {
        const char = string[index];
        const remaining = string.slice(0, index) + string.slice(index + 1);
  
        const subcombinations = combinations(remaining);
  
        p.push(...subcombinations.map(combination => char + combination));
      }
  
      return p;
  
    }
  } 




  const numberElementsSumRecursive = (number) => {
    if (number == 0) {
      return 0;
    } else {
      return (number % 10) + numberElementsSumRecursive(Math.trunc(number / 10));
    }
  }
  console.log(numberElementsSumRecursive(723));