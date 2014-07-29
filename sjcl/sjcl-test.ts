/// <reference path="./sjcl.d.ts" /> 

var b: boolean;
var n: number;
var s: string;
var bn: sjcl.BigNumber;
var ba: sjcl.BitArray;

bn = new sjcl.bn();
bn = new sjcl.bn(0);
bn = new sjcl.bn("0");
bn = new sjcl.bn(bn);

bn = bn.initWith(0);
bn = bn.initWith("0");
bn = bn.initWith(bn);

bn = bn.addM(0);
bn = bn.addM("0");
bn = bn.addM(bn);

bn = bn.subM(0);
bn = bn.subM("0");
bn = bn.subM(bn);

bn = bn.mod(0);
bn = bn.mod("0");
bn = bn.mod(bn);

bn = bn.inverseMod(0);
bn = bn.inverseMod("0");
bn = bn.inverseMod(bn);

bn = bn.add(0);
bn = bn.add("0");
bn = bn.add(bn);

bn = bn.sub(0);
bn = bn.sub("0");
bn = bn.sub(bn);

bn = bn.mul(0);
bn = bn.mul("0");
bn = bn.mul(bn);

bn = bn.mulmod(0, 0);
bn = bn.mulmod(0, "0");
bn = bn.mulmod(0, bn);
bn = bn.mulmod("0", 0);
bn = bn.mulmod("0", "0");
bn = bn.mulmod("0", bn);
bn = bn.mulmod(bn, 0);
bn = bn.mulmod(bn, "0");
bn = bn.mulmod(bn, bn);

bn = bn.powermod(0, 0);
bn = bn.powermod(0, "0");
bn = bn.powermod(0, bn);
bn = bn.powermod("0", 0);
bn = bn.powermod("0", "0");
bn = bn.powermod("0", bn);
bn = bn.powermod(bn, 0);
bn = bn.powermod(bn, "0");
bn = bn.powermod(bn, bn);

bn = bn.copy();

b = bn.equals(0);
b = bn.equals(bn);

b = bn.greaterEquals(0);
b = bn.greaterEquals(bn);

n = bn.getLimb(0);

s = bn.toString();

bn = bn.doubleM();

bn = bn.halveM();

bn = bn.square();

bn = bn.power(1);
bn = bn.power([1, 1]);
bn = bn.power(bn);

bn = bn.trim();

bn = bn.reduce();

bn = bn.fullReduce();

bn = bn.normalize();

bn = bn.cnormalize();

ba = bn.toBits();
ba = bn.toBits(1);

n = bn.bitLength();

bn = sjcl.bn.fromBits(ba);

ba = sjcl.bitArray.bitSlice(ba, 0, 1);

n = sjcl.bitArray.extract(ba, 0, 1);

ba = sjcl.bitArray.concat(ba, ba);

n = sjcl.bitArray.bitLength(ba);

ba = sjcl.bitArray.clamp(ba, 0);

n = sjcl.bitArray.partial(1, 1);
n = sjcl.bitArray.partial(1, 1, 0);

n = sjcl.bitArray.getPartial(0);

b = sjcl.bitArray.equal(ba, ba);

ba = sjcl.bitArray._shiftRight(ba, 0);
ba = sjcl.bitArray._shiftRight(ba, 0, 0);
ba = sjcl.bitArray._shiftRight(ba, 0, 0, ba);

