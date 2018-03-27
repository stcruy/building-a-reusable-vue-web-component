import { shallow } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';


describe('MyComponent', () => {

  it('works', () => {
    expect(true).to.equal(true);
  });

  it('works too', () => {
    var a = true;
    a.should.equal(true);
  });

  it('sets `count` based on `initialCount`', () => {
    var comp = shallow(MyComponent, { propsData: { initialCount: 20 } });
    expect(comp.vm.count).to.equal(20);
  });

  it('increments `count` after a button click', () => {
    var comp = shallow(MyComponent);
    var vm = comp.vm;

    expect(vm.count).to.equal(0);
    const button = comp.find('button');
    button.trigger('click');
    expect(vm.count).to.equal(1);

    comp.setData({ count: 10 });
    button.trigger('click');
    expect(vm.count).to.equal(11);
  });
});
