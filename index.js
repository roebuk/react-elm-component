import React from 'react';

function renderElmElement(props) {
  return function (node) {
    if (!node) {
      return;
    }

    var mountPoint = document.createElement('div');
    node.appendChild(mountPoint);

    var app = props.app.init({
      node: mountPoint,
      flags: props.flags
    });

    if (app && app.ports && props.ports) {
      props.ports(app.ports);
    }
  }
};

var ElmComponent = function (props) {
  return React.createElement('div', { ref: renderElmElement(props) });
};

export default React.memo(ElmComponent);