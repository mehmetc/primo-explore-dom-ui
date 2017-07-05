(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (window.Primo && window.Primo.explore) {
    window.Primo.explore._ui = new _ui2.default();
} else {
    console.log('This is a plugin please use "primo-explore-dom".');
    console.log('see https://github.com/mehmetc/primo-explore-dom');
}

},{"./ui":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nuDashboard = '<style>\n    .f18 {\n        min-height: 18px;\n        min-width: 18px;\n        height: 18px;\n        width: 18px;\n    }\n\n    .peNotSelectable {\n      color:#aaaaaa;\n    }\n</style>\n<!-- $mdMedia(\'gt-md\') -->\n<div id=\'explorerUiContainer\' ng-show="$ctrl.isActive()" style=\'position:absolute;top:10px;height:90vh;background-color:white;z-index:1000000;\'>\n    <md-sidenav class="md-sidenav-left" md-component-id="primo-explorer" md-is-locked-open="true" md-whiteframe="4" style="height:100%;">\n        <header id=\'explorerUiHeader\' ng-mousedown=\'$ctrl.headerMove($event)\'>\n            <md-toolbar>\n                <div class="md-toolbar-tools">\n                    <div flex layout=\'column\'>\n                      <h2 flex md-truncate>PrimoExplorer</h2>\n                      <div style="font-size:x-small">{{$ctrl.version}}</div>\n                    </div>\n                    <md-button class=\'md-icon-button\' ng-click="$ctrl.toggle()" aria-label="Close" title=\'Close\'>\n                        <md-icon md-svg-icon="primo-ui:close"></md-icon>\n                    </md-button>\n                </div>\n            </md-toolbar>\n        </header>\n\n        <section id=\'pe-components\'>\n            <div flex id=\'pe-components-list\' ng-hide=\'$ctrl.selectedComponentDetailShow || $ctrl.selectedComponentElementServiceShow\'>\n                <section style=\'background-color:#eee;\'>\n                    <div layout=\'row\'>\n                        <md-button ng-click=\'$ctrl.refreshComponents()\'>Reload</md-button>\n                        <md-input-container flex md-no-float>\n                            <label>Filter</label>\n                            <input ng-model="$ctrl.componentFilter">\n                        </md-input-container>\n                    </div>\n                </section>\n                <md-content style="height:90%;">\n                    <md-list class="md-dense">\n                        <md-list-item ng-repeat="component in $ctrl.components | filter:$ctrl.componentFilter" ng-click="$ctrl.loadComponent(component);$event.stopPropagation();">\n                            <span>{{component}}</span>\n                            <md-divider ng-if="!$last"></md-divider>\n                        </md-list-item>\n                    </md-list>\n                </md-content>\n            </div>\n\n            <div flex id=\'pe-components-detail\' ng-show=\'$ctrl.selectedComponentDetailShow\'>\n                <section style=\'height:100%\'>\n                    <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                        <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentDetailShow = false" aria-label="Back" title="Back">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n\n                              <h2 flex md-truncate>{{$ctrl.selectedComponentName}}</h2>\n\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.blink()" aria-label="Blink component" title="Blink component">\n                                <md-icon class="f18" md-svg-icon="primo-ui:bell"></md-icon>\n                            </md-button>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.pushToConsole()" aria-label="Push to console" title="Push to console">\n                                <md-icon class="f18" md-svg-icon="primo-ui:open-in-new"></md-icon>\n                            </md-button>\n                        </div>\n                    </md-toolbar>\n                    <section style="background-color:#eee;">\n                        <div layout="row" layout-align="center center">\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementPrev()" aria-label="Previous element" title="Previous element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                            </md-button>\n                            <div layout-align="center center">\n                                <div>{{$ctrl.selectedComponentElementIdx+1}}/{{$ctrl.selectedComponentElementCount}}</div>\n                            </div>\n                            <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementNext()" aria-label="Next element" title="Next element">\n                                <md-icon class="f18" md-svg-icon="primo-ui:chevron-right"></md-icon>\n                            </md-button>\n                        </div>\n                        <div layout="row" layout-align="center center">\n                            <input flex style="font-size:10px;text-align:center;" type="text" name="" value="{{$ctrl.selectedComponentElement.cssPath}}">\n                        </div>\n                    </section>\n                    <section>\n                        <md-list>\n                          <md-list-item ng-repeat="property in $ctrl.selectedComponentElementProperties" ng-click="$ctrl.loadComponentService(property);$event.stopPropagation();">\n                            <span ng-class="{peNotSelectable: property.value!=\'e\'}">{{property.key}}:</span>\n                            <span ng-class="{peNotSelectable: property.value!=\'e\'}" class="md-secondary" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{property.value}}</span>\n                          </md-list-item>\n                        </md-list>\n                    </section>\n                </section>\n            </div>\n\n            <div flex id=\'pe-components-detail-service\' ng-show=\'$ctrl.selectedComponentElementServiceShow\'>\n              <section style=\'height:100%\'>\n                  <md-toolbar class=\'md-hue-2\' style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n                      <div class="md-toolbar-tools" style="font-size: 0.8em;min-height: 2.5em;height:2.5em;">\n\n                          <md-button class=\'md-icon-button\' ng-click="$ctrl.selectedComponentElementServiceShow = false;$ctrl.selectedComponentDetailShow=true;" aria-label="Back" title="Back">\n                              <md-icon class="f18" md-svg-icon="primo-ui:chevron-left"></md-icon>\n                          </md-button>\n\n                            <h2 flex md-truncate>{{$ctrl.selectedComponentElementServiceName}}</h2>\n                      </div>\n                  </md-toolbar>\n                  <section>\n                      <md-list>\n                        <md-list-item ng-repeat="property in $ctrl.selectedComponentElementServiceProperties">\n                          <span ng-class="{peNotSelectable: property.value!=\'e\'}">{{property.key}}:</span>\n                          <span ng-class="{peNotSelectable: property.value!=\'e\'}" class="md-secondary" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{property.value}}</span>\n                        </md-list-item>\n                      </md-list>\n                  </section>\n              </section>\n            </div>\n        </section>\n    </md-sidenav>\n</div>\n';

var Ui = function () {
  function Ui() {
    _classCallCheck(this, Ui);

    var vmUi = this;
    //vmUi.active = false;
    vmUi._injectDOMElement();
    vmUi.module = vmUi._createModule();

    angular.bootstrap(document.querySelector('#explorerUi'), ['explorerUi']);
    vmUi.scope = angular.element(document.querySelector('#explorerUi')).scope();
  }

  _createClass(Ui, [{
    key: '_createModule',
    value: function _createModule() {
      var vmUi = this;
      return angular.module("explorerUi", ['ngMaterial', 'angularLoad']).component("explorerUi", {
        templateUrl: 'nuDashboard.html',
        controller: ['$http', '$scope', function ($http, $scope) {
          var ctrl = this;
          ctrl.version = Primo.version || '';
          ctrl.selectedTab = 0;
          ctrl.selectedComponent = null;
          ctrl.componentFilter = '';
          ctrl.selectedComponentName = '';
          ctrl.selectedComponentDetailShow = false;
          ctrl.selectedComponentElementIdx = 0;
          ctrl.selectedComponentElementCount = 0;
          ctrl.selectedComponentElement = null;

          ctrl.components = '';

          ctrl.loadComponent = function (name) {
            var c = Primo.explore.components.get(name);
            if (c && c.length > 0) {
              ctrl.selectedComponent = c;
              ctrl.selectedComponentName = name;
              ctrl.loadComponentElement(0);
              ctrl.selectedComponentDetailShow = true;
            } else {
              ctrl.selectedComponent = null;
            }
          };

          ctrl.loadComponentElement = function (index) {
            if (ctrl.selectedComponent) {
              ctrl.selectedComponentElementIdx = index;
              ctrl.selectedComponentElementCount = ctrl.selectedComponent.length;
              ctrl.selectedComponentElement = ctrl.selectedComponent[index];
              ctrl.selectedComponentElementProperties = ctrl.selectedComponentElementCtrlKeys();
            } else {
              ctrl.selectedComponentElementIdx = 0;
              ctrl.selectedComponentElementCount = 0;
              ctrl.selectedComponentElement = null;
              ctrl.selectedComponentElementProperties = [];
            }
          };

          ctrl.selectedComponentElementService = null;
          ctrl.selectedComponentElementServiceName = null;
          this.selectedComponentElementServiceShow = false;
          this.selectedComponentElementServiceProperties = {};

          ctrl.loadComponentService = function (service) {
            if (this.selectedComponentElement && service.value == 'e') {
              this.selectedComponentElementServiceName = service.key;
              this.selectedComponentElementService = this.selectedComponentElement.ctrl()[service.key];
              this.selectedComponentElementServiceShow = true;
              this.selectedComponentDetailShow = false;
              this.selectedComponentElementServiceProperties = parseObject(this.selectedComponentElementService);
            } else {
              this.selectedComponentElementServiceName = null;
              this.selectedComponentElementService = null;
              this.selectedComponentElementServiceShow = false;
              this.selectedComponentElementServiceProperties = {};
            }
          };

          ctrl.refreshComponents = function () {
            ctrl.components = Primo.explore.components.keys();
          };

          ctrl.isActive = function () {
            return vmUi.active;
          };

          ctrl.toggle = function () {
            vmUi.toggle();
            ctrl.refreshComponents();
          };

          ctrl.selectedComponentElementCtrlKeys = function () {
            var sce = [];
            if (ctrl.selectedComponentElement) {
              var selectedCtrl = ctrl.selectedComponentElement.ctrl();
              if (selectedCtrl) {
                sce = parseObject(selectedCtrl);
              }
            }
            return sce;
          };

          function parseObject(selectedCtrl) {
            var sce = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Object.keys(selectedCtrl)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (selectedCtrl.hasOwnProperty(key)) {
                  switch (_typeof(selectedCtrl[key])) {
                    case 'string':
                      sce.push({
                        key: key,
                        value: '"' + selectedCtrl[key] + '"',
                        type: 'string'
                      });
                      break;
                    case 'boolean':
                      sce.push({
                        key: key,
                        value: '' + selectedCtrl[key],
                        type: 'boolean'
                      });
                      break;
                    case 'number':
                      sce.push({
                        key: key,
                        value: '' + selectedCtrl[key],
                        type: 'number'
                      });
                      break;
                    case 'undefined':
                      sce.push({
                        key: key,
                        value: "Undefined",
                        type: 'undefined'
                      });
                      break;
                    case 'null':
                      sce.push({
                        key: key,
                        value: "Null",
                        type: 'null'
                      });
                      break;
                    default:
                      try {
                        sce.push({
                          key: key,
                          value: '' + selectedCtrl[key].constructor.name,
                          type: _typeof(selectedCtrl[key])
                        });
                      } catch (e) {
                        sce.push({
                          key: key,
                          value: '' + _typeof(selectedCtrl[key]),
                          type: _typeof(selectedCtrl[key])
                        });
                      }
                  } //switch
                } //if
              } //for
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            return sce;
          }

          ctrl.selectedComponentElementPrev = function () {
            if (ctrl.selectedComponentElementIdx > 0) {
              ctrl.selectedComponentElementIdx -= 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          };

          ctrl.selectedComponentElementNext = function () {
            if (ctrl.selectedComponentElementIdx < ctrl.selectedComponentElementCount - 1) {
              ctrl.selectedComponentElementIdx += 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          };

          ctrl.blink = function () {
            if (ctrl.selectedComponentElement) {
              console.log('blinking ' + ctrl.selectedComponentName + '[' + ctrl.selectedComponentElementIdx + ']');
              ctrl.selectedComponentElement.blink();
            }
          };

          ctrl.pushToConsole = function () {
            if (ctrl.selectedComponentElement) {
              var varName = ctrl.selectedComponentName.split('-').map(function (m, i) {
                m = m.trim();
                return i == 0 ? m : m[0].toUpperCase() + m.substr(1);
              }).join('');

              setTimeout('eval("var ' + varName + '=(Primo.explore.components.get(\'' + ctrl.selectedComponentName + '\'))[' + ctrl.selectedComponentElementIdx + '];console.log(\'access variable through -> ' + varName + '\');")', 0);
            }
          };

          ctrl.headerMove = function (event) {
            event.stopPropagation();
            event.preventDefault();

            var header = document.querySelector('#explorerUiContainer');

            var originalTop = parseInt(window.getComputedStyle(header).top);
            var mouseDownY = event.clientY;

            var originalLeft = parseInt(window.getComputedStyle(header).left);
            var mouseDownX = event.clientX;

            var dragHeader = function dragHeader(event) {
              header.style.top = originalTop + event.clientY - mouseDownY + "px";
              header.style.left = originalLeft + event.clientX - mouseDownX + "px";
              event.stopPropagation();
            };

            var dropHeader = function dropHeader(event) {
              header.removeEventListener('mousemove', dragHeader, true);
              header.removeEventListener('mouseup', dropHeader, true);
              event.stopPropagation();
            };

            header.addEventListener('mouseup', dropHeader, true);
            header.addEventListener('mousemove', dragHeader, true);
          };
        }]
      }).config(function ($mdIconProvider) {
        $mdIconProvider.iconSet('primo-ui', 'img/svg/svg-primo-ui.svg', 18);
      }).run(function ($templateCache) {
        $templateCache.put('nuDashboard.html', nuDashboard);
      });
    }
  }, {
    key: '_injectDOMElement',
    value: function _injectDOMElement() {
      var div = document.createElement('div');
      div.setAttribute('id', 'explorerUi');
      div.innerHTML = "<explorer-ui></explorer-ui>";

      //document.querySelector('primo-explore').appendChild(div);
      document.body.appendChild(div);
    }
  }, {
    key: 'show',
    value: function show() {
      this.active = true;
      if (!this.scope.$$phase) {
        this.scope.$apply();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.active = false;
      if (!this.scope.$$phase) {
        this.scope.$apply();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.active = !this.active;
      if (!this.scope.$$phase) {
        this.scope.$apply();
      }
    }
  }]);

  return Ui;
}();

exports.default = Ui;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9wcmltby1leHBsb3JlLWRvbS11aS9qcy9tYWluLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vcHJpbW8tZXhwbG9yZS1kb20tdWkvanMvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFHLE9BQU8sS0FBUCxJQUFnQixPQUFPLEtBQVAsQ0FBYSxPQUFoQyxFQUF3QztBQUN0QyxXQUFPLEtBQVAsQ0FBYSxPQUFiLENBQXFCLEdBQXJCLEdBQTJCLGtCQUEzQjtBQUNELENBRkQsTUFFTztBQUNILFlBQVEsR0FBUixDQUFZLGtEQUFaO0FBQ0EsWUFBUSxHQUFSLENBQVksa0RBQVo7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNMb0IsRTtBQUNuQixnQkFBYztBQUFBOztBQUNaLFFBQUksT0FBTyxJQUFYO0FBQ0E7QUFDQSxTQUFLLGlCQUFMO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBSyxhQUFMLEVBQWQ7O0FBRUEsWUFBUSxTQUFSLENBQWtCLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFsQixFQUF5RCxDQUFDLFlBQUQsQ0FBekQ7QUFDQSxTQUFLLEtBQUwsR0FBYSxRQUFRLE9BQVIsQ0FBZ0IsU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQWhCLEVBQXVELEtBQXZELEVBQWI7QUFDRDs7OztvQ0FFZTtBQUNkLFVBQUksT0FBTyxJQUFYO0FBQ0EsYUFBTyxRQUFRLE1BQVIsQ0FBZSxZQUFmLEVBQTZCLENBQUMsWUFBRCxFQUFlLGFBQWYsQ0FBN0IsRUFDSixTQURJLENBQ00sWUFETixFQUNvQjtBQUN2QixxQkFBYSxrQkFEVTtBQUV2QixvQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLFVBQVMsS0FBVCxFQUFnQixNQUFoQixFQUF3QjtBQUN0RCxjQUFJLE9BQU8sSUFBWDtBQUNBLGVBQUssT0FB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S0FBTCxDQUFXLE1BQVg7QUFDRDtBQUNGOzs7NkJBRVE7QUFDUCxXQUFLLE1BQUwsR0FBYyxDQUFDLEtBQUssTUFBcEI7QUFDQSxVQUFHLENBQUMsS0FBSyxLQUFMLENBQVcsT0FBZixFQUF3QjtBQUN0QixhQUFLLEtBQUwsQ0FBVyxNQUFYO0FBQ0Q7QUFDRjs7Ozs7O2tCQTlQa0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVWkgZnJvbSAnLi91aSdcblxuaWYod2luZG93LlByaW1vICYmIHdpbmRvdy5Qcmltby5leHBsb3JlKXtcbiAgd2luZG93LlByaW1vLmV4cGxvcmUuX3VpID0gbmV3IFVpKCk7XG59IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdUaGlzIGlzIGEgcGx1Z2luIHBsZWFzZSB1c2UgXCJwcmltby1leHBsb3JlLWRvbVwiLicpO1xuICAgIGNvbnNvbGUubG9nKCdzZWUgaHR0cHM6Ly9naXRodWIuY29tL21laG1ldGMvcHJpbW8tZXhwbG9yZS1kb20nKTtcbn1cbiIsImltcG9ydCBudURhc2hib2FyZCBmcm9tICcuLi9odG1sL251RGFzaGJvYXJkLmh0bWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHZtVWkgPSB0aGlzO1xuICAgIC8vdm1VaS5hY3RpdmUgPSBmYWxzZTtcbiAgICB2bVVpLl9pbmplY3RET01FbGVtZW50KCk7XG4gICAgdm1VaS5tb2R1bGUgPSB2bVVpLl9jcmVhdGVNb2R1bGUoKTtcblxuICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleHBsb3JlclVpJyksIFsnZXhwbG9yZXJVaSddKTtcbiAgICB2bVVpLnNjb3BlID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleHBsb3JlclVpJykpLnNjb3BlKCk7XG4gIH1cblxuICBfY3JlYXRlTW9kdWxlKCkge1xuICAgIGxldCB2bVVpID0gdGhpcztcbiAgICByZXR1cm4gYW5ndWxhci5tb2R1bGUoXCJleHBsb3JlclVpXCIsIFsnbmdNYXRlcmlhbCcsICdhbmd1bGFyTG9hZCddKVxuICAgICAgLmNvbXBvbmVudChcImV4cGxvcmVyVWlcIiwge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ251RGFzaGJvYXJkLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiBbJyRodHRwJywgJyRzY29wZScsIGZ1bmN0aW9uKCRodHRwLCAkc2NvcGUpIHtcbiAgICAgICAgICBsZXQgY3RybCA9IHRoaXM7XG4gICAgICAgICAgY3RybC52ZXJzaW9uID0gUHJpbW8udmVyc2lvbiB8fCAnJztcbiAgICAgICAgICBjdHJsLnNlbGVjdGVkVGFiID0gMDtcbiAgICAgICAgICBjdHJsLnNlbGVjdGVkQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICBjdHJsLmNvbXBvbmVudEZpbHRlciA9ICcnO1xuICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnROYW1lID0gJyc7XG4gICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudERldGFpbFNob3cgPSBmYWxzZTtcbiAgICAgICAgICBjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudElkeCA9IDA7XG4gICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRDb3VudCA9IDA7XG4gICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgICAgY3RybC5jb21wb25lbnRzID0gJyc7XG5cbiAgICAgICAgICBjdHJsLmxvYWRDb21wb25lbnQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICBsZXQgYyA9IFByaW1vLmV4cGxvcmUuY29tcG9uZW50cy5nZXQobmFtZSk7XG4gICAgICAgICAgICBpZiAoYyAmJiBjLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudCA9IGM7XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnROYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgY3RybC5sb2FkQ29tcG9uZW50RWxlbWVudCgwKTtcbiAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudERldGFpbFNob3cgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3RybC5sb2FkQ29tcG9uZW50RWxlbWVudCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZENvbXBvbmVudCkge1xuICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudElkeCA9IGluZGV4O1xuICAgICAgICAgICAgICBjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudENvdW50ID0gY3RybC5zZWxlY3RlZENvbXBvbmVudC5sZW5ndGg7XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50ID0gY3RybC5zZWxlY3RlZENvbXBvbmVudFtpbmRleF07XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50UHJvcGVydGllcyA9IGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50Q3RybEtleXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50SWR4ID0gMDtcbiAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRDb3VudCA9IDA7XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRQcm9wZXJ0aWVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRTZXJ2aWNlID0gbnVsbDtcbiAgICAgICAgICBjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudFNlcnZpY2VOYW1lID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudFNlcnZpY2VTaG93ID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRTZXJ2aWNlUHJvcGVydGllcyA9IHt9XG5cbiAgICAgICAgICBjdHJsLmxvYWRDb21wb25lbnRTZXJ2aWNlID0gZnVuY3Rpb24oc2VydmljZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50ICYmIHNlcnZpY2UudmFsdWUgPT0gJ2UnKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50U2VydmljZU5hbWUgPSBzZXJ2aWNlLmtleTtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRTZXJ2aWNlID0gdGhpcy5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnQuY3RybCgpW3NlcnZpY2Uua2V5XTtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRTZXJ2aWNlU2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wb25lbnREZXRhaWxTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50U2VydmljZVByb3BlcnRpZXMgPSBwYXJzZU9iamVjdCh0aGlzLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudFNlcnZpY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRTZXJ2aWNlTmFtZSA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50U2VydmljZSA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50U2VydmljZVNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRTZXJ2aWNlUHJvcGVydGllcyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0cmwucmVmcmVzaENvbXBvbmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY29tcG9uZW50cyA9IFByaW1vLmV4cGxvcmUuY29tcG9uZW50cy5rZXlzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3RybC5pc0FjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHZtVWkuYWN0aXZlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0cmwudG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2bVVpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgY3RybC5yZWZyZXNoQ29tcG9uZW50cygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50Q3RybEtleXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzY2UgPSBbXTtcbiAgICAgICAgICAgIGlmIChjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRDdHJsID0gY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnQuY3RybCgpO1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRDdHJsKSB7XG4gICAgICAgICAgICAgICAgc2NlID0gcGFyc2VPYmplY3Qoc2VsZWN0ZWRDdHJsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNjZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBwYXJzZU9iamVjdChzZWxlY3RlZEN0cmwpIHtcbiAgICAgICAgICAgIGxldCBzY2UgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhzZWxlY3RlZEN0cmwpKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxlY3RlZEN0cmwuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mKHNlbGVjdGVkQ3RybFtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgc2NlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgXCIke3NlbGVjdGVkQ3RybFtrZXldfVwiYCxcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgc2NlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgJHtzZWxlY3RlZEN0cmxba2V5XX1gLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICBzY2UucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGAke3NlbGVjdGVkQ3RybFtrZXldfWAsXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgICAgICAgICAgICAgc2NlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlVuZGVmaW5lZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICAgICAgICAgICAgICBzY2UucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiTnVsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudWxsJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIHNjZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGAke3NlbGVjdGVkQ3RybFtrZXldLmNvbnN0cnVjdG9yLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVvZihzZWxlY3RlZEN0cmxba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHNjZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGAke3R5cGVvZihzZWxlY3RlZEN0cmxba2V5XSl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVvZihzZWxlY3RlZEN0cmxba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy9zd2l0Y2hcbiAgICAgICAgICAgICAgfSAvL2lmXG4gICAgICAgICAgICB9IC8vZm9yXG4gICAgICAgICAgICByZXR1cm4gc2NlO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRQcmV2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRJZHggPiAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50SWR4IC09IDE7XG4gICAgICAgICAgICAgIGN0cmwubG9hZENvbXBvbmVudEVsZW1lbnQoY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50TmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50SWR4IDwgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnRJZHggKz0gMTtcbiAgICAgICAgICAgICAgY3RybC5sb2FkQ29tcG9uZW50RWxlbWVudChjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3RybC5ibGluayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBibGlua2luZyAke2N0cmwuc2VsZWN0ZWRDb21wb25lbnROYW1lfVske2N0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50SWR4IH1dYCk7XG4gICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRDb21wb25lbnRFbGVtZW50LmJsaW5rKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3RybC5wdXNoVG9Db25zb2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY3RybC5zZWxlY3RlZENvbXBvbmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgbGV0IHZhck5hbWUgPSBjdHJsLnNlbGVjdGVkQ29tcG9uZW50TmFtZS5zcGxpdCgnLScpLm1hcCgobSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIG0gPSBtLnRyaW0oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA9PSAwID8gbSA6IG1bMF0udG9VcHBlckNhc2UoKSArIG0uc3Vic3RyKDEpXG4gICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoYGV2YWwoXCJ2YXIgJHt2YXJOYW1lfT0oUHJpbW8uZXhwbG9yZS5jb21wb25lbnRzLmdldCgnJHtjdHJsLnNlbGVjdGVkQ29tcG9uZW50TmFtZX0nKSlbJHtjdHJsLnNlbGVjdGVkQ29tcG9uZW50RWxlbWVudElkeCB9XTtjb25zb2xlLmxvZygnYWNjZXNzIHZhcmlhYmxlIHRocm91Z2ggLT4gJHt2YXJOYW1lfScpO1wiKWAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0cmwuaGVhZGVyTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhwbG9yZXJVaUNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICBsZXQgb3JpZ2luYWxUb3AgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXIpLnRvcCk7XG4gICAgICAgICAgICBsZXQgbW91c2VEb3duWSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgICAgIGxldCBvcmlnaW5hbExlZnQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXIpLmxlZnQpO1xuICAgICAgICAgICAgbGV0IG1vdXNlRG93blggPSBldmVudC5jbGllbnRYO1xuXG4gICAgICAgICAgICBsZXQgZHJhZ0hlYWRlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGhlYWRlci5zdHlsZS50b3AgPSBvcmlnaW5hbFRvcCArIGV2ZW50LmNsaWVudFkgLSBtb3VzZURvd25ZICsgXCJweFwiO1xuICAgICAgICAgICAgICBoZWFkZXIuc3R5bGUubGVmdCA9IG9yaWdpbmFsTGVmdCArIGV2ZW50LmNsaWVudFggLSBtb3VzZURvd25YICsgXCJweFwiO1xuICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGRyb3BIZWFkZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICBoZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0hlYWRlciwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZHJvcEhlYWRlciwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGRyb3BIZWFkZXIsIHRydWUpO1xuICAgICAgICAgICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdIZWFkZXIsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pLmNvbmZpZyhmdW5jdGlvbigkbWRJY29uUHJvdmlkZXIpIHtcbiAgICAgICAgJG1kSWNvblByb3ZpZGVyLmljb25TZXQoJ3ByaW1vLXVpJywgJ2ltZy9zdmcvc3ZnLXByaW1vLXVpLnN2ZycsIDE4KTtcbiAgICAgIH0pLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgnbnVEYXNoYm9hcmQuaHRtbCcsIG51RGFzaGJvYXJkKX0pO1xuICB9XG5cbiAgX2luamVjdERPTUVsZW1lbnQoKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2V4cGxvcmVyVWknKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gXCI8ZXhwbG9yZXItdWk+PC9leHBsb3Jlci11aT5cIjtcblxuICAgIC8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncHJpbW8tZXhwbG9yZScpLmFwcGVuZENoaWxkKGRpdik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgaWYoIXRoaXMuc2NvcGUuJCRwaGFzZSkge1xuICAgICAgdGhpcy5zY29wZS4kYXBwbHkoKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgaWYoIXRoaXMuc2NvcGUuJCRwaGFzZSkge1xuICAgICAgdGhpcy5zY29wZS4kYXBwbHkoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSAhdGhpcy5hY3RpdmU7XG4gICAgaWYoIXRoaXMuc2NvcGUuJCRwaGFzZSkge1xuICAgICAgdGhpcy5zY29wZS4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
