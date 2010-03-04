(function(window, undefined) {


var namespace = window,

  currentScope = window,

  currentClass = null,

  inheriting = false;


/**
 * classify([superclass][, name][, definition]) -> Class
 *   - superclass (Class): Optional superclass to inherit from.
 *   - name (String): Name of the Class.
 *   - definition (Function): The Class definition, containing method definitions.
 *
 * Creates a new Class. The Class will be defined on the _current scope_, will will
 * be either the `window` or a Module. Optionally you can pass in a Superclass as the first argument.
 */
namespace.classify = function(superclassOrName, definitionOrName, definition) {
  var superclass, object, name;

  if (definition === undefined) {
    name       = superclassOrName;
    definition = definitionOrName;
  }
  else {
    superclass = superclassOrName;
    name       = definitionOrName;
  }

  if (currentScope[name] === undefined) {
    currentScope[name] = buildClass(superclass);
  }

  currentClass = currentScope[name];
  addMethods(currentClass.prototype, definition);
  currentClass = null;

  return currentScope[name];
};

/**
 * def([object][, name][, definition]) -> Function
 *   - object (Object): Optional object to define the method on. Defaults to the current scope.
 *   - name (String): Name of the Method.
 *   - definition (Function): The Method Definition.
 *
 * Defines a new method. The method will be defined on the _current scope_, which will
 * be either the `window`, a Class, or Module. Within the method definition, `this` will
 * refer to the _current scope_. Optionally, you can set the object to define the method on as the
 * first argument.
 */
namespace.def = function(objectOrName, definitionOrName, definition) {
  var object, name;

  if (definition === undefined) {
    object     = currentScope;
    name       = objectOrName;
    definition = definitionOrName;
  }
  else {
    object = objectOrName;
    name   = definitionOrName;
  }

  definition   = addSuperMethod(name, definition);
  object[name] = definition;

  return object[name];
};

/**
 * module(name, definition) -> Module
 *   - name (String): Name of the Module.
 *   - definition (Function): The Module Definition.
 *
 * Creates a new Module. Modules can be used as namespaces for other Modules
 * and Classes. They can also be used as a collection of method definitions
 * to be included into other Classes.
 */
namespace.module = function(name, definition) {
  if (currentScope[name] === undefined) {
    currentScope[name] = {};
  }

  addMethods(currentScope[name], definition);

  return definition;
};

/**
 * include([name][, module]) -> null
 *   - name (String): The name of the defintion to include the Module into.
 *   - module (Module or Object): The Module (or Object) to add to the current object scope.
 *
 * Includes the given Module methods into either the current Class or, optionally, the
 * given Class Definition. The included methods will be available on the instance of the Class.
 */
namespace.include = function(moduleOrName, module) {
  var object, name;

  if (module === undefined) {
    module = moduleOrName;
    object = (currentClass) ? currentClass.prototype : currentScope;
  }
  else {
    name = moduleOrName;
    object = currentScope[name];

    if (object.prototype) {
      object = object.prototype;
    }
  }

  addMethods(object, module);
};

/**
 * extend([name][, module]) -> null
 *   - name (String): The name of the defintion to extend with the Module.
 *   - module (Module or Object): The Module (or Object) to add to the current object scope.
 *
 * Extends the current Class or, optionally, the given Class Definition with the given
 * Module methods. The methods wil be available as Class methods.
 */
namespace.extend = function(nameOrModule, module) {
  var object, name;

  if (module === undefined) {
    if (currentClass !== null) {
      module = nameOrModule;
      object = currentClass;
    }
  }
  else {
    name   = nameOrModule;
    object = currentScope[name];
  }

  addMethods(object, module);
};

/**
 * alias(aliasName, name) -> null
 *   - aliasName (String): The name of the alias
 *   - name (String): The name of the definition to alias. Could be
 *       a reference to a Method, Class, or Module.
 *
 * Creates a alias for the given Method, Class, or Module definition.
 */
namespace.alias = function(aliasName, name) {
  currentScope[aliasName] = currentScope[name];
};


var buildClass = function(superclass) {
    var newClass = function() {
      if (!inheriting && this.initialize !== undefined) {
        this.initialize.apply(this, arguments);
      }
    };

    if (superclass) {
      inheriting = true;
      newClass.prototype = new superclass();
      inheriting = false;
    }

    newClass.superclass  = superclass;
    newClass.constructor = newClass;

    return newClass;
  },

  addMethods = function(object, methods) {
    if (object === undefined || methods === undefined) {
      return;
    }

    var oldScope = currentScope;
    currentScope = object;

    if (typeof methods === "function") {
      methods.call(object);
    }
    else {
      for (var name in methods) {
        def(name, methods[name]);
      }
    }

    currentScope = oldScope;
  },

  addSuperMethod = function(name, definition) {
    var superclass = currentClass !== null
      && currentClass.superclass !== undefined
      && currentClass.superclass.prototype;

    if (superclass
      && typeof definition === "function"
      && typeof superclass[name] === "function"
      && callsSuper(definition)) {

      return function() {
        var args = arguments,
            currentSuper = this.callSuper;

        this.callSuper = function() {
          for (var i = 0, l = arguments.length; i < l; i++) {
            args[i] = arguments[i];
          }
          return superclass[name].apply(this, args);
        };

        var result = definition.apply(this, arguments);
        this.callSuper = currentSuper;

        return result;
      };
    }

    return definition;
  },

  callsSuper = function(method) {
    return /\bcallSuper\b/.test(method.toString());
  };

})(window);
/**
 *
 */
var $break = {};

/**
 *
 */
module("Enumerable", function() {
  /**
   *
   */
  var $identity = function(item) {
    return item;
  };

  /**
   *
   */
  def("each", function(iterator, context) {
    var index = 0;
    try {
      this._each(function(value) {
        iterator.call(context, value, index++);
      });
    }
    catch (error) {
      if (error != $break) {
        throw error;
      }
    }
    return this;
  });

  /**
   *
   */
  def("all", function(iterator, context) {
    iterator = iterator || $identity;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) {
        throw $break;
      }
    });
    return result;
  });
  alias("every", "all");

  /**
   *
   */
  def("any", function(iterator, context) {
    iterator = iterator || $identity;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index)) {
        throw $break;
      }
    });
    return result;
  });
  alias("some", "any");

  /**
   *
   */
  def("collect", function(iterator, context) {
    iterator = iterator || $identity;
    return this.inject([], function(results, value, index) {
      results.push(iterator.call(context, value, index));
      return results;
    });
  });
  alias("map", "collect");

  /**
   *
   */
  def("detect", function(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  });
  alias("find", "detect");

  /**
   *
   */
  def("include", function(item) {
    if (typeof this.indexOf === "function") {
      return this.indexOf(item) != -1;
    }

    var found = false;
    this.each(function(value) {
      if (value == item) {
        found = true;
        throw $break;
      }
    });
    return found;
  });

  /**
   *
   */
  def("inject", function(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  });

  /**
   *
   */
  def("reject", function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (!iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });

  /**
   *
   */
  def("select", function(iterator, context) {
    return this.inject([], function(results, value, index) {
      if (iterator.call(context, value, index)) {
        results.push(value);
      }
      return results;
    });
  });
  alias("findAll", "select");
});
module("Inflector", function() {

  /**
   *
   */
  def("camelize", function() {
    return this.replace(/-+(.)?/g, function(match, char) {
      return char ? char.toUpperCase() : "";
    });
  });

  /**
   *
   */
  def("capitalize", function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  });
});
classify("Array", function() {
  include(Enumerable);

  if (Array.prototype.forEach) {
    alias("_each", "forEach");
  }
  else {
    /**
     *
     */
    def("_each", function(iterator) {
      for (var i = 0, n = this.length; i < n; i++) {
        iterator.call(null, this[i]);
      }
    });
  }

  if (!Array.prototype.indexOf) {
    /**
     *
     */
    def("indexOf", function(item) {
      for (var i = 0, n = array.length; i < n; i++) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }

  if (!Array.prototype.lastIndexOf) {
    /**
     *
     */
    def("lastIndexOf", function(item) {
      var i = array.length;
      while (i--) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    });
  }

  /**
   *
   */
  def("clear", function() {
    this.length = 0;
    return this;
  });

  /**
   *
   */
  def("first", function() {
    return this[0];
  });

  /**
   *
   */
  def("last", function() {
    return this[this.length - 1];
  });

  /**
   *
   */
  def("compact", function() {
    return this.reject(function(value) {
      return value == null;
    });
  });

  /**
   *
   */
  def("uniq", function(sorted) {
    return this.inject([], function(results, value, index) {
      if (index === 0 || (sorted ? results.last() != value : !results.include(value))) {
        results.push(value);
      }
      return results;
    });
  });
});
classify("Function", function() {
  /**
   *
   */
  def("bind", function(context) {
    if (context === undefined) {
      return this;
    }
    var method = this;
    return function() {
      return method.apply(context, arguments);
    }
  });
});
classify("String", function() {
  include(Inflector);
});