import formatMoney from '../lib/formatMoney';

describe('format Money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
  });
  it('leaves off cents when its whole dollars', () => {
    expect(formatMoney(500)).toEqual('$5');
    expect(formatMoney(10000)).toEqual('$100');
    expect(formatMoney(90000000)).toEqual('$900,000');
  });
  it('works with whole and fractional dollars', () => {
    expect(formatMoney(155)).toEqual('$1.55');
    expect(formatMoney(5492)).toEqual('$54.92');
    expect(formatMoney(122)).toEqual('$1.22');
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(4774982385334)).toEqual('$47,749,823,853.34');
  });
});
