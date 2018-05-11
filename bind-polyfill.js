if (typeof Function.prototype.bind != 'function') {
    Function.prototype.bind = function bind(obj) {
        var args = Array.prototype.slice.call(arguments, 1),
            self = this,
            nop = function() {
            },
            bound = function() {
                return self.apply(
                    this instanceof nop ? this : (obj || {}), args.concat(
                        Array.prototype.slice.call(arguments)
                    )
                );
            };
        nop.prototype = this.prototype || {};
        bound.prototype = new nop();
        return bound;
    };
}

// In PhantomJS, console.log is not instanceof Function
if (console && typeof console.log == 'function' && typeof console.log.bind != 'function') {
    // this will have effect on console.log, console.error and all the other methods
    console.log.constructor.prototype.bind = Function.prototype.bind;
}
