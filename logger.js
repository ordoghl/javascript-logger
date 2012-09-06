/*jslint browser: true*/
/*global LoggerConfiguration*/
(function (win) {
  "use strict";
  win.Logger = function (module_name) {

    var ALLOWED_LOG_LEVELS = ["error", "warning", "info", "debug"],
      logger_obj = {},
      i,
      currentTimeString,
      module_enabled,
      level_enabled,
      logString;

    if (module_name === undefined) {
      module_name = "Default";
    }

    win.LoggerConfiguration = (win.LoggerConfiguration !== undefined && win.LoggerConfiguration.constructor === Object) ? win.LoggerConfiguration : {};

    win.LoggerConfiguration.eventBuffer = win.LoggerConfiguration.eventBuffer || [];

    currentTimeString = function () {
      var cTime = new Date();
      return cTime.getFullYear() + "." + cTime.getMonth() + "." + cTime.getDay() + " " + cTime.getHours() + ":" + cTime.getMinutes() + ":" + cTime.getSeconds() + "." + cTime.getMilliseconds();
    };

    module_enabled = function (module) {

      var incl_mod = win.LoggerConfiguration.logModules, excl_mod = win.LoggerConfiguration.logModulesExclude;

      // normalize to arrays
      if (incl_mod !== undefined && incl_mod.constructor === String) {
        incl_mod = [incl_mod];
      }
      if (excl_mod !== undefined && excl_mod.constructor === String) {
        excl_mod = [excl_mod];
      }
      if (incl_mod !== undefined) {
        if (incl_mod.indexOf(module) > -1) {
          return excl_mod === undefined || excl_mod.indexOf(module) === -1;
        } else {
          // array given as logModules but doesn't contain module
          return false;
        }
      } else {
        return excl_mod === undefined || excl_mod.indexOf(module) === -1;
      }
    };

    level_enabled = function (level) {
      var log_level = win.LoggerConfiguration.logLevel;
      if (log_level === undefined) {
        return true;
      }
      if (log_level !== undefined && log_level.constructor === Number) {
        return (ALLOWED_LOG_LEVELS.indexOf(level) + 1) <= log_level;
      }
      if (log_level !== undefined && log_level.constructor === String && ALLOWED_LOG_LEVELS.indexOf(level) > -1) {
        return (ALLOWED_LOG_LEVELS.indexOf(level) + 1) <= (ALLOWED_LOG_LEVELS.indexOf(log_level) + 1);
      }
      return false;
    };

    logString = function (level, str) {
      var out;
      out = "[" + module_name + "]" + "[" + level + "]";
      if (win.LoggerConfiguration.enableTimestamp !== undefined || win.LoggerConfiguration.enableTimestamp) {
        out += "[" + currentTimeString() + "]";
      }
      out += ": " + str;
      if (win.LoggerConfiguration.displayEvents === undefined || win.LoggerConfiguration.displayEvents) {
        console.log(out);
      }
      if (win.LoggerConfiguration.storeEvents !== undefined && win.LoggerConfiguration.storeEvents) {
        win.LoggerConfiguration.eventBuffer.push(out);
      }
    };

    if (win.LoggerConfiguration.logEnabled) {
      for (i = 0; i < ALLOWED_LOG_LEVELS.length; i += 1) {
        logger_obj[ALLOWED_LOG_LEVELS[i]] = (function (value) {
          return function (str) {
            if (module_enabled(module_name) && level_enabled(ALLOWED_LOG_LEVELS[value])) {
              logString(ALLOWED_LOG_LEVELS[value], str);
            }
          };
        }(i));
      }
      logger_obj.getEventBuffer = function () {
        return win.LoggerConfiguration.eventBuffer;
      };
      return logger_obj;
    } else {
      for (i = 0; i < ALLOWED_LOG_LEVELS.length; i += 1) {
        logger_obj[ALLOWED_LOG_LEVELS[i]] = function () {};
      }
      return logger_obj;
    }
  };
}(window));