declare module sjcl {

    export var bn: BigNumberStatic;
    export var bitArray: BitArrayStatic;
    export var codec: SjclCodecs;
    export var hash: SjclHashes;
    export var exception: SjclExceptions;
    export var cipher: SjclCiphers;
    export var mode: SjclModes;
    export var misc: SjclMisc;

    // ________________________________________________________________________

    interface BigNumber {
        radix: number;
        maxMul: number;

        copy(): BigNumber;

        /// Initializes this with it, either as a bn, a number, or a hex string.
        initWith: TypeHelpers.BigNumberBinaryOperator;

        /// Returns true if "this" and "that" are equal.  Calls fullReduce().
        /// Equality test is in constant time.
        equals(that: number): boolean;
        equals(that: BigNumber): boolean;
          
        /// Get the i'th limb of this, zero if i is too large.
        getLimb(index: number): number;
  
        /// Constant time comparison function.
        /// Returns 1 if this >= that, or zero otherwise.
        greaterEquals(that: number): boolean;
        greaterEquals(that: BigNumber): boolean;

        /// Convert to a hex string.
        toString(): string;

        /// this += that.  Does not normalize.
        addM: TypeHelpers.BigNumberBinaryOperator;

        /// this *= 2.  Requires normalized; ends up normalized.
        doubleM(): BigNumber;

        /// this /= 2, rounded down.  Requires normalized; ends up normalized.
        halveM(): BigNumber;

        /// this -= that.  Does not normalize.
        subM: TypeHelpers.BigNumberBinaryOperator;

        mod: TypeHelpers.BigNumberBinaryOperator;

        /// return inverse mod prime p.  p must be odd. Binary extended Euclidean algorithm mod p.
        inverseMod: TypeHelpers.BigNumberBinaryOperator;

        /// this + that.  Does not normalize.
        add: TypeHelpers.BigNumberBinaryOperator;

        /// this - that.  Does not normalize.
        sub: TypeHelpers.BigNumberBinaryOperator;

        /// this * that.  Normalizes and reduces.
        mul: TypeHelpers.BigNumberBinaryOperator;

        /// this ^ 2.  Normalizes and reduces.
        square(): BigNumber;

        /// this ^ n.  Uses square-and-multiply.  Normalizes and reduces.
        power(n: number): BigNumber;
        power(n: BigNumber): BigNumber;
        power(a: number[]): BigNumber;

        /// this * that mod N
        mulmod: TypeHelpers.BigNumberTrinaryOperator;

        /// this ^ x mod N
        powermod: TypeHelpers.BigNumberTrinaryOperator;

        trim(): BigNumber;

        /// Reduce mod a modulus.  Stubbed for subclassing.
        reduce(): BigNumber;

        /// Reduce and normalize.
        fullReduce(): BigNumber;

        /// Propagate carries.
        normalize(): BigNumber;

        /// Constant-time normalize. Does not allocate additional space.
        cnormalize(): BigNumber;

        /// Serialize to a bit array
        toBits(len?: number): BitArray;

        /// Return the length in bits, rounded up to the nearest byte.
        bitLength(): number;
    }

    interface BigNumberStatic {
        new (): BigNumber;
        new (n: string): BigNumber;
        new (n: number): BigNumber;
        new (n: BigNumber): BigNumber;

        fromBits(bits: BitArray): BigNumber;
        random: TypeHelpers.Bind1<number>;
        //pseudoMersennePrime
    }

    // ________________________________________________________________________

    interface BitArray extends Array<number> {
    }

    interface BitArrayStatic {
        /// Array slices in units of bits.
        bitSlice(a: BitArray, bstart: number, bend: number): BitArray;

        /// Extract a number packed into a bit array.
        extract(a: BitArray, bstart: number, blenth: number): number;

        /// Concatenate two bit arrays.
        concat(a1: BitArray, a2: BitArray): BitArray

        /// Find the length of an array of bits.
        bitLength(a: BitArray): number;

        /// Truncate an array.
        clamp(a: BitArray, len: number): BitArray;

        /// Make a partial word for a bit array.
        partial(len: number, x: number, _end?: number): number;

        /// Get the number of bits used by a partial word.
        getPartial(x: number): number;

        /// Compare two arrays for equality in a predictable amount of time.
        equal(a: BitArray, b: BitArray): boolean;

        /// Shift an array right.
        _shiftRight(a: BitArray, shift: number, carry?: number, out?: BitArray): BitArray;

        /// xor a block of 4 words together.
        _xor4(x: number[], y: number[]): number[];
    }

    // ________________________________________________________________________

    interface SjclCodec<T> {
        fromBits(bits: BitArray): T;
        toBits(value: T): BitArray;
    }

    interface SjclCodecs {
        utf8String: SjclCodec<string>;
        hex: SjclCodec<string>;
        bytes: SjclCodec<number[]>;
        base64: SjclCodec<string>;
        base64url: SjclCodec<string>;
    }

    // ________________________________________________________________________

    interface SjclHash {
        reset(): SjclHash;
        update(data: string): SjclHash;
        update(data: BitArray): SjclHash;
        finalize(): BitArray;
    }

    interface SjclHashStatic {
        new (hash?: SjclHash): SjclHash;
        hash(data: string): BitArray;
        hash(data: BitArray): BitArray;
    }

    interface SjclHashes {
        sha1: SjclHashStatic;
        sha256: SjclHashStatic;
        sha512: SjclHashStatic;
    }

    // ________________________________________________________________________

    interface SjclExceptions {
        corrupt: SjclExceptionFactory;
        invalid: SjclExceptionFactory;
        bug: SjclExceptionFactory;
        notReady: SjclExceptionFactory;
    }

    interface SjclExceptionFactory {
        new (message: string): Error;
    }

    // ________________________________________________________________________

    interface SjclCiphers {
        aes: SjclCipherStatic;
    }

    interface SjclCipher {
        encrypt(data: number[]): number[];
        decrypt(data: number[]): number[];
    }

    interface SjclCipherStatic {
        new (key: number[]): SjclCipher;
    }

    // ________________________________________________________________________

    interface SjclModes {
        gcm: SjclGCMMode;
        ccm: SjclCCMMode;
        ocb2: SjclOCB2Mode;
        cbc: SjclCBCMode;
    }

    interface SjclGCMMode {
        encrypt(prp: any, plaintext: BitArray, iv: BitArray, adata?: BitArray, tlen?: number): BitArray;
        decrypt(prp: any, ciphertext: BitArray, iv: BitArray, adata?: BitArray, tlen?: number): BitArray;
    } 

    interface SjclCCMMode {
        encrypt(prp: any, plaintext: BitArray, iv: BitArray, adata?: BitArray, tlen?: number): BitArray;
        decrypt(prp: any, ciphertext: BitArray, iv: BitArray, adata?: BitArray, tlen?: number): BitArray;
    } 

    interface SjclOCB2Mode {
        encrypt(prp: any, plaintext: BitArray, iv: BitArray, adata?: BitArray, tlen?: number, premac?: boolean): BitArray;
        decrypt(prp: any, ciphertext: BitArray, iv: BitArray, adata?: BitArray, tlen?: number, premac?: boolean): BitArray;
        pmac(prp: SjclCipher, adata: BitArray): number[];
    } 

    interface SjclCBCMode {
        encrypt(prp: any, plaintext: BitArray, iv: BitArray, adata?: BitArray): BitArray;
        decrypt(prp: any, ciphertext: BitArray, iv: BitArray, adata?: BitArray): BitArray;
    } 

    // ________________________________________________________________________


    interface SjclMisc {
        pbkdf2(password: string, salt: string, count: number, length?: number, Prff?: SjclPseudorandomFunctionFamilyStatic): BitArray;
        pbkdf2(password: BitArray, salt: string, count: number, length?: number, Prff?: SjclPseudorandomFunctionFamilyStatic): BitArray;
        pbkdf2(password: BitArray, salt: BitArray, count: number, length?: number, Prff?: SjclPseudorandomFunctionFamilyStatic): BitArray;
        pbkdf2(password: string, salt: BitArray, count: number, length?: number, Prff?: SjclPseudorandomFunctionFamilyStatic): BitArray;
        hmac: SjclHmacStatic;
    }

    interface SjclPseudorandomFunctionFamily {
        encrypt(data: string): BitArray;
        encrypt(data: BitArray): BitArray;
    }

    interface SjclHmac extends SjclPseudorandomFunctionFamily {
        mac(data: string): BitArray;
        mac(data: BitArray): BitArray;
        reset(): void;
        update(data: string): void;
        update(data: BitArray): void;
        digest(): BitArray;
    }

    interface SjclPseudorandomFunctionFamilyStatic {
        new (key: BitArray): SjclPseudorandomFunctionFamily;
    }

    interface SjclHmacStatic extends SjclPseudorandomFunctionFamilyStatic {
        new (key: BitArray, Hash?: SjclHashStatic): SjclHmac;
    }

    // ________________________________________________________________________

    module TypeHelpers {
        interface One<T> {
            (value: T): BigNumber;
        }

        interface BigNumberBinaryOperator extends One<number>, One<string>, One<BigNumber> {
        }

        interface Two<T1, T2> {
            (x: T1, N: T2): BigNumber;
        }

        interface Bind1<T> extends Two<number, T>, Two<string, T>, Two<BigNumber, T> {
        }

        interface BigNumberTrinaryOperator extends Bind1<number>, Bind1<string>, Bind1<BigNumber> {
        }
    }
}
