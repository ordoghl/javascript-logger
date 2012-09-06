Javascript Logger
=================

This is a very simple Javascript logger.

Usage
-----

```html
<!DOCTYPE html>
<html>
<head>
  <title>Logger</title>
  <script src="logger.js"></script>
  <script>
    <!--
     LoggerConfiguration = {
          logEnabled: true
     };
    app_logger = new Logger("App");
    app_logger.info("App module logger info");
    -->
  </script>
</head>
<body>
  Logger Test
</body>
</html>
```

Modules
-------

The Logger constructor accepts a "module name" as a parameter.

You can filter which modules do you want enable. This will enable logging only for Sidebar module:

```javascript
LoggerConfiguration = {
  logEnabled: true,
  logModules: ["Sidebar"]
};
```

This will allow logging for any module except Sidebar:

```javascript
LoggerConfiguration = {
  logEnabled: true,
  logModulesExclude: ["Sidebar"]
};
```

Timestamps
----------

Enable timestamp in log messages with:

```javascript
LoggerConfiguration = {
  logEnabled: true,
  enableTimestamp: true
};
```

Event buffer
------------

You can enable buffering of events:

```javascript
LoggerConfiguration = {
  logEnabled: true,
  storeEvents: true
};
```

Later you can get stored events (as an array of strings) by calling any logger object:

```javascript
logger.getEventBuffer()
```

You can disable logging to console too:

```javascript
LoggerConfiguration = {
  logEnabled: true,
  storeEvents: true,
  displayEvents: false
};
```



Production
----------

In production simply disable logging:

```javascript
LoggerConfiguration = {
  logEnabled: false
};
```
This will generate empty logger functions to minimize performance penalty.
