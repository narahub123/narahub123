function oldEnough(age: number): never | boolean {
  if (age > 59) {
    throw new Error("Too Old");
  }

  if (age <= 18) {
    return false;
  }

  return true;
}

oldEnough(40);

