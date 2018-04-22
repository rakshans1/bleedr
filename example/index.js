const bleedr = new Bleedr();
bleedr.bleed();



//code to show variation in cpu usage

function calculatePrimes(iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

setTimeout(() => {

  
  setInterval(() => {
    const random = Math.random();
    if (random > 0.8) {
      calculatePrimes(100, 1000000000);
    } else if (random > 0.6) {
      calculatePrimes(75, 1000000000);
    } else if (random > 0.4) {
      calculatePrimes(50, 1000000000);
    } else if (random > 0.2) {
      calculatePrimes(25, 1000000000);
    } else {
      calculatePrimes(20, 1000000000);
    }
  }, 10)
  
  
}, 2000) 
