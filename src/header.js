//--------------------------------------------------------------------------
//
//  Classified.js v@VERSION
//  http://github.com/petebrowne/classify
//
//  Copyright (c) 2010, Peter Browne
//
//  Dependencies:
//  - classify  0.10.4  http://github.com/petebrowne/classify
//
//--------------------------------------------------------------------------

(function () {

//----------------------------------
//  Constants
//----------------------------------

var UNDEFINED = 'undefined',
    global    = this,
    def       = global.def,
    classify  = global.classify,
    module    = global.module,
    include   = global.include,
    extend    = global.extend,
    alias     = global.alias,
    
    // When using the Enumerable loops, throwing this object
    // will break out of the loop early;
    $break = global.$break = {};
    