require(['./messenger'], function(Messenger) {
  module('Messenger', {});

  test('Messenger.decorate adds methods', function() {
    expect(3);
    var subject = {};
    Messenger.decorate(subject);
    ok(subject.addEventListener !== undefined, 'adds addEventListener');
    ok(subject.removeEventListener !== undefined, 'adds removeEventListener');
    ok(subject.dispatchEvent !== undefined, 'adds dispatchEvent');
  });

  test('addEventListener, dispatchEvent', function() {
    var called = false;
    function callback() {
      called = true;
    }
    var messenger = new Messenger();
    messenger.addEventListener('test.event', callback);
    messenger.dispatchEvent('test.event');
    equal(called, true, 'adds listener, and dispatches events');
  });

  test('removeEventListener', function() {
    var called = false;
    function callback() {
      called = true;
    }
    var messenger = new Messenger();
    messenger.addEventListener('test.event', callback);
    messenger.removeEventListener('test.event', callback);
    messenger.dispatchEvent('test.event');
    equal(called, false, 'removes callback');
  });

  test('addEventListener', function() {
    var messenger = new Messenger();
    var result = messenger.addEventListener('test.event', undefined);
    equal(result, false, 'dont add listeners when callback undefined');
  });

  test('killAllListeners', function() {
    var called = false;
    var foo = 'foo';
    function callback() {
      called = true;
    }
    function otherCallback() {
      foo = 'bar';
    }
    var messenger = new Messenger();
    messenger.addEventListener('test.event', callback);
    messenger.addEventListener('test.event', otherCallback);
    messenger.killAllListeners('test.event');
    messenger.dispatchEvent('test.event');
    equal(called, false, 'removes callbacks');
    equal(foo, 'foo', 'removes all callbacks');
  });

});
