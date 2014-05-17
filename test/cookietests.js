var cookie = require('..');
var assert = require('assert');

suite('cookieParse');

test('spaces', function(){
    var ret = cookie.cookieParse('    key   =   val1;   ');
    assert.deepEqual({key: 'val1'}, ret);
})

test('date', function(){
    var ret = 
    cookie.cookieParse('priority=true; expires=Wed, 29 May 2014 17:43:25 GMT; Path=/');
    assert.deepEqual({priority:'true', expires: 'Wed, 29 May 2014 17:43:25 GMT', Path: '/'}, ret);
})

test('single values', function(){
    var ret = cookie.cookieParse('foo=%1;bar=bar;HttpOnly;Secure');
    assert.deepEqual({foo:'%1', bar:'bar'}, ret);
})

suite('cookie create');

test('basic', function(){
    var ret = cookie.createCookie('key', 'val');
    assert.deepEqual('key=val',ret);
});

test('single options', function(){
    var ret = cookie.createCookie('key','val', {
        httponly:true
    });
    assert.deepEqual('key=val; HttpOnly', ret);
});