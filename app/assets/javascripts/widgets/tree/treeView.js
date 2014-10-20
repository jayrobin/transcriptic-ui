Transcriptic.Tree.TreeView = function(treeContainerSelector) {
  this.$container = $(treeContainerSelector);
};

Transcriptic.Tree.TreeView.prototype = {
  bindEventListeners: function(controller) {
    this.$container.on("click", "li", this.handleParentNodeClick);
    this.controller = controller;
  },
  renderTree: function(treeData) {
    this.$container.empty();
    var $tree = $("<ul class='tree'></ul>");

    this.render(treeData, $tree);
    this.$container.append($tree);
  },
  render: function(nodeData, $parent) {
    var $listElem = $("<li>" + nodeData.text + "</li>");
    $parent.append($listElem);

    if(nodeData.nodes != null) {
      var $subTree = $("<ul></ul>");
      $listElem.addClass("collapsed");
      $subTree.hide();
      $listElem.append($subTree);

      for(var i in nodeData.nodes) {
        var node = nodeData.nodes[i];
        this.render(node, $subTree);      
      }
    }
  },
  handleParentNodeClick: function(evt) {
    evt.stopPropagation();
    var $listElem = $(evt.currentTarget);
    var $subTree = $listElem.find("> ul").toggle();

    if($subTree.length > 0) {
      $listElem.toggleClass("collapsed");
      $listElem.toggleClass("expanded");
    }
  }
};