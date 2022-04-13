import { formatStringValue, formatNumberValue } from 'app/utils/common';

export class Price {
  priceId: number = 0;
  name: string = "";
  priceWeights: PriceWeight[] = []
  labelKg: string = "kg";
  labelPercent: string = "%";
  packTypes: PackType[];

  initFromPrice(item: Price, packTypes: PackType[]): void {
    packTypes.sort(this.comparePackType);
    this.packTypes = packTypes;

    this.priceId = item.priceId;
    this.name = item.name;
    item.priceWeights.forEach(pw => {
      this.priceWeights.push(pw);
      packTypes.forEach(pt => {
        if (pw.priceWeightPackType.find(obj => obj.packTypeId === pt.packTypeId) === undefined) {
          pw.priceWeightPackType.push({
            packTypeId: pt.packTypeId,
            price: 0
          } as PriceWeightPackType);
        }
      });
      pw.priceWeightPackType.sort(this.comparePriceWeightPackType);
    });
    this.normPriceWeight();
  }

  comparePackType(a: PackType, b: PackType) {
    if (a.packTypeId < b.packTypeId)
      return -1;
    else if (a.packTypeId > b.packTypeId)
      return 1;
    else
      return 0;
  }

  comparePriceWeightPackType(a: PriceWeightPackType, b: PriceWeightPackType) {
    if (a.packTypeId < b.packTypeId)
      return -1;
    else if (a.packTypeId > b.packTypeId)
      return 1;
    else
      return 0;
  }

  initFromPackTypes(packTypes: PackType[]): void {
    this.packTypes = packTypes;

    const pw = {
      weight: 0,
      humidity: 0,
      priceWeightPackType: []
    } as PriceWeight;

    this.packTypes.forEach(pt => {
      pw.priceWeightPackType.push({
        packTypeId: pt.packTypeId,
        price: 0
      });
    });

    this.priceWeights.push(pw);

    this.normPriceWeight();
  }

  getForSave(): Price {
    var price: Price = {
      priceId: this.priceId,
      name: this.name,
      priceWeights: []
    } as Price;

    this.priceWeights.forEach(item => {
      const pw = {
        weight: item.weight,
        humidity: item.humidity
      } as PriceWeight;

      item.priceWeightPackType.forEach(pt => {
        if (pt.price !== 0 && pt.price !== null) {
          if (pw.priceWeightPackType === undefined)
            pw.priceWeightPackType = [];
          pw.priceWeightPackType.push({
            packTypeId: pt.packTypeId,
            price: pt.price
          } as PriceWeightPackType);
        }
      });

      price.priceWeights.push(pw);
    });
    return price;
  }

  comparePriceWeight(a: PriceWeight, b: PriceWeight) {
    if (a.weight < b.weight)
      return -1;
    else if (a.weight > b.weight)
      return 1;
    else {
      if (a.humidity < b.humidity)
        return -1;
      else if (a.humidity > b.humidity)
        return 1;
      else
        return 0;
    }
  }

  addPriceWeight(item: PriceWeight) {
    const found = this.priceWeights.find(obj => (obj.weight === item.weight) && (obj.humidity === item.humidity));
    if (found === undefined) {
      const pw = {
        weight: item.weight,
        humidity: item.humidity,
        priceWeightPackType: []
      } as PriceWeight;

      this.packTypes.forEach(pt => {
        pw.priceWeightPackType.push({
          packTypeId: pt.packTypeId,
          price: 0
        } as PriceWeightPackType);
      });

      this.priceWeights.push(pw);
      this.priceWeights.sort(this.comparePriceWeight);
    }
    else {
      found.humidity = item.humidity;
    }
    this.normPriceWeight();
  }

  removePriceWeight(item: PriceWeight) {
    const index = this.priceWeights.indexOf(item);
    if (index > -1) {
      this.priceWeights.splice(index, 1);
      this.normPriceWeight();
    }
  }

  normPriceWeight() {
    for (let i = this.priceWeights.length - 1; i >= 0; i--) {
      const current = this.priceWeights[i];
      if (i === this.priceWeights.length - 1) {
        current.humidityDisplay = current.humidity + '-100' + this.labelPercent;
        current.weightDisplay = '>' + current.weight + ' ' + this.labelKg;
      }
      else {
        const prior = this.priceWeights[i + 1];
        if (prior.weight == current.weight) {
          current.humidityDisplay = current.humidity + '-' + prior.humidity + this.labelPercent;
          current.weightDisplay = prior.weightDisplay;
          prior.weightDisplay = '';
        }
        else {
          current.humidityDisplay = current.humidity + '-100' + this.labelPercent;
          // if (current.weight === 0)
          //   current.weightDisplay = '<' + prior.weight + ' ' + this.labelKg;
          // else
            current.weightDisplay = current.weight + '<' + prior.weight + ' ' + this.labelKg;
        }
      }
    }
  }
}

export class PackType {
  packTypeId: number = 0;
  name: string = "";
}

export class PriceWeight {
  weight: number = 0;
  humidity: number = 0;
  weightDisplay: string = null
  humidityDisplay: string = null
  priceWeightPackType: PriceWeightPackType[] = [];
}

export class PriceWeightPackType {
  packTypeId: number = 0;
  price: number = 0;
}
