export class Similarity {
  item;
  value;

  constructor(item: number, value: number) {
    this.item = item;
    this.value = value;
  }

  getItem() {
    return this.item;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return "[" + this.getItem + "," + this.getValue + "]";
  }

  static compareTo(aRating: Similarity, bRating: Similarity) {
    if (aRating.value < bRating.value) return 1;
    if (aRating.value > bRating.value) return -1;
    return 0;
  }
}
