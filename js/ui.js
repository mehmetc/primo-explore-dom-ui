import nuDashboard from '../html/nuDashboard.html'

export default class Ui {
  constructor() {
    let vmUi = this;
    //vmUi.active = false;
    vmUi._injectDOMElement();
    vmUi.module = vmUi._createModule();

    angular.bootstrap(document.querySelector('#explorerUi'), ['explorerUi']);
    vmUi.scope = angular.element(document.querySelector('#explorerUi')).scope();
  }

  _createModule() {
    let vmUi = this;
    return angular.module("explorerUi", ['ngMaterial', 'angularLoad'])
      .component("explorerUi", {
        templateUrl: 'nuDashboard.html',
        controller: ['$http', '$scope', function($http, $scope) {
          let ctrl = this;
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

          ctrl.loadComponent = function(name) {
            let c = Primo.explore.components.get(name);
            if (c && c.length > 0) {
              ctrl.selectedComponent = c;
              ctrl.selectedComponentName = name;
              ctrl.loadComponentElement(0);
              ctrl.selectedComponentDetailShow = true;
            } else {
              ctrl.selectedComponent = null;
            }
          }

          ctrl.loadComponentElement = function(index) {
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
          }

          ctrl.selectedComponentElementService = null;
          ctrl.selectedComponentElementServiceName = null;
          this.selectedComponentElementServiceShow = false;
          this.selectedComponentElementServiceProperties = {}

          ctrl.loadComponentService = function(service) {
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
          }

          ctrl.refreshComponents = function() {
            ctrl.components = Primo.explore.components.keys();
          }

          ctrl.isActive = function() {
            return vmUi.active;
          }

          ctrl.toggle = function() {
            vmUi.toggle();
            ctrl.refreshComponents();
          }

          ctrl.selectedComponentElementCtrlKeys = function() {
            let sce = [];
            if (ctrl.selectedComponentElement) {
              let selectedCtrl = ctrl.selectedComponentElement.ctrl();
              if (selectedCtrl) {
                sce = parseObject(selectedCtrl);
              }
            }
            return sce;
          }

          function parseObject(selectedCtrl) {
            let sce = [];
            for (let key of Object.keys(selectedCtrl)) {
              if (selectedCtrl.hasOwnProperty(key)) {
                switch (typeof(selectedCtrl[key])) {
                  case 'string':
                    sce.push({
                      key: key,
                      value: `"${selectedCtrl[key]}"`,
                      type: 'string'
                    });
                    break;
                  case 'boolean':
                    sce.push({
                      key: key,
                      value: `${selectedCtrl[key]}`,
                      type: 'boolean'
                    });
                    break;
                  case 'number':
                    sce.push({
                      key: key,
                      value: `${selectedCtrl[key]}`,
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
                        value: `${selectedCtrl[key].constructor.name}`,
                        type: typeof(selectedCtrl[key])
                      });
                    } catch (e) {
                      sce.push({
                        key: key,
                        value: `${typeof(selectedCtrl[key])}`,
                        type: typeof(selectedCtrl[key])
                      });
                    }
                } //switch
              } //if
            } //for
            return sce;
          }


          ctrl.selectedComponentElementPrev = function() {
            if (ctrl.selectedComponentElementIdx > 0) {
              ctrl.selectedComponentElementIdx -= 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          }

          ctrl.selectedComponentElementNext = function() {
            if (ctrl.selectedComponentElementIdx < ctrl.selectedComponentElementCount - 1) {
              ctrl.selectedComponentElementIdx += 1;
              ctrl.loadComponentElement(ctrl.selectedComponentElementIdx);
            }
          }

          ctrl.blink = function() {
            if (ctrl.selectedComponentElement) {
              console.log(`blinking ${ctrl.selectedComponentName}[${ctrl.selectedComponentElementIdx }]`);
              ctrl.selectedComponentElement.blink();
            }
          }

          ctrl.pushToConsole = function() {
            if (ctrl.selectedComponentElement) {
              let varName = ctrl.selectedComponentName.split('-').map((m, i) => {
                m = m.trim();
                return i == 0 ? m : m[0].toUpperCase() + m.substr(1)
              }).join('');

              setTimeout(`eval("var ${varName}=(Primo.explore.components.get('${ctrl.selectedComponentName}'))[${ctrl.selectedComponentElementIdx }];console.log('access variable through -> ${varName}');")`, 0);
            }
          }

          ctrl.headerMove = function(event) {
            event.stopPropagation();
            event.preventDefault();

            let header = document.querySelector('#explorerUiContainer');

            let originalTop = parseInt(window.getComputedStyle(header).top);
            let mouseDownY = event.clientY;

            let originalLeft = parseInt(window.getComputedStyle(header).left);
            let mouseDownX = event.clientX;

            let dragHeader = function(event) {
              header.style.top = originalTop + event.clientY - mouseDownY + "px";
              header.style.left = originalLeft + event.clientX - mouseDownX + "px";
              event.stopPropagation();
            }

            let dropHeader = function(event) {
              header.removeEventListener('mousemove', dragHeader, true);
              header.removeEventListener('mouseup', dropHeader, true);
              event.stopPropagation();
            }

            header.addEventListener('mouseup', dropHeader, true);
            header.addEventListener('mousemove', dragHeader, true);
          }
        }]
      }).config(function($mdIconProvider) {
        $mdIconProvider.iconSet('primo-ui', 'img/svg/svg-primo-ui.svg', 18);
      }).run(function($templateCache) {$templateCache.put('nuDashboard.html', nuDashboard)});
  }

  _injectDOMElement() {
    let div = document.createElement('div');
    div.setAttribute('id', 'explorerUi');
    div.innerHTML = "<explorer-ui></explorer-ui>";

    //document.querySelector('primo-explore').appendChild(div);
    document.body.appendChild(div);
  }

  show() {
    this.active = true;
    if(!this.scope.$$phase) {
      this.scope.$apply();
    }
  }

  hide() {
    this.active = false;
    if(!this.scope.$$phase) {
      this.scope.$apply();
    }
  }

  toggle() {
    this.active = !this.active;
    if(!this.scope.$$phase) {
      this.scope.$apply();
    }
  }
}
