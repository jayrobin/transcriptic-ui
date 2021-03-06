Transcriptic.PlateGenerator.PlateView = function($plate) {
  this.$plate = $plate;
};

Transcriptic.PlateGenerator.PlateView.prototype = {
  generatePlate: function(height, width) {
    this.$plate.empty();

    var $holder = $("<ul class='selectable'></ul>");
    this.$plate.append($holder);

    var wellSize = 20;
    var numWells = width * height;
    var plateWidth = (2*(wellSize*width));
    var plateHeight = (1.8*(wellSize * height));
    if (numWells == 96){
      var plateWidth = (1.5*(wellSize*width));
    }
    if (numWells == 384){
      var plateWidth = (1.4*(wellSize*width));
    }
    this.$plate.css({"width": plateWidth + "px"});
    for(var j = 0; j < numWells; j++) {
      $holder.append('<li class="ui-state-default" id="' + j + '"></li>');
      $("#" + j).css({"width": wellSize, "height": wellSize});
    }
  },
  setSingleSelectable: function() {
    this.$plate.on("click", "li", this.handleWellClick.bind(this));
  },
  setMultiSelectable: function() {
    this.$plate.on("click", "li", this.handleMultiWellClick.bind(this));
  },
  setDragSelectable: function() {
    this.$plate.find(".selectable").selectable({
      stop: this.handleWellSelect.bind(this)
    });
  },
  handleWellClick: function(evt) {
    this.$plate.find("li").removeClass("ui-selected");
    $(evt.currentTarget).toggleClass("ui-selected");
    this.handleWellSelect();
  },
  handleMultiWellClick: function(evt) {
    $(evt.currentTarget).toggleClass("ui-selected");
    this.handleWellSelect();
  },
  handleWellSelect: function(evt, ui) {
    this.$plate.trigger({
      type: "update",
      wells: this.getSelectedWells()
    });
  },
  getSelectedWells: function(){
    var selectedWells = [];

    this.$plate.find(".ui-selected").each(function(){
      selectedWells.push(parseInt($(this).attr("id")));
    })

    return selectedWells
  }
};